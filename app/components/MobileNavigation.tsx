"use client";

import React, { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constants";
import { Button } from "@/components/ui/button";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({
  fullName,
  avatar,
  email,
  accountId,
  $id: ownerId,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="mobile-header">
      <Image
        src="/icons/logo-full-brand.svg"
        alt="logo"
        width={120}
        height={52}
        className="h-auto"
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="/icons/menu.svg"
            alt="menu"
            width={22}
            height={22}
            className="h-auto"
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetHeader>
            <SheetTitle>
              <div className="header-user">
                <Image
                  src={avatar}
                  alt="avatar"
                  width={44}
                  height={44}
                  className="header-user-avatar"
                />
                <div className="block sm:hidden">
                  <p className="subtitle-2 capitalize text-light-100">
                    {fullName}
                  </p>
                  <p className="caption ">{email}</p>
                </div>
              </div>
              <Separator className="mb-4 bg-light-200/20" />
            </SheetTitle>
            <nav className="mobile-nav">
              <ul className="mobile-nav-list">
                {navItems.map(({ url, name, icon }) => (
                  <li
                    key={name}
                    className={`mobile-nav-item ${
                      pathname === url && "shad-active"
                    }`}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={20}
                      height={20}
                      className={`nav-icon ${
                        pathname === url && "nav-icon-active"
                      }`}
                    />
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
            </nav>
            <Separator className="my-4 bg-light-200/20" />

            <div className="flex flex-col justify-between gap-5 pb-5">
              <FileUploader ownerId={ownerId} accountId={accountId} />
              <Button
                type="submit"
                className="mobile-sign-out-button"
                onClick={async () => await signOutUser()}
              >
                <Image
                  src="/icons/logout.svg"
                  alt="logout"
                  width={20}
                  height={20}
                />
                Sign Out
              </Button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
