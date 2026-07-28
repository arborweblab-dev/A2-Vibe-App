// src/data/journalData.js

export const journalPosts = [
  {
    id: 1,
    title: "Late Night Bites in Tree Town",
    excerpt: "Where to go when the cravings hit after midnight...",
    author: "City Insider",
    img: "/images/late-night-bites.jpg", // Save your images in the /public/images/ folder
    category: "Dining Reviews",
    allCategories: ["Dining Reviews", "City Life"],
    type: "article",
    // You can write your HTML directly in this string
    longDesc: "<h3>The Best Midnight Snacks</h3><p>When the bars close on Main Street, you need to know exactly where to head next...</p>"
  },
  {
    id: 2,
    title: "Hidden Art Alleys",
    excerpt: "Discover the murals tucked away in the city center.",
    author: "A2 Vibe Team",
    img: "/images/murals.jpg",
    category: "Arts & Culture",
    allCategories: ["Arts & Culture", "Local Secrets"],
    type: "article",
    longDesc: "<h3>Beyond the Graffiti Alley</h3><p>Everyone knows the main spots, but if you look closer...</p>"
  }
];
