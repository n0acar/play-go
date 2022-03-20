import React from "react";
import Router from "next/router";
import { BiLogOut } from "react-icons/bi";
import { BsMedium, BsTwitter, BsLinkedin } from "react-icons/bs";

const DropdownContent: React.FC<{ isAuthorised: boolean }> = ({
  isAuthorised,
}) => {
  return (
    <ul
      tabIndex={0}
      className="dropdown-content menu p-2 mt-[-20px] shadow bg-base-100 rounded-box w-24 items-center"
    >
      {isAuthorised && (
        <li className="w-full">
          <a
            className="justify-center hover:bg-zinc-100 hover:text-lime-500"
            onClick={() => {
              localStorage.clear();
              Router.push("/");
            }}
          >
            <BiLogOut />
          </a>
        </li>
      )}
      <li className="w-full">
        <a
          href="#"
          className="justify-center hover:bg-zinc-100 hover:text-lime-500"
          onClick={() => {}}
        >
          <BsTwitter />
        </a>
      </li>
      <li className="w-full">
        <a
          href="#"
          className="justify-center hover:bg-zinc-100  hover:text-lime-500"
          onClick={() => {}}
        >
          <BsMedium />
        </a>
      </li>
      <li className="w-full">
        <a
          href="#"
          className="justify-center hover:bg-zinc-100 hover:text-lime-500"
          onClick={() => {}}
        >
          <BsLinkedin />
        </a>
      </li>
    </ul>
  );
};

export default DropdownContent;
