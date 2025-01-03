// Header.js
import React from "react";
import { reorderThreeOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";

export default function Header({ toggleMenu }) {
  return (
    <div className="flex flex-row items-center justify-between p-4">
      <div
        className={`cursor-pointer sm:block`}
        onClick={toggleMenu} // Ensure this toggles sidebar
      >
        <IonIcon
          icon={reorderThreeOutline}
          className="w-10 h-10 sm:w-14 sm:h-14"
          color="white"
        />
      </div>
      <div>
        <img
          src={`${process.env.PUBLIC_URL + "/Assets/denso.png"}`}
          className="w-[140px] h-[40px] sm:w-[220px] sm:h-[80px]"
        />
      </div>
      <div></div>
    </div>
  );
}
