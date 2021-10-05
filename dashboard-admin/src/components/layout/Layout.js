import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ setLogin }) => {
  const [sidebarOpen, setSidebarOpne] = useState(false);

  const buttonSidebar = () => {
    setSidebarOpne(!sidebarOpen);
  };
  return (
    <div>
      <Sidebar
        sidebarOpen={sidebarOpen}
        buttonSidebar={buttonSidebar}
        setLogin={setLogin}
      />
    </div>
  );
};

export default Layout;
