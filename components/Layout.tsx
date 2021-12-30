import React from "react";
import Meta from "./Meta";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Meta />
      <h1>Just Play</h1>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
