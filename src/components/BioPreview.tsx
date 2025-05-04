
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { User, Link as LinkIcon, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface BioPreviewProps {
  name: string;
  bio: string;
  socialLink: string;
}

export const BioPreview = ({ name, bio, socialLink }: BioPreviewProps) => {
  // Format social link for display
  const formatSocialLink = (url: string) => {
    if (!url) return "";
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  const socialLinkFormatted = formatSocialLink(socialLink);

  // Generate initials from name
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";
    
  // Generate a username for the bio link
  const generateUsername = (name: string) => {
    if (!name) return "profile";
    return name.toLowerCase().replace(/\s+/g, "-");
  };
  
  // Handle copying the bio link to clipboard
  const handleCopyLink = () => {
    const username = generateUsername(name);
    const bioLink = `/user/${username}`;
    
    navigator.clipboard.writeText(bioLink)
      .then(() => {
        toast({
          title: "Link copied!",
          description: `${bioLink} has been copied to your clipboard`,
        });
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
        toast({
          title: "Copy failed",
          description: "Could not copy the link to clipboard",
          variant: "destructive",
        });
      });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg animate-fade-in">
      <CardHeader className="bg-gradient-primary p-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-background/90 flex items-center justify-center shadow-sm">
            {initials ? (
              <span className="text-xl font-semibold text-primary">{initials}</span>
            ) : (
              <User className="h-6 w-6 text-primary" />
            )}
          </div>
          <div className="text-left">
            <h3
              className={cn(
                "text-xl font-bold text-primary-foreground",
                !name && "text-primary-foreground/70"
              )}
            >
              {name || "Your Name"}
            </h3>
            {socialLink && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <a
                    href={socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-foreground/80 flex items-center gap-1 hover:underline mt-1"
                  >
                    <LinkIcon className="h-3 w-3" />
                    {socialLinkFormatted}
                  </a>
                </HoverCardTrigger>
                <HoverCardContent className="w-auto p-2">
                  <span className="text-xs">{socialLink}</span>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="min-h-[100px]">
          <p
            className={cn(
              "text-foreground leading-relaxed",
              !bio && "text-muted-foreground italic"
            )}
          >
            {bio || "Your bio will appear here..."}
          </p>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/30 px-6 py-4 border-t flex flex-col gap-3">
        <div className="w-full">
          {name && bio ? (
            <div className="bg-primary/10 p-2 rounded text-center">
              <span className="text-sm font-medium text-primary">Profile complete! ✨</span>
            </div>
          ) : (
            <div className="bg-muted p-2 rounded text-center">
              <span className="text-sm text-muted-foreground">Add more details to complete your profile</span>
            </div>
          )}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 transition-all" 
          onClick={handleCopyLink}
          disabled={!name}
        >
          <Copy className="h-4 w-4" /> Copy Bio Link
        </Button>
      </CardFooter>
    </Card>
  );
};
