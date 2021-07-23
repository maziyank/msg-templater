import React, { Key } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BottomNavMenu } from "../types/types";
import { ReactComponent as FileIcon } from "./../assets/icon/file.svg";
import { ReactComponent as ExploreIcon } from "./../assets/icon/search.svg";
import { ReactComponent as AboutIcon } from "./../assets/icon/user.svg";


const BottomNav: React.FC<any> = ({ path }) => {
  const menu: Array<BottomNavMenu> = [
    { text: "Explore", to: `${path}/template`, icon: ExploreIcon },
    { text: "My Template", to: `${path}/history`, icon: FileIcon },
    { text: "Account", to: `${path}/account`, icon: AboutIcon },
  ];

  const router = useLocation();

  const activeClass = "bg-secondary";
  const inactiveClass = "";

  return (
    <section className="block bottom-0 z-10 bg-base-300 shadow">
      <div id="tabs " className="flex justify-between">
        {menu.map((item: BottomNavMenu, index: Key) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              to={item.to}
              href="#"
              className={`w-full justify-center inline-block text-center pt-2 pb-1  ${router.pathname == item.to ? activeClass : inactiveClass
              }`}
            >
              <Icon />
              <span className={`tab tab-active block`}>{item.text}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BottomNav;
function useRouter() {
  throw new Error("Function not implemented.");
}

