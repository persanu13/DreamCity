import { GlobeAltIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";

export default function AdminLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white gap-1`}
    >
      <LockClosedIcon className="h-8 w-8" />
      <p className="text-[40px]">Admin</p>
    </div>
  );
}
