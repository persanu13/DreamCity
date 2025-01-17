'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCountEvents } from '@/app/db/actions/events';
import { getCountAttractions } from '@/app/db/actions/attractions';
import { getCountNews } from '@/app/db/actions/news';
import { CardBoxEvent } from '@/app/ui/user/events/cardbox';
import { CardBox as AttractionCardBox } from '@/app/ui/user/attractions/cardbox';
import { CardBox as NewsCardBox } from '@/app/ui/user/news/cardbox';
import { MyEvent, Attraction, News } from '@/app/db/definitions';

export default function HomePage() {
  const [events, setEvents] = useState<MyEvent[]>([]);
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const eventsData = await getCountEvents('', 2);
      const attractionsData = await getCountAttractions('', 2);
      const newsData = await getCountNews('', 2);
      
      setEvents(eventsData);
      setAttractions(attractionsData);
      setNews(newsData);
      setLoading(false);
    }

    fetchData();
  }, []);

  const SectionTitle = ({ title, link }: { title: string; link: string }) => (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Link href={link} className="text-blue-600 hover:text-blue-800">
        Mai mult
      </Link>
    </div>
  );

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Bun venit în Brașov!</h1>

      {loading ? (
        <p>Loading content...</p>
      ) : (
        <>
          <section className="mb-12">
            <SectionTitle title="Știri" link="/user/news" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.map((item) => (
                <NewsCardBox key={item.id} news={item} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <SectionTitle title="Evenimente" link="/user/events" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <CardBoxEvent key={event.id} event={event} />
              ))}
            </div>
          </section>

          <section className="mb-12">
            <SectionTitle title="Atracții" link="/user/attractions" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attractions.map((attraction) => (
                <AttractionCardBox key={attraction.id} attraction={attraction} />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

