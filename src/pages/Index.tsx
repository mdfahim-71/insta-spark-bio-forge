
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TabNavigation } from "@/components/TabNavigation";
import { CaptionGenerator } from "@/components/generators/CaptionGenerator";
import { BioGenerator } from "@/components/generators/BioGenerator";
import { HashtagGenerator } from "@/components/generators/HashtagGenerator";

type TabOption = "captions" | "bios" | "hashtags";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabOption>("captions");
  const [mounted, setMounted] = useState(false);
  const [tabChanging, setTabChanging] = useState(false);

  // Animation effect on mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle tab change with smooth transitions
  const handleTabChange = (tab: TabOption) => {
    if (tab !== activeTab) {
      setTabChanging(true);
      setTimeout(() => {
        setActiveTab(tab);
        setTimeout(() => setTabChanging(false), 50);
      }, 200);
    }
  };

  return (
    <div className={`min-h-screen bg-background pb-20 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 mb-20">
        <div className="text-center my-10">
          <h2 className="text-3xl font-bold tracking-tight mb-3 animate-bounce-in">
            Social Media Caption &amp; Bio Generator
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Create engaging Instagram captions, professional bios, and trending hashtags
            in seconds with our AI-powered generator.
          </p>
        </div>
        
        <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <TabNavigation activeTab={activeTab} onChange={handleTabChange} />
        </div>
        
        <div className={`transition-all duration-300 ${tabChanging ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
          {activeTab === "captions" && <CaptionGenerator />}
          {activeTab === "bios" && <BioGenerator />}
          {activeTab === "hashtags" && <HashtagGenerator />}
        </div>
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-sm py-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            CaptionForge AI &copy; {new Date().getFullYear()} - Instagram Caption &amp; Bio Generator
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
