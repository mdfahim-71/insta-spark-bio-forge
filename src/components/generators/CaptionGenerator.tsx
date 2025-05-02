
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { MessageSquare, Copy, Star, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateCaptions } from "@/lib/generators";

const CONTENT_TYPES = [
  "Selfie", "Food", "Travel", "Motivation", 
  "Festival", "Business", "Fashion", "Nature",
  "Fitness", "Friendship", "Love", "Family",
];

const MOODS = [
  "Funny", "Romantic", "Savage", "Aesthetic", 
  "Sad", "Happy", "Inspirational", "Sarcastic",
  "Nostalgic", "Excited", "Grateful", "Reflective",
];

const LANGUAGES = [
  { label: "English", value: "english" },
  { label: "Bengali", value: "bengali" },
  { label: "Hindi", value: "hindi" },
];

export const CaptionGenerator = () => {
  const { toast } = useToast();
  const [contentType, setContentType] = useState("");
  const [mood, setMood] = useState("");
  const [keyword, setKeyword] = useState("");
  const [language, setLanguage] = useState("english");
  const [captions, setCaptions] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favoriteCaptions");
    return saved ? JSON.parse(saved) : [];
  });

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const result = generateCaptions(contentType, mood, keyword, language);
      setCaptions(result.captions);
      setHashtags(result.hashtags);
      setLoading(false);
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Caption has been copied to your clipboard",
    });
  };

  const toggleFavorite = (caption: string) => {
    let newFavorites;
    if (favorites.includes(caption)) {
      newFavorites = favorites.filter(fav => fav !== caption);
      toast({ title: "Removed from favorites" });
    } else {
      newFavorites = [...favorites, caption];
      toast({ title: "Added to favorites" });
    }
    
    setFavorites(newFavorites);
    localStorage.setItem("favoriteCaptions", JSON.stringify(newFavorites));
  };

  const copyAllHashtags = () => {
    navigator.clipboard.writeText(hashtags.join(" "));
    toast({
      title: "Copied all hashtags",
      description: "All hashtags have been copied to your clipboard",
    });
  };

  return (
    <div className="w-full animate-fade-in">
      <Card className="generator-card">
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="content-type">Content Type</Label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger id="content-type">
                    <SelectValue placeholder="Choose content type" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTENT_TYPES.map(type => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="mood">Mood</Label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger id="mood">
                    <SelectValue placeholder="Choose mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOODS.map(moodOption => (
                      <SelectItem key={moodOption} value={moodOption.toLowerCase()}>
                        {moodOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label htmlFor="keyword">Keyword or Phrase (optional)</Label>
              <Input
                id="keyword"
                placeholder="e.g., coffee, sunset, friendship"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language">
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
              disabled={!contentType || !mood || loading}
              className="w-full"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating Captions...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate Captions
                </span>
              )}
            </Button>
          </div>
          
          {captions.length > 0 && (
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Caption Suggestions
                </h3>
                <div className="space-y-3">
                  {captions.map((caption, index) => (
                    <div key={index} className="result-item group">
                      <p className="pr-16">{caption}</p>
                      <div className="absolute top-3 right-3 flex space-x-1">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => toggleFavorite(caption)}
                          className="h-8 w-8"
                        >
                          <Star className={`h-4 w-4 ${favorites.includes(caption) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          onClick={() => copyToClipboard(caption)}
                          className="h-8 w-8"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {hashtags.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Hash className="h-5 w-5 text-primary" />
                      Suggested Hashtags
                    </h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={copyAllHashtags}
                      className="flex items-center gap-1 text-xs"
                    >
                      <Copy className="h-3 w-3" />
                      Copy All
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {hashtags.map((hashtag, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-secondary rounded-full text-sm hover:bg-primary/20 transition-colors cursor-pointer"
                        onClick={() => copyToClipboard(hashtag)}
                      >
                        {hashtag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
