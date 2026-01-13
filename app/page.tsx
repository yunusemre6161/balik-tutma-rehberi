import Link from "next/link";
import { Fish, Calendar, MapPin } from "lucide-react";
import TurkeyMap from "@/frontend/components/map/TurkeyMap";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070')",
          }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Türkiye Balık Tutma Rehberi
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
            Türkiye'nin en kapsamlı balıkçılık rehberi. Balık türlerini keşfedin, av sezonlarını öğrenin ve en iyi av alanlarını bulun.
          </p>
          <Link
            href="/balik-turleri"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
          >
            Hemen Keşfet
          </Link>
        </div>

        {/* Wave Decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="white"
              className="dark:fill-gray-800"
            />
          </svg>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Balık Türleri Card */}
          <Link
            href="/balik-turleri"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-6 group-hover:scale-110 transition-transform">
              <Fish className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Balık Türleri
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Türkiye sularında yaşayan balık türlerini keşfedin. Her balığın özelliklerini, yaşam alanlarını ve av yöntemlerini öğrenin.
            </p>
            <span className="text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">
              Balıkları İncele →
            </span>
          </Link>

          {/* Av Sezonları Card */}
          <Link
            href="/av-sezonlari"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mb-6 group-hover:scale-110 transition-transform">
              <Calendar className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Av Sezonları
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Hangi balığı hangi ayda avlayacağınızı öğrenin. Yasak dönemleri ve en verimli avlanma zamanlarını keşfedin.
            </p>
            <span className="text-green-600 dark:text-green-400 font-semibold group-hover:underline">
              Sezonları Görüntüle →
            </span>
          </Link>

          {/* Av Alanları Card */}
          <Link
            href="/av-alanlari"
            className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-8 border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full mb-6 group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Popüler Av Alanları
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Türkiye'nin en iyi balık tutma noktalarını harita üzerinde görün. Bölgesel öneriler ve konum bilgileri.
            </p>
            <span className="text-purple-600 dark:text-purple-400 font-semibold group-hover:underline">
              Alanları Keşfet →
            </span>
          </Link>

        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Türkiye Balık Haritası
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Balık türlerinin bulunduğu bölgeleri ve popüler av alanlarını keşfedin.
            Haritada gezinin ve size en yakın balıkçı noktalarını bulun.
          </p>
        </div>

        <TurkeyMap />

        <div className="mt-8 text-center">
          <Link
            href="/av-alanlari"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
          >
            Tüm Av Alanlarını Gör →
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 dark:bg-blue-800 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">9+</div>
              <div className="text-blue-100">Balık Türü</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">7+</div>
              <div className="text-blue-100">Av Bölgesi</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-blue-100">Ay Sezon Bilgisi</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Ücretsiz</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
