'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Attraction, AttractionReview } from '@/app/db/definitions';
import { getAttractionById } from '@/app/db/actions/attractions';
import { getReviewsByAttractionId, createReview } from '@/app/db/actions/attractionsreviews';
import { DeleteReview } from '@/app/ui/user/attractions/reviews/buttons';

const initialState = {
  user_id: '',
  rating: 5,
  content: '',
};

export default function AttractionArticlePage() {
  const { id } = useParams();
  const [curent_user_id, setCurentUserId] = useState(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [attraction, setAttraction] = useState<Attraction | null>(null);
  const [reviews, setReviews] = useState<AttractionReview[]>([]);
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const attractionData = await getAttractionById(id as string);
      if (!attractionData) return;
      setAttraction(attractionData);

      const reviewsData = await getReviewsByAttractionId(id as string);
      setReviews(reviewsData);
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setCurentUserId(data); // Assuming the API returns { id: "user_id" }
        setFormState((prev) => ({ ...prev, user_id: data?.id })); // Auto-fill user_id
      });
  }, []);

  useEffect(() => {
    async function fetchUserRole() {
      const response = await fetch("/api/user/role");
      const data = await response.json();
      setUserRole(data.role);  // Set the role to the new state
    }
    fetchUserRole();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.user_id || !formState.content.trim()) {
      alert("User ID is missing or content is empty!"); // Prevent submission if user_id is empty
      return;
    }
  
    const formData = new FormData();
    formData.append("user_id", formState.user_id);
    formData.append("attraction_id", id as string);
    formData.append("rating", formState.rating.toString());
    formData.append("content", formState.content);
  
    await createReview({}, formData);
    setFormState((prev) => ({ ...prev, content: "" })); // Reset only content field
  
    const updatedReviews = await getReviewsByAttractionId(id as string);
    setReviews(updatedReviews);
  };

  if (!attraction) {
    return <div>Loading...</div>;
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

        {/* Add Review Form */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Add a Review</h2>
          <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-lg">
            <div className="mb-4">
              <input type="hidden" name="user_id" value={formState.user_id} />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                name="rating"
                value={formState.rating}
                onChange={(e) => setFormState({ ...formState, rating: Number(e.target.value) })}
                className="w-full p-2 border rounded"
              >
                {[5, 4, 3, 2, 1].map((num) => (
                  <option key={num} value={num}>
                    {'★'.repeat(num)}{'☆'.repeat(5 - num)}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Review</label>
              <textarea
                name="content"
                value={formState.content}
                onChange={(e) => setFormState({ ...formState, content: e.target.value })}
                required
                className="w-full p-2 border rounded"
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Submit Review
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                  <span className="font-bold mr-2">
                      {typeof review.user_name === "string" ? review.user_name : review.user_name?.name ?? "Anonymous"}
                    </span>
                    <span className="text-yellow-500">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </span>
                  </div>
                  {/* Only show delete button if the user is an admin */}
                  {userRole === 'admin' && (
                    <DeleteReview id={review.id} attractionId={id} setReviews={setReviews} />
                  )}
                </div>
                <p>{review.content}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>

        <Link 
          href="/user/attractions" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Back to Attractions
        </Link>
      </article>
    </div>
  );
}
