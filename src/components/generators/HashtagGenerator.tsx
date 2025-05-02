
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Hash, Copy, Sparkles, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { generateHashtags } from "@/lib/generators";

const PLATFORMS = [
  { label: "Instagram", value: "instagram" },
  { label: "TikTok", value: "tiktok" },
  { label: "YouTube", value: "youtube" },
];

const LANGUAGES = [
  { label: "English", value: "english" },
  { label: "Bengali", value: "bengali" },
  { label: "Hindi", value: "hindi" },
];

export const HashtagGenerator = () => {
  const { toast } = useToast();
  const [keyword, setKeyword] = useState("");
  const [platform, setPlatform] = useState("instagram");
  const [language, setLanguage] = useState("english");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!keyword.trim()) {
      toast({
        title: "Keyword required",
        description: "Please enter a keyword to generate hashtags",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      const result = generateHashtags(keyword, platform, language);
      setHashtags(result);
      setLoading(false);
    }, 1000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Hashtag has been copied to your clipboard",
    });
  };

  const copyAllHashtags = () => {
    navigator.clipboard.writeText(hashtags.join(" "));
    toast({
      title: "Copied all hashtags",
      description: "All hashtags have been copied to your clipboard",
    });
  };

  const shareHashtags = () => {
    if (navigator.share) {
      navigator.share({
        title: "Hashtags from CaptionForge AI",
        text: hashtags.join(" "),
      })
      .then(() => toast({ title: "Shared successfully!" }))
      .catch((error) => console.log("Error sharing", error));
    } else {
      copyAllHashtags();
    }
  };

  return (
    <div className="w-full animate-fade-in">
      <Card className="generator-card">
        <CardContent className="pt-6">
          <div className="grid gap-6">
            <div>
              <Label htmlFor="hashtag-keyword">Keyword</Label>
              <Input
                id="hashtag-keyword"
                placeholder="e.g., fitness, sunset, fashion"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="platform">Platform</Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger id="platform">
                    <SelectValue placeholder="Choose platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map(plt => (
                      <SelectItem key={plt.value} value={plt.value}>
                        {plt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="hashtag-language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="hashtag-language">
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
            </div>
            
            <Button 
              onClick={handleGenerate} 
              disabled={!keyword || loading}
              className="w-full"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Generating Hashtags...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate Hashtags
                </span>
              )}
            </Button>
          </div>
          
          {hashtags.length > 0 && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <Hash className="h-5 w-5 text-primary" />
                  Generated Hashtags
                </h3>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={shareHashtags}
                    className="flex items-center gap-1 text-xs"
                  >
                    <Share2 className="h-3 w-3" />
                    Share
                  </Button>
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
              </div>
              
              <div className="flex flex-wrap gap-2">
                {hashtags.map((hashtag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-secondary rounded-full text-sm hover:bg-primary/20 transition-colors cursor-pointer"
                    onClick={() => copyToClipboard(hashtag)}
                    title="Click to copy"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
              
              <div className="mt-6 p-4 border rounded-lg bg-secondary/50">
                <Label className="text-sm font-medium">All Hashtags</Label>
                <div className="mt-2 p-3 bg-background rounded border break-all">
                  <p className="text-sm">{hashtags.join(" ")}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
