'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, MapPin, Calendar, Activity, Fish, Info } from 'lucide-react';
import { fishData } from '@/shared/data/fishData';

interface FishDetail {
  id: string;
  name: string;
  scientificName?: string;
  description: string;
  image: string;
  bestMonths: string[];
  regions: string[];
  fishingType: string[];
  habitat: string;
  baitTypes: string[];
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  minSize?: number;
  maxSize?: number;
  closedSeason?: {
    start: string;
    end: string;
  };
}

export default function BalikDetayPage() {
  const params = useParams();
  const id = params?.id as string;

  const fish = useMemo(() => {
    return fishData.find(f => f.id === id) || null;
  }, [id]);

  const difficultyColors = {
    Kolay: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    Orta: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    Zor: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  if (!fish) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">Balık bulunamadı</p>
          <Link
            href="/balik-turleri"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Balık türleri sayfasına dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Link
          href="/balik-turleri"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Balık Türlerine Dön
        </Link>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">

          {/* Hero Image */}
          <div className="relative h-96 bg-gray-200 dark:bg-gray-700">
            <Image
              src={fish.image}
              alt={fish.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 right-4">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${difficultyColors[fish.difficulty]}`}>
                {fish.difficulty}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">

            {/* Title */}
            <div className="mb-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {fish.name}
              </h1>
              {fish.scientificName && (
                <p className="text-xl italic text-gray-500 dark:text-gray-400">
                  {fish.scientificName}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Genel Bilgiler
                </h2>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {fish.description}
              </p>
            </div>

            {/* Closed Season Warning */}
            {fish.closedSeason && (
              <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r">
                <p className="text-lg font-semibold text-red-800 dark:text-red-400 mb-1">
                  ⚠️ Yasak Avlanma Dönemi
                </p>
                <p className="text-red-700 dark:text-red-400">
                  {fish.closedSeason.start} - {fish.closedSeason.end}
                </p>
              </div>
            )}

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">

              {/* Best Months */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    En İyi Avlanma Ayları
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {fish.bestMonths.map((month, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                    >
                      {month}
                    </span>
                  ))}
                </div>
              </div>

              {/* Regions */}
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Bulunduğu Bölgeler
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {fish.regions.map((region, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-sm font-medium"
                    >
                      {region}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fishing Type */}
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Avlanma Yöntemleri
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {fish.fishingType.map((type, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Habitat */}
              <div className="bg-teal-50 dark:bg-teal-900/20 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Fish className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Yaşam Alanı
                  </h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {fish.habitat}
                </p>
              </div>
            </div>

            {/* Bait Types */}
            <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Önerilen Yemler
              </h3>
              <div className="flex flex-wrap gap-3">
                {fish.baitTypes.map((bait, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-200 rounded-lg text-sm font-medium"
                  >
                    {bait}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Info */}
            {(fish.minSize || fish.maxSize) && (
              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Boy Bilgisi
                </h3>
                <div className="flex gap-6">
                  {fish.minSize && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Minimum Boy</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {fish.minSize} cm
                      </p>
                    </div>
                  )}
                  {fish.maxSize && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Maksimum Boy</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {fish.maxSize} cm
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
