import { defineConfig } from 'vitepress'
import blogPosts from '../src/data/blogPosts.json';
import projects from '../src/data/projects.json';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Joshua Cochrane",
  description: "Portfolio of Joshua Cochrane",

  base: '/',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    search: {
      provider: 'local'
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Projects', link: '/projects' },
      { text: 'Blog', link: '/blog' },
    ],

    sidebar: [
      {
        text: 'Main Links',
        items: [
          { text: 'Home', link: '/index' },
          { text: 'Projects', link: '/projects'},
          { text: 'Blog', link: '/blog'},
        ]
      },
      {
        text: 'Quick Links',
        collapsed: false,
        items: [
          { text: 'LinkedIn', link: 'https://www.linkedin.com/in/joshua-c-b24737266/'},
          { text: 'GitHub', link: 'https://github.com/xP9nda' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/joshua-c-b24737266/' },
      { icon: 'github', link: 'https://github.com/xP9nda' },

    ],
  },

  vite: {
    plugins: [
      {
        name: 'vitepress-plugin-blog-data',
        resolveId(id) {
          if (id === 'virtual:blog-posts') {
            return id;
          }
        },
        async load(id) {
          if (id === 'virtual:blog-posts') {
            // Sort the imported blogPosts array by date (newest first)
            const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            return `export default ${JSON.stringify(sortedPosts)}`;
          }
        },
      },
      {
        name: 'vitepress-plugin-projects-data', // Unique name for this plugin
        resolveId(id) {
          if (id === 'virtual:sorted-projects') { // New virtual module ID
            return id;
          }
        },
        async load(id) {
          if (id === 'virtual:sorted-projects') {
            // Assuming your projects data has a 'date' field for sorting
            const sortedProjects = [...projects['other']].sort((a, b) => {
              // Handle cases where date might be missing or invalid
              const dateA = a.date ? new Date(a.date).getTime() : -Infinity;
              const dateB = b.date ? new Date(b.date).getTime() : -Infinity;
              return dateB - dateA; // Sort newest first
            });
            return `export default ${JSON.stringify(sortedProjects)}`;
          }
        },
      },
      {
        name: 'vitepress-plugin-projects-featured-data', // Unique name for this plugin
        resolveId(id) {
          if (id === 'virtual:sorted-projects-featured') { // New virtual module ID
            return id;
          }
        },
        async load(id) {
          if (id === 'virtual:sorted-projects-featured') {
            // Assuming your projects data has a 'date' field for sorting
            const sortedProjects = [...projects['featured']].sort((a, b) => {
              // Handle cases where date might be missing or invalid
              const dateA = a.date ? new Date(a.date).getTime() : -Infinity;
              const dateB = b.date ? new Date(b.date).getTime() : -Infinity;
              return dateB - dateA; // Sort newest first
            });
            return `export default ${JSON.stringify(sortedProjects)}`;
          }
        },
      }
    ],
  },
})
