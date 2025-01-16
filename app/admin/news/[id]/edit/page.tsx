import Breadcrumbs from "@/app/ui/components/breadcrumbs";
import EditForm from "@/app/ui/admin/news/edit-form";
import { notFound } from "next/navigation";
import { getNewsById } from "@/app/db/actions/news";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const news = await getNewsById(id);
  if (!news) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "News", href: "/admin/news" },
          {
            label: "Edit News",
            href: `/admin/news/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/* Passing the news ID to the edit form */}
      <EditForm news={news} />
    </main>
  );
}