"use client";
import {
  GlobeAltIcon,
  LockClosedIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import NavLinks from "./nav-links";
import { logout } from "@/app/(auth)/authenticate";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [userRole, setUserRole] = useState<string | null>(null);
  useEffect(() => {
    async function fetchUserRole() {
      const response = await fetch("/api/user/role");
      const data = await response.json();
      setUserRole(data.role);
    }
    fetchUserRole();
  }, []);
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center  leading-none py-4 px-2 text-black gap-1 bg-customGray md:px-8 md:justify-between `}
    >
      <NavLinks />

      <div className="flex gap-2">
        {userRole === "admin" && (
          <Link
            href="/admin"
            className={
              "flex h-[48px] grow items-center w-10 justify-center gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-400 md:w-32 md:p-2 md:px-3"
            }
          >
            <LockClosedIcon className="w-6" />
            <p className="hidden md:block">Admin</p>
          </Link>
        )}

        <form action={logout}>
          <button className="flex h-[48px] w-10 items-center gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-400 md:w-32 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
