
import React from "react";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useTutorial } from "@/contexts/TutorialContext";

const TutorialButton = () => {
  const { setShowTutorial, setCurrentStep } = useTutorial();

  const handleStartTutorial = () => {
    setCurrentStep(1);
    setShowTutorial(true);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full w-10 h-10 fixed bottom-6 right-6 z-50 bg-white border border-yarn-lavender shadow-md hover:scale-110 transition-transform"
      onClick={handleStartTutorial}
    >
      <HelpCircle size={18} className="text-yarn-lavender" />
    </Button>
  );
};

export default TutorialButton;
