import Search from "@/app/ui/components/search";
import { lusitana } from "@/app/ui/fonts";
import { Suspense } from "react";
import Table from "@/app/ui/admin/events/table";
import Pagination from "@/app/ui/components/pagination";
import { getEventsPages } from "@/app/db/actions/events";
import { CreateEvent } from "@/app/ui/admin/events/buttons";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getEventsPages(query);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Evenimente</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Cauta evenimente..." />
        <CreateEvent></CreateEvent>
      </div>
      <Table query={query} currentPage={currentPage}  />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
