import { AlertCircle } from "lucide-react";

// Av sezonları verileri
const seasonData = [
  {
    fish: "Levrek",
    bestMonths: "Kasım - Mart",
    fishingType: "Kıyı/Tekne",
    closedSeason: "Yok",
    notes: "Kış aylarında kıyıya yaklaşır, en verimli dönem",
  },
  {
    fish: "Çipura",
    bestMonths: "Ekim - Şubat",
    fishingType: "Kıyı/Tekne",
    closedSeason: "Yok",
    notes: "Sonbahar ve kış aylarında aktif",
  },
  {
    fish: "Sazan",
    bestMonths: "Mayıs - Eylül",
    fishingType: "Tatlı Su",
    closedSeason: "15 Mart - 15 Haziran",
    notes: "Üreme dönemi yasak, yaz aylarında en aktif",
    hasClosedSeason: true,
  },
  {
    fish: "Alabalık",
    bestMonths: "Mart - Mayıs, Eylül - Ekim",
    fishingType: "Dere/Göl",
    closedSeason: "Bölgeye göre değişir",
    notes: "İlkbahar ve sonbahar en verimli dönemler",
    hasClosedSeason: true,
  },
  {
    fish: "Mezgit",
    bestMonths: "Kasım - Şubat",
    fishingType: "Kıyı/İskele",
    closedSeason: "Yok",
    notes: "Kış aylarında sürüler halinde kıyıya yaklaşır",
  },
  {
    fish: "Kefal",
    bestMonths: "Eylül - Kasım",
    fishingType: "Kıyı/Surf",
    closedSeason: "Yok",
    notes: "Sonbahar göçü sırasında bol",
  },
  {
    fish: "Barbun",
    bestMonths: "Mayıs - Ağustos",
    fishingType: "Tekne/Kıyı",
    closedSeason: "15 Nisan - 1 Eylül (Ticari)",
    notes: "Yaz aylarında kumlu tabanlar",
    hasClosedSeason: true,
  },
  {
    fish: "Turna",
    bestMonths: "Mart - Mayıs",
    fishingType: "Kıyı/Surf",
    closedSeason: "Yok",
    notes: "İlkbahar göçü sırasında sürüler halinde",
  },
  {
    fish: "Palamut",
    bestMonths: "Eylül - Kasım",
    fishingType: "Tekne/Kıyı/Trolling",
    closedSeason: "Yok",
    notes: "Sonbahar göçü, Ekim ayı zirvesi",
  },
  {
    fish: "İstavrit",
    bestMonths: "Haziran - Eylül",
    fishingType: "Kıyı/Tekne",
    closedSeason: "Yok",
    notes: "Yaz aylarında sürüler halinde",
  },
  {
    fish: "Uskumru",
    bestMonths: "Ekim - Aralık",
    fishingType: "Kıyı/Tekne",
    closedSeason: "15 Nisan - 1 Eylül",
    notes: "Sonbahar göçü, büyük sürüler",
    hasClosedSeason: true,
  },
  {
    fish: "Lüfer",
    bestMonths: "Eylül - Kasım",
    fishingType: "Kıyı/Tekne",
    closedSeason: "Yok",
    notes: "Sonbahar aylarında kıyıya yaklaşır",
  },
];

// Ay bazlı görünüm için veri
const monthlyView = [
  { month: "Ocak", fish: ["Levrek", "Çipura", "Mezgit"] },
  { month: "Şubat", fish: ["Levrek", "Çipura", "Mezgit"] },
  { month: "Mart", fish: ["Levrek", "Alabalık", "Turna"] },
  { month: "Nisan", fish: ["Alabalık", "Turna"] },
  { month: "Mayıs", fish: ["Turna", "Sazan", "Barbun", "Alabalık"] },
  { month: "Haziran", fish: ["Sazan", "Barbun", "İstavrit"] },
  { month: "Temmuz", fish: ["Sazan", "Barbun", "İstavrit"] },
  { month: "Ağustos", fish: ["Sazan", "Barbun", "İstavrit"] },
  { month: "Eylül", fish: ["Sazan", "Kefal", "Palamut", "Lüfer", "İstavrit", "Alabalık", "Uskumru"] },
  { month: "Ekim", fish: ["Çipura", "Kefal", "Palamut", "Lüfer", "Uskumru", "Alabalık"] },
  { month: "Kasım", fish: ["Levrek", "Çipura", "Mezgit", "Kefal", "Palamut", "Lüfer", "Uskumru"] },
  { month: "Aralık", fish: ["Levrek", "Çipura", "Mezgit", "Uskumru"] },
];

export default function AvSezonlariPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Av Sezonları
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hangi balığı hangi ayda avlayacağınızı öğrenin. Yasak dönemleri ve en verimli avlanma zamanlarını keşfedin.
          </p>
        </div>

        {/* Warning Box */}
        <div className="mb-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-400 mb-1">
                Önemli Uyarı
              </h3>
              <p className="text-sm text-yellow-800 dark:text-yellow-500">
                Yasak dönemlere mutlaka uyunuz. Av yasakları bölgelere göre değişiklik gösterebilir.
                Yerel yönetmelikleri kontrol etmeyi unutmayın.
              </p>
            </div>
          </div>
        </div>

        {/* Balık Bazlı Tablo */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Balık Türlerine Göre Sezonlar
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Balık Türü
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      En İyi Aylar
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Av Tipi
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Yasak Dönemi
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Notlar
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {seasonData.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {item.fish}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {item.bestMonths}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {item.fishingType}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {item.hasClosedSeason ? (
                          <span className="text-red-600 dark:text-red-400 font-semibold">
                            {item.closedSeason}
                          </span>
                        ) : (
                          <span className="text-green-600 dark:text-green-400">
                            {item.closedSeason}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                        {item.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Ay Bazlı Görünüm */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Aylara Göre Avlanabilir Balıklar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {monthlyView.map((item) => (
              <div
                key={item.month}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {item.month}
                </h3>
                <ul className="space-y-2">
                  {item.fish.map((fishName, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {fishName}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
