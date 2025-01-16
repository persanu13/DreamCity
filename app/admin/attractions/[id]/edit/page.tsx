import Breadcrumbs from "@/app/ui/components/breadcrumbs";
import EditForm from "@/app/ui/admin/attractions/edit-form";
import { notFound } from "next/navigation";
import { getAttractionById } from "@/app/db/actions/attractions";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const attraction = await getAttractionById(id);
  if (!attraction) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Atracții", href: "/admin/attractions" },
          {
            label: "Modificare atracție",
            href: `/admin/attractions/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/* Passing the attraction ID to the edit form */}
      <EditForm attraction={attraction} />
    </main>
  );
}
