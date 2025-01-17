import Link from 'next/link';

export default function NewsNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - News Article Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">Sorry, the news article you're looking for doesn't exist or has been removed.</p>
        <Link 
          href="/user/attractions" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Înapoi la Atracții
        </Link>
      </div>
    </div>
  );
}

