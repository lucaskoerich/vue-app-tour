import { onBeforeUnmount, onMounted, ref } from 'vue';

export function useTour(key, delay = 1200) {
  const open = ref(false);
  let timer = null;

  function seen() {
    try { return localStorage.getItem(key) === '1'; } catch { return true; }
  }

  function show() {
    open.value = true;
  }

  function close() {
    open.value = false;
    try { localStorage.setItem(key, '1'); } catch { /* storage unavailable */ }
  }

  onMounted(() => {
    if (delay !== null && !seen()) timer = setTimeout(show, delay);
  });

  onBeforeUnmount(() => clearTimeout(timer));

  return { open, show, close };
}
