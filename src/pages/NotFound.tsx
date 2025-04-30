
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center space-y-6">
        <div className="yarn-gradient w-24 h-24 rounded-full mx-auto flex items-center justify-center">
          <span className="text-4xl font-bold text-white">404</span>
        </div>
        <h1 className="text-3xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="pt-4">
          <Link to="/">
            <Button>
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
