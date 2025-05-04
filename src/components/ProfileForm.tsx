
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link, User } from "lucide-react";
import { cn } from "@/lib/utils";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50),
  bio: z.string().max(160, { message: "Bio cannot exceed 160 characters" }),
  socialLink: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof formSchema>;

export const ProfileForm = () => {
  // Initialize with default values
  const defaultValues: Partial<ProfileFormValues> = {
    name: "",
    bio: "",
    socialLink: "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const watchAllFields = form.watch();
  const [charCount, setCharCount] = useState(0);

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Form submitted:", data);
    // Here you would typically send the data to an API
  };

  // Handle character count for bio
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCharCount(value.length);
    form.setValue("bio", value, { shouldValidate: true });
  };

  return (
    <div className="container max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Form Section */}
        <div className="card-enhanced p-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Profile Information</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" /> Your Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="hover-scale-subtle" />
                    </FormControl>
                    <FormDescription>
                      Your full name as you'd like it to appear
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <span className="flex items-center gap-2">Bio <span className="text-xs text-muted-foreground">({charCount}/160)</span></span>
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell us a little about yourself..." 
                        className="resize-none hover-scale-subtle"
                        {...field}
                        onChange={handleBioChange}
                      />
                    </FormControl>
                    <FormDescription>
                      A short bio to introduce yourself
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="socialLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Link className="h-4 w-4" /> Social Media Link
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://twitter.com/username" {...field} className="hover-scale-subtle" />
                    </FormControl>
                    <FormDescription>
                      Your primary social media profile
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full hover-glow"
                disabled={!form.formState.isValid}
              >
                Save Profile
              </Button>
            </form>
          </Form>
        </div>
        
        {/* Live Preview Section */}
        <div className="card-enhanced p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-bold mb-6 gradient-text">Live Preview</h2>
          
          <div className="border rounded-lg p-6 bg-background/50 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center">
                {watchAllFields.name ? (
                  <span className="text-xl font-semibold">
                    {watchAllFields.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                ) : (
                  <User className="h-6 w-6 text-primary" />
                )}
              </div>
              <div>
                <h3 className={cn("text-xl font-bold", watchAllFields.name ? "" : "text-muted-foreground")}>
                  {watchAllFields.name || "Your Name"}
                </h3>
                {watchAllFields.socialLink && (
                  <a 
                    href={watchAllFields.socialLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary flex items-center gap-1 hover:underline"
                  >
                    <Link className="h-3 w-3" /> 
                    {watchAllFields.socialLink.replace(/(^\w+:|^)\/\//, '').split('/')[0]}
                  </a>
                )}
              </div>
            </div>
            
            <div className="mt-4">
              <p className={cn("text-muted-foreground italic", watchAllFields.bio ? "text-foreground not-italic" : "")}>
                {watchAllFields.bio || "Your bio will appear here..."}
              </p>
            </div>
            
            <div className="mt-4 text-xs text-muted-foreground">
              {watchAllFields.name && watchAllFields.bio ? (
                <div className="bg-primary/10 p-2 rounded text-center">
                  Profile preview complete! ✨
                </div>
              ) : (
                <div className="bg-muted p-2 rounded text-center">
                  Add more details to complete your profile
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 p-4 border border-dashed rounded-lg bg-muted/30">
            <h4 className="font-medium mb-2 text-sm">Preview Tips</h4>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Your initials will display if you provide your name</li>
              <li>• Links will be formatted automatically</li>
              <li>• Keep your bio concise for best appearance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

