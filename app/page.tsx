import AcmeLogo from "@/app/ui/logos/admin-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col p-6">
      <Image
        src="/images/background_web.jpg"
        alt="Desktop background"
        fill
        className="object-cover hidden md:block"
        sizes="100vw"
        priority
      />
      <Image
        src="/images/background_mobile.jpg"
        alt="Mobile background"
        fill
        className="object-cover md:hidden"
        sizes="100vw"
        priority
      />
      <h1 className="title">Brasov Dream City</h1>
      <div className="absolute  z-10 bottom-10 right-24">
        <Link
          href="/login"
          className="flex  items-center gap-5 self-start rounded-lg bg-slate-200 px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-slate-300 md:text-base"
        >
          <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
        </Link>
      </div>
    </main>
  );
}
