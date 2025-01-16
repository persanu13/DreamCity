import { GlobeAltIcon, LockClosedIcon, PowerIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import NavLinks from "./nav-links";
import { signOut } from "@/auth";

export default function Navigation() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-black gap-1`}
    >
    <NavLinks/>

    <form
        action={async () => {
          "use server";
          await signOut();
        }}
        className="relative"
      >
        <button
          className="flex h-[48px] items-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:px-3"
        >
          <PowerIcon className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </div>
  );
}