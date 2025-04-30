
import React from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="md:hidden">
          <MobileNav />
        </div>
        <main className={cn("flex-1 p-6 md:p-8 overflow-y-auto", className)}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
