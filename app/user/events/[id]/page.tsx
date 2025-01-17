'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getEventById } from '@/app/db/actions/events';
import Image from 'next/image';
import Link from 'next/link';
import { MyEvent } from '@/app/db/definitions';
import {LoadingSpinner} from '@/app/ui/components/loadingspinner';

export default function EventArticlePage() {
  const { id } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState<MyEvent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; // Prevent fetching with undefined ID

    async function fetchEvent() {
      setLoading(true);
      const data = await getEventById(id as string);
      if (!data) {
        router.replace('/404'); // Redirect if not found
      } else {
        setEvent(data);
      }
      setLoading(false);
    }

    fetchEvent();
  }, [id, router]);

  if (loading) return <LoadingSpinner/>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{event?.name}</h1>
          <time dateTime={event?.date} className="text-gray-600 text-sm">{event?.date}</time>
        </header>

        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={event?.imgurl || "/placeholder.svg"}
            alt={"event?.name"}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {event?.content}
          </p>
        </div>

        <Link 
          href="/user/events" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Înapoi la Evenimente
        </Link>
      </article>
    </div>
  );
}
