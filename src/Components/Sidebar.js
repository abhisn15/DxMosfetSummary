import React, { useState } from "react";
import { IonIcon } from "@ionic/react";

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    { icon: "logo-apple", title: "Brand Name", disabled: true },
    { icon: "home-outline", title: "Dashboard" },
    { icon: "people-outline", title: "Customers" },
    { icon: "chatbubble-outline", title: "Messages" },
    { icon: "help-outline", title: "Help" },
    { icon: "settings-outline", title: "Settings" },
    { icon: "lock-closed-outline", title: "Password" },
    { icon: "log-out-outline", title: "Sign Out" },
  ];

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className={`fixed h-full ${
        isActive ? "w-20" : "w-72"
      } bg-blue-600 transition-all overflow-hidden`}
    >
      <ul className="absolute top-0 left-0 w-full">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`relative list-none rounded-l-3xl group ${
              hoveredItem === index ? "bg-white" : ""
            } ${item.disabled ? "pointer-events-none mb-10" : ""}`}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <a
              href="#"
              className={`flex items-center text-white ${
                hoveredItem === index ? "text-blue-600" : ""
              } relative`}
            >
              <span className="block w-16 h-16 flex items-center justify-center text-2xl">
                <IonIcon name={item.icon} />
              </span>
              {!isActive && (
                <span className="block h-16 leading-[60px] text-left px-2 whitespace-nowrap">
                  {item.title}
                </span>
              )}
              {/* Lengkungan */}
              <span
                className={`absolute -right-4 -top-2 w-10 h-20 bg-white rounded-3xl ${
                  hoveredItem === index ? "opacity-100" : "opacity-0"
                } transition-opacity`}
              ></span>
            </a>
          </li>
        ))}
      </ul>
      <button
        onClick={toggleMenu}
        className="absolute bottom-5 left-5 p-2 bg-white text-blue-600 rounded-full"
      >
        Toggle
      </button>
    </div>
  );
};

export default Sidebar;
