
import { ThemeToggle } from "./ThemeToggle";
import { Sparkles } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const [sparkleOpacity, setSparkleOpacity] = useState<number[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  
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
    
    // Add smooth scroll behavior
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (headerRef.current) {
        if (scrollPosition > 10) {
          headerRef.current.classList.add('shadow-sm', 'bg-background/80', 'backdrop-blur-sm');
        } else {
          headerRef.current.classList.remove('shadow-sm', 'bg-background/80', 'backdrop-blur-sm');
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToFAQ = () => {
    const faqSection = document.getElementById('faq');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      ref={headerRef} 
      className="w-full pt-6 pb-4 sticky top-0 z-30 transition-all duration-300"
    >
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
          <Button 
            variant="ghost" 
            onClick={scrollToFAQ}
            className="hover:bg-primary/10 hidden md:flex"
          >
            FAQ
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
