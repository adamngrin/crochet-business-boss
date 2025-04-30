
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, Package, Users, Calendar, BarChart, Settings, LogOut, CircleUser, Store, ShoppingBag } from "lucide-react";
import SocialLinks from "./SocialLinks";

const SidebarLink = ({ to, icon: Icon, label, active }: { to: string; icon: React.ElementType; label: string; active: boolean }) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
      active ? "bg-primary/10 text-primary" : "text-muted-foreground"
    )}
  >
    <Icon size={16} className="shrink-0" />
    <span>{label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  
  const links = [
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/products", label: "Products", icon: Package },
    { to: "/custom-orders", label: "Custom Orders", icon: ShoppingBag },
    { to: "/stores", label: "Stores", icon: Store },
    { to: "/consignors", label: "Consignors", icon: Users },
    { to: "/events", label: "Events", icon: Calendar },
    { to: "/reports", label: "Reports", icon: BarChart },
    { to: "/settings", label: "Settings", icon: Settings },
  ];
  
  return (
    <aside className="hidden md:flex flex-col border-r bg-card w-[240px] p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-full yarn-gradient flex items-center justify-center">
          <CircleUser size={16} className="text-white" />
        </div>
        <span className="text-lg font-semibold">Catherine Crochets</span>
      </div>
      
      <nav className="space-y-1.5">
        {links.map((link) => (
          <SidebarLink 
            key={link.to}
            to={link.to}
            icon={link.icon}
            label={link.label}
            active={location.pathname === link.to}
          />
        ))}
      </nav>
      
      <div className="mt-auto pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Follow Us</span>
          <SocialLinks />
        </div>
        <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary w-full">
          <LogOut size={16} className="shrink-0" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
