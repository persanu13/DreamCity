import AdminLogo from "@/app/ui/logos/admin-logo";
import LoginForm from "@/app/ui/auth/login-form";
import RegisterForm from "@/app/ui/auth/register-form";

export default function RegisterPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative  flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-22">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <h1 className=" text-2xl">Register </h1>
          </div>
        </div>
        <RegisterForm />
      </div>
    </main>
  );
}
