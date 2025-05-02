
import { ThemeToggle } from "./ThemeToggle";
import { Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="w-full pt-6 pb-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 animate-fade-in">
          <Sparkles className="h-6 w-6 text-primary animate-pulse-light" />
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="gradient-text">CaptionForge</span>
            <span className="ml-1 font-normal">AI</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
