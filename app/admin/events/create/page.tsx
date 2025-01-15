import Breadcrumbs from "@/app/ui/components/breadcrumbs";
import Form from "@/app/ui/admin/events/create-form";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Evenimente", href: "/admin/events" },
          {
            label: "Adaugare eveniment",
            href: "/admin/events/create",
            active: true,
          },
        ]}
      />
      <Form  />
    </main>
  );
}