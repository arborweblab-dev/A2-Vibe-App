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
    time: "11:30 AM - 3:00 PM",
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
  {
    id: "oct-10",
    name: "Jay Stevens: Live Stand-Up Comedy",
    month: "October",
    date: "October 8 - 10, 2026",
    time: "7:15 PM - 8:45 PM",
    address: "212 S Fourth Ave, Ann Arbor, MI 48104 (Ann Arbor Comedy Showcase)",
    category: ["Arts & Culture", "Nightlife"],
    price: "Varies",
    neighborhood: "Downtown",
    img: "/images/Comedian-Jay-Stevens.jpg",
    shortDesc: "Viral clean comedian and Dry Bar Comedy star performs live in downtown Ann Arbor.",
    longDesc: "<p>Jay Stevens brings over 20 years of professional stand-up experience and clean, relatable humor to the Ann Arbor Comedy Showcase for a three-night run.</p>",
    url: "https://aacomedy.com",
    type: "experience",
    share: {
      title: "Jay Stevens Live on A2 Vibe",
      text: "Check out Jay Stevens live at the Ann Arbor Comedy Showcase on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-10`
    }
  },
  {
    id: "oct-11",
    name: "A2 Artoberfest",
    month: "October",
    date: "October 10 - 11, 2026",
    time: "Sat (10:00 AM - 6:00 PM), Sun (10:00 AM - 4:00 PM)",
    address: "Main St (Washington to Williams), Ann Arbor, MI 48104",
    category: ["Arts & Culture", "Festivals", "Shopping"],
    price: "Free",
    neighborhood: "Downtown",
    img: "/images/A2-Artoberfest-2026.jpg",
    shortDesc: "A celebration of the arts featuring juried artists, live entertainment, and hands-on activities.",
    longDesc: "<p>Stroll down Main Street in downtown Ann Arbor for Artoberfest, featuring talented artisans, delicious local food, live music, and family-friendly art-making activities.</p>",
    url: "https://annarbor.org",
    type: "experience",
    share: {
      title: "A2 Artoberfest on A2 Vibe",
      text: "Check out A2 Artoberfest on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-11`
    }
  },
  {
    id: "oct-12",
    name: "Banned Books Read-In Ann Arbor",
    month: "October",
    date: "October 10, 2026",
    time: "1:00 PM - 2:30 PM",
    address: "2513 Jackson Ave, Ann Arbor, MI 48103",
    category: ["Arts & Culture", "Family Friendly"],
    price: "Free",
    neighborhood: "West Side",
    img: "/images/Banned-Books-Ann-Arbor.jpg",
    shortDesc: "Community reading event celebrating and discussing challenged books.",
    longDesc: "<p>Grab your favorite banned book and join fellow readers for this community read-in created by Libro.fm and Silent Book Club.</p>",
    url: "https://libro.fm",
    type: "experience",
    share: {
      title: "Banned Books Read-In on A2 Vibe",
      text: "Check out the Banned Books Read-In on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-12`
    }
  },
  {
    id: "oct-13",
    name: "Permanent HOMES Halloween Party & Beer Release",
    month: "October",
    date: "October 10, 2026",
    time: "4:00 PM - 10:00 PM",
    address: "112 Jackson Plaza, Ann Arbor, MI 48103 (HOMES Campus)",
    category: ["Nightlife", "Festivals"],
    price: "Free",
    neighborhood: "West Side",
    img: "/images/Homes-Halloween-Party.jpg",
    shortDesc: "Annual Halloween party featuring vintage cellar beer releases, screenings, and a costume contest.",
    longDesc: "<p>HOMES Campus hosts its massive Halloween party and vintage bottle release with a costume contest, 80s horror vinyl DJing, classic movie screenings in the gallery, tarot readings, and pumpkin painting.</p>",
    url: "https://homesbrewery.com",
    type: "experience",
    share: {
      title: "Permanent HOMES Halloween Party on A2 Vibe",
      text: "Check out the Permanent HOMES Halloween Party on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-13`
    }
  },
  {
    id: "oct-14",
    name: "BOGO Free Day at MilkShake Factory",
    month: "October",
    date: "October 14, 2026",
    time: "11:30 AM - 10:00 PM",
    address: "326 S Maple Rd, Suite 326, Ann Arbor, MI 48103",
    category: ["Flavors", "Shopping"],
    price: "Free",
    neighborhood: "West Side",
    img: "/images/BOGO-Milkshakes.jpg",
    shortDesc: "Buy one, get one free frozen treats for National Dessert Day.",
    longDesc: "<p>Celebrate National Dessert Day at the MilkShake Factory with a BOGO free offer on all handspun milkshakes, sundaes, floats, and molten cups.</p>",
    url: "https://milkshakefactory.com",
    type: "experience",
    share: {
      title: "BOGO MilkShake Factory on A2 Vibe",
      text: "Check out the MilkShake Factory BOGO Free Day on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-14`
    }
  },
  {
    id: "oct-15",
    name: "Monthly Clothing & Halloween Costume Swap + Mending",
    month: "October",
    date: "October 15, 2026",
    time: "4:00 PM - 7:00 PM",
    address: "301 E Huron St, Ann Arbor, MI 48104",
    category: ["Shopping", "Family Friendly"],
    price: "Free",
    neighborhood: "Downtown",
    img: "/images/Clothing-Swap.jpg",
    shortDesc: "A²ZERO monthly clothing swap with a special focus on Halloween costumes and repair clinics.",
    longDesc: "<p>Refresh your wardrobe and find Halloween costumes sustainably at this free community swap, featuring an All Hands Active mending and repair clinic.</p>",
    url: "https://a2zero.org",
    type: "experience",
    share: {
      title: "Clothing & Costume Swap on A2 Vibe",
      text: "Check out the Monthly Clothing & Halloween Costume Swap on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-15`
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
    id: "oct-17",
    name: "The Ark's Open Stage Event",
    month: "October",
    date: "October 21, 2026",
    time: "7:30 PM",
    address: "316 S Main St, Ann Arbor, MI 48104 (The Ark)",
    category: ["Arts & Culture", "Nightlife"],
    price: "Varies",
    neighborhood: "Downtown",
    img: "/images/the-ark.jpg",
    shortDesc: "Supportive stage for local musicians and performers to share their music.",
    longDesc: "<p>Take your music to the masses at The Ark's legendary Open Stage night. Performers get 8 minutes or 2 songs in a supportive, historic listening room environment.</p>",
    url: "https://theark.org",
    type: "experience",
    share: {
      title: "The Ark's Open Stage on A2 Vibe",
      text: "Check out Open Stage at The Ark on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-17`
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
  {
    id: "oct-19",
    name: "The Rocky Horror Picture Show at Michigan Theater",
    month: "October",
    date: "October 31, 2026",
    time: "10:00 PM",
    address: "603 E Liberty St, Ann Arbor, MI 48104",
    category: ["Arts & Culture", "Nightlife"],
    price: "$15",
    neighborhood: "Downtown",
    img: "/images/Rocky-Horror.jpg",
    shortDesc: "The ultimate cult classic Halloween tradition.",
    longDesc: "<p>Join the tradition at the historic Michigan Theater for a raucous, prop-filled midnight-style screening of The Rocky Horror Picture Show. Costumes and audience participation are highly encouraged!</p>",
    url: "https://michtheater.org",
    type: "experience",
    share: {
      title: "Rocky Horror at Michigan Theater on A2 Vibe",
      text: "Check out The Rocky Horror Picture Show on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-19`
    }
  },
  {
    id: "oct-20",
    name: "The Creature Conservancy: Howl-O-Ween",
    month: "October",
    date: "October 24 - 25, 2026",
    time: "1:00 PM - 5:00 PM",
    address: "4940 Ann Arbor-Saline Rd, Ann Arbor, MI 48103",
    category: ["Family Friendly", "Arts & Culture"],
    price: "$12",
    neighborhood: "South Ann Arbor",
    img: "/images/Spooky.jpg",
    shortDesc: "Celebrate Halloween with the animals at The Creature Conservancy.",
    longDesc: "<p>Bring the family in costume for special animal presentations, spooky displays, and a chance to meet the resident sloths, cougars, and creepy crawlies.</p>",
    url: "https://thecreatureconservancy.org",
    type: "experience",
    share: {
      title: "Howl-O-Ween at Creature Conservancy on A2 Vibe",
      text: "Check out Howl-O-Ween at The Creature Conservancy on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-20`
    }
  },
  {
    id: "oct-21",
    name: "Ann Arbor Farmers Market: Fall Harvest Festival",
    month: "October",
    date: "October 28, 2026",
    time: "7:00 AM - 3:00 PM",
    address: "315 Detroit St, Ann Arbor, MI 48104",
    category: ["Flavors", "Shopping"],
    price: "Free",
    neighborhood: "Kerrytown",
    img: "/images/Fall-Harvest.jpg",
    shortDesc: "Celebrate the peak of Michigan's autumn harvest season.",
    longDesc: "<p>Stock up on local apples, cider, pumpkins, and hearty fall vegetables. Local vendors will feature seasonal baked goods and hot cider to keep you warm while you shop.</p>",
    url: "https://www.a2gov.org/departments/Parks-Recreation/parks-places/farmers-market",
    type: "experience",
    share: {
      title: "Farmers Market Fall Harvest on A2 Vibe",
      text: "Check out the Fall Harvest Festival at the Ann Arbor Farmers Market on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-21`
    }
  },
  {
    id: "oct-22",
    name: "Blind Pig - Pajamas Play Bowie (4th Annual Halloween Tribute)",
    month: "October",
    date: "October 31, 2026",
    time: "9:00 PM - 2:00 AM",
    address: "208 S First St, Ann Arbor, MI 48104",
    category: ["Nightlife", "Arts & Culture"],
    price: "$15",
    neighborhood: "Downtown",
    img: "/images/Pajamas.jpg",
    shortDesc: "Ann Arbor's legendary live music venue hosts its annual Halloween costume party.",
    longDesc: "<p>Dance the night away at The Blind Pig's legendary Halloween Bash featuring local bands covering famous artists, a massive costume contest, and drink specials all night.</p>",
    url: "https://blindpigmusic.com",
    type: "experience",
    share: {
      title: "Blind Pig Halloween Bash on A2 Vibe",
      text: "Check out the Halloween Bash at The Blind Pig on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-22`
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
  {
    id: "nov-09",
    name: "Ann Arbor Jewish Book Festival",
    month: "November",
    date: "November 8 - 15, 2026",
    time: "Various Times",
    address: "2935 Birch Hollow Dr, Ann Arbor, MI 48108 (Jewish Community Center)",
    category: ["Arts & Culture", "Family Friendly"],
    price: "Varies (Many Free)",
    neighborhood: "South Ann Arbor",
    img: "/images/nov-bookfest.jpg",
    shortDesc: "Annual literary festival featuring acclaimed authors and community events.",
    longDesc: "<p>The JCC of Greater Ann Arbor hosts its annual celebration of Jewish literature, culture, and arts. Enjoy author talks, book signings, and thought-provoking panel discussions throughout the week.</p>",
    url: "https://jccannarbor.org",
    type: "experience",
    share: {
      title: "Ann Arbor Jewish Book Festival on A2 Vibe",
      text: "Check out the Ann Arbor Jewish Book Festival on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-09`
    }
  },
  {
    id: "nov-10",
    name: "Holiday Art Shop Opening",
    month: "November",
    date: "November 13, 2026",
    time: "11:00 AM - 7:00 PM",
    address: "117 W Liberty St, Ann Arbor, MI 48104 (Ann Arbor Art Center)",
    category: ["Shopping", "Arts & Culture"],
    price: "Free",
    neighborhood: "Downtown",
    img: "/images/nov-artcenter.jpg",
    shortDesc: "Find unique, handcrafted gifts by local artists for the holiday season.",
    longDesc: "<p>The Ann Arbor Art Center transforms its gallery space into a vibrant holiday market. Shop original ceramics, jewelry, prints, and textiles made directly by local Michigan artists.</p>",
    url: "https://annarborartcenter.org",
    type: "experience",
    share: {
      title: "Holiday Art Shop at A2AC on A2 Vibe",
      text: "Check out the Holiday Art Shop Opening at the Ann Arbor Art Center on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-10`
    }
  },
  {
    id: "nov-11",
    name: "U-M Men's Ice Hockey vs. Michigan State",
    month: "November",
    date: "November 20, 2026",
    time: "7:00 PM",
    address: "1016 S State St, Ann Arbor, MI 48109 (Yost Ice Arena)",
    category: ["Sports", "Nightlife"],
    price: "Varies",
    neighborhood: "U-M Campus",
    img: "/images/nov-hockeymsu.jpg",
    shortDesc: "Intense in-state hockey rivalry at Yost Ice Arena.",
    longDesc: "<p>The rivalry comes to the ice as the Wolverines battle the Michigan State Spartans. The atmosphere inside Yost for this matchup is famously electric.</p>",
    url: "https://mgoblue.com",
    type: "experience",
    share: {
      title: "U-M Hockey vs. MSU on A2 Vibe",
      text: "Check out U-M Hockey vs. Michigan State at Yost on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-11`
    }
  },
  {
    id: "nov-12",
    name: "UMS Presents: Jazz at the Michigan Theater",
    month: "November",
    date: "November 14, 2026",
    time: "8:00 PM",
    address: "603 E Liberty St, Ann Arbor, MI 48104 (Michigan Theater)",
    category: ["Arts & Culture", "Nightlife"],
    price: "From $25",
    neighborhood: "Downtown",
    img: "/images/nov-umsjazz.jpg",
    shortDesc: "World-class jazz performance presented by the University Musical Society.",
    longDesc: "<p>The University Musical Society (UMS) brings a top-tier jazz ensemble to the historic Michigan Theater for a night of incredible rhythm, improvisation, and musical mastery.</p>",
    url: "https://ums.org",
    type: "experience",
    share: {
      title: "UMS Jazz at Michigan Theater on A2 Vibe",
      text: "Check out UMS Presents: Jazz at the Michigan Theater on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-12`
    }
  },
  {
    id: "nov-13",
    name: "Festive Lighting of Main Street",
    month: "November",
    date: "November 20, 2026",
    time: "6:00 PM",
    address: "Main St, Ann Arbor, MI 48104",
    category: ["Family Friendly", "Festivals"],
    price: "Free",
    neighborhood: "Downtown",
    img: "/images/nov-treelighting.jpg",
    shortDesc: "Downtown Ann Arbor flips the switch on the holiday lights.",
    longDesc: "<p>Gather in downtown Ann Arbor as the city officially lights up Main Street for the holiday season. Enjoy carolers, hot cocoa specials from local cafes, and the magic of a lit-up downtown.</p>",
    url: "https://mainstreetannarbor.org",
    type: "experience",
    share: {
      title: "Main Street Holiday Lighting on A2 Vibe",
      text: "Check out the Festive Lighting of Main Street on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-13`
    }
  },
  {
    id: "nov-14",
    name: "Zingerman's Deli: Holiday Food Tasting Event",
    month: "November",
    date: "November 18, 2026",
    time: "6:30 PM - 8:30 PM",
    address: "422 Detroit St, Ann Arbor, MI 48104",
    category: ["Flavors", "Hidden Gems"],
    price: "$45",
    neighborhood: "Kerrytown",
    img: "/images/nov-zingermans.jpg",
    shortDesc: "Sample Zingerman's finest holiday meats, cheeses, and baked goods.",
    longDesc: "<p>Get ready for hosting season! Zingerman's Deli experts guide you through a curated tasting of exclusive holiday cheeses, cured meats, artisan breads, and festive confections.</p>",
    url: "https://zingermansdeli.com",
    type: "experience",
    share: {
      title: "Zingerman's Holiday Tasting on A2 Vibe",
      text: "Check out Zingerman's Deli Holiday Tasting Event on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-14`
    }
  },
  {
    id: "nov-15",
    name: "Matthaei Botanical Gardens: Winter Conservatory Display",
    month: "November",
    date: "Nov 28 - Dec 31, 2026",
    time: "10:00 AM - 4:30 PM",
    address: "1800 N Dixboro Rd, Ann Arbor, MI 48105",
    category: ["Arts & Culture", "Family Friendly", "Hidden Gems"],
    price: "Free",
    neighborhood: "East Ann Arbor",
    img: "/images/nov-matthaei.jpg",
    shortDesc: "Escape the cold in the lush, beautifully decorated tropical conservatory.",
    longDesc: "<p>Wander through the warm, humid climate of the Matthaei Botanical Gardens conservatory, specially decorated with beautiful winter blooms, amaryllis, and festive botanical displays.</p>",
    url: "https://mbgna.umich.edu",
    type: "experience",
    share: {
      title: "Winter Conservatory Display on A2 Vibe",
      text: "Check out the Matthaei Winter Conservatory Display on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-15`
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
  },
  {
    id: "dec-05",
    name: "Handel's Messiah by UMS",
    month: "December",
    date: "December 5 - 6, 2026",
    time: "Sat (8:00 PM), Sun (2:00 PM)",
    address: "825 N University Ave, Ann Arbor, MI 48109 (Hill Auditorium)",
    category: ["Arts & Culture", "Family Friendly"],
    price: "From $20",
    neighborhood: "U-M Campus",
    img: "/images/dec-messiah.jpg",
    shortDesc: "The spectacular annual performance of Handel's masterwork.",
    longDesc: "<p>A cornerstone of the Ann Arbor holiday season. The UMS Choral Union and the Ann Arbor Symphony Orchestra combine forces in acoustically perfect Hill Auditorium to perform Handel's soaring Messiah.</p>",
    url: "https://ums.org",
    type: "experience",
    share: {
      title: "Handel's Messiah on A2 Vibe",
      text: "Check out Handel's Messiah at Hill Auditorium on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-05`
    }
  },
  {
    id: "dec-06",
    name: "Kerrytown Menorah Lighting",
    month: "December",
    date: "December 8, 2026",
    time: "5:30 PM",
    address: "315 Detroit St, Ann Arbor, MI 48104 (Kerrytown Courtyard)",
    category: ["Festivals", "Family Friendly"],
    price: "Free",
    neighborhood: "Kerrytown",
    img: "/images/dec-menorah.jpg",
    shortDesc: "Community Chanukah celebration with music and treats.",
    longDesc: "<p>Join Chabad of Ann Arbor for the public Menorah lighting in the Kerrytown Courtyard. Festivities include lively music, traditional sufganiyot (jelly donuts), and a joyful community gathering.</p>",
    url: "https://jewmich.com",
    type: "experience",
    share: {
      title: "Kerrytown Menorah Lighting on A2 Vibe",
      text: "Check out the Kerrytown Menorah Lighting on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-06`
    }
  },
  {
    id: "dec-07",
    name: "Tiny Expo Indie Art & Craft Fair",
    month: "December",
    date: "December 12, 2026",
    time: "11:00 AM - 6:00 PM",
    address: "343 S Fifth Ave, Ann Arbor, MI 48104 (AADL Downtown)",
    category: ["Shopping", "Arts & Culture"],
    price: "Free",
    neighborhood: "Downtown",
    img: "/images/dec-tinyexpo.jpg",
    shortDesc: "Annual indie craft fair hosted at the Downtown Library.",
    longDesc: "<p>Shop local for the holidays! Tiny Expo features over 40 artists and crafters selling their handmade wares in the lobby of the Ann Arbor District Library. It's the perfect place to find unique, locally made gifts.</p>",
    url: "https://aadl.org/tinyexpo",
    type: "experience",
    share: {
      title: "Tiny Expo at AADL on A2 Vibe",
      text: "Check out Tiny Expo Indie Art & Craft Fair on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-07`
    }
  },
  {
    id: "dec-08",
    name: "Sing Along with Santa in Kerrytown",
    month: "December",
    date: "December 12, 2026",
    time: "10:00 AM - 1:00 PM",
    address: "315 Detroit St, Ann Arbor, MI 48104",
    category: ["Family Friendly", "Festivals"],
    price: "Free",
    neighborhood: "Kerrytown",
    img: "/images/dec-santa.jpg",
    shortDesc: "Bring the kids to sing carols and meet Santa.",
    longDesc: "<p>A favorite local tradition! Gather in the Kerrytown Market & Shops courtyard for a joyful morning of singing holiday carols accompanied by local musicians, followed by a visit from Santa.</p>",
    url: "https://kerrytown.com",
    type: "experience",
    share: {
      title: "Sing Along with Santa on A2 Vibe",
      text: "Check out Sing Along with Santa in Kerrytown on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-08`
    }
  },
  {
    id: "dec-09",
    name: "A2CT: A Christmas Carol",
    month: "December",
    date: "December 17 - 20, 2026",
    time: "7:30 PM (Matinees at 2:00 PM)",
    address: "1226 Murfin Ave, Ann Arbor, MI 48109 (Arthur Miller Theatre)",
    category: ["Arts & Culture", "Family Friendly"],
    price: "$22",
    neighborhood: "North Campus",
    img: "/images/dec-christmascarol.jpg",
    shortDesc: "Ann Arbor Civic Theatre performs the Dickens holiday classic.",
    longDesc: "<p>Experience the magic of A Christmas Carol performed by the talented local actors of the Ann Arbor Civic Theatre. A heartwarming theatrical experience for the entire family on North Campus.</p>",
    url: "https://a2ct.org",
    type: "experience",
    share: {
      title: "A2CT A Christmas Carol on A2 Vibe",
      text: "Check out A2CT's A Christmas Carol on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-09`
    }
  },
  {
    id: "dec-10",
    name: "Michigan Theater Holiday Classic Film Series: White Christmas",
    month: "December",
    date: "December 20, 2026",
    time: "3:00 PM",
    address: "603 E Liberty St, Ann Arbor, MI 48104",
    category: ["Arts & Culture", "Family Friendly"],
    price: "$10.50",
    neighborhood: "Downtown",
    img: "/images/dec-whitechristmas.jpg",
    shortDesc: "Sing along to White Christmas in the beautifully restored grand theater.",
    longDesc: "<p>Get in the holiday spirit with a special screening of the beloved classic 'White Christmas'. The historic Michigan Theater features a pre-show concert on the Barton organ.</p>",
    url: "https://michtheater.org",
    type: "experience",
    share: {
      title: "White Christmas at Michigan Theater on A2 Vibe",
      text: "Check out White Christmas at the Michigan Theater on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-10`
    }
  },
  {
    id: "dec-11",
    name: "U-M Men's Basketball vs. Purdue",
    month: "December",
    date: "December 29, 2026",
    time: "7:00 PM",
    address: "333 Stadium Dr, Ann Arbor, MI 48109 (Crisler Center)",
    category: ["Sports", "Family Friendly"],
    price: "Varies",
    neighborhood: "U-M Campus",
    img: "/images/dec-umbball.jpg",
    shortDesc: "A massive late-December Big Ten basketball showdown.",
    longDesc: "<p>Keep the holiday excitement rolling as the Michigan Wolverines host the Purdue Boilermakers in a highly anticipated Big Ten clash at Crisler Center.</p>",
    url: "https://mgoblue.com",
    type: "experience",
    share: {
      title: "U-M Basketball vs. Purdue on A2 Vibe",
      text: "Check out U-M Basketball vs. Purdue on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-11`
    }
  },
  {
    id: "dec-12",
    name: "Blind Pig New Year's Eve Bash",
    month: "December",
    date: "December 31, 2026",
    time: "9:00 PM - 2:00 AM",
    address: "208 S First St, Ann Arbor, MI 48104",
    category: ["Nightlife", "Festivals"],
    price: "$20",
    neighborhood: "Downtown",
    img: "/images/dec-nyeblindpig.jpg",
    shortDesc: "Ring in 2027 at Ann Arbor's most iconic rock club.",
    longDesc: "<p>Say goodbye to 2026! The Blind Pig throws its massive annual New Year's Eve party featuring multiple local bands, dancing, and a midnight champagne toast to welcome the new year.</p>",
    url: "https://blindpigmusic.com",
    type: "experience",
    share: {
      title: "Blind Pig NYE Bash on A2 Vibe",
      text: "Check out the New Year's Eve Bash at The Blind Pig on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-12`
    }
  }
];
