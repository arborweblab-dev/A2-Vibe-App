// src/data/happeningsData.js

const BASE_SHARE_URL = "https://a2vibe.com/happenings";

export const happeningsData = [
  // --- OCTOBER EVENTS ---
  {
    id: "oct-01",
    name: "U-M Homecoming Weekend Tailgate",
    month: "October",
    date: "October 17, 2026",
    time: "8:00 AM - 12:00 PM",
    address: "911 S University Ave, Ann Arbor, MI 48109 (The Diag)",
    category: ["Sports", "Festivals"],
    price: "Free",
    neighborhood: "U-M Campus",
    img: "/images/oct-football.jpg",
    shortDesc: "The biggest Michigan football celebration of the year.",
    longDesc: "<p>The tradition continues with alumni returning to campus for the annual Homecoming game. Expect packed streets and spirited festivities all over the Diag.</p>",
    url: "https://mgoblue.com/",
    type: "experience",
    share: {
      title: "U-M Homecoming Weekend Tailgate on A2 Vibe",
      text: "Check out U-M Homecoming Weekend Tailgate on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-01`
    }
  },
  {
    id: "oct-02",
    name: "Blast Corn Maze",
    month: "October",
    date: "September 25 - November 1, 2026",
    time: "Fridays 5:00 PM - 8:00 PM, Saturdays 11:00 AM - 8:00 PM, Sundays 11:00 AM - 7:00 PM",
    address: "6175 Daly Rd, Dexter, MI 48130",
    category: ["Family Friendly", "Hidden Gems"],
    price: "$15",
    neighborhood: "Dexter",
    img: "/images/oct-cornmaze.jpg",
    shortDesc: "Navigate a massive corn maze with local fall snacks.",
    longDesc: "<p>A quintessential fall experience just outside Ann Arbor. Enjoy the maze, pumpkin picking, and hot apple cider.</p>",
    url: "https://blastcornmaze.com/",
    type: "experience",
    share: {
      title: "Blast Corn Maze on A2 Vibe",
      text: "Check out Blast Corn Maze on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-02`
    }
  },
  {
    id: "oct-03",
    name: "Arb Fall Color Tour",
    month: "October",
    date: "October 10 - 25, 2026",
    time: "Sunrise to Sunset (Peak Foliage Tours 1:00 PM - 3:00 PM)",
    address: "1610 Washington Hts, Ann Arbor, MI 48104",
    category: ["Parks", "Hidden Gems"],
    price: "Free",
    neighborhood: "U-M East",
    img: "/images/oct-arb.jpg",
    shortDesc: "Witness the peak autumn foliage in the Nichols Arboretum.",
    longDesc: "<p>October is the best time to hike through the Arb as the maples and oaks turn brilliant shades of red and gold.</p>",
    url: "https://mbgna.umich.edu/",
    type: "experience",
    share: {
      title: "Arb Fall Color Tour on A2 Vibe",
      text: "Check out Arb Fall Color Tour on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-03`
    }
  },
  {
    id: "oct-04",
    name: "Kerrytown Pumpkins & Pints",
    month: "October",
    date: "October 16, 2026",
    time: "5:00 PM - 9:00 PM",
    address: "407 N 5th Ave, Ann Arbor, MI 48104",
    category: ["Festivals", "Hidden Gems"],
    price: "Varies",
    neighborhood: "Kerrytown",
    img: "/images/oct-pumpkins.jpg",
    shortDesc: "Seasonal craft beer and pumpkin-themed treats.",
    longDesc: "<p>Celebrate the harvest season with a pop-up event in the Kerrytown courtyard featuring local seasonal brews and baked goods.</p>",
    url: "https://www.a2farmersmarket.org/",
    type: "experience",
    share: {
      title: "Kerrytown Pumpkins & Pints on A2 Vibe",
      text: "Check out Kerrytown Pumpkins & Pints on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-04`
    }
  },
  {
    id: "oct-05",
    name: "Ghost Tour: Downtown Ann Arbor",
    month: "October",
    date: "October 23, 2026",
    time: "7:30 PM - 9:00 PM",
    address: "101 N Main St, Ann Arbor, MI 48104",
    category: ["Hidden Gems", "Tours"],
    price: "$20",
    neighborhood: "Downtown",
    img: "/images/oct-ghost.jpg",
    shortDesc: "Walking tour of haunted historic sites downtown.",
    longDesc: "<p>Listen to spooky local legends and historical ghost stories while walking through the oldest parts of Ann Arbor.</p>",
    url: "https://www.annarbor.org/",
    type: "experience",
    share: {
      title: "Ghost Tour: Downtown Ann Arbor on A2 Vibe",
      text: "Check out Ghost Tour: Downtown Ann Arbor on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-05`
    }
  },
  {
    id: "oct-06",
    name: "U-M Museum of Art: Fall Opening",
    month: "October",
    date: "October 9, 2026",
    time: "6:00 PM - 9:00 PM",
    address: "525 S State St, Ann Arbor, MI 48109",
    category: ["Museums", "Arts & Culture"],
    price: "Free",
    neighborhood: "U-M Campus",
    img: "/images/oct-ummaa.jpg",
    shortDesc: "Special opening night for the museum's fall collection.",
    longDesc: "<p>Explore new contemporary exhibits and classic works in the newly curated UMMA galleries.</p>",
    url: "https://umma.umich.edu/",
    type: "experience",
    share: {
      title: "U-M Museum of Art: Fall Opening on A2 Vibe",
      text: "Check out U-M Museum of Art: Fall Opening on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-06`
    }
  },
  {
    id: "oct-07",
    name: "Halloween Pumpkin Carving Workshop",
    month: "October",
    date: "October 24, 2026",
    time: "1:00 PM - 3:30 PM",
    address: "215 W Callowhill St / West Park, Ann Arbor, MI 48103",
    category: ["Workshops", "Family Friendly"],
    price: "$10",
    neighborhood: "West Side",
    img: "/images/oct-carving.jpg",
    shortDesc: "Learn advanced carving techniques for spooky results.",
    longDesc: "<p>Professional artists guide you through intricate pumpkin carving designs. Tools and pumpkins provided.</p>",
    url: "https://www.a2gov.org",
    type: "experience",
    share: {
      title: "Halloween Pumpkin Carving Workshop on A2 Vibe",
      text: "Check out Halloween Pumpkin Carving Workshop on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-07`
    }
  },
  {
    id: "oct-08",
    name: "Ann Arbor Symphony: Fall Pops",
    month: "October",
    date: "October 16, 2026",
    time: "8:00 PM - 10:00 PM",
    address: "603 E Liberty St, Ann Arbor, MI 48104 (Michigan Theater)",
    category: ["Arts & Culture", "Nightlife"],
    price: "$35",
    neighborhood: "Downtown",
    img: "/images/oct-symphony.jpg",
    shortDesc: "The Symphony performs beloved seasonal and classical hits.",
    longDesc: "<p>An evening of beautiful orchestral music at the Michigan Theater to kick off the arts season.</p>",
    url: "https://a2so.com/",
    type: "experience",
    share: {
      title: "Ann Arbor Symphony: Fall Pops on A2 Vibe",
      text: "Check out Ann Arbor Symphony: Fall Pops on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-08`
    }
  },
  {
    id: "oct-09",
    name: "Farmer’s Market Harvest Festival",
    month: "October",
    date: "October 17, 2026",
    time: "9:00 AM - 3:00 PM",
    address: "315 Detroit St, Ann Arbor, MI 48104",
    category: ["Festivals", "Hidden Gems"],
    price: "Free",
    neighborhood: "Kerrytown",
    img: "/images/oct-harvest.jpg",
    shortDesc: "Celebrating the bounty of the Michigan harvest.",
    longDesc: "<p>Live bluegrass music, pumpkin painting, and the best of the local fall harvest produce.</p>",
    url: "https://www.a2farmersmarket.org/",
    type: "experience",
    share: {
      title: "Farmer’s Market Harvest Festival on A2 Vibe",
      text: "Check out Farmer’s Market Harvest Festival on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-09`
    }
  },
  {
    id: "oct-10",
    name: "Huron River Moonlight Paddle",
    month: "October",
    date: "October 24, 2026",
    time: "7:00 PM - 9:30 PM",
    address: "1420 Island Dr, Ann Arbor, MI 48105 (Island Park)",
    category: ["Hidden Gems", "Parks"],
    price: "$40",
    neighborhood: "Island Park",
    img: "/images/oct-paddle.jpg",
    shortDesc: "A guided night kayak session on the Huron River.",
    longDesc: "<p>Experience the river after dark. This guided tour provides gear and lights for a unique fall perspective on the water.</p>",
    url: "https://www.a2gov.org",
    type: "experience",
    share: {
      title: "Huron River Moonlight Paddle on A2 Vibe",
      text: "Check out Huron River Moonlight Paddle on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-10`
    }
  },
  {
    id: "oct-11",
    name: "University Musical Society (UMS) Performance",
    month: "October",
    date: "October 22, 2026",
    time: "7:30 PM - 9:30 PM",
    address: "825 N University Ave, Ann Arbor, MI 48109 (Hill Auditorium)",
    category: ["Arts & Culture", "Tours"],
    price: "$45",
    neighborhood: "U-M Campus",
    img: "/images/oct-ums.jpg",
    shortDesc: "World-class touring arts group performance.",
    longDesc: "<p>A rare performance by a visiting international dance troupe at Hill Auditorium.</p>",
    url: "https://ums.org/",
    type: "experience",
    share: {
      title: "UMS Performance on A2 Vibe",
      text: "Check out University Musical Society Performance on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-11`
    }
  },
  {
    id: "oct-12",
    name: "Downtown Trick-or-Treat",
    month: "October",
    date: "October 30, 2026",
    time: "3:00 PM - 5:00 PM",
    address: "Main St & Liberty St, Ann Arbor, MI 48104",
    category: ["Family Friendly", "Festivals"],
    price: "Free",
    neighborhood: "Downtown",
    img: "/images/oct-trick.jpg",
    shortDesc: "Local shops hand out treats to kids on Main Street.",
    longDesc: "<p>A safe and fun afternoon for families to explore downtown stores and collect candy in costume.</p>",
    url: "https://www.mainstreetannarbor.org/",
    type: "experience",
    share: {
      title: "Downtown Trick-or-Treat on A2 Vibe",
      text: "Check out Downtown Trick-or-Treat on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-12`
    }
  },
  {
    id: "oct-13",
    name: "Halloween Horror Film Marathon",
    month: "October",
    date: "October 31, 2026",
    time: "8:00 PM - 4:00 AM",
    address: "233 S State St, Ann Arbor, MI 48104 (State Theatre)",
    category: ["Nightlife", "Arts & Culture"],
    price: "$20",
    neighborhood: "Downtown",
    img: "/images/oct-horror.jpg",
    shortDesc: "All-night horror movie screenings at the State Theatre.",
    longDesc: "<p>Grab your popcorn for this cult classic marathon featuring slasher favorites and eerie psychological thrillers.</p>",
    url: "https://michtheater.org/",
    type: "experience",
    share: {
      title: "Halloween Horror Film Marathon on A2 Vibe",
      text: "Check out Halloween Horror Film Marathon on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-13`
    }
  },
  {
    id: "oct-14",
    name: "West Side Artisans Market",
    month: "October",
    date: "October 18, 2026",
    time: "10:00 AM - 4:00 PM",
    address: "701 W Washington St, Ann Arbor, MI 48103",
    category: ["Hidden Gems", "Festivals"],
    price: "Free",
    neighborhood: "West Side",
    img: "/images/oct-artisans.jpg",
    shortDesc: "Unique fall-themed goods and handmade jewelry.",
    longDesc: "<p>Shop directly from local crafters and pick up cozy, handmade items perfect for the approaching winter.</p>",
    url: "https://www.annarbor.org/",
    type: "experience",
    share: {
      title: "West Side Artisans Market on A2 Vibe",
      text: "Check out West Side Artisans Market on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-14`
    }
  },
  {
    id: "oct-15",
    name: "Closing of the Season: River Cleanup",
    month: "October",
    date: "October 24, 2026",
    time: "9:00 AM - 12:00 PM",
    address: "1350 Lake Shore Dr, Ann Arbor, MI 48105 (Bandemer Park)",
    category: ["Parks", "Workshops"],
    price: "Free",
    neighborhood: "Bandemer Park",
    img: "/images/oct-cleanup.jpg",
    shortDesc: "Final community park stewardship project of the season.",
    longDesc: "<p>Help wrap up the outdoor season by joining neighbors in clearing trails and readying our parks for winter.</p>",
    url: "https://www.a2gov.org",
    type: "experience",
    share: {
      title: "River Cleanup on A2 Vibe",
      text: "Check out Closing of the Season: River Cleanup on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-15`
    }
  },
  {
    id: "oct-16",
    name: "Edgefest",
    month: "October",
    date: "October 7 - 10, 2026",
    time: "6:00 PM - 10:30 PM",
    address: "415 N 4th Ave, Ann Arbor, MI 48104 (Kerrytown Concert House)",
    category: ["Arts & Culture", "Festivals"],
    price: "$20",
    neighborhood: "Kerrytown",
    img: "/images/oct-edgefest.jpg",
    shortDesc: "Premier festival for avant-garde and improvisational music.",
    longDesc: "<p>Hosted by the Kerrytown Concert House, this long-running festival brings world-class experimental jazz and new music to Ann Arbor for several days of exciting performances.</p>",
    url: "https://kerrytownconcerthouse.com/edgefest",
    type: "experience",
    share: {
      title: "Edgefest on A2 Vibe",
      text: "Check out Edgefest at Kerrytown Concert House on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-16`
    }
  },
  {
    id: "oct-17",
    name: "Ann Arbor Antiquarian Book Fair",
    month: "October",
    date: "October 25, 2026",
    time: "11:00 AM - 4:00 PM",
    address: "530 S State St, Ann Arbor, MI 48109 (Michigan Union Ballroom)",
    category: ["Hidden Gems", "Shopping"],
    price: "$5",
    neighborhood: "U-M Campus",
    img: "/images/oct-bookfair.jpg",
    shortDesc: "Dozens of dealers selling rare, collectible, and first edition books.",
    longDesc: "<p>Held at the Michigan Union, this annual event benefits the William L. Clements Library. Discover old prints, maps, and incredible pieces of Americana.</p>",
    url: "https://annarborbookfair.com",
    type: "experience",
    share: {
      title: "Ann Arbor Antiquarian Book Fair on A2 Vibe",
      text: "Check out Ann Arbor Antiquarian Book Fair on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-17`
    }
  },
  {
    id: "oct-18",
    name: "Great Lakes Cup Show",
    month: "October",
    date: "October 2 - 31, 2026",
    time: "10:00 AM - 5:00 PM",
    address: "1187 N Main St, Ann Arbor, MI 48104 (Yourist Studio Gallery)",
    category: ["Arts & Culture", "Museums"],
    price: "Free",
    neighborhood: "West Side",
    img: "/images/oct-cupshow.jpg",
    shortDesc: "Juried exhibition highlighting the artistry of ceramic cups.",
    longDesc: "<p>Yourist Studio Gallery hosts this celebration of form and function. Browse everything from functional mugs to conceptual vessels crafted by talented local and national artists.</p>",
    url: "https://youriststudio.com",
    type: "experience",
    share: {
      title: "Great Lakes Cup Show on A2 Vibe",
      text: "Check out Great Lakes Cup Show on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-18`
    }
  },
  {
    id: "oct-19",
    name: "U-M Orchestras Halloween Concert",
    month: "October",
    date: "October 25, 2026",
    time: "4:00 PM - 5:30 PM",
    address: "825 N University Ave, Ann Arbor, MI 48109 (Hill Auditorium)",
    category: ["Arts & Culture", "Family Friendly"],
    price: "$15",
    neighborhood: "U-M Campus",
    img: "/images/oct-umhalloween.jpg",
    shortDesc: "A spooky and spirited orchestral performance at Hill Auditorium.",
    longDesc: "<p>Members of the University Symphony and Philharmonia Orchestras perform in full costume. Enjoy classic chilling compositions in a highly entertaining atmosphere.</p>",
    url: "https://smtd.umich.edu",
    type: "experience",
    share: {
      title: "U-M Orchestras Halloween Concert on A2 Vibe",
      text: "Check out U-M Orchestras Halloween Concert on A2 Vibe!",
      url: `${BASE_SHARE_URL}#oct-19`
    }
  },

  // --- NOVEMBER EVENTS ---
  {
    id: "nov-01",
    name: "Ann Arbor Polish Film Festival",
    month: "November",
    date: "November 6 - 8, 2026",
    time: "5:00 PM - 10:00 PM",
    address: "603 E Liberty St, Ann Arbor, MI 48104 (Michigan Theater)",
    category: ["Arts & Culture", "Festivals"],
    price: "$12",
    neighborhood: "Downtown",
    img: "/images/nov-polishfilm.jpg",
    shortDesc: "Celebrating the best in contemporary Polish cinema.",
    longDesc: "<p>A curated selection of feature films, documentaries, and shorts. Screenings offer a wonderful chance to experience the storytelling and creativity of Poland's vibrant film scene.</p>",
    url: "https://annarborpolishfilmfestival.com",
    type: "experience",
    share: {
      title: "Ann Arbor Polish Film Festival on A2 Vibe",
      text: "Check out Ann Arbor Polish Film Festival on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-01`
    }
  },
  {
    id: "nov-02",
    name: "Original Kroger A2 Turkey Trot",
    month: "November",
    date: "November 14, 2026",
    time: "8:00 AM - 11:30 AM",
    address: "8801 N Territorial Rd, Dexter, MI 48130 (Hudson Mills Metropark)",
    category: ["Sports", "Family Friendly"],
    price: "$45",
    neighborhood: "Dexter",
    img: "/images/nov-turkeytrot.jpg",
    shortDesc: "A festive and fun running event at Hudson Mills Metropark.",
    longDesc: "<p>Kick off the holiday season with a 5K, 10K, or the Iron Turkey challenge. There is also a Mashed Potato Mile fun run and Kids' Drumstick Dash.</p>",
    url: "https://runsignup.com",
    type: "experience",
    share: {
      title: "Original Kroger A2 Turkey Trot on A2 Vibe",
      text: "Check out Original Kroger A2 Turkey Trot on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-02`
    }
  },
  {
    id: "nov-03",
    name: "Wine, Women, & Shopping",
    month: "November",
    date: "November 14, 2026",
    time: "10:00 AM - 6:00 PM",
    address: "Main St, Chelsea, MI 48118",
    category: ["Shopping", "Nightlife"],
    price: "Free",
    neighborhood: "Chelsea",
    img: "/images/nov-winewomen.jpg",
    shortDesc: "A weekend of retail therapy, wine tastings, and festive fun.",
    longDesc: "<p>Take a short drive to historic Chelsea for exclusive in-store specials, trunk shows, and live entertainment across local boutiques and eateries.</p>",
    url: "https://chelseamich.com",
    type: "experience",
    share: {
      title: "Wine, Women, & Shopping on A2 Vibe",
      text: "Check out Wine, Women, & Shopping in Chelsea on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-03`
    }
  },
  {
    id: "nov-04",
    name: "Ypsi Artisan Holiday Market",
    month: "November",
    date: "November 21, 2026",
    time: "10:00 AM - 4:00 PM",
    address: "100 Rice St, Ypsilanti, MI 48197 (Ypsilanti Freighthouse)",
    category: ["Shopping", "Arts & Culture"],
    price: "Free",
    neighborhood: "Ypsilanti",
    img: "/images/nov-ypsimarket.jpg",
    shortDesc: "Shop from over 40 local artisans and crafters.",
    longDesc: "<p>Located at the historic Ypsilanti Freighthouse, this market is perfect for finding one-of-a-kind handmade jewelry, ceramics, prints, and gourmet treats.</p>",
    url: "https://ypsiartisanmarket.com",
    type: "experience",
    share: {
      title: "Ypsi Artisan Holiday Market on A2 Vibe",
      text: "Check out Ypsi Artisan Holiday Market on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-04`
    }
  },
  {
    id: "nov-05",
    name: "The Great Pumpkin Roll",
    month: "November",
    date: "November 7, 2026",
    time: "11:00 AM - 1:00 PM",
    address: "Mill Pond Park, W Bennett St, Saline, MI 48176",
    category: ["Family Friendly", "Festivals"],
    price: "Free",
    neighborhood: "Saline",
    img: "/images/nov-pumpkinroll.jpg",
    shortDesc: "Race carved pumpkins downhill for a mystery prize.",
    longDesc: "<p>Bring your Jack-o-lanterns to Mill Pond Park to launch them downhill. Enjoy hot cider, donuts, and a fun community atmosphere to wrap up the autumn season.</p>",
    url: "https://salinerec.com",
    type: "experience",
    share: {
      title: "The Great Pumpkin Roll on A2 Vibe",
      text: "Check out The Great Pumpkin Roll on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-05`
    }
  },
  {
    id: "nov-06",
    name: "U-M vs. Ohio State Football Watch Parties & Gameday",
    month: "November",
    date: "November 28, 2026",
    time: "12:00 PM Kickoff",
    address: "Downtown Ann Arbor & Campus Venues, Ann Arbor, MI 48104",
    category: ["Sports", "Festivals"],
    price: "Varies",
    neighborhood: "U-M Campus",
    img: "/images/nov-thegame.jpg",
    shortDesc: "The greatest rivalry in college sports at the Big House.",
    longDesc: "<p>Experience the unmatched energy of rivalry weekend as the Wolverines clash with the Buckeyes. Festivities and watch parties take over sports bars and campus venues throughout the city.</p>",
    url: "https://mgoblue.com",
    type: "experience",
    share: {
      title: "U-M vs. Ohio State Gameday on A2 Vibe",
      text: "Check out The Game (U-M vs Ohio State) on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-06`
    }
  },
  {
    id: "nov-07",
    name: "Dinner Detective Murder Mystery",
    month: "November",
    date: "November 14, 2026",
    time: "6:00 PM - 9:00 PM",
    address: "1275 S Huron St, Ypsilanti, MI 48197 (Marriott Eagle Crest)",
    category: ["Nightlife", "Hidden Gems"],
    price: "$65",
    neighborhood: "Ypsilanti",
    img: "/images/nov-dinnerdetective.jpg",
    shortDesc: "Interactive true-crime comedy dinner show.",
    longDesc: "<p>Enjoy an evening of suspense and laughter at the Marriott Eagle Crest. Actors are hidden among the audience, bringing a comedic mystery to life during a multi-course dinner.</p>",
    url: "https://thedinnerdetective.com",
    type: "experience",
    share: {
      title: "Dinner Detective Murder Mystery on A2 Vibe",
      text: "Check out Dinner Detective Murder Mystery on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-07`
    }
  },
  {
    id: "nov-08",
    name: "Matthaei Botanical Gardens Late Fall Tour",
    month: "November",
    date: "November 8, 2026",
    time: "1:00 PM - 2:30 PM",
    address: "1800 N Dixboro Rd, Ann Arbor, MI 48105",
    category: ["Parks", "Tours"],
    price: "Free",
    neighborhood: "East Ann Arbor",
    img: "/images/nov-matthaei.jpg",
    shortDesc: "Explore the striking transition of the gardens into winter.",
    longDesc: "<p>Walk the outdoor trails to see the beautiful starkness of late fall, then step inside the conservatory to warm up among the tropical and temperate plant collections.</p>",
    url: "https://mbgna.umich.edu",
    type: "experience",
    share: {
      title: "Matthaei Botanical Gardens Late Fall Tour on A2 Vibe",
      text: "Check out Matthaei Botanical Gardens Late Fall Tour on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-08`
    }
  },
  {
    id: "nov-09",
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
      url: `${BASE_SHARE_URL}#nov-09`
    }
  },
  {
    id: "nov-10",
    name: "U-M Men's Basketball Home Opener",
    month: "November",
    date: "November 10, 2026",
    time: "7:00 PM - 9:30 PM",
    address: "333 Stadium Dr, Ann Arbor, MI 48109 (Crisler Center)",
    category: ["Sports", "Family Friendly"],
    price: "Varies",
    neighborhood: "U-M Campus",
    img: "/images/nov-umbasketball.jpg",
    shortDesc: "Kick off the college basketball season at Crisler Center.",
    longDesc: "<p>Join the Maize Rage student section and local fans in cheering on the Michigan Wolverines as they hit the hardwood for an exciting new season.</p>",
    url: "https://mgoblue.com",
    type: "experience",
    share: {
      title: "U-M Men's Basketball Home Opener on A2 Vibe",
      text: "Check out U-M Men's Basketball Home Opener on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-10`
    }
  },
  {
    id: "nov-11",
    name: "Pre-Thanksgiving Farmers Market",
    month: "November",
    date: "November 25, 2026",
    time: "7:00 AM - 3:00 PM",
    address: "315 Detroit St, Ann Arbor, MI 48104",
    category: ["Shopping", "Hidden Gems"],
    price: "Free",
    neighborhood: "Kerrytown",
    img: "/images/nov-farmersmarket.jpg",
    shortDesc: "Stock up on local produce, pies, and breads for the holiday.",
    longDesc: "<p>The Ann Arbor Farmers Market is packed with local growers offering everything you need for a fresh, farm-to-table Thanksgiving feast.</p>",
    url: "https://a2farmersmarket.org",
    type: "experience",
    share: {
      title: "Pre-Thanksgiving Farmers Market on A2 Vibe",
      text: "Check out Pre-Thanksgiving Farmers Market on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-11`
    }
  },
  {
    id: "nov-12",
    name: "UMS November Series Performance",
    month: "November",
    date: "November 19, 2026",
    time: "7:30 PM - 9:30 PM",
    address: "915 E Washington St, Ann Arbor, MI 48109 (Rackham Auditorium)",
    category: ["Arts & Culture", "Nightlife"],
    price: "$35",
    neighborhood: "U-M Campus",
    img: "/images/nov-ums.jpg",
    shortDesc: "World-class theater or musical performance at Rackham.",
    longDesc: "<p>The University Musical Society brings incredible talent to Ann Arbor. Enjoy an inspiring evening of classical music or modern dance.</p>",
    url: "https://ums.org",
    type: "experience",
    share: {
      title: "UMS November Series Performance on A2 Vibe",
      text: "Check out UMS November Series Performance on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-12`
    }
  },
  {
    id: "nov-13",
    name: "Kerrytown Concert House Jazz Series",
    month: "November",
    date: "November 20, 2026",
    time: "7:30 PM - 9:30 PM",
    address: "415 N 4th Ave, Ann Arbor, MI 48104",
    category: ["Arts & Culture", "Nightlife"],
    price: "$25",
    neighborhood: "Kerrytown",
    img: "/images/nov-kchjazz.jpg",
    shortDesc: "Intimate jazz performances in a historic home.",
    longDesc: "<p>Settle into a cozy seat for an evening of exceptional live jazz, featuring local legends and touring artists in one of Ann Arbor's best acoustic spaces.</p>",
    url: "https://kerrytownconcerthouse.com",
    type: "experience",
    share: {
      title: "Kerrytown Concert House Jazz Series on A2 Vibe",
      text: "Check out Kerrytown Concert House Jazz Series on A2 Vibe!",
      url: `${BASE_SHARE_URL}#nov-13`
    }
  },
  {
    id: "nov-14",
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
      url: `${BASE_SHARE_URL}#nov-14`
    }
  },
  {
    id: "nov-15",
    name: "Ann Arbor Symphony November Concert",
    month: "November",
    date: "November 13, 2026",
    time: "8:00 PM - 10:00 PM",
    address: "603 E Liberty St, Ann Arbor, MI 48104 (Michigan Theater)",
    category: ["Arts & Culture", "Family Friendly"],
    price: "$40",
    neighborhood: "Downtown",
    img: "/images/nov-a2so.jpg",
    shortDesc: "A majestic orchestral performance at the Michigan Theater.",
    longDesc: "<p>Experience the sweeping sounds of the A2SO as they perform classical masterworks, bringing warmth and beautiful music to a chilly November night.</p>",
    url: "https://a2so.com",
    type: "experience",
    share: {
      title: "Ann Arbor Symphony November Concert on A2 Vibe",
      text: "Check out Ann Arbor Symphony November Concert on A2 Vibe!",
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
    time: "7:00 PM - Midnight",
    address: "Main St, State St & Kerrytown, Ann Arbor, MI 48104",
    category: ["Shopping", "Nightlife"],
    price: "Free",
    neighborhood: "Downtown",
    img: "/images/dec-midnightmadness.jpg",
    shortDesc: "Late-night holiday shopping with festive entertainment.",
    longDesc: "<p>Downtown Ann Arbor stays open late! Enjoy exclusive deals, holiday lights, and street performers across Main Street, State Street, and Kerrytown.</p>",
    url: "https://showyourlovea2.org/midnight-madness",
    type: "experience",
    share: {
      title: "Midnight Madness on A2 Vibe",
      text: "Check out Midnight Madness in Downtown Ann Arbor on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-02`
    }
  },
  {
    id: "dec-03",
    name: "Tiny Expo: Indie Holiday Art & Craft Fair",
    month: "December",
    date: "December 12, 2026",
    time: "10:00 AM - 5:00 PM",
    address: "343 S 5th Ave, Ann Arbor, MI 48104 (AADL Downtown Branch)",
    category: ["Shopping", "Arts & Culture"],
    price: "Free",
    neighborhood: "Downtown",
    img: "/images/dec-tinyexpo.jpg",
    shortDesc: "A bustling market featuring over 40 indie artists.",
    longDesc: "<p>Hosted at the Ann Arbor District Library downtown branch, this fair offers unique screen-printed goods, handmade jewelry, and eclectic art prints.</p>",
    url: "https://tinyexpo.com",
    type: "experience",
    share: {
      title: "Tiny Expo on A2 Vibe",
      text: "Check out Tiny Expo: Indie Holiday Art & Craft Fair on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-03`
    }
  },
  {
    id: "dec-04",
    name: "Ann Arbor Potter's Guild Winter Sale",
    month: "December",
    date: "December 5 - 6, 2026",
    time: "10:00 AM - 5:00 PM",
    address: "201 Hill St, Ann Arbor, MI 48104",
    category: ["Shopping", "Arts & Culture"],
    price: "Free",
    neighborhood: "West Side",
    img: "/images/dec-pottersguild.jpg",
    shortDesc: "Massive sale of beautiful, locally made ceramics.",
    longDesc: "<p>Find the perfect holiday gift among thousands of pieces of handcrafted pottery, ranging from functional mugs and bowls to decorative sculptures.</p>",
    url: "https://pottersguild.net",
    type: "experience",
    share: {
      title: "Ann Arbor Potter's Guild Winter Sale on A2 Vibe",
      text: "Check out Potter's Guild Winter Sale on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-04`
    }
  },
  {
    id: "dec-05",
    name: "Holiday Pops Concert",
    month: "December",
    date: "December 11, 2026",
    time: "8:00 PM - 10:00 PM",
    address: "825 N University Ave, Ann Arbor, MI 48109 (Hill Auditorium)",
    category: ["Arts & Culture", "Family Friendly"],
    price: "$35",
    neighborhood: "U-M Campus",
    img: "/images/dec-holidaypops.jpg",
    shortDesc: "Festive concert featuring holiday classics.",
    longDesc: "<p>The Ann Arbor Symphony Orchestra brings seasonal joy to Hill Auditorium with beloved carols, popular holiday tunes, and special guest choirs.</p>",
    url: "https://a2so.com",
    type: "experience",
    share: {
      title: "Holiday Pops Concert on A2 Vibe",
      text: "Check out Holiday Pops Concert on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-05`
    }
  },
  {
    id: "dec-06",
    name: "Handel's Messiah",
    month: "December",
    date: "December 5 - 6, 2026",
    time: "7:30 PM - 10:00 PM",
    address: "825 N University Ave, Ann Arbor, MI 48109 (Hill Auditorium)",
    category: ["Arts & Culture", "Nightlife"],
    price: "$40",
    neighborhood: "U-M Campus",
    img: "/images/dec-messiah.jpg",
    shortDesc: "The iconic holiday oratorio performed live.",
    longDesc: "<p>Presented by the University Musical Society, this breathtaking choral performance is a cherished Ann Arbor December tradition that will leave you inspired.</p>",
    url: "https://ums.org",
    type: "experience",
    share: {
      title: "Handel's Messiah on A2 Vibe",
      text: "Check out Handel's Messiah at Hill Auditorium on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-06`
    }
  },
  {
    id: "dec-07",
    name: "The Nutcracker Ballet",
    month: "December",
    date: "December 12 - 13, 2026",
    time: "2:00 PM & 7:00 PM",
    address: "603 E Liberty St, Ann Arbor, MI 48104 (Michigan Theater)",
    category: ["Arts & Culture", "Family Friendly"],
    price: "$45",
    neighborhood: "Downtown",
    img: "/images/dec-nutcracker.jpg",
    shortDesc: "The timeless ballet comes to life on stage.",
    longDesc: "<p>Watch talented local and visiting dancers perform this magical winter classic, complete with beautiful costumes, grand sets, and Tchaikovsky's unforgettable score.</p>",
    url: "https://michtheater.org",
    type: "experience",
    share: {
      title: "The Nutcracker Ballet on A2 Vibe",
      text: "Check out The Nutcracker Ballet at Michigan Theater on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-07`
    }
  },
  {
    id: "dec-08",
    name: "Ice Skating at Buhr Park",
    month: "December",
    date: "December 1 - 31, 2026 (Daily Public Sessions)",
    time: "3:30 PM - 7:45 PM",
    address: "2751 Packard Rd, Ann Arbor, MI 48108",
    category: ["Sports", "Family Friendly"],
    price: "$6",
    neighborhood: "South Ann Arbor",
    img: "/images/dec-buhrpark.jpg",
    shortDesc: "Open skate sessions at the outdoor rink.",
    longDesc: "<p>Bundle up and hit the ice at this beloved open-air rink. It is a fantastic way to enjoy the crisp winter air surrounded by snow-dusted trees.</p>",
    url: "https://a2gov.org/buhr",
    type: "experience",
    share: {
      title: "Ice Skating at Buhr Park on A2 Vibe",
      text: "Check out Ice Skating at Buhr Park on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-08`
    }
  },
  {
    id: "dec-09",
    name: "Sledding at Veterans Memorial Park",
    month: "December",
    date: "December 15 - 31, 2026 (Weather Permitting)",
    time: "Dawn to Dusk",
    address: "2150 Jackson Ave, Ann Arbor, MI 48103",
    category: ["Parks", "Family Friendly"],
    price: "Free",
    neighborhood: "West Side",
    img: "/images/dec-vetspark.jpg",
    shortDesc: "The best local sledding hills in the city.",
    longDesc: "<p>Grab your sled or tube and join the community at Vets Park for hours of thrilling downhill racing. Perfect for a snowy December afternoon.</p>",
    url: "https://a2gov.org",
    type: "experience",
    share: {
      title: "Sledding at Veterans Memorial Park on A2 Vibe",
      text: "Check out Sledding at Veterans Memorial Park on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-09`
    }
  },
  {
    id: "dec-10",
    name: "Michigan Theater Holiday Classic Films",
    month: "December",
    date: "December 6 - 24, 2026",
    time: "Check schedule for showtimes",
    address: "603 E Liberty St, Ann Arbor, MI 48104",
    category: ["Arts & Culture", "Family Friendly"],
    price: "$10",
    neighborhood: "Downtown",
    img: "/images/dec-michtheater.jpg",
    shortDesc: "Screenings of your favorite holiday movies.",
    longDesc: "<p>Enjoy classic holiday cinema in the historic setting of the Michigan Theater. Complete with a pre-show performance on the Barton Organ.</p>",
    url: "https://michtheater.org",
    type: "experience",
    share: {
      title: "Michigan Theater Holiday Classic Films on A2 Vibe",
      text: "Check out Michigan Theater Holiday Classic Films on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-10`
    }
  },
  {
    id: "dec-11",
    name: "Christmas Bazaar & Santa Meet & Greet",
    month: "December",
    date: "December 5, 2026",
    time: "10:00 AM - 3:00 PM",
    address: "100 Rice St, Ypsilanti, MI 48197 (Ypsilanti Freighthouse)",
    category: ["Family Friendly", "Shopping"],
    price: "Free",
    neighborhood: "Ypsilanti",
    img: "/images/dec-santa.jpg",
    shortDesc: "Festive market with a special visitor for the kids.",
    longDesc: "<p>Browse unique gifts and local vendor booths while the children get a chance to meet Santa Claus and share their holiday wish lists.</p>",
    url: "https://eventbrite.com",
    type: "experience",
    share: {
      title: "Christmas Bazaar & Santa Meet & Greet on A2 Vibe",
      text: "Check out Christmas Bazaar & Santa Meet & Greet on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-11`
    }
  },
  {
    id: "dec-12",
    name: "Kerrytown Concert House Holiday Show",
    month: "December",
    date: "December 18, 2026",
    time: "7:30 PM - 9:30 PM",
    address: "415 N 4th Ave, Ann Arbor, MI 48104",
    category: ["Nightlife", "Arts & Culture"],
    price: "$25",
    neighborhood: "Kerrytown",
    img: "/images/dec-kchholiday.jpg",
    shortDesc: "Cozy cabaret and holiday music performances.",
    longDesc: "<p>Step out of the cold and into the warmth of the Concert House for an intimate evening of jazz, classical, and cabaret holiday favorites.</p>",
    url: "https://kerrytownconcerthouse.com",
    type: "experience",
    share: {
      title: "Kerrytown Concert House Holiday Show on A2 Vibe",
      text: "Check out Kerrytown Concert House Holiday Show on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-12`
    }
  },
  {
    id: "dec-13",
    name: "Winter Wonderland Walk at County Farm Park",
    month: "December",
    date: "December 19, 2026",
    time: "11:00 AM - 1:00 PM",
    address: "2230 Platt Rd, Ann Arbor, MI 48104",
    category: ["Parks", "Hidden Gems"],
    price: "Free",
    neighborhood: "East Ann Arbor",
    img: "/images/dec-countyfarm.jpg",
    shortDesc: "Peaceful winter strolls and cross-country skiing.",
    longDesc: "<p>Explore the serene, snow-covered trails of County Farm Park. An excellent spot to observe winter wildlife and enjoy nature within city limits.</p>",
    url: "https://washtenaw.org/parks",
    type: "experience",
    share: {
      title: "Winter Wonderland Walk on A2 Vibe",
      text: "Check out Winter Wonderland Walk at County Farm Park on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-13`
    }
  },
  {
    id: "dec-14",
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
      url: `${BASE_SHARE_URL}#dec-14`
    }
  },
  {
    id: "dec-15",
    name: "Saline Holiday Craft Show",
    month: "December",
    date: "November 14, 2026",
    time: "9:30 AM - 4:00 PM",
    address: "1300 Campus Pkwy, Saline, MI 48176 (Saline High School)",
    category: ["Shopping", "Family Friendly"],
    price: "$5",
    neighborhood: "Saline",
    img: "/images/dec-salinecraft.jpg",
    shortDesc: "Massive juried craft show just south of Ann Arbor.",
    longDesc: "<p>Featuring hundreds of crafters from across the Midwest, this massive event is perfect for finding detailed woodwork, custom ornaments, and unique textiles.</p>",
    url: "https://salineschools.org",
    type: "experience",
    share: {
      title: "Saline Holiday Craft Show on A2 Vibe",
      text: "Check out Saline Holiday Craft Show on A2 Vibe!",
      url: `${BASE_SHARE_URL}#dec-15`
    }
  }
];
