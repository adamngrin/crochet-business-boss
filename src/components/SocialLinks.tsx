
import React from "react";
import { Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SocialLinks = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/profile.php?id=61560856492820",
      color: "bg-blue-600 text-white hover:bg-blue-700",
      hoverEffect: "hover:scale-110 transition-transform",
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/catherine_crochets/",
      color: "bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white hover:from-pink-600 hover:via-purple-600 hover:to-pink-700",
      hoverEffect: "hover:scale-110 transition-transform",
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <TooltipProvider>
        {socialLinks.map((social) => (
          <Tooltip key={social.name}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`rounded-full w-10 h-10 ${social.color} ${social.hoverEffect} shadow-md`}
                asChild
              >
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon size={18} />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Visit our {social.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default SocialLinks;
