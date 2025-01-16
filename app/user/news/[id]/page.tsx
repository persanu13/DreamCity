import { getNewsById } from '@/app/db/actions/news';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function NewsArticlePage({ params }: { params: { id: string } }) {
  const news = await getNewsById(params.id);

  if (!news) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{news.name}</h1>
          <time dateTime={news.date} className="text-gray-600 text-sm">{news.date}</time>
        </header>
        
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={news.imgurl || "/placeholder.svg"}
            alt={news.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {news.content}
          </p>
        </div>

        <Link 
          href="/user/news" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Back to News
        </Link>
      </article>
    </div>
  );
}
export default NewsArticlePage;

