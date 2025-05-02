
// Utility functions to generate captions, bios, and hashtags

interface CaptionResult {
  captions: string[];
  hashtags: string[];
}

// Sample emojis mapped to content types
const contentEmojis: Record<string, string[]> = {
  selfie: ["📸", "🤳", "😊", "✌️", "💁‍♀️", "💁‍♂️", "🙆‍♀️", "🙆‍♂️"],
  food: ["🍕", "🍔", "🥗", "🍰", "🍦", "🍹", "🍲", "😋", "🍴"],
  travel: ["✈️", "🌍", "🏖️", "🏞️", "🗺️", "🧳", "🚆", "🚗", "⛰️"],
  motivation: ["💪", "🔥", "⚡", "🌟", "✨", "🚀", "📈", "🎯"],
  festival: ["🎉", "🎊", "🎈", "🎆", "🎇", "✨", "🥂", "🎪"],
  business: ["💼", "📊", "📈", "🖥️", "📱", "🤝", "💡", "📌"],
  fashion: ["👗", "👠", "👓", "👜", "🧣", "👒", "💄", "✨"],
  nature: ["🌲", "🌿", "🍃", "🌸", "🌺", "🌅", "🌊", "🦋"],
  fitness: ["💪", "🏃‍♀️", "🏋️‍♂️", "🧘‍♀️", "🥗", "🚴‍♂️", "⛹️‍♀️", "🏆"],
  friendship: ["👯‍♀️", "🤝", "🥂", "❤️", "🎉", "🎈", "🎁", "🎭"],
  love: ["❤️", "💕", "💘", "💓", "💑", "👩‍❤️‍👨", "👩‍❤️‍👩", "👨‍❤️‍👨"],
  family: ["👨‍👩‍👧‍👦", "👨‍👩‍👧", "👪", "❤️", "🏡", "🤱", "👶", "🧒"],
  default: ["✨", "💫", "⭐", "🌟", "💥", "🌈", "🌻", "🦋"],
};

// Caption templates
const captionTemplates: Record<string, string[]> = {
  selfie: [
    "Just me doing my thing {emoji}",
    "Felt cute, might delete later {emoji}",
    "This is my 'I woke up like this' face {emoji}",
    "Being myself because everyone else was taken {emoji}",
    "Confidence level: selfie with no filter {emoji}"
  ],
  food: [
    "Good food, good mood {emoji}",
    "You can't make everyone happy. You're not {food} {emoji}",
    "Life is short, make it sweet {emoji}",
    "Food is my love language {emoji}",
    "Happiness is homemade {emoji}"
  ],
  travel: [
    "Wanderlust and city dust {emoji}",
    "Catch flights, not feelings {emoji}",
    "Adventure awaits {emoji}",
    "Lost in the right direction {emoji}",
    "Life is short, and the world is wide {emoji}"
  ],
  motivation: [
    "Dream bigger. Do bigger. {emoji}",
    "Make today amazing {emoji}",
    "Good things take time {emoji}",
    "Your only limit is your mind {emoji}",
    "Fall seven times, stand up eight {emoji}"
  ],
  festival: [
    "Let the festivities begin! {emoji}",
    "Creating memories that will last a lifetime {emoji}",
    "Festival vibes and high tides {emoji}",
    "Dancing through life with confetti in my hair {emoji}",
    "Life is a festival; celebrate every moment {emoji}"
  ],
  business: [
    "Working hard or hardly working? {emoji}",
    "Building dreams one step at a time {emoji}",
    "Hustle and heart will set you apart {emoji}",
    "Success isn't given, it's earned {emoji}",
    "Creating my own opportunities {emoji}"
  ],
  fashion: [
    "Dress like you're already famous {emoji}",
    "Life isn't perfect, but your outfit can be {emoji}",
    "Style is a way to say who you are without having to speak {emoji}",
    "When in doubt, overdress {emoji}",
    "Fashion fades, style is eternal {emoji}"
  ],
  nature: [
    "Nature never goes out of style {emoji}",
    "Finding peace in nature's embrace {emoji}",
    "Earth laughs in flowers {emoji}",
    "Nature is the art of God {emoji}",
    "In every walk with nature, one receives far more than they seek {emoji}"
  ],
};

// Generate captions
export const generateCaptions = (contentType: string, mood: string, keyword: string, language: string): CaptionResult => {
  const type = contentType.toLowerCase();
  let templates = captionTemplates[type] || captionTemplates.selfie;
  const emojis = contentEmojis[type] || contentEmojis.default;
  
  // Modify templates based on mood
  const moodLower = mood.toLowerCase();
  templates = templates.map(template => {
    let modified = template;
    
    if (moodLower === "funny") {
      modified = `${template} LOL ${getRandomEmoji(["😂", "🤣", "😆", "😹", "😄"])}`;
    } else if (moodLower === "romantic") {
      modified = `${template} ${getRandomEmoji(["❤️", "💕", "💘", "💞", "💖"])}`;
    } else if (moodLower === "savage") {
      modified = `${template} *mic drop* ${getRandomEmoji(["😎", "🔥", "💯", "🙄", "💁‍♀️"])}`;
    } else if (moodLower === "aesthetic") {
      modified = `${template} ✨ ${getRandomEmoji(["🌸", "🌿", "🌙", "🕊️", "🌊"])}`;
    } else if (moodLower === "sad") {
      modified = `${template} ${getRandomEmoji(["😔", "💔", "🥺", "😢", "😞"])}`;
    } else if (moodLower === "happy") {
      modified = `${template} ${getRandomEmoji(["😄", "🥰", "😊", "😁", "🤗"])}`;
    } else if (moodLower === "inspirational") {
      modified = `${template} ${getRandomEmoji(["✨", "💫", "🌟", "🚀", "💡"])}`;
    } else if (moodLower === "sarcastic") {
      modified = `${template} *eye roll* ${getRandomEmoji(["🙄", "😏", "😒", "🤨", "😜"])}`;
    }
    
    return modified;
  });
  
  // Add keyword if provided
  if (keyword) {
    templates = templates.map(template => {
      if (Math.random() > 0.5) {
        return template.replace("{emoji}", `${keyword} {emoji}`);
      }
      return template;
    });
  }
  
  // Replace emoji placeholders
  const captions = templates.map(template => {
    return template.replace("{emoji}", getRandomEmoji(emojis))
      .replace("{food}", keyword || "pizza");
  });
  
  // Generate hashtags
  const hashtagKeyword = keyword || contentType;
  const hashtags = generateHashtags(hashtagKeyword, "instagram", language);
  
  // Filter and return results
  return {
    captions: shuffleArray(captions).slice(0, 5),
    hashtags: hashtags.slice(0, 10)
  };
};

// Bio templates
const bioTemplates: Record<string, string[]> = {
  cool: [
    "Living life on my own terms {emoji}",
    "Too busy enjoying life to update my bio {emoji}",
    "I'm not trying to be different. To me, I'm just being myself {emoji}",
    "Turning dreams into reality since [birth year] {emoji}",
    "Not perfect, but genuine {emoji}"
  ],
  motivational: [
    "Dream big, work hard, stay focused {emoji}",
    "Creating the life I've always wanted {emoji}",
    "Fall seven times, stand up eight {emoji}",
    "Your attitude determines your direction {emoji}",
    "The best is yet to come {emoji}"
  ],
  funny: [
    "Professional overthinker with a sense of humor {emoji}",
    "I put the 'pro' in procrastinate {emoji}",
    "My hobbies include breakfast, lunch, and dinner {emoji}",
    "According to my mom, I'm special {emoji}",
    "I'm on a seafood diet. I see food and I eat it {emoji}"
  ],
  love: [
    "Loving deeply and living simply {emoji}",
    "Heart full of gratitude and soul full of dreams {emoji}",
    "Spreading love wherever I go {emoji}",
    "Life is short, but love is eternal {emoji}",
    "Finding the magic in everyday moments {emoji}"
  ],
  religious: [
    "Faith over fear {emoji}",
    "Walk by faith, not by sight {emoji}",
    "God's grace is sufficient {emoji}",
    "In a world of trends, I follow the truth {emoji}",
    "Let your light shine {emoji}"
  ],
  entrepreneur: [
    "Creating my own opportunities {emoji}",
    "Building dreams, one day at a time {emoji}",
    "Turning coffee into business plans {emoji}",
    "Work until your bank account looks like a phone number {emoji}",
    "CEO of my own life {emoji}"
  ],
  minimalist: [
    "Less is more {emoji}",
    "Simplicity is the ultimate sophistication {emoji}",
    "Living intentionally {emoji}",
    "Quality over quantity {emoji}",
    "Embracing minimalism in a maximum world {emoji}"
  ],
  artistic: [
    "Creating beauty out of chaos {emoji}",
    "Life is art. Make it your masterpiece {emoji}",
    "Finding poetry in everyday moments {emoji}",
    "Colors are the smiles of nature {emoji}",
    "Where words fail, art speaks {emoji}"
  ],
};

// Bio emojis
const bioEmojis: Record<string, string[]> = {
  cool: ["😎", "✌️", "🤘", "🔥", "⚡", "💫", "✨"],
  motivational: ["💪", "🚀", "🌟", "✨", "📈", "🎯", "🏆"],
  funny: ["😂", "🤣", "😜", "🤪", "🙃", "😅", "🤓"],
  love: ["❤️", "💕", "💞", "💓", "💗", "💖", "🥰"],
  religious: ["🙏", "✝️", "☪️", "✡️", "🕉️", "☸️", "🕊️"],
  entrepreneur: ["💼", "📊", "💡", "📱", "💰", "🚀", "📈"],
  minimalist: ["☯️", "🧘‍♂️", "🧘‍♀️", "🕊️", "🌿", "🍃", "⚪"],
  artistic: ["🎨", "🖌️", "🎭", "🎬", "📸", "🖼️", "✍️"],
  default: ["✨", "💫", "⭐", "🌟", "💥", "🌈", "🌻"],
};

// Generate bios
export const generateBios = (style: string, keyword: string, language: string): string[] => {
  const styleKey = style.toLowerCase();
  const templates = bioTemplates[styleKey] || bioTemplates.cool;
  const emojis = bioEmojis[styleKey] || bioEmojis.default;
  
  let bios = templates.map(template => {
    // Replace emoji placeholder
    let bio = template.replace("{emoji}", getRandomEmoji(emojis));
    
    // Add keyword if provided
    if (keyword) {
      if (bio.length + keyword.length + 3 <= 150) {
        bio = bio.includes("[birth year]") 
          ? bio.replace("[birth year]", "1995")
          : `${bio} • ${keyword}`;
      }
    } else {
      bio = bio.replace("[birth year]", "1995");
    }
    
    return bio;
  });
  
  // Ensure bios are under 150 characters
  bios = bios.map(bio => bio.length > 150 ? bio.substring(0, 147) + "..." : bio);
  
  return shuffleArray(bios).slice(0, 5);
};

// Hashtag templates for different platforms
const platformHashtags: Record<string, string[]> = {
  instagram: ["love", "instagood", "photooftheday", "fashion", "beautiful", "happy", "cute", "like", "follow", "picoftheday", "selfie", "summer", "art", "instadaily", "friends", "reels", "nature", "fun", "style", "smile", "food", "travel", "instalike", "likeforlikes", "family", "fitness", "life", "photography", "beauty", "photo"],
  tiktok: ["fyp", "foryoupage", "viral", "trending", "fypシ", "tiktok", "viralvideo", "tiktokindia", "trendingreels", "explore", "comedy", "dance", "duet", "music", "pov", "memes", "funny", "challenge", "xyzbca", "tiktokers", "sound", "loveyoutiktok", "fypdongggggggg", "viralpost", "trend", "videoviral", "tiktokviral", "explorepage", "greenscreen", "blowthisup"],
  youtube: ["youtube", "youtuber", "ytcreator", "video", "subscribe", "youtubesubscriber", "youtubechannel", "youtubers", "youtubevideo", "vlog", "vlogger", "content", "contentcreator", "creator", "shorts", "youtubeshorts", "shortvideo", "howto", "tutorial", "review", "gameplay", "podcast", "gaming", "streamer", "stream"]
};

// Generate hashtags
export const generateHashtags = (keyword: string, platform: string, language: string): string[] => {
  const baseHashtags = platformHashtags[platform] || platformHashtags.instagram;
  
  // Create hashtags from the keyword
  let keywordHashtags: string[] = [];
  
  if (keyword) {
    const keywordLower = keyword.toLowerCase();
    keywordHashtags = [
      `#${keywordLower.replace(/\s+/g, "")}`,
      `#${keywordLower.replace(/\s+/g, "_")}`,
      `#${keywordLower.replace(/\s+/g, "")}love`,
      `#${keywordLower.replace(/\s+/g, "")}life`,
      `#${keywordLower.replace(/\s+/g, "")}lifestyle`,
      `#${keywordLower.replace(/\s+/g, "")}lover`,
      `#${keywordLower.replace(/\s+/g, "")}photography`,
      `#${keywordLower.replace(/\s+/g, "")}oftheday`,
      `#${keywordLower.replace(/\s+/g, "")}gram`,
      `#${keywordLower.replace(/\s+/g, "")}daily`
    ];
  }
  
  // Combine and shuffle all hashtags
  const combinedHashtags = keywordHashtags.concat(baseHashtags.map(tag => `#${tag}`));
  
  // Return unique, shuffled hashtags
  return Array.from(new Set(shuffleArray(combinedHashtags))).slice(0, 15);
};

// Helper functions
function getRandomEmoji(emojis: string[]): string {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
