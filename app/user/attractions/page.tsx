'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getFilteredAttractions } from '@/app/db/actions/attractions';
import Search from '@/app/ui/components/search';
import { CardBox } from '@/app/ui/user/attractions/cardbox';
import { Attraction } from '@/app/db/definitions';
import Pagination from "@/app/ui/components/pagination";
import { getAttractionsPages } from '@/app/db/actions/attractions';

export default function AttractionsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<number>(1); // Add state for totalPage

  useEffect(() => {
    async function fetchAttractions() {
      setLoading(true);
      const data = await getFilteredAttractions(query, currentPage);
      const total = await getAttractionsPages(query); // Await the total pages
      setTotalPages(total); // Set the totalPages value after fetching
      setAttractions(data);
      setLoading(false);
    }

    fetchAttractions();
  }, [query, currentPage]);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Atracții</h1>
      <div className="mb-6">
        <Search placeholder="Search attractions..." />
      </div>

      {loading ? (
        <p>Loading attractions...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {attractions.map((item) => (
            <CardBox key={item.id} attraction={item} />
          ))}
        </div>
      )}
      <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                  </div>
    </div>
  );
}
