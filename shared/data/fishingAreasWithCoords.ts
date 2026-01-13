export interface FishingAreaWithCoords {
  id: string;
  name: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  description: string;
  fishTypes: string[];
  difficulty: "Kolay" | "Orta" | "Zor";
  bestTimes: string[];
  accessType: "Kıyı" | "Tekne" | "Kıyı/Tekne";
}

export const fishingAreasWithCoords: FishingAreaWithCoords[] = [
  {
    id: "1",
    name: "Sarıyer Kıyıları",
    city: "İstanbul",
    region: "Marmara",
    lat: 41.1639,
    lng: 29.0537,
    description: "Boğaz'ın kuzey çıkışında yer alan Sarıyer, levrek ve lüfer avı için idealdir.",
    fishTypes: ["Levrek", "Lüfer", "Palamut", "İstavrit"],
    difficulty: "Orta",
    bestTimes: ["Sabah Erken", "Akşam Üstü"],
    accessType: "Kıyı/Tekne",
  },
  {
    id: "2",
    name: "Foça Balıkçı Barınağı",
    city: "İzmir",
    region: "Ege",
    lat: 38.6708,
    lng: 26.7577,
    description: "Ege'nin en popüler balıkçı noktalarından biri. Çipura ve levrek bolluğu.",
    fishTypes: ["Çipura", "Levrek", "Barbun", "Kefal"],
    difficulty: "Kolay",
    bestTimes: ["Gündüz", "Akşam"],
    accessType: "Kıyı",
  },
  {
    id: "3",
    name: "Konyaaltı Sahili",
    city: "Antalya",
    region: "Akdeniz",
    lat: 36.8597,
    lng: 30.6256,
    description: "Uzun sahil şeridi boyunca çeşitli balık türleri. Turistik bölge olmasına rağmen verimli.",
    fishTypes: ["Barbun", "Çipura", "Kefal", "Tekir"],
    difficulty: "Kolay",
    bestTimes: ["Sabah", "Akşam"],
    accessType: "Kıyı",
  },
  {
    id: "4",
    name: "Faroz Limanı",
    city: "Trabzon",
    region: "Karadeniz",
    lat: 41.0026,
    lng: 39.7190,
    description: "Karadeniz'in önemli balıkçı limanlarından. Hamsi sezonunda çok hareketli.",
    fishTypes: ["Hamsi", "İstavrit", "Mezgit", "Levrek"],
    difficulty: "Orta",
    bestTimes: ["Sabah Erken", "Gece"],
    accessType: "Kıyı/Tekne",
  },
  {
    id: "5",
    name: "Çanakkale Boğazı",
    city: "Çanakkale",
    region: "Marmara",
    lat: 40.1553,
    lng: 26.4142,
    description: "Akdeniz ve Karadeniz arası göç yolu üzerinde. Çok zengin balık çeşitliliği.",
    fishTypes: ["Palamut", "Lüfer", "Uskumru", "Çipura", "Levrek"],
    difficulty: "Zor",
    bestTimes: ["Sabah", "Akşam"],
    accessType: "Tekne",
  },
  {
    id: "6",
    name: "Uluabat Gölü",
    city: "Bursa",
    region: "Marmara - Tatlı Su",
    lat: 40.1844,
    lng: 28.5875,
    description: "Tatlı su balıkları için ideal. Sazan avında ünlü göl.",
    fishTypes: ["Sazan", "Turna", "Sudak"],
    difficulty: "Orta",
    bestTimes: ["Sabah Erken", "Akşam Üstü"],
    accessType: "Kıyı/Tekne",
  },
  {
    id: "7",
    name: "Tekkeköy Kıyıları",
    city: "Samsun",
    region: "Karadeniz",
    lat: 41.2122,
    lng: 36.4533,
    description: "Karadeniz'in sakin kıyı şeridi. Kıyıdan kolay erişim.",
    fishTypes: ["Mezgit", "İstavrit", "Kefal"],
    difficulty: "Kolay",
    bestTimes: ["Sabah", "Öğleden Sonra"],
    accessType: "Kıyı",
  },
];

// Helper function to get fishing area by ID
export function getFishingAreaById(id: string): FishingAreaWithCoords | undefined {
  return fishingAreasWithCoords.find(area => area.id === id);
}

// Helper function to filter by region
export function getFishingAreasByRegion(region: string): FishingAreaWithCoords[] {
  return fishingAreasWithCoords.filter(area => area.region.includes(region));
}

// Helper function to filter by difficulty
export function getFishingAreasByDifficulty(difficulty: "Kolay" | "Orta" | "Zor"): FishingAreaWithCoords[] {
  return fishingAreasWithCoords.filter(area => area.difficulty === difficulty);
}

// Helper function to filter by fish type
export function getFishingAreasByFishType(fishType: string): FishingAreaWithCoords[] {
  return fishingAreasWithCoords.filter(area =>
    area.fishTypes.some(type => type.toLowerCase() === fishType.toLowerCase())
  );
}
