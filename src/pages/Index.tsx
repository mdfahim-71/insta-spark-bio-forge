
import { useState } from "react";
import { Header } from "@/components/Header";
import { TabNavigation } from "@/components/TabNavigation";
import { CaptionGenerator } from "@/components/generators/CaptionGenerator";
import { BioGenerator } from "@/components/generators/BioGenerator";
import { HashtagGenerator } from "@/components/generators/HashtagGenerator";

type TabOption = "captions" | "bios" | "hashtags";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabOption>("captions");

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 mb-20">
        <div className="text-center my-10 animate-fade-in">
          <h2 className="text-3xl font-bold tracking-tight mb-3">
            Social Media Caption &amp; Bio Generator
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create engaging Instagram captions, professional bios, and trending hashtags
            in seconds with our AI-powered generator.
          </p>
        </div>
        
        <TabNavigation activeTab={activeTab} onChange={setActiveTab} />
        
        <div className="animate-slide-up">
          {activeTab === "captions" && <CaptionGenerator />}
          {activeTab === "bios" && <BioGenerator />}
          {activeTab === "hashtags" && <HashtagGenerator />}
        </div>
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 border-t bg-background/80 backdrop-blur-sm py-3">
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
