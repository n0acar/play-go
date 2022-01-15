import React from "react";
import Meta from "./Meta";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen bg-gradient-to-tr from-cyan-400 via-blue-500 to-violet-500 text-amber-500 font-display">
      <Meta />
      <div>{children}</div>
    </div>
  );
};
//bg-gradient-to-r from-cyan-500 via-black to-blue-500
export default Layout;
