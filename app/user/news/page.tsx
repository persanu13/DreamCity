'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getFilteredNews } from '@/app/db/actions/news';
import Search from '@/app/ui/components/search';
import Pagination from "@/app/ui/components/pagination";
import { CardBox } from '@/app/ui/user/news/cardbox';
import { News } from '@/app/db/definitions';
import { getNewsPages } from '@/app/db/actions/news';

export default function NewsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;
  
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState<number>(1); // Add state for totalPages

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getFilteredNews(query, currentPage);
      const total = await getNewsPages(query); // Await the total pages
      setNews(data);
      setTotalPages(total); // Set the totalPages value after fetching
      setLoading(false);
    }

    fetchData();
  }, [query, currentPage]);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Știri</h1>
      <div className="mb-6">
        <Search placeholder="Search news..." />
      </div>

      {loading ? (
        <p>Loading news...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <CardBox key={item.id} news={item} />
          ))}
        </div>
      )}

      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
