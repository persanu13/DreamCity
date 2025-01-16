import Image from 'next/image';
import Link from 'next/link';
import { News } from '@/app/db/definitions';

export function CardBox({ news }: { news: News }) {
  return (
    <article className="bg-white shadow-md rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={news.imgurl || "/placeholder.svg"}
          alt={news.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-medium mb-2 line-clamp-2">{news.name}</h2>
        <span className="text-sm text-gray-600 block mb-2">{news.date}</span>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {news.description}
        </p>
        <Link 
          href={`/user/news/${news.id}`} 
          className="text-sm text-blue-600 hover:underline"
        >
          Read more
        </Link>
      </div>
    </article>
  );
}
