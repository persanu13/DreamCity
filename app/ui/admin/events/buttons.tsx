"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteEvents, State } from "@/app/db/actions/events";
import { useActionState } from "react";

export function DeleteEvent({ id }: { id: string }) {
  const deleteEventsWithId = deleteEvents.bind(null, id);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(deleteEventsWithId, initialState);
  return (
    <form action={formAction}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
