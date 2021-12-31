import React from "react";
import Meta from "./Meta";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-screen bg-gradient-to-r from-indigo-700 via-stone-900 to-blue-600 text-amber-500 font-display">
      <Meta />
      <div>{children}</div>
    </div>
  );
};
//bg-gradient-to-r from-cyan-500 via-black to-blue-500
export default Layout;
