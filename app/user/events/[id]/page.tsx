'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MyEvent, EventReview } from '@/app/db/definitions';
import { getEventById } from '@/app/db/actions/events';
import { getReviewsByEventId, createEventReview } from '@/app/db/actions/eventsreviews';
import { DeleteEventReview } from '@/app/ui/user/events/reviews/buttons';

const initialState = {
  user_id: '',
  rating: 5,
  content: '',
};

export default function EventArticlePage() {
  const { id } = useParams();
  const [curent_user_id, setCurentUserId] = useState(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [event, setEvent] = useState<MyEvent | null>(null);
  const [reviews, setReviews] = useState<EventReview[]>([]);
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const eventData = await getEventById(id as string);
      if (!eventData) return;
      setEvent(eventData);

      const reviewsData = await getReviewsByEventId(id as string);
      setReviews(reviewsData);
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setCurentUserId(data);
        setFormState((prev) => ({ ...prev, user_id: data?.id }));
      });
  }, []);

  useEffect(() => {
    async function fetchUserRole() {
      const response = await fetch("/api/user/role");
      const data = await response.json();
      setUserRole(data.role);
    }
    fetchUserRole();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formState.user_id || !formState.content.trim()) {
      alert("User ID is missing or content is empty!");
      return;
    }
  
    const formData = new FormData();
    formData.append("user_id", formState.user_id);
    formData.append("event_id", id as string);
    formData.append("rating", formState.rating.toString());
    formData.append("content", formState.content);
  
    await createEventReview({}, formData);
    setFormState((prev) => ({ ...prev, content: "" }));
  
    const updatedReviews = await getReviewsByEventId(id as string);
    setReviews(updatedReviews);
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
        </header>
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={event.imgurl || "/placeholder.svg"}
            alt={event.name}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="prose max-w-none mb-8">
          <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {event.content}
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
                  {userRole === 'admin' && (
                    <DeleteEventReview id={review.id} eventId={id} setReviews={setReviews} />
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
          href="/user/events" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Back to Events
        </Link>
      </article>
    </div>
  );
}
