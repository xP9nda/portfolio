import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Joshua's Portfolio",
  description: "Portfolio of Joshua Cochrane",

  base: '/',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Project Archive', link: '/archive' }
    ],

    sidebar: [
      {
        text: 'Main Links',
        items: [
          { text: 'Home', link: '/index' },
          { text: 'Project Archive', link: '/archive'},
        ]
      },
      {
        text: 'All Projects',
        collapsed: false,
        items: [
          { text: '🎓 CPPCrates', link: '/projects/cppcrates' },
          { text: '🎓 Ropottery', link: 'projects/ropottery'},
          { text: '🎓 Drill Defender', link: 'projects/drill-defender'},
          { text: '🎓 Ratventure', link: 'projects/ratventure'},
          { text: '💻 Ender Pouch', link: 'projects/ender-pouch'},
          { text: '💻 2 Player Teamwork Puzzles Obby', link: 'projects/2-player-teamwork-puzzle'},
          { text: '💻 Teleportation Crystals', link: 'projects/teleportation-crystals'},
          { text: '🎓 Surveillance State', link: 'projects/surveillance-state'},
          { text: '🎓 The Ghost in Me', link: 'projects/the-ghost-in-me'},
          { text: '💻 NEF to JPG Converter', link: 'projects/nef-jpg-converter'},
          { text: '💻 Thieves of Mind', link: 'projects/thieves-of-mind'},
          { text: '💻 Graveyard Tycoon', link: 'projects/graveyard-tycoon'},
          { text: '💻 Color Dash', link: 'projects/color-dash'},
        ]
      },
      {
        text: 'Quick Links',
        collapsed: false,
        items: [
          { text: 'GitHub', link: 'https://github.com/xP9nda' },
          { text: 'LinkedIn', link: 'https://www.linkedin.com/in/joshua-c-b24737266'},
          { text: 'Email Me', link: 'mailto:joshuacochrane0405@gmail.com?subject=Portfolio Contact Request'},
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/xP9nda' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/joshua-c-b24737266' },

    ],
  },
})
