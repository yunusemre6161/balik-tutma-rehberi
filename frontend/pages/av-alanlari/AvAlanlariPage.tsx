import { MapPin, Fish as FishIcon, Activity } from "lucide-react";

// Av alanları verileri
const fishingAreas = [
  {
    id: "1",
    name: "Sarıyer Kıyıları",
    city: "İstanbul",
    region: "Marmara",
    description: "Boğaz'ın kuzey çıkışında yer alan Sarıyer, levrek ve lüfer avı için idealdir.",
    fishTypes: ["Levrek", "Lüfer", "Palamut", "İstavrit"],
    difficulty: "Orta" as const,
    bestTimes: ["Sabah Erken", "Akşam Üstü"],
    accessType: "Kıyı/Tekne" as const,
  },
  {
    id: "2",
    name: "Foça Balıkçı Barınağı",
    city: "İzmir",
    region: "Ege",
    description: "Ege'nin en popüler balıkçı noktalarından biri. Çipura ve levrek bolluğu.",
    fishTypes: ["Çipura", "Levrek", "Barbun", "Kefal"],
    difficulty: "Kolay" as const,
    bestTimes: ["Gündüz", "Akşam"],
    accessType: "Kıyı" as const,
  },
  {
    id: "3",
    name: "Konyaaltı Sahili",
    city: "Antalya",
    region: "Akdeniz",
    description: "Uzun sahil şeridi boyunca çeşitli balık türleri. Turistik bölge olmasına rağmen verimli.",
    fishTypes: ["Barbun", "Çipura", "Kefal", "Tekir"],
    difficulty: "Kolay" as const,
    bestTimes: ["Sabah", "Akşam"],
    accessType: "Kıyı" as const,
  },
  {
    id: "4",
    name: "Faroz Limanı",
    city: "Trabzon",
    region: "Karadeniz",
    description: "Karadeniz'in önemli balıkçı limanlarından. Hamsi sezonunda çok hareketli.",
    fishTypes: ["Hamsi", "İstavrit", "Mezgit", "Levrek"],
    difficulty: "Orta" as const,
    bestTimes: ["Sabah Erken", "Gece"],
    accessType: "Kıyı/Tekne" as const,
  },
  {
    id: "5",
    name: "Çanakkale Boğazı",
    city: "Çanakkale",
    region: "Marmara",
    description: "Akdeniz ve Karadeniz arası göç yolu üzerinde. Çok zengin balık çeşitliliği.",
    fishTypes: ["Palamut", "Lüfer", "Uskumru", "Çipura", "Levrek"],
    difficulty: "Zor" as const,
    bestTimes: ["Sabah", "Akşam"],
    accessType: "Tekne" as const,
  },
  {
    id: "6",
    name: "Uluabat Gölü",
    city: "Bursa",
    region: "Marmara - Tatlı Su",
    description: "Tatlı su balıkları için ideal. Sazan avında ünlü göl.",
    fishTypes: ["Sazan", "Turna", "Sudak"],
    difficulty: "Orta" as const,
    bestTimes: ["Sabah Erken", "Akşam Üstü"],
    accessType: "Kıyı/Tekne" as const,
  },
  {
    id: "7",
    name: "Tekkeköy Kıyıları",
    city: "Samsun",
    region: "Karadeniz",
    description: "Karadeniz'in sakin kıyı şeridi. Kıyıdan kolay erişim.",
    fishTypes: ["Mezgit", "İstavrit", "Kefal"],
    difficulty: "Kolay" as const,
    bestTimes: ["Sabah", "Öğleden Sonra"],
    accessType: "Kıyı" as const,
  },
];

export default function AvAlanlariPage() {
  const difficultyColors = {
    Kolay: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    Orta: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    Zor: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Popüler Av Alanları
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Türkiye'nin en iyi balık tutma noktalarını keşfedin. Her bölgenin özelliklerini ve hangi balıkların bulunduğunu öğrenin.
          </p>
        </div>

        {/* Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fishingAreas.map((area) => (
            <div
              key={area.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow"
            >

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {area.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{area.city} - {area.region}</span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[area.difficulty]}`}>
                  {area.difficulty}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {area.description}
              </p>

              {/* Fish Types */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <FishIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Balık Türleri
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {area.fishTypes.map((fish, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded-full"
                    >
                      {fish}
                    </span>
                  ))}
                </div>
              </div>

              {/* Access Type & Best Times */}
              <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-900 dark:text-white">Erişim:</span> {area.accessType}
                  </span>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-gray-900 dark:text-white">İdeal Saatler:</span> {area.bestTimes.join(", ")}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
