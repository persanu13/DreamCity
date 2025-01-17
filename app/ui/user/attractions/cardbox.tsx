import Image from 'next/image';
import Link from 'next/link';
import { Attraction } from '@/app/db/definitions';

export function CardBox({ attraction }: { attraction: Attraction }) {
  return (
    <article className="bg-white shadow-md rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={attraction.imgurl || "/placeholder.svg"}
          alt={attraction.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-medium mb-2 line-clamp-2">{attraction.name}</h2>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {attraction.description}
        </p>
        <Link 
          href={`/user/attractions/${attraction.id}`} 
          className="text-sm text-blue-600 hover:underline"
        >
          Citește mai mult
        </Link>
      </div>
    </article>
  );
}
