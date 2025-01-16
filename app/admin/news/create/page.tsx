import Breadcrumbs from "@/app/ui/components/breadcrumbs";
import Form from "@/app/ui/admin/news/create-form"; // Change form to news form

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Știri", href: "/admin/news" }, // Update to news
          {
            label: "Adaugare știre", // Change the label to news
            href: "/admin/news/create", // Update to news create page
            active: true,
          },
        ]}
      />
      <Form /> {/* Use the form for news */}
    </main>
  );
}
