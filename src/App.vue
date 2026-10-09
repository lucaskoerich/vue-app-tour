<template>
  <Demo />
</template>

<script setup>
import Demo from './views/Demo.vue';
</script>

<style>
:root {
  --tour-accent: #d6006f;
  --tour-accent-text: #fff;
  --tour-overlay: rgba(27, 31, 75, 0.6);
  --tour-bg: #fff;
  --tour-border: #d3d6ea;
  --tour-title: #1b1f4b;
  --tour-text: #1f2340;
  --tour-muted: #5b6080;
}

body {
  margin: 0;
  background: #f1f2f9;
  color: #1f2340;
  font-family: system-ui, sans-serif;
}
</style>
