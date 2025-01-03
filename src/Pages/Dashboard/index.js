import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/Sidebar";
import Header from "../../Components/Header";

function Dashboard() {
  const [isActive, setIsActive] = useState(false); // To toggle sidebar visibility
  const [isLoading, setIsLoading] = useState(true); // To handle loading state
  const [fadeOut, setFadeOut] = useState(false); // To handle fade-out animation

  const toggleMenu = () => {
    setIsActive(!isActive); // Toggle sidebar visibility
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // Start fade-out animation
      setTimeout(() => setIsLoading(false), 500); // End loading after fade-out animation
    }, 1000); // Adjust time based on expected loading time

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center h-screen w-screen bg-blue-500 transition-opacity duration-500 ${
          fadeOut ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="animate-spin w-12 h-12 border-4 border-white border-t-transparent rounded-full"></div>
        <p className="text-white ml-4">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row h-screen w-screen">
      <div>
        <Sidebar isActive={isActive} toggleMenu={toggleMenu} />
      </div>

      <div className="flex flex-col w-full">
        <Header toggleMenu={toggleMenu} />
      </div>
    </div>
  );
}

export default Dashboard;
