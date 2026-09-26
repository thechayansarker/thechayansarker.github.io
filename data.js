/* ------------------------------------------------------------------
   All site content lives here. Edit this file; nothing else needs to
   change. Inline markers in bio paragraphs:
     *emphasis*          subtle bold
     [label](url)        link (external links get an arrow)
   ------------------------------------------------------------------ */

window.SITE = {
  name: "Chayan Sarker",
  role: "Product Designer",
  flag: "",

  // portraitStyle "illustration" shows the image as is, with its white
  // background removed so it sits on light and dark mode alike.
  // "ascii" redraws it in monospace characters, "halftone" in dots.
  portrait: "assets/portrait.webp",
  portraitStyle: "ascii",

  bio: [
    "I'm Chayan, a designer and researcher working across *AI*, *computer vision* and *augmented reality*. I'm interested in how these systems can coach and support people in the moment, in health and in public spaces.",
    "My work sits between the model and the person: deciding what a system should show, when it should speak up, and what it should *never* do.",
    "I'm currently a Senior Product Designer at [Air Health](https://www.airhealth.co), where research I began on ACL recovery became a funded product that coaches movement through the phone camera. I hold an MS in Experience Design from [Northeastern](https://www.northeastern.edu).",
    "Find me on [LinkedIn](https://www.linkedin.com/in/thechayansarker), at [chayan.design](https://www.chayan.design) and [srchayan@gmail.com](mailto:srchayan@gmail.com)."
  ],

  location: {
    timeZone: "America/New_York",
    lat: "42.3601° N",
    lon: "71.0589° W"
  },

  stats: [
    { icon: "work",     label: "Work",     meta: "3 projects",  href: "#work" },
    { icon: "game",     label: "Playing",  meta: "6 games",    href: "#playing" },
    { icon: "book",     label: "Books",    meta: "15 books",   href: "#books" }
  ],

  // 01 Experience (from resume, Aug 23 2026)
  experience: [
    { org: "Air Health", role: "Senior Product Designer", period: "2026 → Now" },
    { org: "Elas",       role: "Product Designer",        period: "2023 → 2024" },
    { org: "Scripla",    role: "UX/UI Designer",          period: "2022 → 2023" },
    { org: "Plaeto",     role: "UI/UX Designer",          period: "2021 → 2022" },
    { org: "Twinbit",    role: "UI/UX Designer",          period: "2020 → 2021" }
  ],

  // 02 Work. Each project gets a row; `href` points at its case study page.
  work: [
    { title: "Air Health", summary: "From ACL recovery research to computer vision coaching", year: "2026", href: "work/air-health/" },
    { title: "SensEase", summary: "Sensory friendly navigation for public spaces", year: "2025", href: "work/sensease/" },
    { title: "SafeVision", summary: "Computer vision in AR glasses for safer transit", year: "2024", href: "work/safevision/" }
  ],

  // 03 Recently playing. Click a cover to feature it, click the featured
  // cover to follow its link.
  playing: {
    featured: 2,
    items: [
      { title: "Batman: Arkham Knight",    color: "#26282c", cover: "assets/games/batman-arkham-knight.jpg",     link: "https://www.xbox.com/en-US/search?q=Batman+Arkham+Knight" },
      { title: "Assassin's Creed Odyssey", color: "#3d4a3a", cover: "assets/games/assassins-creed-odyssey.jpg", link: "https://www.xbox.com/en-US/search?q=Assassin%27s+Creed+Odyssey" },
      { title: "EA Sports FC 26",          color: "#1b2a3a", cover: "assets/games/ea-sports-fc-26.jpg",          link: "https://www.xbox.com/en-US/search?q=EA+Sports+FC+26" },
      { title: "Forza Horizon 6",          color: "#c9c9c9", cover: "assets/games/forza-horizon-6.jpg",          link: "https://www.xbox.com/en-US/search?q=Forza+Horizon+6" },
      { title: "Call of Duty: Black Ops 6", color: "#2a2418", cover: "assets/games/call-of-duty-black-ops-6.jpg", link: "https://www.xbox.com/en-US/search?q=Call+of+Duty+Black+Ops+6" },
      { title: "Far Cry 5",                 color: "#3b5a78", cover: "assets/games/far-cry-5.jpg",                link: "https://www.xbox.com/en-US/search?q=Far+Cry+5" }
    ]
  },

  // 04 Books. Click a spine to open it, click the open cover to follow its link.
  books: {
    coverWidth: 144,
    gap: 1,
    lean: 6,          // degrees; books left of the open one lean -lean, right lean +lean
    titleLine: 148,   // spine titles start this far above the shelf
    align: "packed",  // packed | even | split | centered
    items: [
      { title: "Book Title",      initials: "AA", color: "#c4552a", ink: "#ffffff", spineWidth: 20, height: 230, cover: null, link: "https://example.com" },
      { title: "Second Book",     initials: "BB", color: "#2f3d4f", ink: "#ffffff", spineWidth: 20, height: 230, cover: null, link: "https://example.com" },
      { title: "Third Book",      initials: "CC", color: "#1c1c1c", ink: "#ffffff", spineWidth: 17, height: 230, cover: null, link: "https://example.com" },
      { title: "Fourth Book",     initials: "DD", color: "#e9e7e2", ink: "#26262a", spineWidth: 22, height: 230, cover: null, link: "https://example.com" },
      { title: "Fifth Book",      initials: "EE", color: "#bcbab3", ink: "#26262a", spineWidth: 19, height: 230, cover: null, link: "https://example.com" },
      { title: "Sixth Book",      initials: "FF", color: "#4a3f39", ink: "#ffffff", spineWidth: 18, height: 230, cover: null, link: "https://example.com" },
      { title: "Seventh Book",    initials: "GG", color: "#d2a017", ink: "#26262a", spineWidth: 21, height: 230, cover: null, link: "https://example.com" },
      { title: "Eighth Book",     initials: "HH", color: "#cbc9c4", ink: "#26262a", spineWidth: 18, height: 230, cover: null, link: "https://example.com" },
      { title: "Ninth Book",      initials: "II", color: "#3a3a3a", ink: "#ffffff", spineWidth: 20, height: 230, cover: null, link: "https://example.com" },
      { title: "Tenth Book",      initials: "JJ", color: "#2b1c2b", ink: "#ffffff", spineWidth: 17, height: 230, cover: null, link: "https://example.com" },
      { title: "Eleventh Book",   initials: "KK", color: "#8d8d88", ink: "#ffffff", spineWidth: 22, height: 230, cover: null, link: "https://example.com" },
      { title: "Twelfth Book",    initials: "LL", color: "#6d6d69", ink: "#ffffff", spineWidth: 19, height: 230, cover: null, link: "https://example.com" },
      { title: "Thirteenth Book", initials: "MM", color: "#dedcd7", ink: "#26262a", spineWidth: 18, height: 230, cover: null, link: "https://example.com" },
      { title: "Fourteenth Book", initials: "NN", color: "#7b6b5b", ink: "#ffffff", spineWidth: 21, height: 230, cover: null, link: "https://example.com" },
      { title: "Fifteenth Book",  initials: "OO", color: "#d4592a", ink: "#ffffff", spineWidth: 20, height: 230, cover: null, link: "https://example.com" }
    ]
  },

  footer: {
    contact: [
      { label: "LinkedIn",  href: "https://www.linkedin.com/in/thechayansarker", external: true },
      { label: "Portfolio", href: "https://www.chayan.design", external: true },
      { label: "Email",     href: "mailto:srchayan@gmail.com" }
    ],
    index: [
      { label: "Home",        href: "#top" },
      { label: "Experience",  href: "#experience" },
      { label: "Work",        href: "#work" },
      { label: "Playing",     href: "#playing" },
      { label: "Books",       href: "#books" }
    ]
  },

  dock: [
    { icon: "home",    label: "Home",        href: "#top" },
    { icon: "work",    label: "Work",        href: "#work" },
    { icon: "game",    label: "Playing",     href: "#playing" },
    { icon: "book",    label: "Books",       href: "#books" },
    { icon: "chat",    label: "Say hi",      href: "mailto:srchayan@gmail.com" },
    { icon: "theme",   label: "Theme" }
  ]
};
