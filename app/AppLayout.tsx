"use client";

import { useState } from "react";
import Header from "@/src/components/Header";
import SideBar from "@/src/components/SideBar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <main>{children}</main>
    </>
  );
}
