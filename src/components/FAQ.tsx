
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQ = () => {
  const faqItems = [
    {
      question: "How does the AI caption generator work?",
      answer: "Our AI caption generator uses advanced machine learning algorithms to analyze context and generate engaging, relevant captions tailored to your needs. Simply input your preferences, and our AI will create multiple options for you to choose from."
    },
    {
      question: "Are the generated captions unique?",
      answer: "Yes! Each caption is uniquely generated based on your inputs and preferences. While the AI learns from patterns, it creates original content for every request, ensuring your social media stands out from the crowd."
    },
    {
      question: "Can I edit the generated captions?",
      answer: "Absolutely! All generated captions are fully editable. Use them as-is or as a creative starting point to craft your perfect message. You can copy, modify, or combine different suggestions to create the ideal caption for your post."
    },
    {
      question: "How many captions can I generate?",
      answer: "Our standard service allows you to generate multiple caption options for each request. If you need higher volume generation for professional use, check out our premium plans designed for content creators and marketing teams."
    },
    {
      question: "What types of content does CaptionForge work best with?",
      answer: "CaptionForge AI excels at creating captions for Instagram, TikTok, and other social media platforms. It's effective for various content types including lifestyle posts, product photos, travel images, food pictures, and professional announcements."
    },
  ];

  return (
    <section className="py-16 bg-muted/30 rounded-xl" id="faq">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center gradient-text">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card shadow-sm rounded-lg mb-4 px-4 hover-scale-subtle"
            >
              <AccordionTrigger className="text-lg font-medium py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
