
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Package, Users, Calendar, BarChart, Settings, LogOut, Yarn } from "lucide-react";

const SidebarLink = ({ to, icon: Icon, label, active }: { to: string; icon: React.ElementType; label: string; active: boolean }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-sidebar-accent group",
      active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
    )}
  >
    <Icon size={20} className={active ? "text-yarn-rose" : "text-sidebar-foreground group-hover:text-yarn-rose"} />
    <span>{label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-sidebar p-4 text-sidebar-foreground">
      <div className="flex items-center gap-3 py-4 px-2 mb-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-full yarn-gradient">
          <Yarn size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-semibold">Catherine Crochets</h1>
      </div>
      
      <div className="flex flex-col gap-1">
        <SidebarLink to="/" icon={Home} label="Dashboard" active={currentPath === "/"} />
        <SidebarLink to="/products" icon={Package} label="Products" active={currentPath.startsWith("/products")} />
        <SidebarLink to="/consignors" icon={Users} label="Consignors" active={currentPath.startsWith("/consignors")} />
        <SidebarLink to="/events" icon={Calendar} label="Events" active={currentPath.startsWith("/events")} />
        <SidebarLink to="/reports" icon={BarChart} label="Reports" active={currentPath.startsWith("/reports")} />
      </div>

      <div className="mt-auto flex flex-col gap-1">
        <SidebarLink to="/settings" icon={Settings} label="Settings" active={currentPath.startsWith("/settings")} />
        <button className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent group">
          <LogOut size={20} className="text-sidebar-foreground group-hover:text-yarn-rose" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
