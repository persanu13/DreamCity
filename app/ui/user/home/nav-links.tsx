"use client"
import {BellIcon, SunIcon, HomeIcon, NewspaperIcon, AcademicCapIcon, MapIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/fonts";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
    { name: "Acasa", href: "/user", icon: HomeIcon },
    {
      name: "Evenimente",
      href: "/user/events",
      icon: BellIcon,
    },
    {
      name: "Atractii",
      href: "/user/attractions",
      icon: MapIcon,
    },
    {
      name: "Stiri",
      href: "/user/news",
      icon: NewspaperIcon,
    },
    {
        name: "Meteo",
        href: "/user/weather",
        icon: SunIcon,
    },
    {
        name: "Istorie",
        href: "/user/history",
        icon: AcademicCapIcon,
    }
  ];

export default function NavLinks() {
    const pathname = usePathname();
    return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
                {
                  "bg-sky-100 text-blue-600": pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </>
    );
}