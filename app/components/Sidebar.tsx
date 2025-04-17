"use client";

import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  fullName: string;
  email: string;
  avatar: string;
}

const Sidebar = ({ fullName, email, avatar }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href="/">
        <Image
          src="/icons/logo-full-brand.svg"
          alt="logo"
          width={160}
          height={50}
          className="h-auto lg:block hidden"
        />
        <Image
          src="/icons/logo-brand.svg"
          alt="logo"
          width={50}
          height={50}
          className="h-auto lg:hidden block"
        />
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link
              href={url}
              key={name}
              className={`sidebar-nav-item lg:w-full`}
            >
              <li
                className={cn(
                  "sidebar-nav-item",
                  pathname === url && "shad-active"
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={20}
                  height={20}
                  className={cn(
                    "nav-icon",
                    pathname === url && "nav-icon-active"
                  )}
                />
                <span className="hidden lg:block">{name}</span>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image
        src="/images/files-2.png"
        alt="illustration"
        width={506}
        height={418}
        className="w-full"
      />
      <div className="sidebar-user-info">
        <Image
          src={avatar}
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize text-light-100">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
