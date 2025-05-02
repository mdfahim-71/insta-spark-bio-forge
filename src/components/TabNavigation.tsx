
import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";

type TabOption = "captions" | "bios" | "hashtags";

interface TabNavigationProps {
  activeTab: TabOption;
  onChange: (tab: TabOption) => void;
}

export const TabNavigation = ({
  activeTab,
  onChange,
}: TabNavigationProps) => {
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const updateTabIndicator = () => {
    if (!tabsRef.current || !indicatorRef.current) return;
    
    const activeTabElement = tabsRef.current.querySelector(`[data-tab-id="${activeTab}"]`) as HTMLElement;
    if (activeTabElement) {
      const { left, width } = activeTabElement.getBoundingClientRect();
      const { left: containerLeft } = tabsRef.current.getBoundingClientRect();
      
      indicatorRef.current.style.width = `${width}px`;
      indicatorRef.current.style.transform = `translateX(${left - containerLeft}px)`;
    }
  };

  useEffect(() => {
    updateTabIndicator();
    window.addEventListener('resize', updateTabIndicator);
    return () => window.removeEventListener('resize', updateTabIndicator);
  }, [activeTab]);

  return (
    <div 
      ref={tabsRef} 
      className="grid grid-cols-3 gap-2 mb-6 rounded-xl border bg-background p-1 relative animate-fade-in"
    >
      {/* Tab indicator */}
      <div 
        ref={indicatorRef}
        className="absolute top-1 h-[calc(100%-0.5rem)] bg-primary rounded-lg shadow-sm tab-indicator z-0"
        aria-hidden="true"
      />
      
      {[
        { id: "captions", label: "Captions" },
        { id: "bios", label: "Bios" },
        { id: "hashtags", label: "Hashtags" },
      ].map((tab, index) => (
        <button
          key={tab.id}
          data-tab-id={tab.id}
          onClick={() => onChange(tab.id as TabOption)}
          className={cn(
            "flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-300 z-10 relative",
            activeTab === tab.id
              ? "text-primary-foreground shadow-sm animate-rotate-in"
              : "text-muted-foreground hover:text-foreground"
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
