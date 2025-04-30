
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Package, Users, Calendar, BarChart, Settings, Yarn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const links = [
    { to: "/", label: "Dashboard", icon: Home },
    { to: "/products", label: "Products", icon: Package },
    { to: "/consignors", label: "Consignors", icon: Users },
    { to: "/events", label: "Events", icon: Calendar },
    { to: "/reports", label: "Reports", icon: BarChart },
    { to: "/settings", label: "Settings", icon: Settings },
  ];
  
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full yarn-gradient">
            <Yarn size={16} className="text-white" />
          </div>
          <span className="text-lg font-semibold">Catherine Crochets</span>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleMenu} className="relative z-50">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>
      
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center h-full">
            <nav className="flex flex-col items-center gap-6 text-lg">
              {links.map((link) => (
                <Link 
                  key={link.to} 
                  to={link.to}
                  className={cn(
                    "flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-200",
                    location.pathname === link.to ? "text-primary font-medium" : "text-muted-foreground"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <link.icon size={20} />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
