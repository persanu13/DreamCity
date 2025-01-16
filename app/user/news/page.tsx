import { getFilteredNews } from '@/app/db/actions/news';
import Search from '@/app/ui/components/search';
import { CardBox } from '@/app/ui/components/cardbox';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const news = await getFilteredNews(query, currentPage);

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Stiri</h1>
      <div className="mb-6">
        <Search placeholder="Search news..." />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <CardBox key={item.id} news={item} />
        ))}
      </div>
    </div>
  );
}

