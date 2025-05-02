
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MessageSquare, UserRound, Hash } from "lucide-react";

type TabOption = "captions" | "bios" | "hashtags";

interface TabNavigationProps {
  activeTab: TabOption;
  onChange: (tab: TabOption) => void;
}

export const TabNavigation = ({ activeTab, onChange }: TabNavigationProps) => {
  return (
    <div className="w-full flex justify-center mb-8">
      <div className="inline-flex items-center bg-secondary rounded-lg p-1 shadow-sm">
        <TabButton 
          isActive={activeTab === "captions"} 
          onClick={() => onChange("captions")}
          icon={<MessageSquare className="h-4 w-4 mr-2" />}
          label="Captions"
        />
        <TabButton 
          isActive={activeTab === "bios"} 
          onClick={() => onChange("bios")}
          icon={<UserRound className="h-4 w-4 mr-2" />}
          label="Bio"
        />
        <TabButton 
          isActive={activeTab === "hashtags"} 
          onClick={() => onChange("hashtags")}
          icon={<Hash className="h-4 w-4 mr-2" />}
          label="Hashtags"
        />
      </div>
    </div>
  );
};

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton = ({ isActive, onClick, icon, label }: TabButtonProps) => {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "rounded-md px-4 py-2 transition-all",
        isActive && "bg-background shadow-sm"
      )}
    >
      {icon}
      {label}
    </Button>
  );
};
