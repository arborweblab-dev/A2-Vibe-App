// src/data/happeningsData.js

const BASE_SHARE_URL = "https://a2vibe.com/happenings";

export const happeningsData = [
  // --- OCTOBER EVENTS ---
  {
    id: "oct-01",
    name: "Edgefest 30: Freedom at the Edge",
    month: "October",
    date: "October 7 - 10, 2026",
    time: "6:00 PM - 10:30 PM",
    address: "415 N 4th Ave, Ann Arbor, MI 48104 (Kerrytown Concert House)",
    category: ["Arts & Culture", "Festivals"],
    price: "$20",
    neighborhood: "Kerrytown",
    img: "/images/oct-edgefest.jpg",
    shortDesc: "Premier festival for avant-garde and improvisational music.",
    longDesc: "<p>Hosted by the Kerrytown Concert House, this long-running 30th annual festival brings world-class experimental jazz and new music to Ann Arbor for several days of exciting performances.</p>",
    url: "https://kerrytownconcerthouse.com/edgefest",
    type: "experience",
    share: {
      title: "Edgefest on A2 Vibe",
      text: "Check out Edgefest at Kerrytown Concert House on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-01`
    }
  },
  {
    id: "oct-02",
    name: "U-M Museum of Art: Fall Re-Opening Celebration",
    month: "October",
    date: "October 10, 2026",
    time: "12:00 PM - 5:00 PM",
    address: "525 S State St, Ann Arbor, MI 48109",
    category: ["Museums", "Arts & Culture"],
    price: "Free",
    neighborhood: "U-M Campus",
    img: "/images/oct-ummaa.jpg",
    shortDesc: "Special opening celebration for the museum's fall collection.",
    longDesc: "<p>Explore new contemporary exhibits and classic works in the newly curated UMMA galleries. Free and open to the public.</p>",
    url: "https://umma.umich.edu/",
    type: "experience",
    share: {
      title: "U-M Museum of Art: Fall Re-Opening on A2 Vibe",
      text: "Check out U-M Museum of Art: Fall Re-Opening on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-02`
    }
  },
  {
    id: "oct-03",
    name: "Ann Arbor Antiquarian Book Fair",
    month: "October",
    date: "October 11, 2026",
    time: "11:00 AM - 5:00 PM",
    address: "530 S State St, Ann Arbor, MI 48109 (Michigan Union Ballroom)",
    category: ["Hidden Gems", "Shopping"],
    price: "$5",
    neighborhood: "U-M Campus",
    img: "/images/oct-bookfair.jpg",
    shortDesc: "Dozens of dealers selling rare, collectible, and first edition books.",
    longDesc: "<p>Held at the Michigan Union, this 50th annual event benefits the William L. Clements Library. Discover old prints, maps, and incredible pieces of Americana.</p>",
    url: "https://mwaba.com",
    type: "experience",
    share: {
      title: "Ann Arbor Antiquarian Book Fair on A2 Vibe",
      text: "Check out Ann Arbor Antiquarian Book Fair on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-03`
    }
  },
  {
    id: "oct-04",
    name: "U-M Football vs. Penn State",
    month: "October",
    date: "October 17, 2026",
    time: "3:30 PM",
    address: "1201 S Main St, Ann Arbor, MI 48104 (Michigan Stadium)",
    category: ["Sports", "Festivals"],
    price: "Varies",
    neighborhood: "U-M Campus",
    img: "/images/oct-football.jpg",
    shortDesc: "The Wolverines take on the Penn State Nittany Lions.",
    longDesc: "<p>The tradition continues at the Big House. Expect packed streets and spirited festivities all over the Diag.</p>",
    url: "https://mgoblue.com/",
    type: "experience",
    share: {
      title: "U-M Football vs. Penn State on A2 Vibe",
      text: "Check out U-M Football vs. Penn State on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-04`
    }
  },
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
    time: "11:30AM to 3:00PM",
    address: "Main St, Ann Arbor, MI 48104",
    category: ["Family Friendly", "Festivals"],
    price: "Free",
    neighborhood: "Downtown",
    img: "/images/oct-trick.jpg",
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
    img: "/images/nov-football-ucla.jpg",
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
    name: "The Nutcracker Ballet",
    month: "December",
    date: "December 14 - 15, 2026",
    time: "7:00 PM",
    address: "603 E Liberty St, Ann Arbor, MI 48104 (Michigan Theater)",
    category: ["Arts & Culture", "Family Friendly"],
    price: "$46",
    neighborhood: "Downtown",
    img: "/images/dec-nutcracker.jpg",
    shortDesc: "World Ballet Company brings the timeless ballet to life.",
    longDesc: "<p>Watch dancers perform this magical winter classic, complete with beautiful costumes, grand sets, and Tchaikovsky's unforgettable score.</p>",
    url: "https://michtheater.org",
    type: "experience",
    share: {
      title: "The Nutcracker Ballet on A2 Vibe",
      text: "Check out The Nutcracker Ballet at Michigan Theater on A2 Vibe!",
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
  },
  {
    id: "dec-05",
    name: "NYE at The Ark",
    month: "December",
    date: "December 31, 2026",
    time: "8:00 PM - 12:30 AM",
    address: "316 S Main St, Ann Arbor, MI 48104",
    category: ["Nightlife", "Arts & Culture"],
    price: "$45",
    neighborhood: "Downtown",
    img: "/images/dec-theark.jpg",
    shortDesc: "Ring in the New Year with exceptional live folk music.",
    longDesc: "<p>Celebrate New Year's Eve in Ann Arbor's premier acoustic music venue. Expect incredible live performances, a warm community vibe, and a midnight toast.</p>",
    url: "https://theark.org",
    type: "experience",
    share: {
      title: "NYE at The Ark on A2 Vibe",
      text: "Ring in the New Year at The Ark on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-05`
    }
  }
];
