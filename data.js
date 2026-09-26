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
  portraitStyle: "illustration",

  bio: [
    "I'm Chayan, a designer and researcher interested in *AI*, *computer vision* and *augmented reality*.",
    "My work sits between the model and the person: deciding what a system should show, when it should speak up, and what it should *never* do.",
    "I'm currently a Senior Product Designer at [Air Health](https://www.airhealth.co), where research I began on ACL recovery became a funded product that coaches movement through the phone camera. I hold an MS in Human Computer Interaction (Experience Design) from [Northeastern](https://www.northeastern.edu).",
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
    { icon: "book",     label: "Books",    meta: "6 books",   href: "#books" }
  ],

  // 01 Education and 02 Experience (from resume). `place` shows under the dates.
  education: [
    { org: "Northeastern University", role: "MS in Human Computer Interaction (Experience Design)", period: "2025", place: "Boston, MA",
      note: "Courses: Research Methods, Design and Accessibility, Design Systems, Design for Behavior (health), Human Centered AI" }
  ],
  experience: [
    { org: "Air Health", role: "Senior Product Designer", period: "2026 → Now",  place: "Boston, MA" },
    { org: "Elas",       role: "Product Designer",        period: "2023 → 2024", place: "California, Remote" },
    { org: "Scripla",    role: "UX/UI Designer",          period: "2022 → 2023", place: "California, Remote" },
    { org: "Plaeto",     role: "UI/UX Designer",          period: "2021 → 2022", place: "Florida, Remote" },
    { org: "Twinbit",    role: "UI/UX Designer",          period: "2020 → 2021", place: "Dhaka, Bangladesh" }
  ],

  // 03 Work. Each project gets a row; `href` points at its case study page.
  work: [
    { title: "Air Health", summary: "From ACL recovery research to computer vision coaching", year: "2026", href: "work/air-health/" },
    { title: "SensEase", summary: "Sensory friendly navigation for public spaces", year: "2025", href: "work/sensease/" },
    { title: "SafeVision", summary: "Computer vision in AR glasses for safer transit", year: "2024", href: "work/safevision/" }
  ],

  // 04 Recently playing. Click a cover to feature it, click the featured
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
    coverWidth: 144, // default open width; a book can set its own to match its cover
    gap: 1,
    lean: 6,          // degrees; books left of the open one lean -lean, right lean +lean
    titleLine: 148,   // spine titles start this far above the shelf
    align: "packed",  // packed | even | split | centered
    items: [
      { title: "Dieter Rams: The Complete Works", initials: "KK", color: "#f0502a", ink: "#111111", spineWidth: 24, height: 230, coverWidth: 176, cover: "assets/books/dieter-rams.jpg", link: "https://www.goodreads.com/search?q=Dieter+Rams+The+Complete+Works" },
      { title: "Grid Systems in Graphic Design", initials: "JMB", color: "#ec6726", ink: "#1e1e1e", spineWidth: 20, height: 230, coverWidth: 158, cover: "assets/books/grid-systems.jpg", link: "https://www.goodreads.com/search?q=Grid+Systems+in+Graphic+Design" },
      { title: "Keep Going", initials: "AK", color: "#0565b1", ink: "#ffffff", spineWidth: 16, height: 230, coverWidth: 230, cover: "assets/books/keep-going.jpg", link: "https://www.goodreads.com/search?q=Keep+Going+Austin+Kleon" },
      { title: "Steal Like an Artist", initials: "AK", color: "#1d1b1b", ink: "#ffffff", spineWidth: 16, height: 230, coverWidth: 230, cover: "assets/books/steal-like-an-artist.jpg", link: "https://www.goodreads.com/search?q=Steal+Like+an+Artist" },
      { title: "How to", initials: "MB", color: "#0b0b0b", ink: "#ffffff", spineWidth: 26, height: 230, coverWidth: 222, cover: "assets/books/how-to.jpg", link: "https://www.goodreads.com/search?q=How+to+Michael+Bierut" },
      { title: "The Design of Everyday Things", initials: "DN", color: "#f6df3a", ink: "#111111", spineWidth: 20, height: 230, coverWidth: 153, cover: "assets/books/design-of-everyday-things.jpg", link: "https://www.goodreads.com/search?q=The+Design+of+Everyday+Things" }
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
      { label: "Education",   href: "#education" },
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
