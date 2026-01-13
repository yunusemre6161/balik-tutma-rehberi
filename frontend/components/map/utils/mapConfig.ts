import { MapPosition } from '@/shared/types/map.types';

// Turkey center coordinates
export const TURKEY_CENTER: MapPosition = {
  lat: 39.0,
  lng: 35.0
};

// Default zoom levels
export const DEFAULT_ZOOM = 6;
export const MIN_ZOOM = 5;
export const MAX_ZOOM = 18;
export const REGION_ZOOM = 8;
export const CITY_ZOOM = 12;

// Map configuration
export const MAP_CONFIG = {
  center: TURKEY_CENTER,
  zoom: DEFAULT_ZOOM,
  minZoom: MIN_ZOOM,
  maxZoom: MAX_ZOOM,
  scrollWheelZoom: true,
  zoomControl: true,
  attributionControl: true,
};

// Turkey bounds (approximate)
export const TURKEY_BOUNDS = {
  north: 42.0,
  south: 36.0,
  east: 45.0,
  west: 26.0
};

// Marker clustering configuration
export const CLUSTER_CONFIG = {
  maxClusterRadius: 50,
  spiderfyOnMaxZoom: true,
  showCoverageOnHover: false,
  zoomToBoundsOnClick: true,
  chunkedLoading: true,
};
