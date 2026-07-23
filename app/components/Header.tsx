"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import Search from "./Search";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    try {
      await signOutUser();
    } catch (error) {
      console.error("Failed to sign out", error);
      setIsSigningOut(false);
    }
  };

  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader ownerId={userId} accountId={accountId} />
        <Button
          type="button"
          className="sign-out-button"
          onClick={handleSignOut}
          disabled={isSigningOut}
          aria-disabled={isSigningOut}
          aria-busy={isSigningOut}
        >
          {isSigningOut ? (
            <>
              <Image
                src="/icons/loader-brand.svg"
                alt="signing out..."
                width={20}
                height={20}
                className="animate-spin"
                aria-hidden="true"
              />
            </>
          ) : (
            <Image
              src="/icons/logout.svg"
              alt="logout"
              width={20}
              height={20}
            />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Header;
