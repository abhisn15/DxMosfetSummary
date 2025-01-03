import React, { useState } from "react";
import { IonIcon } from "@ionic/react";
import { Link, useLocation } from "react-router-dom";
import {
  homeOutline,
  logOutOutline,
  reorderThreeOutline,
  cubeOutline,
  removeCircleOutline,
} from "ionicons/icons";

const Sidebar = ({ isActive, toggleMenu }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const location = useLocation(); // Get current path

  const menuItems = [
    { icon: homeOutline, title: "Dashboard", path: "/dashboard" },
    { icon: cubeOutline, title: "Stockin", path: "/stockin" },
    { icon: removeCircleOutline, title: "Stockout", path: "/stockout" },
    { icon: logOutOutline, title: "Logout", path: "/logout" },
  ];

  return (
    <div
      className={`relative auto-scroll h-screen sm:h-full ${
        isActive ? "sm:w-20 sm:right-0 w-screen" : "sm:w-72 w-0 overflow-auto"
      } bg-blue-500 transition-all `}
    >
      <ul
        className={`absolute top-5 left-0 w-full ${
          isActive ? "sm:flex sm:flex-col sm:items-center" : ""
        }`}
      >
        <div
          className={`flex flex-row gap-4 items-center justify-start pl-[10px] pb-10 ${
            isActive ? "sm:relative sm:right-1" : ""
          }`}
        >
          <div className="rounded-full bg-white p-0.5 shadow-black/40 shadow-md">
            <img
              className="rounded-full w-14 h-14"
              alt="ptofile"
              src="https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
          </div>
          <div
            className={`flex flex-col items-start justify-start  ${
              isActive ? "sm:hidden" : ""
            }`}
          >
            <span className="text-white font-bold">Abhi Surya Nugroho</span>
            <span className="text-white text-sm">21441482</span>
          </div>
        </div>
        {menuItems.map((item, index) => {
          const isActiveItem = location.pathname === item.path;

          return (
            <li
              key={index}
              className={`relative list-none rounded-l-3xl group ${
                hoveredItem === index || isActiveItem ? "bg-white" : ""
              } ${item.disabled ? "pointer-events-none mb-10" : ""}`}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                to={item.path}
                className={`flex items-center text-white relative transition-all  ${
                  hoveredItem === index || isActiveItem
                    ? "!text-blue-500 font-bold"
                    : ""
                }`}
              >
                <span className="block w-16 h-16 flex items-center justify-center text-2xl">
                  <IonIcon icon={item.icon} />
                </span>
                {!isActive ? (
                  <span className="hidden sm:block sm:h-16 sm:leading-[60px] sm:text-left sm:px-2 sm:whitespace-nowrap">
                    {item.title}
                  </span>
                ) : (
                  <span className="block h-16 leading-[60px] text-left px-2 whitespace-nowrap sm:hidden">
                    {item.title}
                  </span>
                )}
                {(hoveredItem === index || isActiveItem) && (
                  <>
                    <span
                      className={`absolute -top-12 right-0 w-12 h-12 rounded-full bg-transparent shadow-[35px_35px_0_10px_rgba(255,255,255,1)] transition-transform ${
                        hoveredItem === index || isActiveItem
                          ? "scale-100"
                          : "scale-0"
                      } ${isActive ? "right-0 sm:-right-2" : ""}`}
                    />
                    <span
                      className={`absolute -bottom-12 right-0 w-12 h-12 rounded-full bg-transparent shadow-[35px_-35px_0_10px_rgba(255,255,255,1)] transition-transform ${
                        hoveredItem === index || isActiveItem
                          ? "scale-100"
                          : "scale-0"
                      } ${isActive ? "right-0 sm:-right-2" : ""}`}
                    />
                  </>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        onClick={toggleMenu}
        className={`absolute top-8 right-5 text-white ${
          isActive ? "" : "left-4"
        } sm:hidden`}
      >
        <IonIcon icon={reorderThreeOutline} size="large" />
      </button>
    </div>
  );
};
export default Sidebar;
