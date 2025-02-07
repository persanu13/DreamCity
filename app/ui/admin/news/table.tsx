import Image from "next/image";
import { DeleteNews, EditNews } from "./buttons"; // Update the import to use the news buttons
import { getFilteredNewsTable } from "@/app/db/actions/news"; // Update to use the correct action for news
import { UsersIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";

export default async function NewsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const news = await getFilteredNewsTable(query, currentPage); // Use the news data instead of events

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {news?.map((newsItem) => (
              <div
                key={newsItem.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{newsItem.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{newsItem.description}</p>
                    <p className="text-sm text-gray-500">{newsItem.date}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div className="flex justify-end gap-2">
                    {/* <DeleteUser id={newsItem.id} /> */}
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
              {news?.map((newsItem) => (
                <tr
                  key={newsItem.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{newsItem.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {" "}
                    {newsItem.description.length > 60
                      ? `${newsItem.description.substring(0, 60)}...`
                      : newsItem.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{newsItem.date}</td>

                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <EditNews id={newsItem.id} />
                      <DeleteNews id={newsItem.id} />
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
