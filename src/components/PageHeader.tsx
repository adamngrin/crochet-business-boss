
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: React.ElementType;
  };
  className?: string;
}

const PageHeader = ({ title, description, action, className }: PageHeaderProps) => {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8", className)}>
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      
      {action && (
        <Button 
          onClick={action.onClick} 
          className="yarn-gradient text-white border-none hover:opacity-90"
        >
          {action.icon && React.createElement(action.icon, { className: "mr-2 h-4 w-4" })}
          {action.label}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;
