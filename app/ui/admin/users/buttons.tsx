"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteUsers, State } from "@/app/db/actions/users";
import { useActionState } from "react";

export function DeleteUser({ id }: { id: string }) {
  const deleteUsersWithId = deleteUsers.bind(null, id);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(deleteUsersWithId, initialState);
  return (
    <form action={formAction}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-4" />
      </button>
    </form>
  );
}
