"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteAttractions, State } from "@/app/db/actions/attractions";
import { useActionState } from "react";

export function CreateAttraction() {
  return (
    <Link
      href="/admin/attractions/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Adaugă atracție</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function DeleteAttraction({ id }: { id: string }) {
  const deleteAttractionsWithId = deleteAttractions.bind(null, id);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(deleteAttractionsWithId, initialState);
  return (
    <form action={formAction}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}

export function EditAttraction({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/attractions/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <span className="sr-only">Edit</span>
      <PencilIcon className="w-4" />
    </Link>
  );
}
