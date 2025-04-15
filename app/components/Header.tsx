import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Search from "./Search";
import FileUploader from "./FileUploader";

const Header = () => {
  return (
    <header className="header">
      <Search />
      <div className="header-wrapper">
        <FileUploader />
        <form action="">
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
