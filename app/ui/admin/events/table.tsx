import Image from "next/image";
import { DeleteEvent, EditEvent } from "./buttons";
import { getFilteredEventsTable } from "@/app/db/actions/events";
import { UsersIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

export default async function EventsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const events = await getFilteredEventsTable(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {events?.map((event) => (
              <div
                key={event.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{event.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{event.description}</p>
                    <p className="text-sm text-gray-500">{event.date}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    {/* <DeleteUser id={event.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Nume
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Descriere
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Data
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {events?.map((event) => (
                <tr
                  key={event.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{event.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{event.description}</td>
                  <td className="whitespace-nowrap px-3 py-3">{event.date}</td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <EditEvent id={event.id} />
                      <DeleteEvent id={event.id} />
                    </div>
                  </td>  
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
