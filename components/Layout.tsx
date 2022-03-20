import React from "react";
import { Toaster } from "react-hot-toast";
import Meta from "./Meta";
import Image from "next/image";
import DropdownContent from "./DropdownContent";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <div>
        <Toaster position="top-right" />
      </div>
      <div className="flex flex-col h-screen font-body font-extrabold bg-gradient-to-tr from-zinc-800 via-zinc-900 to-zinc-800 text-zinc-100">
        <Meta />

        <div className="text-center md:text-left text-lg">
          <div className="dropdown dropdown-hover items-center text-center">
            <label tabIndex={0}></label>
            <Image
              className="rounded-md"
              src="/logo_white.png"
              alt="Album Cover"
              width="100%"
              height="100%"
            />
            <DropdownContent
              isAuthorised={router && router.pathname.includes("justplay")}
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};
//bg-gradient-to-r from-cyan-500 via-black to-blue-500 text-[#37963]
export default Layout;
