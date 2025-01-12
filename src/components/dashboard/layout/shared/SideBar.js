import React from "react";
import logo from "../../../../assets/images/logoH.svg";
import fav from "../../../../assets/images/fav.svg";
import sidebarData from "./sidebarData";
import NavigationItem from "./NavigationItem";

const SideBar = ({ sideBarOpen, setSideBarOpen }) => {
  function handlExpandAsideWhenHover(e) {
    if (!sideBarOpen) {
      setSideBarOpen(true);
    }
  }

  return (
    <aside
      className={`side_bar ${sideBarOpen ? "expand" : ""}`}
      onMouseOver={handlExpandAsideWhenHover}
    >
      <div className="logo_wrapper">
        <span className="logo-lg">
          <img src={logo} alt="logo" />
        </span>
        <span className="logo-sm">
          <img src={fav} alt="fav" />
        </span>
      </div>
      <ul className="navigation_menu">
        {sidebarData.map((item) => (
          <NavigationItem
            key={item.label}
            item={item}
            sideBarOpen={sideBarOpen}
          />
        ))}
      </ul>
    </aside>
  );
};

export default SideBar;
