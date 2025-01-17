'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Attraction } from '@/app/db/definitions';
import { getAttractionById } from '@/app/db/actions/attractions';
import { LoadingSpinner } from '@/app/ui/components/loadingspinner';

function AttractionArticlePage() {
  const { id } = useParams(); // Correct way to get the dynamic route param
  const [attraction, setAttraction] = useState<Attraction | null>(null);

  useEffect(() => {
    async function fetchAttraction() {
      if (!id) return;
      const data = await getAttractionById(id as string);
      if (!data) {
        notFound();
      }
      setAttraction(data);
    }

    fetchAttraction();
  }, [id]);

  if (!attraction) {
    return <LoadingSpinner />; // Show loading while fetching attraction
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{attraction.name}</h1>
        </header>

        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={attraction.imgurl || "/placeholder.svg"}
            alt={attraction.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="prose max-w-none mb-8">
          <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {attraction.content}
          </p>
        </div>

        <Link 
          href="/user/attractions" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Înapoi la Atracții
        </Link>
      </article>
    </div>
  );
}

export default AttractionArticlePage;
