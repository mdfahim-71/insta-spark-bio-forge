
import { ThemeToggle } from "./ThemeToggle";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export const Header = () => {
  const [sparkleOpacity, setSparkleOpacity] = useState<number[]>([]);
  
  // Create randomized sparkle animation effect
  useEffect(() => {
    // Initialize sparkle opacities
    const opacities = Array(3).fill(0).map(() => Math.random());
    setSparkleOpacity(opacities);
    
    // Update sparkles periodically
    const interval = setInterval(() => {
      setSparkleOpacity(prev => 
        prev.map(() => Math.random() * 0.7 + 0.3) // Random between 0.3 and 1.0
      );
    }, 1500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full pt-6 pb-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2 animate-fade-in">
          <div className="relative">
            <Sparkles className="h-6 w-6 text-primary animate-float" />
            {sparkleOpacity.map((opacity, i) => (
              <div 
                key={i}
                className="absolute top-0 left-0 h-6 w-6 text-primary"
                style={{ 
                  opacity: opacity,
                  transform: `scale(${1 + i * 0.5})`,
                  transition: 'opacity 1.5s ease'
                }}
              >
                <Sparkles className="h-full w-full" />
              </div>
            ))}
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="gradient-text hover-scale-subtle inline-block">CaptionForge</span>
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
