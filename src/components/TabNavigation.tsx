
import { cn } from "@/lib/utils";

type TabOption = "captions" | "bios" | "hashtags";

interface TabNavigationProps {
  activeTab: TabOption;
  onChange: (tab: TabOption) => void;
}

export const TabNavigation = ({
  activeTab,
  onChange,
}: TabNavigationProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-6 rounded-xl border bg-background p-1">
      {[
        { id: "captions", label: "Captions" },
        { id: "bios", label: "Bios" },
        { id: "hashtags", label: "Hashtags" },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id as TabOption)}
          className={cn(
            "flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
            activeTab === tab.id
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
