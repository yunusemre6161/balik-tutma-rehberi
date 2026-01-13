'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapFilterState } from '@/shared/types/map.types';

// Dynamic imports to avoid SSR issues with Leaflet
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

import { fishingAreasWithCoords } from '@/shared/data/fishingAreasWithCoords';
import { turkeyRegions } from '@/shared/data/turkeyRegions';
import { fishData } from '@/shared/data/fishData';
import { TURKEY_CENTER, DEFAULT_ZOOM, MAP_CONFIG } from './utils/mapConfig';
import { TILE_LAYERS } from './utils/mapStyles';

export default function TurkeyMap() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [filters, setFilters] = useState<MapFilterState>({
    showFishingAreas: true,
    showFishRegions: true,
    selectedRegion: null,
    selectedDifficulty: null,
  });

  // Handle component mounting (for SSR)
  useEffect(() => {
    setMounted(true);

    // Fix Leaflet default icon paths (import dynamically to avoid SSR issues)
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
    });

    // Detect dark mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 map-loading-skeleton">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-600 dark:text-gray-400">Harita yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Filter fishing areas
  const filteredAreas = fishingAreasWithCoords.filter((area) => {
    if (filters.selectedRegion && !area.region.includes(filters.selectedRegion)) {
      return false;
    }
    if (filters.selectedDifficulty && area.difficulty !== filters.selectedDifficulty) {
      return false;
    }
    return filters.showFishingAreas;
  });

  // Get fish regions to display
  const regionsToShow = filters.showFishRegions
    ? Object.entries(turkeyRegions).filter(([key]) => {
        if (filters.selectedRegion) {
          return key === filters.selectedRegion;
        }
        return true;
      })
    : [];

  const tileLayer = isDark ? TILE_LAYERS.dark : TILE_LAYERS.light;

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700">
      <MapContainer
        center={[TURKEY_CENTER.lat, TURKEY_CENTER.lng]}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={MAP_CONFIG.scrollWheelZoom}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution={tileLayer.attribution}
          url={tileLayer.url}
        />

        {/* Fishing Area Markers */}
        {filteredAreas.map((area) => (
          <Marker
            key={area.id}
            position={[area.lat, area.lng]}
          >
            <Popup>
              <div className="p-4 min-w-[250px]">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {area.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {area.city} - {area.region}
                </p>

                {/* Fish Types */}
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Balık Türleri:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {area.fishTypes.map((fish, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full"
                      >
                        {fish}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div className="mb-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      area.difficulty === 'Kolay'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : area.difficulty === 'Orta'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }`}
                  >
                    {area.difficulty}
                  </span>
                </div>

                {/* Link to details */}
                <a
                  href={`/av-alanlari`}
                  className="inline-block mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-lg transition-colors w-full text-center"
                >
                  Detayları Gör →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Fish Region Markers */}
        {regionsToShow.map(([regionKey, region]) => {
          const mainCity = region.cities[0];
          const fishInRegion = fishData.filter((fish) =>
            fish.regions.some((r) => r.includes(regionKey))
          ).slice(0, 4); // Show max 4 fish

          if (fishInRegion.length === 0) return null;

          return (
            <Marker
              key={regionKey}
              position={[mainCity.lat, mainCity.lng]}
            >
              <Popup>
                <div className="p-4 min-w-[280px]">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                    {region.name} Bölgesi Balıkları
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    {fishInRegion.map((fish) => (
                      <a
                        key={fish.id}
                        href={`/balik-turleri/${fish.id}`}
                        className="flex flex-col items-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="w-16 h-16 relative mb-2">
                          <img
                            src={fish.image}
                            alt={fish.name}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <span className="text-xs font-medium text-gray-900 dark:text-white text-center">
                          {fish.name}
                        </span>
                      </a>
                    ))}
                  </div>

                  {fishInRegion.length > 0 && (
                    <a
                      href="/balik-turleri"
                      className="inline-block mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors w-full text-center"
                    >
                      Tüm Balıkları Gör →
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {/* Simple Legend/Filter Overlay */}
      <div className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-xs">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
          Harita Filtreleri
        </h4>

        {/* Toggle Switches */}
        <div className="space-y-2 mb-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.showFishingAreas}
              onChange={(e) =>
                setFilters({ ...filters, showFishingAreas: e.target.checked })
              }
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Av Alanları
            </span>
          </label>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.showFishRegions}
              onChange={(e) =>
                setFilters({ ...filters, showFishRegions: e.target.checked })
              }
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Balık Bölgeleri
            </span>
          </label>
        </div>

        {/* Region Filter */}
        <div className="mb-3">
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Bölge
          </label>
          <select
            value={filters.selectedRegion || ''}
            onChange={(e) =>
              setFilters({ ...filters, selectedRegion: e.target.value || null })
            }
            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Tümü</option>
            <option value="Marmara">Marmara</option>
            <option value="Ege">Ege</option>
            <option value="Akdeniz">Akdeniz</option>
            <option value="Karadeniz">Karadeniz</option>
            <option value="Tatlı Su">Tatlı Su</option>
          </select>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Zorluk
          </label>
          <select
            value={filters.selectedDifficulty || ''}
            onChange={(e) =>
              setFilters({
                ...filters,
                selectedDifficulty: (e.target.value as any) || null,
              })
            }
            className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Tümü</option>
            <option value="Kolay">Kolay</option>
            <option value="Orta">Orta</option>
            <option value="Zor">Zor</option>
          </select>
        </div>
      </div>
    </div>
  );
}
