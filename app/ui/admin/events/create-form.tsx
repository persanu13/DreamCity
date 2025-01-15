"use client";

import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/components/button";
import { createEvent, State } from "@/app/db/actions/events";
import { useActionState } from "react";

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createEvent, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Introduceti numele evenimentului
          </label>
          <div className="relative">
          <input
                id="name"
                name="name"
                type="text"
                aria-describedby="name-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="imgUrl" className="mb-2 block text-sm font-medium">
            Introduceti URL-ul imaginii
          </label>
          <div className="relative">
          <input
                id="imgUrl"
                name="imgUrl"
                type="text"
                aria-describedby="imgUrl-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
          </div>
          <div id="imgUrl-error" aria-live="polite" aria-atomic="true">
            {state.errors?.imgUrl &&
              state.errors.imgUrl.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="dessription" className="mb-2 block text-sm font-medium">
            Introduceti descrierea evenimentului
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
            <textarea
                id="description"
                name="description"
                rows={4} // Ajustați numărul de rânduri după preferință
                placeholder="Introduceți descrierea aici..."
                className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500" // 'resize-none' previne redimensionarea; eliminați-l dacă doriți să permiteți redimensionarea
                aria-describedby="description-error"
                ></textarea>
            </div>
          </div>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
              state.errors.description.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            Introduceti conținutul evenimentului
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
            <textarea
                id="content"
                name="content"
                rows={4}
                placeholder="Introduceți conținutul aici..."
                className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500" // 'resize-none' previne redimensionarea; eliminați-l dacă doriți să permiteți redimensionarea
                aria-describedby="content-error"
                ></textarea>
            </div>
          </div>
          <div id="content-error" aria-live="polite" aria-atomic="true">
            {state.errors?.content &&
              state.errors.content.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="mb-2 block text-sm font-medium">
            Introduceti data evenimentului
          </label>
          <div className="relative">
          <input
                id="date"
                name="date"
                type="date"
                aria-describedby="date-error"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
          </div>
          <div id="date-error" aria-live="polite" aria-atomic="true">
            {state.errors?.date &&
              state.errors.date.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div id="status-error" aria-live="polite" aria-atomic="true">
          {state.message && (
            <p className="mt-2 text-sm text-red-500" key={state.message}>
              {state.message}
            </p>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/events"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Adauga</Button>
      </div>
    </form>
  );
}