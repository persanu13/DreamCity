"use client";

import Link from "next/link";
import { Button } from "@/app/ui/components/button";
import { editEvent, State } from "@/app/db/actions/events";
import { useActionState } from "react";
import { MyEvent } from "@/app/db/definitions";

export default function EditEventForm({
    event
  }: {
    event: MyEvent
  }) {
    const editEventWithId = editEvent.bind(null, event.id);
    const initialState: State = { message: null, errors: {} };
    const [state, formAction] = useActionState(editEventWithId, initialState);
    console.log(event.imgurl);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Modificați numele evenimentului
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={event.name}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="name-error"
            />
          </div>
          {state.errors?.name?.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="imgUrl" className="mb-2 block text-sm font-medium">
            Modificați URL-ul imaginii
          </label>
          <input
            id="imgUrl"
            name="imgUrl"
            type="text"
            defaultValue={event.imgurl}
            className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="imgUrl-error"
          />
          {state.errors?.imgUrl?.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Modificați descrierea evenimentului
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={event.description}
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="description-error"
          />
          {state.errors?.description?.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Modificați conținutul evenimentului
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            defaultValue={event.content}
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="content-error"
          />
          {state.errors?.content?.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Modificați data evenimentului
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={event.date}
            className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="date-error"
          />
          {state.errors?.date?.map((error) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
        </div>

        {state.message && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/events"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Salvează modificările</Button>
      </div>
    </form>
  );
}
