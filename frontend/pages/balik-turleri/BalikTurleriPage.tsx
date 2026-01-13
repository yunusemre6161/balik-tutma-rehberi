import FishCard from "@/frontend/components/fish/FishCard";
import { fishData } from "@/shared/data/fishData";

export default function BalikTurleriPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Balık Türleri
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Türkiye sularında yaşayan popüler balık türlerini keşfedin. Her balığın özelliklerini, yaşam alanlarını ve av yöntemlerini öğrenin.
          </p>
        </div>

        {/* Fish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fishData.map((fish) => (
            <FishCard key={fish.id} fish={fish} />
          ))}
        </div>

      </div>
    </div>
  );
}
