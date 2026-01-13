import { Wrench, Target, Ruler, Fish as FishIcon } from "lucide-react";

// Ekipman kategorileri
const equipmentCategories = [
  {
    id: "1",
    category: "Oltalar",
    icon: Wrench,
    items: [
      {
        name: "Spinning Olta",
        description: "Kıyıdan ve tekneden kullanım için ideal. Başlangıç seviyesi için önerilir.",
        specs: "2.10m - 2.70m uzunluk, hafif-orta ağırlık",
        recommendedFor: ["Levrek", "Çipura", "Lüfer"],
        beginnerFriendly: true,
      },
      {
        name: "Surf Olta",
        description: "Uzun mesafe atışlar için tasarlanmış. Kumsaldan avlanmada kullanılır.",
        specs: "3.60m - 4.20m uzunluk, orta-ağır sınıf",
        recommendedFor: ["Levrek", "Kefal", "Turna"],
        beginnerFriendly: false,
      },
      {
        name: "Jigging Olta",
        description: "Tekne balıkçılığında dikey jigging için. Profesyonel kullanım.",
        specs: "1.80m - 2.10m uzunluk, ağır sınıf",
        recommendedFor: ["Palamut", "Levrek", "Lüfer"],
        beginnerFriendly: false,
      },
    ],
  },
  {
    id: "2",
    category: "İğneler & Makara",
    icon: Target,
    items: [
      {
        name: "Spin Makara (2000-3000)",
        description: "Hafif balıkçılık için ideal boyut. Başlangıç için en uygun.",
        specs: "2000-3000 ebat, 5-6 rulman",
        recommendedFor: ["Levrek", "Mezgit", "İstavrit"],
        beginnerFriendly: true,
      },
      {
        name: "Surf Makara (6000-8000)",
        description: "Uzun atış ve büyük balıklar için. Güçlü frenleme sistemi.",
        specs: "6000-8000 ebat, 200m 0.35mm misina kapasitesi",
        recommendedFor: ["Levrek", "Palamut"],
        beginnerFriendly: false,
      },
      {
        name: "İğne Numaraları",
        description: "Farklı balıklar için farklı iğne boyutları gerekir.",
        specs: "No: 4-6 (Küçük), No: 1-2 (Orta), No: 1/0-3/0 (Büyük)",
        recommendedFor: ["Tüm Balık Türleri"],
        beginnerFriendly: true,
      },
    ],
  },
  {
    id: "3",
    category: "Misina",
    icon: Ruler,
    items: [
      {
        name: "Monofilament Misina",
        description: "Başlangıç için ideal. Esnek ve uygun fiyatlı.",
        specs: "0.20mm - 0.35mm kalınlık",
        recommendedFor: ["Kıyıdan avlanma"],
        beginnerFriendly: true,
      },
      {
        name: "Örgü Misina (PE)",
        description: "Sıfır esneklik, maksimum hassasiyet. Profesyonel kullanım.",
        specs: "PE 0.8 - PE 2.5",
        recommendedFor: ["Jigging", "Spin"],
        beginnerFriendly: false,
      },
      {
        name: "Fluorocarbon Şok Lideri",
        description: "Ana misinaya bağlanır, balığın fark etmesi zordur.",
        specs: "0.30mm - 0.50mm, 1-2 metre uzunluk",
        recommendedFor: ["Levrek", "Çipura"],
        beginnerFriendly: false,
      },
    ],
  },
  {
    id: "4",
    category: "Yemler",
    icon: FishIcon,
    items: [
      {
        name: "Canlı Yemler",
        description: "En etkili yem tipi. İstavrit, sardalya, karides vb.",
        specs: "Taze ve hareketli olmalı",
        recommendedFor: ["Levrek", "Palamut", "Lüfer"],
        beginnerFriendly: true,
      },
      {
        name: "Silikon Yemler",
        description: "Suni yem, tekrar kullanılabilir. Çeşitli renk ve boyutlarda.",
        specs: "5cm - 15cm uzunluk, farklı renkler",
        recommendedFor: ["Levrek", "Lüfer"],
        beginnerFriendly: true,
      },
      {
        name: "Hamur Yemi",
        description: "Tatlı su balıkları için. Kendi yapımınız olabilir.",
        specs: "Mısır, un, aromalı hamurlar",
        recommendedFor: ["Sazan", "Kefal"],
        beginnerFriendly: true,
      },
    ],
  },
];

export default function EkipmanlarPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Ekipman Tavsiyeleri
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Balık tutmak için gerekli ekipmanları keşfedin. Başlangıç seviyesinden profesyonele kadar tüm ihtiyaçlarınız için öneriler.
          </p>
        </div>

        {/* Başlangıç Seti Öneri Box */}
        <div className="mb-12 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            🎣 Başlangıç Seti Önerisi
          </h2>
          <p className="mb-4 text-blue-100">
            Balıkçılığa yeni başlayanlar için ideal başlangıç ekipmanları:
          </p>
          <ul className="space-y-2 text-blue-50">
            <li className="flex items-start gap-2">
              <span className="text-blue-300">•</span>
              <span>2.40m Spinning Olta (hafif-orta sınıf)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-300">•</span>
              <span>2500-3000 ebat Spin Makara</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-300">•</span>
              <span>0.25mm Monofilament Misina (150-200m)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-300">•</span>
              <span>Çeşitli iğneler (No: 2, 4, 6)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-300">•</span>
              <span>Silikon yem seti veya canlı yem</span>
            </li>
          </ul>
          <p className="mt-4 text-sm text-blue-200">
            💰 Toplam bütçe: 1.500 - 3.000 TL arası
          </p>
        </div>

        {/* Equipment Categories */}
        <div className="space-y-12">
          {equipmentCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                    <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        {item.beginnerFriendly && (
                          <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-xs rounded-full">
                            Başlangıç
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {item.description}
                      </p>

                      <div className="space-y-2 text-sm">
                        <div className="bg-gray-50 dark:bg-gray-700 p-2 rounded">
                          <p className="text-gray-700 dark:text-gray-300">
                            <span className="font-semibold">Özellikler:</span> {item.specs}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white mb-1">
                            Uygun Balıklar:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {item.recommendedFor.map((fish, fishIdx) => (
                              <span
                                key={fishIdx}
                                className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded"
                              >
                                {fish}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
