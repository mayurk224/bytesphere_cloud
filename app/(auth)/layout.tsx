import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="bg-brand p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-5">
          <div className="flex items-center gap-5">
            <Image
              src="/logo.png"
              alt="logo"
              width={82}
              height={82}
              className="h-auto"
            />
            <h1 className="h1 text-white">Byte Sphere</h1>
          </div>
          <div className="space-y-5 text-white">
            <h1 className="h1">Manage your files the best way</h1>
            <p className="body-1">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
          </div>
          <Image
            src="/illustration.png"
            alt="illustration"
            width={400}
            height={400}
            className="transition-all hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>
      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
        <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="logo"
              width={82}
              height={82}
              className="h-auto"
            />
            <h1 className="h1">Byte Sphere</h1>
          </div>
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
