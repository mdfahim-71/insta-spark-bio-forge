
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link, User } from "lucide-react";
import { BioPreview } from "@/components/BioPreview";
import { toast } from "@/hooks/use-toast";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(50),
  bio: z.string().max(160, { message: "Bio cannot exceed 160 characters" }),
  socialLink: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
});

type ProfileFormValues = z.infer<typeof formSchema>;

// LocalStorage key
const STORAGE_KEY = "user_profile_data";

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

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      
      if (savedData) {
        const parsedData = JSON.parse(savedData) as Partial<ProfileFormValues>;
        
        // Reset form with saved values
        form.reset(parsedData);
        
        // Update character count if bio exists
        if (parsedData.bio) {
          setCharCount(parsedData.bio.length);
        }
        
        toast({
          title: "Profile loaded",
          description: "Your saved profile data has been loaded successfully",
        });
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, [form]);

  // Save data to localStorage whenever form values change
  useEffect(() => {
    const subscription = form.watch((data) => {
      if (data.name || data.bio || data.socialLink) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Form submitted:", data);
    // Save to localStorage on explicit submit
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      toast({
        title: "Profile saved!",
        description: "Your profile has been saved successfully",
      });
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      toast({
        title: "Save failed",
        description: "Could not save your profile data",
        variant: "destructive",
      });
    }
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
        <Card className="overflow-hidden shadow-lg border-0 bg-card/50 backdrop-blur-sm transition-all duration-300">
          <CardHeader className="pb-2 border-b bg-gradient-to-r from-primary/10 to-primary/5">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Information
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-sm font-medium">
                        <User className="h-4 w-4" /> Your Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          className="transition-all duration-200 hover:border-primary focus:border-primary" 
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
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
                      <FormLabel className="flex items-center justify-between text-sm font-medium">
                        <span>Bio</span>
                        <span className="text-xs text-muted-foreground">
                          {charCount}/160
                        </span>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us a little about yourself..." 
                          className="resize-none transition-all duration-200 min-h-[100px]"
                          {...field}
                          onChange={handleBioChange}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
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
                      <FormLabel className="flex items-center gap-2 text-sm font-medium">
                        <Link className="h-4 w-4" /> Social Media Link
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://twitter.com/username" 
                          {...field} 
                          className="transition-all duration-200 hover:border-primary focus:border-primary" 
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Your primary social media profile
                      </FormDescription>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full transition-all duration-300 bg-gradient-to-r from-primary to-brand-pink hover:shadow-md hover:shadow-primary/20 hover:-translate-y-1"
                  disabled={!form.formState.isValid}
                >
                  Save Profile
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Live Preview Section */}
        <Card className="overflow-hidden shadow-lg border-0 bg-card/50 backdrop-blur-sm transition-all duration-300">
          <CardHeader className="pb-2 border-b bg-gradient-to-r from-primary/10 to-primary/5">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Live Preview
            </CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <BioPreview 
              name={watchAllFields.name} 
              bio={watchAllFields.bio}
              socialLink={watchAllFields.socialLink}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
