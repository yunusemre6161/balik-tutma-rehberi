import Image from "next/image";
import Link from "next/link";

interface FishCardProps {
  fish: {
    id: string;
    name: string;
    image: string;
  };
}

export default function FishCard({ fish }: FishCardProps) {
  return (
    <Link href={`/balik-turleri/${fish.id}`}>
      <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer hover:scale-105 transform duration-300">

        {/* Image */}
        <div className="relative h-80 bg-gray-200 dark:bg-gray-700">
          <Image
            src={fish.image}
            alt={fish.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* Fish Name */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            {fish.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}
