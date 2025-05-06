<script setup>
import projects from 'virtual:sorted-projects';
import { ref } from 'vue';
import { formatDateMonthYear } from '../utils'; // Ensure this path is correct

const hoveredIndex = ref(null);
</script>

<template>
  <div class="blog-widgets">
    <a
      v-for="(post, index) in projects"
      :key="post.slug"
      :href="post.slug"
      class="blog-widget custom-button"
      :class="{ 'hovered': hoveredIndex === index }"
      @mouseenter="hoveredIndex = index"
      @mouseleave="hoveredIndex = null"
    >
      <div class="image-container">
        <img :src="post.image" :alt="post.title" />
        <div class="date-overlay">{{ formatDateMonthYear(post.date) }}</div>
      </div>
      <div class="content">
        <h3>{{ post.title }}</h3>
        <p class="excerpt" v-if="post.excerpt">{{ post.excerpt }}</p>
        <div v-if="post.tags && post.tags.length > 0" class="tags">
          <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>
    </a>
  </div>
</template>


<style scoped>
.blog-widgets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.blog-widget {
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  padding: 16px;
  background-color: var(--vp-c-bg-soft);
  display: block;
  text-decoration: none;
  color: inherit;
}

.custom-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  background-color: var(--vp-c-brand-soft);
  cursor: pointer;
}

.image-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 8px;
}

.image-container img {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.date-overlay {
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  padding: 4px 8px;
  font-size: 0.75em;
  border-radius: 8px;
}

.content h3 {
  margin-top: 0;
  margin-bottom: 8px;
  color: var(--vp-c-text-strong);
}

.content .excerpt {
  color: var(--vp-c-text-1, black);
}

</style>