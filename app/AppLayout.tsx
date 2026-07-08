"use client";

import { useState } from "react";
import Header from "@/src/components/Header";
import SideBar from "@/src/components/SideBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="w-full h-[calc(100%-80px)] flex flex-row">
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 overflow-y-auto">
          <main>{children}</main>
        </div>
      </div>
    </>
  );
}
