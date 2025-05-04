
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { TabNavigation } from "@/components/TabNavigation";
import { CaptionGenerator } from "@/components/generators/CaptionGenerator";
import { BioGenerator } from "@/components/generators/BioGenerator";
import { HashtagGenerator } from "@/components/generators/HashtagGenerator";
import { ProfileForm } from "@/components/ProfileForm";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle } from "lucide-react";

type TabOption = "captions" | "bios" | "hashtags" | "profile";

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabOption>("captions");
  const [mounted, setMounted] = useState(false);
  const [tabChanging, setTabChanging] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Animation effect on mount
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen bg-background pb-20 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 mb-10">
        <div className="text-center my-10 md:my-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 animate-bounce-in">
            Social Media Caption &amp; Bio Generator
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Create engaging Instagram captions, professional bios, and trending hashtags
            in seconds with our AI-powered generator.
          </p>
        </div>
        
        <div className="animate-fade-in bg-card shadow-md rounded-xl p-6 mb-16" style={{ animationDelay: '0.3s' }}>
          <TabNavigation 
            activeTab={activeTab} 
            onChange={handleTabChange as (tab: string) => void}
            tabs={[
              { id: "captions", label: "Captions" },
              { id: "bios", label: "Bios" },
              { id: "hashtags", label: "Hashtags" },
              { id: "profile", label: "Profile Form" }
            ]}
          />
          
          <div className={`transition-all duration-300 ${tabChanging ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
            {activeTab === "captions" && <CaptionGenerator />}
            {activeTab === "bios" && <BioGenerator />}
            {activeTab === "hashtags" && <HashtagGenerator />}
            {activeTab === "profile" && <ProfileForm />}
          </div>
        </div>
        
        {/* Features section */}
        <section className="py-12 mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-10 text-center gradient-text">
            Why Choose CaptionForge AI
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Quick & Engaging",
                description: "Generate attention-grabbing captions in seconds for any type of content."
              },
              {
                title: "Professional Bios",
                description: "Create polished bios that highlight your personal brand or business perfectly."
              },
              {
                title: "Trending Hashtags",
                description: "Discover relevant hashtags that increase your content's visibility and reach."
              }
            ].map((feature, i) => (
              <div key={i} className={`p-6 rounded-xl shadow-sm bg-card hover-glow stagger-item stagger-${i+1}`}>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        <FAQ />
      </main>
      
      {/* Scroll to top button */}
      <button 
        onClick={scrollToTop} 
        className={`fixed bottom-20 right-6 bg-primary text-white p-2 rounded-full shadow-lg transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUpCircle className="h-6 w-6" />
      </button>
      
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
