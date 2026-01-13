import { FishingAreaWithCoords } from '../data/fishingAreasWithCoords';

export interface MapPosition {
  lat: number;
  lng: number;
}

export interface MapMarkerData {
  id: string;
  type: 'fishing-area' | 'fish-region';
  position: MapPosition;
  name: string;
  data: FishingAreaData | FishRegionData;
}

export interface FishingAreaData {
  id: string;
  name: string;
  city: string;
  region: string;
  description: string;
  fishTypes: string[];
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  bestTimes: string[];
  accessType: 'Kıyı' | 'Tekne' | 'Kıyı/Tekne';
}

export interface FishRegionData {
  regionName: string;
  fishSpecies: Array<{
    id: string;
    name: string;
    image: string;
  }>;
}

export interface MapFilterState {
  showFishingAreas: boolean;
  showFishRegions: boolean;
  selectedRegion: string | null;
  selectedDifficulty: 'Kolay' | 'Orta' | 'Zor' | null;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MarkerIconConfig {
  iconUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
  popupAnchor: [number, number];
  className?: string;
}
