'use client';

import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteEventReview, getReviewsByEventId } from "@/app/db/actions/eventsreviews";
import { useActionState } from "react";
import { EventReview } from "@/app/db/definitions";

export function DeleteEventReview({
    id,               // review ID
    eventId,          // event ID
    setReviews        // function to update the reviews state
  }: {
    id: string,
    eventId: any,
    setReviews: React.Dispatch<React.SetStateAction<EventReview[]>>
  }) {
  const deleteReviewWithId = deleteEventReview.bind(null, id);
  const initialState = { message: "", errors: {} };
  const [state, formAction] = useActionState(deleteReviewWithId, initialState);

  const handleDelete = async () => {
    const result = await deleteReviewWithId(initialState);
    if (result.message === "Review deleted successfully.") {
      // Fetch updated reviews after deletion
      const updatedReviews = await getReviewsByEventId(eventId);
      setReviews(updatedReviews);
    } else {
      console.error("Failed to delete review:", result.message);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleDelete(); }} className="inline">
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
