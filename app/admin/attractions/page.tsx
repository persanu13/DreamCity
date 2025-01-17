import Search from "@/app/ui/components/search";
import { lusitana } from "@/app/ui/fonts";
import Table from "@/app/ui/admin/attractions/table";
import Pagination from "@/app/ui/components/pagination";
import { getAttractionsPages } from "@/app/db/actions/attractions";
import { CreateAttraction } from "@/app/ui/admin/attractions/buttons";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getAttractionsPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Atracții</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Caută atracții..." />
        <CreateAttraction />
      </div>
      <Table query={query} currentPage={currentPage} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
