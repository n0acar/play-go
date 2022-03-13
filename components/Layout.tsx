import React from "react";
import { Toaster } from "react-hot-toast";
import Meta from "./Meta";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen font-body font-extrabold bg-gradient-to-tr from-zinc-800 via-zinc-900 to-zinc-800 text-zinc-100">
      <Meta />
      <div>
        <Toaster />
      </div>
      <div>{children}</div>
    </div>
  );
};
//bg-gradient-to-r from-cyan-500 via-black to-blue-500 text-[#37963]
export default Layout;
