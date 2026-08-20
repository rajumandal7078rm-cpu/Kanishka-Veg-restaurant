import React, { useRef, useState } from 'react';
import { Camera, RotateCcw, Check, Upload, Image as ImageIcon } from 'lucide-react';
import { useCustomImages } from '../context/CustomImageContext';

interface UploadableImageProps {
  imageKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center';
  label?: string;
  showAlways?: boolean;
}

export const UploadableImage: React.FC<UploadableImageProps> = ({
  imageKey,
  defaultSrc,
  alt,
  className = 'w-full h-full object-cover object-center',
  containerClassName = 'relative w-full h-full group',
  badgePosition = 'top-right',
  label = 'Upload Original Photo',
  showAlways = false,
}) => {
  const { getImage, setCustomImage, removeCustomImage, isCustom, isEditMode } = useCustomImages();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [successToast, setSuccessToast] = useState(false);

  const currentSrc = getImage(imageKey, defaultSrc);
  const customActive = isCustom(imageKey);

  // If NOT in Edit/Admin Mode (Normal Live Customers/Visitors on the Internet)
  // Render pristine, luxury image presentation without any upload buttons or dropzones
  if (!isEditMode) {
    return (
      <div className={containerClassName}>
        <img
          src={currentSrc}
          alt={alt}
          referrerPolicy="no-referrer"
          className={className}
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== defaultSrc) {
              e.currentTarget.src = defaultSrc;
            }
          }}
        />
      </div>
    );
  }

  // Resize and optimize image to ensure it fits cleanly without quota crashes
  const processAndSaveFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) {
        setIsUploading(false);
        return;
      }

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 1400; // Balanced high-definition max dimension
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setCustomImage(imageKey, optimizedDataUrl);
          setIsUploading(false);
          setSuccessToast(true);
          setTimeout(() => setSuccessToast(false), 3000);
        } else {
          setCustomImage(imageKey, result);
          setIsUploading(false);
          setSuccessToast(true);
          setTimeout(() => setSuccessToast(false), 3000);
        }
      };

      img.onerror = () => {
        setIsUploading(false);
      };

      img.src = result;
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processAndSaveFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processAndSaveFile(file);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeCustomImage(imageKey);
  };

  const triggerFileInput = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const positionClasses = {
    'top-right': 'top-3 right-3',
    'top-left': 'top-3 left-3',
    'bottom-right': 'bottom-3 right-3',
    'bottom-left': 'bottom-3 left-3',
    'center': 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  }[badgePosition];

  return (
    <div
      className={`${containerClassName} ${isDragging ? 'ring-2 ring-[#e5be5a] ring-offset-2 ring-offset-black' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Actual Target Image Tag */}
      <img
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        className={className}
      />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label={`Upload photo for ${alt}`}
      />

      {/* Drag & Drop Visual Overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-30 bg-[#0c0d12]/90 backdrop-blur-sm border-2 border-dashed border-[#e5be5a] flex flex-col items-center justify-center p-4 text-center animate-fade-in pointer-events-none">
          <Upload className="w-10 h-10 text-[#e5be5a] animate-bounce mb-2" />
          <p className="text-sm font-bold text-[#f5eedf] uppercase tracking-wider">
            Drop your original photo here to upload
          </p>
        </div>
      )}

      {/* Uploading Indicator */}
      {isUploading && (
        <div className="absolute inset-0 z-30 bg-[#0c0d12]/85 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#e5be5a] border-t-transparent animate-spin mb-2" />
          <p className="text-xs font-semibold text-[#f5eedf]">Uploading & Optimizing...</p>
        </div>
      )}

      {/* Upload Success Toast */}
      {successToast && (
        <div className="absolute top-3 inset-x-3 z-30 backdrop-blur-md bg-[#162a1c]/95 border border-[#22c55e]/60 rounded-xl px-3 py-2 flex items-center justify-between shadow-2xl animate-fade-in">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#22c55e]" />
            <span className="text-[11px] font-bold text-[#f5eedf] uppercase tracking-wider">
              Original Photo Uploaded!
            </span>
          </div>
          <span className="text-[10px] text-[#86efac] font-medium">Saved Permanently</span>
        </div>
      )}

      {/* Interactive Upload Trigger Button (Badge / Hover Action) */}
      <div
        className={`absolute ${positionClasses} z-20 flex items-center gap-1.5 ${
          showAlways
            ? 'opacity-100'
            : 'opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300'
        }`}
      >
        <button
          type="button"
          onClick={triggerFileInput}
          title={label}
          className="backdrop-blur-md bg-[#0c0d12]/90 hover:bg-[#1a1b26] text-[#e5be5a] hover:text-[#ffffff] border border-[#d4af37]/45 hover:border-[#d4af37] px-2.5 py-1.5 rounded-lg shadow-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 active:scale-95 transition-all"
        >
          <Camera className="w-3.5 h-3.5 text-[#e5be5a]" />
          <span>{label}</span>
        </button>

        {/* Reset Button if Custom Photo is active */}
        {customActive && (
          <button
            type="button"
            onClick={handleReset}
            title="Reset to default photo"
            className="backdrop-blur-md bg-[#1a1114]/90 hover:bg-[#34181c] text-[#f87171] hover:text-[#ffffff] border border-[#ef4444]/40 px-2 py-1.5 rounded-lg shadow-xl text-[10px] font-semibold flex items-center gap-1 active:scale-95 transition-all"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* Subtle indicator badge when custom uploaded photo is active */}
      {customActive && !showAlways && (
        <div className="absolute bottom-3 left-3 z-10 opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="backdrop-blur-md bg-[#0c0d12]/80 border border-[#22c55e]/40 text-[#4ade80] text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded flex items-center gap-1">
            <ImageIcon className="w-2.5 h-2.5" />
            <span>Custom Photo</span>
          </span>
        </div>
      )}
    </div>
  );
};
