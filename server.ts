import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const PORT = 3000;
const DATA_DIR = path.join(process.cwd(), "data");
const IMAGES_FILE = path.join(DATA_DIR, "uploaded_images.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-memory cache for fast access
let uploadedImages: Record<string, string> = {};

// Load saved images from disk on server startup
try {
  if (fs.existsSync(IMAGES_FILE)) {
    const raw = fs.readFileSync(IMAGES_FILE, "utf-8");
    uploadedImages = JSON.parse(raw);
    console.log(`[Server] Loaded ${Object.keys(uploadedImages).length} uploaded images from persistent storage.`);
  }
} catch (e) {
  console.warn("[Server] Could not read uploaded images file, starting fresh:", e);
}

function persistImagesToDisk() {
  try {
    fs.writeFileSync(IMAGES_FILE, JSON.stringify(uploadedImages, null, 2), "utf-8");
  } catch (e) {
    console.error("[Server] Error saving uploaded images to disk:", e);
  }
}

async function startServer() {
  const app = express();

  // Support large base64 image uploads (up to 50MB)
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // API Health Check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", count: Object.keys(uploadedImages).length });
  });

  // GET all shared uploaded images (so any phone/browser gets all uploaded photos)
  app.get("/api/images", (_req, res) => {
    res.json({ success: true, images: uploadedImages });
  });

  // GET single image by key
  app.get("/api/images/:key", (req, res) => {
    const key = req.params.key;
    const dataUrl = uploadedImages[key];
    if (!dataUrl) {
      return res.status(404).json({ error: "Image not found" });
    }
    return res.json({ success: true, key, dataUrl });
  });

  // POST single image
  app.post("/api/images", (req, res) => {
    const { key, dataUrl } = req.body;
    if (!key || !dataUrl) {
      return res.status(400).json({ error: "key and dataUrl are required" });
    }
    uploadedImages[key] = dataUrl;
    persistImagesToDisk();
    console.log(`[Server] Saved image "${key}". Total images: ${Object.keys(uploadedImages).length}`);
    return res.json({ success: true, key });
  });

  // POST batch images (bulk sync from client)
  app.post("/api/images/batch", (req, res) => {
    const { images } = req.body;
    if (!images || typeof images !== "object") {
      return res.status(400).json({ error: "images object required" });
    }
    Object.assign(uploadedImages, images);
    persistImagesToDisk();
    console.log(`[Server] Batch updated images. Total: ${Object.keys(uploadedImages).length}`);
    return res.json({ success: true, count: Object.keys(uploadedImages).length });
  });

  // DELETE single image
  app.delete("/api/images/:key", (req, res) => {
    const key = req.params.key;
    if (uploadedImages[key]) {
      delete uploadedImages[key];
      persistImagesToDisk();
    }
    return res.json({ success: true });
  });

  // DELETE all images (reset)
  app.delete("/api/images", (_req, res) => {
    uploadedImages = {};
    persistImagesToDisk();
    return res.json({ success: true });
  });

  // Vite Middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Kanishka Veg Restaurant Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("[Server] Fatal server startup error:", err);
  process.exit(1);
});
