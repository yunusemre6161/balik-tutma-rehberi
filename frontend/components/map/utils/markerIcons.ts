import L from 'leaflet';
import { MarkerIconConfig } from '@/shared/types/map.types';

// Fishing area marker icon (purple)
export const fishingAreaIconConfig: MarkerIconConfig = {
  iconUrl: '/markers/fishing-area.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
  className: 'fishing-area-marker'
};

// Fish region marker icon (blue)
export const fishRegionIconConfig: MarkerIconConfig = {
  iconUrl: '/markers/fish-region.svg',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -14],
  className: 'fish-region-marker'
};

// Create Leaflet icon instances
export const fishingAreaIcon = new L.Icon(fishingAreaIconConfig);
export const fishRegionIcon = new L.Icon(fishRegionIconConfig);

// Cluster icon creator
export function createClusterIcon(cluster: any) {
  const count = cluster.getChildCount();

  return L.divIcon({
    html: `<div class="cluster-icon">${count}</div>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(40, 40)
  });
}
