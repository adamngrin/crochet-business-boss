
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yarn-lilac via-yarn-dust to-yarn-cream p-4">
      <div className="text-center max-w-md">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 bg-yarn-lavender rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute inset-2 bg-yarn-rose rounded-full opacity-20 animate-pulse delay-300"></div>
          <div className="absolute inset-4 bg-yarn-mauve rounded-full opacity-20 animate-pulse delay-500"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-7xl font-bold text-yarn-lavender">404</h1>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p className="text-muted-foreground mb-6">
          We couldn't find the page you were looking for. It might have been removed, renamed, 
          or maybe it never existed in the first place.
        </p>
        
        <Link to="/">
          <Button className="yarn-gradient border-none text-white">
            <Home className="mr-2 h-4 w-4" /> 
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
