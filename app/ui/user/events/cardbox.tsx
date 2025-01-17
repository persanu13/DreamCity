import Image from 'next/image';
import Link from 'next/link';
import { MyEvent } from '@/app/db/definitions';

export function CardBoxEvent({ event }: { event: MyEvent }) {
  return (
    <article className="bg-white shadow-md rounded-lg overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={event.imgurl || "/placeholder.svg"}
          alt={event.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-medium mb-2 line-clamp-2">{event.name}</h2>
        <span className="text-sm text-gray-600 block mb-2">{event.date}</span>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>
        <Link 
          href={`/user/events/${event.id}`} 
          className="text-sm text-blue-600 hover:underline"
        >
          Citește mai mult
        </Link>
      </div>
    </article>
  );
}
