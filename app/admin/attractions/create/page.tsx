import Breadcrumbs from "@/app/ui/components/breadcrumbs";
import Form from "@/app/ui/admin/attractions/create-form";

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Atracții", href: "/admin/attractions" },
          {
            label: "Adăugare atracție",
            href: "/admin/attractions/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}