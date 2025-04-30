
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
      className="rounded-full w-8 h-8 fixed bottom-4 right-4 z-50 bg-white border border-yarn-lavender shadow-md"
      onClick={handleStartTutorial}
    >
      <HelpCircle size={16} className="text-yarn-lavender" />
    </Button>
  );
};

export default TutorialButton;
