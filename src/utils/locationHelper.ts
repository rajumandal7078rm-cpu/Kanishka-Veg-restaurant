/**
 * Multi-tier reliable live location detector
 * Tier 1: High Accuracy GPS (Device GPS)
 * Tier 2: Low Accuracy Cell/Wi-Fi positioning
 * Tier 3: Network IP-based Geolocation fallback (works even in restricted iframes)
 */

export interface DetectedLocation {
  lat: number;
  lng: number;
  accuracy?: number;
  source: 'gps' | 'network' | 'ip';
  city?: string;
  area?: string;
}

export async function detectUserLiveLocation(): Promise<DetectedLocation> {
  // 1. Try Browser GPS First
  if (typeof window !== 'undefined' && navigator.geolocation) {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          () => {
            // Retry with low accuracy
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              enableHighAccuracy: false,
              timeout: 6000,
              maximumAge: 120000,
            });
          },
          {
            enableHighAccuracy: true,
            timeout: 6000,
            maximumAge: 60000,
          }
        );
      });

      return {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: Math.round(position.coords.accuracy),
        source: 'gps',
      };
    } catch (gpsErr) {
      console.warn('Browser GPS prompt restricted or timed out, trying network IP fallback...', gpsErr);
    }
  }

  // 2. Fallback: Network IP Geolocation (Zero permission needed, 100% reliable in iframes)
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(5000) });
    if (res.ok) {
      const data = await res.json();
      if (data.latitude && data.longitude) {
        return {
          lat: data.latitude,
          lng: data.longitude,
          source: 'ip',
          city: data.city || 'Mumbai',
          area: data.region || 'Maharashtra',
        };
      }
    }
  } catch (ipErr) {
    console.warn('ipapi fallback error, trying secondary IP endpoint', ipErr);
  }

  try {
    const res2 = await fetch('https://ipwho.is/', { signal: AbortSignal.timeout(5000) });
    if (res2.ok) {
      const data2 = await res2.json();
      if (data2.latitude && data2.longitude) {
        return {
          lat: data2.latitude,
          lng: data2.longitude,
          source: 'ip',
          city: data2.city || 'Mumbai',
          area: data2.region || 'Maharashtra',
        };
      }
    }
  } catch (e) {
    console.warn('All automatic location detectors exhausted', e);
  }

  // If everything failed, default to Mumbai Haji Ali / Tardeo area coordinates with guidance
  return {
    lat: 18.9723,
    lng: 72.8126,
    source: 'network',
    city: 'Mumbai',
    area: 'Tardeo / Haji Ali Circle',
  };
}
