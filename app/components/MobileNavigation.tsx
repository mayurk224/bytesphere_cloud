"use client";

import React, { useState, useMemo, useCallback } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
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

const MobileNavigation = React.memo(({
  fullName,
  avatar,
  email,
  accountId,
  $id: ownerId,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();

  const handleSignOut = useCallback(async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await signOutUser();
    } catch (error) {
      console.error("Failed to sign out", error);
      setIsSigningOut(false);
    }
  }, [isSigningOut]);

  const handleLinkClick = useCallback(() => {
    setOpen(false);
  }, []);

  const navLinks = useMemo(() => {
    return navItems.map(({ url, name, icon }) => (
      <Link
        href={url}
        key={name}
        onClick={handleLinkClick}
        prefetch
      >
        <li
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
      </Link>
    ));
  }, [pathname, handleLinkClick]);

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
                {navLinks}
              </ul>
            </nav>
            <Separator className="my-4 bg-light-200/20" />

            <div className="flex flex-col justify-between gap-5 pb-5">
              <FileUploader ownerId={ownerId} accountId={accountId} />
              <Button
                type="button"
                className="mobile-sign-out-button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                aria-disabled={isSigningOut}
              >
                {isSigningOut ? (
                  <>
                    <Image
                      src="/icons/loader-brand.svg"
                      alt="signing out"
                      width={20}
                      height={20}
                      className="animate-spin"
                      aria-hidden="true"
                    />
                    <span>Sign Out</span>
                  </>
                ) : (
                  <>
                    <Image
                      src="/icons/logout.svg"
                      alt="logout"
                      width={20}
                      height={20}
                    />
                    Sign Out
                  </>
                )}
              </Button>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </header>
  );
});

MobileNavigation.displayName = "MobileNavigation";
export default MobileNavigation;
