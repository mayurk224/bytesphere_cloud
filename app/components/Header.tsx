import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
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
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader ownerId={userId} accountId={accountId} />
        <form
          action={async () => {
            "use server";

            await signOutUser();
          }}
        >
          <Button type="submit" className="sign-out-button">
            <Image
              src="/icons/logout.svg"
              alt="logout"
              width={20}
              height={20}
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
