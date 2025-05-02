
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserRound, Copy, Star, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateBios } from "@/lib/generators";

const STYLES = [
  "Cool", "Motivational", "Funny", "Love", 
  "Religious", "Entrepreneur", "Minimalist", "Artistic",
  "Gamer", "Foodie", "Travel", "Fitness",
];

const LANGUAGES = [
  { label: "English", value: "english" },
  { label: "Bengali", value: "bengali" },
  { label: "Hindi", value: "hindi" },
];

export const BioGenerator = () => {
  const { toast } = useToast();
  const [style, setStyle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [language, setLanguage] = useState("english");
  const [bios, setBios] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteBios");
    return saved ? JSON.parse(saved) : [];
  });

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const result = generateBios(style, keyword, language);
      setBios(result);
      setLoading(false);
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Bio has been copied to your clipboard",
    });
  };

  const toggleFavorite = (bio: string) => {
    let newFavorites;
    if (favorites.includes(bio)) {
      newFavorites = favorites.filter(fav => fav !== bio);
      toast({ title: "Removed from favorites" });
    } else {
      newFavorites = [...favorites, bio];
      toast({ title: "Added to favorites" });
    }
    
    setFavorites(newFavorites);
    localStorage.setItem("favoriteBios", JSON.stringify(newFavorites));
  };

  return (
    <div className="w-full animate-fade-in">
      <Card className="generator-card">
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div>
              <Label htmlFor="style">Style</Label>
              <Select value={style} onValueChange={setStyle}>
                <SelectTrigger id="style">
                  <SelectValue placeholder="Choose bio style" />
                </SelectTrigger>
                <SelectContent>
                  {STYLES.map(styleOption => (
                    <SelectItem key={styleOption} value={styleOption.toLowerCase()}>
                      {styleOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="bio-keyword">Keyword or Interest (optional)</Label>
              <Input
                id="bio-keyword"
                placeholder="e.g., photography, travel, writer"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="bio-language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="bio-language">
                  <SelectValue placeholder="Choose language" />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGES.map(lang => (
                    <SelectItem key={lang.value} value={lang.value}>
                      {lang.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleGenerate} 
              disabled={!style || loading}
              className="w-full"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating Bios...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate Instagram Bios
                </span>
              )}
            </Button>
          </div>
          
          {bios.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <UserRound className="h-5 w-5 text-primary" />
                Bio Suggestions
              </h3>
              <div className="space-y-3">
                {bios.map((bio, index) => (
                  <div key={index} className="result-item group">
                    <p className="pr-16">{bio}</p>
                    <div className="absolute top-3 right-3 flex space-x-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => toggleFavorite(bio)}
                        className="h-8 w-8"
                      >
                        <Star className={`h-4 w-4 ${favorites.includes(bio) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => copyToClipboard(bio)}
                        className="h-8 w-8"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {favorites.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                Saved Favorites
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto no-scrollbar">
                {favorites.map((fav, index) => (
                  <div key={index} className="result-item">
                    <p className="pr-16">{fav}</p>
                    <div className="absolute top-3 right-3 flex space-x-1">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => toggleFavorite(fav)}
                        className="h-8 w-8"
                      >
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => copyToClipboard(fav)}
                        className="h-8 w-8"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
