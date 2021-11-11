import React, { useState } from "react";
import Sidebar from "./Sidebar";

const Layout = ({ setLogin, isLogin }) => {
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
        isLogin={isLogin}
      />
    </div>
  );
};

export default Layout;
