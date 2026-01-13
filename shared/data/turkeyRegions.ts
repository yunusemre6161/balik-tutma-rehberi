export interface RegionCity {
  name: string;
  lat: number;
  lng: number;
}

export interface TurkeyRegion {
  name: string;
  center: { lat: number; lng: number };
  zoom: number;
  cities: RegionCity[];
}

export const turkeyRegions: Record<string, TurkeyRegion> = {
  Marmara: {
    name: "Marmara",
    center: { lat: 40.7, lng: 28.5 },
    zoom: 8,
    cities: [
      { name: 'İstanbul', lat: 41.0082, lng: 28.9784 },
      { name: 'Bursa', lat: 40.1826, lng: 29.0665 },
      { name: 'Çanakkale', lat: 40.1553, lng: 26.4142 },
      { name: 'Balıkesir', lat: 39.6484, lng: 27.8826 },
    ]
  },
  Ege: {
    name: "Ege",
    center: { lat: 38.5, lng: 27.0 },
    zoom: 8,
    cities: [
      { name: 'İzmir', lat: 38.4237, lng: 27.1428 },
      { name: 'Muğla', lat: 37.2153, lng: 28.3636 },
      { name: 'Aydın', lat: 37.8444, lng: 27.8458 },
    ]
  },
  Akdeniz: {
    name: "Akdeniz",
    center: { lat: 36.8, lng: 32.0 },
    zoom: 8,
    cities: [
      { name: 'Antalya', lat: 36.8969, lng: 30.7133 },
      { name: 'Mersin', lat: 36.8121, lng: 34.6415 },
      { name: 'Adana', lat: 37.0000, lng: 35.3213 },
    ]
  },
  Karadeniz: {
    name: "Karadeniz",
    center: { lat: 41.0, lng: 37.0 },
    zoom: 8,
    cities: [
      { name: 'Trabzon', lat: 41.0027, lng: 39.7168 },
      { name: 'Samsun', lat: 41.2867, lng: 36.33 },
      { name: 'Rize', lat: 41.0201, lng: 40.5234 },
      { name: 'Ordu', lat: 40.9839, lng: 37.8764 },
    ]
  },
  "Tatlı Su": {
    name: "Tatlı Su",
    center: { lat: 39.5, lng: 33.0 },
    zoom: 7,
    cities: [
      { name: 'Ankara (Eymir Gölü)', lat: 39.8439, lng: 32.8597 },
      { name: 'Konya (Beyşehir Gölü)', lat: 37.6700, lng: 31.5597 },
      { name: 'Isparta (Eğirdir Gölü)', lat: 38.0492, lng: 30.8563 },
    ]
  }
};

// Helper function to get all cities
export function getAllCities(): RegionCity[] {
  return Object.values(turkeyRegions).flatMap(region => region.cities);
}

// Helper function to get cities by region name
export function getCitiesByRegion(regionName: string): RegionCity[] {
  return turkeyRegions[regionName]?.cities || [];
}

// Helper function to get region by name
export function getRegion(regionName: string): TurkeyRegion | undefined {
  return turkeyRegions[regionName];
}
