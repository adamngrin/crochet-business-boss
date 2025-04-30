
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTutorial } from "@/contexts/TutorialContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ChevronDown, HelpCircle, CircleCheck } from "lucide-react";

const tutorialSteps = [
  {
    title: "Welcome to Catherine Crochets!",
    description: "Let's take a quick tour to help you get the most out of your crochet business management app.",
    image: "dashboard",
  },
  {
    title: "Dashboard Overview",
    description: "View your sales, inventory, and upcoming orders at a glance. The dashboard gives you quick insights into your business performance.",
    image: "dashboard",
  },
  {
    title: "Manage Products",
    description: "Add, edit, and organize your crochet items by category. Track inventory levels and set pricing for all your creations.",
    image: "products",
    route: "/products"
  },
  {
    title: "Custom Orders",
    description: "Schedule and manage special orders from your customers. Keep track of project timelines and delivery dates.",
    image: "custom-orders",
    route: "/custom-orders"
  },
  {
    title: "Store Inventory",
    description: "Monitor items placed in different stores. Track sales performance across multiple locations.",
    image: "stores",
    route: "/stores"
  }
];

const Tutorial = () => {
  const { showTutorial, setShowTutorial, currentStep, setCurrentStep, totalSteps } = useTutorial();
  const [isOpen, setIsOpen] = useState(showTutorial);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(showTutorial);
  }, [showTutorial]);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTutorial(false);
    }
  };

  const handleSkip = () => {
    setShowTutorial(false);
  };

  const handleNavigateToFeature = () => {
    const currentRoute = tutorialSteps[currentStep - 1]?.route;
    if (currentRoute) {
      navigate(currentRoute);
    }
    handleNext();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-white rounded-xl border-yarn-lavender border-2">
        <DialogHeader>
          <div className="w-12 h-12 rounded-full mx-auto mb-2 yarn-gradient flex items-center justify-center">
            {currentStep === totalSteps ? (
              <CircleCheck className="h-6 w-6 text-white" />
            ) : (
              <HelpCircle className="h-6 w-6 text-white" />
            )}
          </div>
          <DialogTitle className="text-center text-xl font-semibold text-yarn-lavender">
            {tutorialSteps[currentStep - 1]?.title}
          </DialogTitle>
          <DialogDescription className="text-center py-2">
            {tutorialSteps[currentStep - 1]?.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="flex justify-center items-center">
            <div 
              className="w-full h-40 relative overflow-hidden rounded-lg bg-pink-50 flex items-center justify-center"
            >
              <div className="text-center">
                <div className="text-yarn-lavender mb-2">
                  {tutorialSteps[currentStep - 1]?.image === "dashboard" && <img src="/placeholder.svg" alt="Dashboard Screenshot" className="w-32 h-32 mx-auto opacity-60" />}
                  {tutorialSteps[currentStep - 1]?.image === "products" && <img src="/placeholder.svg" alt="Products Screenshot" className="w-32 h-32 mx-auto opacity-60" />}
                  {tutorialSteps[currentStep - 1]?.image === "custom-orders" && <img src="/placeholder.svg" alt="Custom Orders Screenshot" className="w-32 h-32 mx-auto opacity-60" />}
                  {tutorialSteps[currentStep - 1]?.image === "stores" && <img src="/placeholder.svg" alt="Stores Screenshot" className="w-32 h-32 mx-auto opacity-60" />}
                </div>
                <div className="text-sm text-muted-foreground">
                  {tutorialSteps[currentStep - 1]?.route && "Click 'Explore' to check out this feature"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-2 mb-4">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                currentStep === index + 1 ? "bg-yarn-lavender" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <DialogFooter className="flex justify-between sm:justify-between gap-2">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="text-gray-500"
          >
            {currentStep === totalSteps ? "Close" : "Skip Tour"}
          </Button>
          <div className="flex gap-2">
            {tutorialSteps[currentStep - 1]?.route && (
              <Button onClick={handleNavigateToFeature} className="bg-yarn-sage text-white hover:bg-yarn-sage/90">
                Explore
              </Button>
            )}
            {currentStep < totalSteps && (
              <Button onClick={handleNext} className="bg-yarn-lavender text-white hover:bg-yarn-lavender/90">
                Next <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}
            {currentStep === totalSteps && !tutorialSteps[currentStep - 1]?.route && (
              <Button onClick={handleSkip} className="bg-yarn-lavender text-white hover:bg-yarn-lavender/90">
                Finish
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Tutorial;
