"use client";

import Link from "next/link";
import { Button } from "@/app/ui/components/button";
import { createAttraction, State } from "@/app/db/actions/attractions";
import { useActionState } from "react";

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createAttraction, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Introduceți numele atracției
          </label>
          <input
            id="name"
            name="name"
            type="text"
            aria-describedby="name-error"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
          <div id="name-error" aria-live="polite">
            {state.errors?.name?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="imgurl" className="mb-2 block text-sm font-medium">
            Introduceți URL-ul imaginii
          </label>
          <input
            id="imgurl"
            name="imgurl"
            type="text"
            aria-describedby="imgurl-error"
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
          />
          <div id="imgurl-error" aria-live="polite">
            {state.errors?.imgurl?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Introduceți descrierea atracției
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder="Introduceți descrierea aici..."
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="description-error"
          ></textarea>
          <div id="description-error" aria-live="polite">
            {state.errors?.description?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Introduceți conținutul atracției
          </label>
          <textarea
            id="content"
            name="content"
            rows={4}
            placeholder="Introduceți conținutul aici..."
            className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            aria-describedby="content-error"
          ></textarea>
          <div id="content-error" aria-live="polite">
            {state.errors?.content?.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        <div id="status-error" aria-live="polite">
          {state.message && (
            <p className="mt-2 text-sm text-red-500" key={state.message}>
              {state.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/attractions"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Adaugă</Button>
      </div>
    </form>
  );
}
