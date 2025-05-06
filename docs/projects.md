---
layout: home

hero:
  name: Projects
  tagline: A collection of projects I've worked on over the years. Click on a project to learn more.

---
<script setup>
import ProjectLinkWidget from './src/components/ProjectsLinkWidget.vue';
import ProjectsFeaturedLinkWidget from './src/components/ProjectsFeaturedLinkWidget.vue';
</script>

---

::: tip Featured Projects
These are some of the projects that I am most proud of.
:::

<ProjectsFeaturedLinkWidget />

---

::: info Other Projects
These are some of the other projects that I have worked on.
:::

<ProjectLinkWidget />