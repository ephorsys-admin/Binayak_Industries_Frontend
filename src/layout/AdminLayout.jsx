import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../admin/components/Sidebar";
import TopBar from "../admin/components/TopBar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-stone-50/60 antialiased font-sans">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 p-3 sm:p-5 lg:p-6 overflow-y-auto scrollbar-thin">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;