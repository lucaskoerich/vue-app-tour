<template>
  <section class="panel">
    <header class="panel-head">
      <h2>{{ title }}</h2>
      <button type="button" class="panel-help" :aria-label="`Ajuda: ${title}`" data-tour-help @click="$emit('help')">?</button>
    </header>
    <div class="panel-body">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
});

defineEmits(['help']);
</script>

<style scoped>
.panel {
  background: #fff;
  border: 1px solid #e4e6f0;
  border-radius: 14px;
  box-shadow: 0 1px 2px rgba(27, 31, 75, 0.04);
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 14px 16px 0;
}

.panel-head h2 {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #2b3a9e;
}

.panel-help {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  padding: 0;
  background: #fff;
  border: 1px solid #d3d6ea;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;
  color: #6b7090;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.panel-help:hover {
  background: #d6006f;
  border-color: #d6006f;
  color: #fff;
}

.panel-body {
  padding: 12px 16px 16px;
}
</style>
