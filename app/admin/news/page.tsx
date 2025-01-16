import Search from "@/app/ui/components/search";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import Table from "@/app/ui/admin/news/table"; // Update the import to use the news table
import Pagination from "@/app/ui/components/pagination";
import { getNewsPages } from "@/app/db/actions/news"; // Update the import to use the news action
import { CreateNews } from "@/app/ui/admin/news/buttons"; // Update to use the news create button

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getNewsPages(query); // Use the news pages function
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Știri</h1> {/* Update the heading for news */}
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Căutare știri..." /> {/* Update search placeholder for news */}
        <CreateNews /> {/* Use the news create button */}
      </div>
      <Table query={query} currentPage={currentPage} /> {/* Use the news table */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} /> {/* Pagination for news */}
      </div>
    </div>
  );
}
