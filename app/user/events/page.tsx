'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getFilteredEvents } from '@/app/db/actions/events';
import Search from '@/app/ui/components/search';
import { CardBoxEvent } from '@/app/ui/user/events/cardbox';
import { MyEvent } from '@/app/db/definitions';
import { getEventsPages } from '@/app/db/actions/events';
import Pagination from "@/app/ui/components/pagination";

export default function EventsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const [events, setEvents] = useState<MyEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<number>(1); // Add state for totalPage

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      const data = await getFilteredEvents(query, currentPage);
      const total = await getEventsPages(query); // Await the total pages
      setTotalPages(total); // Set the totalPages value after fetching
      setEvents(data);
      setLoading(false);
    }

    fetchEvents();
  }, [query, currentPage]);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Evenimente</h1>
      <div className="mb-6">
        <Search placeholder="Search events..." />
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {events.map((item) => (
            <CardBoxEvent key={item.id} event={item} />
          ))}
        </div>
      )}
       <div className="mt-5 flex w-full justify-center">
              <Pagination totalPages={totalPages} />
            </div>
    </div>
  );
}
