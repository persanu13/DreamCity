import Breadcrumbs from "@/app/ui/components/breadcrumbs";
import EditForm from "@/app/ui/admin/events/edit-form";
import { notFound } from "next/navigation";
import { getEventById } from "@/app/db/actions/events";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const event = await getEventById(id);
  if (!event) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Evenimente", href: "/admin/events" },
          {
            label: "Modificare eveniment",
            href: `/admin/events/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/* Passing the event ID to the edit form */}
      <EditForm event={event}/>
    </main>
  );
}
