// src/data/happeningsData.js

const BASE_SHARE_URL = "https://a2vibe.com/happenings";

export const happeningsData = [
  // --- OCTOBER EVENTS ---
 {
    id: "oct-05",
    name: "Ann Arbor Symphony: The Lord of the Rings Symphony",
    month: "October",
    date: "October 23, 2026",
    time: "7:30 PM",
    address: "825 N University Ave, Ann Arbor, MI 48109 (Hill Auditorium)",
    category: ["Arts & Culture", "Nightlife"],
    price: "Varies",
    neighborhood: "U-M Campus",
    img: "/images/oct-symphony.jpg",
    shortDesc: "A symphonic journey from the Shire to Mordor.",
    longDesc: "<p>An operatic tapestry of J.R.R. Tolkien’s Middle-earth performed by the A2SO, featuring the U-M Men's and Women's Glee Clubs.</p>",
    url: "https://a2so.com/",
    type: "experience",
    share: {
      title: "A2SO: The Lord of the Rings Symphony on A2 Vibe",
      text: "Check out A2SO: The Lord of the Rings Symphony on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-05`
    }
  },
  {
    id: "oct-06",
    name: "Great Lakes Cup Show",
    month: "October",
    date: "October 23 - November 14, 2026",
    time: "12:00 PM - 6:00 PM (Tues, Wed, Fri, Sat)",
    address: "1187 N Main St, Ann Arbor, MI 48104 (Yourist Studio Gallery)",
    category: ["Arts & Culture", "Museums"],
    price: "Free",
    neighborhood: "West Side",
    img: "/images/oct-cupshow.jpg",
    shortDesc: "Juried exhibition highlighting the artistry of ceramic cups.",
    longDesc: "<p>Yourist Studio Gallery hosts this celebration of form and function. Browse unique ceramic cups handmade by 45 juried artists.</p>",
    url: "https://youriststudio.com",
    type: "experience",
    share: {
      title: "Great Lakes Cup Show on A2 Vibe",
      text: "Check out Great Lakes Cup Show on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-06`
    }
  },
  {
    id: "oct-07",
    name: "U-M Football vs. Indiana",
    month: "October",
    date: "October 24, 2026",
    time: "1:00 PM",
    address: "1201 S Main St, Ann Arbor, MI 48104 (Michigan Stadium)",
    category: ["Sports", "Family Friendly"],
    price: "Varies",
    neighborhood: "U-M Campus",
    img: "/images/UMvsIndiana.jpg",
    shortDesc: "The Wolverines take on the Indiana Hoosiers at the Big House.",
    longDesc: "<p>Experience the thrill of Big Ten football as Michigan defends the Big House against the Indiana Hoosiers.</p>",
    url: "https://mgoblue.com/",
    type: "experience",
    share: {
      title: "U-M Football vs. Indiana on A2 Vibe",
      text: "Check out U-M Football vs. Indiana on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-07`
    }
  },
  {
    id: "oct-08",
    name: "Downtown Trick-or-Treat Parade",
    month: "October",
    date: "October 25, 2026",
    time: "11:30 AM - 3:00 PM",
    address: "Main St, Ann Arbor, MI 48104",
    category: ["Family Friendly", "Festivals"],
    price: "Free",
    neighborhood: "Downtown",
    img: "/images/oct-trick.jpg",
    isFeatured: true,
    shortDesc: "Local shops hand out treats to kids on Main Street.",
    longDesc: "<p>A safe and fun afternoon for families to explore downtown stores and collect candy in costume along Main Street.</p>",
    url: "https://www.mainstreetannarbor.org/",
    type: "experience",
    share: {
      title: "Downtown Trick-or-Treat Parade on A2 Vibe",
      text: "Check out Downtown Trick-or-Treat Parade on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-08`
    }
  },
  {
    id: "oct-20",
    name: "Candle-Making Workshop at Bløm",
    month: "October",
    date: "October 27, 2026",
    time: "6:00 PM",
    address: "100 S 4th Ave Ste 110, Ann Arbor, MI 48104 (Bløm Mead + Cider)",
    category: ["Arts & Culture", "Nightlife"],
    price: "Varies",
    neighborhood: "Downtown",
    img: "/images/Candle_Making.jpg",
    shortDesc: "A candle making masterclass paired with local mead and cider.",
    longDesc: "<p>Join Bløm Mead + Cider for a hands-on candle making masterclass. Enjoy crafting your own custom candle while sipping on locally sourced meads and ciders in a cozy downtown setting.</p>",
    url: "https://www.drinkblom.com/",
    type: "experience",
    share: {
      title: "Candle-Making Workshop at Bløm on A2 Vibe",
      text: "Check out the Candle-Making Workshop at Bløm Mead + Cider on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-20`
    }
  },
  {
    id: "oct-09",
    name: "U-M Orchestras Halloween Concert",
    month: "October",
    date: "October 31, 2026",
    time: "2:00 PM - 4:00 PM",
    address: "825 N University Ave, Ann Arbor, MI 48109 (Hill Auditorium)",
    category: ["Arts & Culture", "Family Friendly"],
    price: "$25",
    neighborhood: "U-M Campus",
    img: "/images/oct-umhalloween.jpg",
    isFeatured: true,
    shortDesc: "A spooky and spirited orchestral performance at Hill Auditorium.",
    longDesc: "<p>Members of the University Symphony and Philharmonia Orchestras perform in full costume. Enjoy classic chilling compositions in a highly entertaining atmosphere.</p>",
    url: "https://smtd.umich.edu",
    type: "experience",
    share: {
      title: "U-M Orchestras Halloween Concert on A2 Vibe",
      text: "Check out U-M Orchestras Halloween Concert on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-09`
    }
  },
  {
    id: "oct-19",
    name: "Live Jazz Quartet at Blue LLama",
    month: "October",
    date: "October 25, 2026",
    time: "6:00 PM",
    address: "314 S Main St, Ann Arbor, MI 48104 (Blue LLama Jazz Club and Restaurant)",
    category: ["Arts & Culture", "Nightlife"],
    price: "Varies",
    neighborhood: "Downtown",
    img: "/images/Blue_Llama.jpg",
    shortDesc: "A live indoor jazz quartet performance at Ann Arbor's stylish jazz club.",
    longDesc: "<p>Experience an intimate evening of live music at the Blue LLama Jazz Club. Enjoy a sensational performance by a talented jazz quartet, perfectly paired with the lounge's signature Afro Caribbean-inspired menu and craft cocktails.</p>",
    url: "https://www.bluellamaclub.com/",
    type: "experience",
    share: {
      title: "Live Jazz Quartet at Blue LLama on A2 Vibe",
      text: "Check out Live Jazz Quartet at Blue LLama on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-19`
    }
  },
  {
    id: "oct-16",
    name: "The Mystic Market",
    month: "October",
    date: "October 25, 2026",
    time: "10:00 AM - 6:00 PM",
    address: "114 S Main St, Ann Arbor, MI 48104 (Crazy Wisdom Bookstore)",
    category: ["Shopping", "Hidden Gems", "Arts & Culture"],
    price: "Free",
    neighborhood: "Downtown",
    img: "/images/Crazy-Wisdom-Bookstore-Mystic-Market-2026.jpg",
    shortDesc: "An enchanted artisan gathering featuring mystical makers, intuitive readers, and esoteric crafts.",
    longDesc: "<p>Crazy Wisdom Bookstore hosts an enchanted artisan gathering celebrating the otherworldly, esoteric, and botanical with gifted readers, makers, and photo booths.</p>",
    url: "https://crazywisdom.net",
    type: "experience",
    share: {
      title: "The Mystic Market on A2 Vibe",
      text: "Check out The Mystic Market at Crazy Wisdom on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-16`
    }
  },
  {
    id: "oct-18",
    name: "Ann Arbor Halloween Bar Crawl",
    month: "October",
    date: "October 31, 2026",
    time: "4:00 PM - 12:00 AM",
    address: "315 S State St, Ann Arbor, MI 48104 (The Brown Jug & Downtown Venues)",
    category: ["Nightlife", "Festivals"],
    price: "Varies",
    neighborhood: "U-M Campus / Downtown",
    img: "/images/Halloween-Bar-Crawl.jpg",
    shortDesc: "Spooktacular Halloween bar crawl featuring creepy cocktails and costume contests.",
    longDesc: "<p>Crawl With Us brings a massive Halloween bar crawl through Ann Arbor's top bars, featuring drink specials, professional photographers, custom badges, and an epic after-party.</p>",
    url: "https://www.crawlwith.us/annarbor/halloween",
    type: "experience",
    share: {
      title: "Halloween Bar Crawl on A2 Vibe",
      text: "Check out the Ann Arbor Halloween Bar Crawl on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-18`
    }
  },

  // --- NOVEMBER EVENTS ---
  {
    id: "nov-01",
    name: "U-M Men's Basketball vs. Oakland",
    month: "November",
    date: "November 2, 2026",
    time: "6:00 PM",
    address: "333 Stadium Dr, Ann Arbor, MI 48109 (Crisler Center)",
    category: ["Sports", "Family Friendly"],
    price: "Varies",
    neighborhood: "U-M Campus",
    img: "/images/nov-umbasketball.jpg",
    shortDesc: "Kick off the college basketball season against Oakland at Crisler Center.",
    longDesc: "<p>Join the Maize Rage student section and local fans in cheering on the Michigan Wolverines as they hit the hardwood for an exciting new season against the Oakland Golden Grizzlies.</p>",
    url: "https://mgoblue.com",
    type: "experience",
    share: {
      title: "U-M Men's Basketball vs. Oakland on A2 Vibe",
      text: "Check out U-M Men's Basketball vs. Oakland on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-01`
    }
  },
  {
    id: "nov-02",
    name: "U-M Women's Basketball vs. UConn",
    month: "November",
    date: "November 5, 2026",
    time: "6:30 PM",
    address: "333 Stadium Dr, Ann Arbor, MI 48109 (Crisler Center)",
    category: ["Sports", "Family Friendly"],
    price: "Varies",
    neighborhood: "U-M Campus",
    img: "/images/UM-Womens-Basketball.jpg",
    shortDesc: "The Wolverines take on the Huskies in a major early-season matchup.",
    longDesc: "<p>Head to Crisler Center to watch the Michigan Women's Basketball team battle powerhouse UConn.</p>",
    url: "https://mgoblue.com",
    type: "experience",
    share: {
      title: "U-M Women's Basketball vs. UConn on A2 Vibe",
      text: "Check out U-M Women's Basketball vs. UConn on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-02`
    }
  },
  {
    id: "nov-09",
    name: "Wheel of Fortune Live!",
    month: "November",
    date: "November 3, 2026",
    time: "8:00 PM",
    address: "603 E Liberty St, Ann Arbor, MI 48104 (Michigan Theater)",
    category: ["Arts & Culture", "Family Friendly"],
    price: "Varies",
    neighborhood: "Downtown",
    img: "/images/nov-wheeloffortune.jpg",
    shortDesc: "Experience the thrill of Wheel of Fortune live on stage with a chance to win real prizes.",
    longDesc: "<p>Wheel of Fortune Live! is coming to Ann Arbor for a live, interactive stage experience. Give yourself the chance to be randomly selected to take the stage, spin a replica wheel, solve puzzles, and win real prizes like cash or trips. Note: The historic Michigan Theater does not have an elevator operating between the Main Floor and the Balcony, so keep that in mind when choosing your seats.</p>",
    url: "https://michtheater.org",
    type: "experience",
    share: {
      title: "Wheel of Fortune Live! on A2 Vibe",
      text: "Check out Wheel of Fortune Live! at the Michigan Theater on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-09`
    }
  },
  {
    id: "nov-03",
    name: "U-M Football vs. Michigan State",
    month: "November",
    date: "November 7, 2026",
    time: "1:00 PM",
    address: "1201 S Main St, Ann Arbor, MI 48104 (Michigan Stadium)",
    category: ["Sports", "Festivals"],
    price: "Varies",
    neighborhood: "U-M Campus",
    img: "/images/Michigan-Stadium-1.jpg",
    shortDesc: "The battle for the Paul Bunyan Trophy at the Big House.",
    longDesc: "<p>The in-state rivalry continues as the Wolverines clash with the Spartans at Michigan Stadium.</p>",
    url: "https://mgoblue.com",
    type: "experience",
    share: {
      title: "U-M Football vs. Michigan State on A2 Vibe",
      text: "Check out U-M Football vs. Michigan State on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-03`
    }
  },
  {
    id: "nov-04",
    name: "U-M Men's Basketball vs. Marquette",
    month: "November",
    date: "November 11, 2026",
    time: "7:00 PM",
    address: "333 Stadium Dr, Ann Arbor, MI 48109 (Crisler Center)",
    category: ["Sports", "Family Friendly"],
    price: "Varies",
    neighborhood: "U-M Campus",
    img: "/images/nov-umbasketball.jpg",
    shortDesc: "A prime-time matchup against the Marquette Golden Eagles.",
    longDesc: "<p>Experience the electric atmosphere at Crisler Center during this thrilling out-of-conference test.</p>",
    url: "https://mgoblue.com",
    type: "experience",
    share: {
      title: "U-M Men's Basketball vs. Marquette on A2 Vibe",
      text: "Check out U-M Men's Basketball vs. Marquette on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-04`
    }
  },
  {
    id: "nov-05",
    name: "U-M Football vs. UCLA",
    month: "November",
    date: "November 21, 2026",
    time: "1:00 PM",
    address: "1201 S Main St, Ann Arbor, MI 48104 (Michigan Stadium)",
    category: ["Sports", "Festivals"],
    price: "Varies",
    neighborhood: "U-M Campus",
    img: "/images/Michigan-Vs-UCLA.jpg",
    shortDesc: "Michigan welcomes new Big Ten opponent UCLA to the Big House.",
    longDesc: "<p>Watch the Wolverines take on the Bruins in this exciting cross-country conference matchup.</p>",
    url: "https://mgoblue.com",
    type: "experience",
    share: {
      title: "U-M Football vs. UCLA on A2 Vibe",
      text: "Check out U-M Football vs. UCLA on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-05`
    }
  },
  {
    id: "nov-06",
    name: "Ann Arbor Thanksgiving Day Turkey Trot",
    month: "November",
    date: "November 26, 2026",
    time: "8:15 AM - 10:30 AM",
    address: "E Liberty St & S Fifth Ave, Ann Arbor, MI 48104",
    category: ["Sports", "Family Friendly"],
    price: "$40",
    neighborhood: "Downtown",
    img: "/images/nov-a2turkeytrot.jpg",
    shortDesc: "The classic Thanksgiving morning run through downtown.",
    longDesc: "<p>Join thousands of locals dressed in turkey hats and fall gear for this fast, fun 5K before heading home for Thanksgiving dinner.</p>",
    url: "https://epicraces.com",
    type: "experience",
    share: {
      title: "Ann Arbor Thanksgiving Day Turkey Trot on A2 Vibe",
      text: "Check out Ann Arbor Thanksgiving Day Turkey Trot on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-06`
    }
  },
  {
    id: "nov-07",
    name: "Plaid Friday Downtown Shopping",
    month: "November",
    date: "November 27, 2026",
    time: "9:00 AM - 9:00 PM",
    address: "Main St & Liberty St, Ann Arbor, MI 48104",
    category: ["Shopping", "Festivals"],
    price: "Free",
    neighborhood: "Downtown",
    img: "/images/nov-plaidfriday.jpg",
    shortDesc: "The local alternative to Black Friday.",
    longDesc: "<p>Wear plaid and head to Main Street for a relaxing, community-focused shopping day. Support local independent businesses and enjoy special discounts.</p>",
    url: "https://mainstreetannarbor.org",
    type: "experience",
    share: {
      title: "Plaid Friday Downtown Shopping on A2 Vibe",
      text: "Check out Plaid Friday Downtown Shopping on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-07`
    }
  },
  {
    id: "nov-08",
    name: "U-M vs. Ohio State Watch Parties",
    month: "November",
    date: "November 28, 2026",
    time: "12:00 PM Kickoff",
    address: "Downtown Ann Arbor & Campus Venues, Ann Arbor, MI 48104",
    category: ["Sports", "Festivals"],
    price: "Varies",
    neighborhood: "U-M Campus",
    img: "/images/nov-thegame.jpg",
    shortDesc: "Watch The Game across Ann Arbor's top sports bars.",
    longDesc: "<p>Experience the unmatched energy of rivalry weekend as the Wolverines clash with the Buckeyes in Columbus. Festivities and watch parties take over sports bars and campus venues throughout the city.</p>",
    url: "https://mgoblue.com",
    type: "experience",
    share: {
      title: "U-M vs. Ohio State Watch Parties on A2 Vibe",
      text: "Check out U-M vs. Ohio State Watch Parties on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-08`
    }
  },

  // --- DECEMBER EVENTS ---
  {
    id: "dec-01",
    name: "KindleFest",
    month: "December",
    date: "December 4, 2026",
    time: "5:00 PM - 10:00 PM",
    address: "315 Detroit St, Ann Arbor, MI 48104 (Kerrytown Market & Shops)",
    category: ["Festivals", "Shopping"],
    price: "Free",
    neighborhood: "Kerrytown",
    img: "/images/dec-kindlefest.jpg",
    shortDesc: "Traditional German Christkindlmarkt outdoor market.",
    longDesc: "<p>Enjoy hot mulled wine, traditional holiday treats, and handmade gifts in an incredible European-style atmosphere in the Kerrytown District.</p>",
    url: "https://kerrytown.com/kindlefest",
    type: "experience",
    share: {
      title: "KindleFest on A2 Vibe",
      text: "Check out KindleFest in Kerrytown on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-01`
    }
  },
  {
    id: "dec-02",
    name: "Midnight Madness",
    month: "December",
    date: "December 4, 2026",
    time: "5:00 PM - 12:00 AM",
    address: "Main St, State St & Kerrytown, Ann Arbor, MI 48104",
    category: ["Shopping", "Nightlife"],
    price: "Free",
    neighborhood: "Downtown",
    img: "/images/dec-midnightmadness.jpg",
    shortDesc: "Late-night holiday shopping with festive entertainment.",
    longDesc: "<p>Downtown Ann Arbor stays open late! Enjoy exclusive deals, holiday lights, and street performers across Main Street, State Street, and Kerrytown.</p>",
    url: "https://mainstreetannarbor.org/midnight-madness",
    type: "experience",
    share: {
      title: "Midnight Madness on A2 Vibe",
      text: "Check out Midnight Madness in Downtown Ann Arbor on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-02`
    }
  },
  {
    id: "dec-03",
    name: "The Nutcracker",
    month: "December",
    date: "December 11 - 13, 2026",
    time: "Dec 11 (7:00 PM), Dec 12 (1:00 PM & 6:00 PM), Dec 13 (2:00 PM)",
    address: "121 Fletcher St, Ann Arbor, MI 48109 (Power Center for Performing Arts)",
    category: ["Arts & Culture", "Family Friendly"],
    price: "From $30",
    neighborhood: "U-M Campus",
    img: "/images/dec-nutcracker.jpg",
    shortDesc: "iBallet Studio presents the timeless holiday classic featuring live orchestra music.",
    longDesc: "<p>Immerse yourself this December in Clara’s magical world of toy soldiers, sleigh rides, and dancing sugar plums! The Nutcracker ballet is back in Ann Arbor at the Power Center for Performing Arts. Featuring live orchestra music. The Nutcracker is a timeless holiday classic for all ages. Don't miss the early bird special for the opening night show while tickets last.</p>",
    url: "https://mutotix.umich.edu/",
    type: "experience",
    share: {
      title: "The Nutcracker on A2 Vibe",
      text: "Check out The Nutcracker at the Power Center on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-03`
    }
  },
  {
    id: "dec-04",
    name: "Ann Arbor Symphony Holiday Pops",
    month: "December",
    date: "December 19, 2026",
    time: "7:00 PM",
    address: "825 N University Ave, Ann Arbor, MI 48109 (Hill Auditorium)",
    category: ["Arts & Culture", "Family Friendly"],
    price: "Varies",
    neighborhood: "U-M Campus",
    img: "/images/dec-holidaypops.jpg",
    shortDesc: "Festive concert featuring holiday classics.",
    longDesc: "<p>The Ann Arbor Symphony Orchestra brings seasonal joy to Hill Auditorium with beloved carols, popular holiday tunes, and special guest choirs.</p>",
    url: "https://a2so.com",
    type: "experience",
    share: {
      title: "Holiday Pops Concert on A2 Vibe",
      text: "Check out Holiday Pops Concert on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-04`
    }
  }
];
