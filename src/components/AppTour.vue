<template>
  <Teleport to="body">
    <div class="tour" role="presentation">
      <span class="tour-spot" :class="{ still: scrolling }" :style="spotStyle"></span>

      <div ref="tip" class="tour-tip" :class="{ still: scrolling }" :style="tipStyle" role="dialog" :aria-label="labels.dialog">
        <slot name="mascot" />
        <div class="tour-body">
          <div class="tour-head">
            <h4>{{ step.title }}</h4>
            <span class="tour-count">{{ index + 1 }}/{{ steps.length }}</span>
          </div>
          <p>{{ step.text }}</p>
          <div class="tour-actions">
            <button type="button" class="tour-skip" @click="$emit('close')">{{ labels.cancel }}</button>
            <button v-if="index > 0" type="button" class="tour-btn tour-back" @click="back">{{ labels.back }}</button>
            <button type="button" class="tour-btn tour-next" @click="next">{{ isLast ? labels.done : labels.next }}</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps({
  steps: { type: Array, required: true },
  labels: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['close']);

const DEFAULT_LABELS = { dialog: 'Tutorial', cancel: 'Cancelar', back: 'Voltar', next: 'Próximo', done: 'Entendi' };
const labels = computed(() => ({ ...DEFAULT_LABELS, ...props.labels }));

const PAD = 8;
const TIP_GAP = 12;
const EDGE = 12;

const steps = ref(props.steps.filter((s) => document.querySelector(s.selector)));
const index = ref(0);
const tip = ref(null);
const rect = ref(null);
const tipPos = ref({ left: EDGE, top: EDGE });
const scrolling = ref(false);

let frame = 0;
let scrollTimer = null;

const step = computed(() => steps.value[index.value]);
const isLast = computed(() => index.value === steps.value.length - 1);

const spotStyle = computed(() => {
  if (!rect.value) return { opacity: 0 };
  const { left, top, width, height } = rect.value;
  return { left: `${left - PAD}px`, top: `${top - PAD}px`, width: `${width + PAD * 2}px`, height: `${height + PAD * 2}px` };
});

const tipStyle = computed(() => ({ left: `${tipPos.value.left}px`, top: `${tipPos.value.top}px` }));

function findTargets() {
  return [...document.querySelectorAll(step.value.selector)].slice(0, step.value.first ? 1 : undefined);
}

function readRect(found) {
  const boxes = found.map((el) => el.getBoundingClientRect());
  const left = Math.min(...boxes.map((b) => b.left));
  const top = Math.min(...boxes.map((b) => b.top));
  const right = Math.max(...boxes.map((b) => b.right));
  const bottom = Math.max(...boxes.map((b) => b.bottom));
  rect.value = { left, top, width: right - left, height: bottom - top };
}

function measure() {
  const found = findTargets();
  if (!found.length) return;

  const box = found[0].getBoundingClientRect();
  if (found.length === 1 && (box.top < 0 || box.bottom > window.innerHeight)) {
    scrolling.value = true;
    found[0].scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  readRect(found);
  nextTick(placeTip);
}

function onScroll() {
  if (frame) return;

  frame = requestAnimationFrame(() => {
    frame = 0;
    const found = findTargets();
    if (!found.length) return;

    readRect(found);
    placeTip();
  });

  scrolling.value = true;
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => { scrolling.value = false; }, 150);
}

function placeTip() {
  if (!rect.value || !tip.value) return;

  const { left, top, width, height } = rect.value;
  const tipWidth = tip.value.offsetWidth;
  const tipHeight = tip.value.offsetHeight;
  const below = step.value.placement ? step.value.placement === 'below' : top + height / 2 < window.innerHeight / 2;

  const x = Math.min(Math.max(left + width / 2 - tipWidth / 2, EDGE), window.innerWidth - tipWidth - EDGE);
  const y = below ? top + height + PAD + TIP_GAP : top - PAD - TIP_GAP - tipHeight;

  tipPos.value = { left: x, top: Math.min(Math.max(y, EDGE), window.innerHeight - tipHeight - EDGE) };
}

function back() {
  if (index.value === 0) return;

  index.value -= 1;
  measure();
}

function next() {
  if (isLast.value) {
    emit('close');
    return;
  }

  index.value += 1;
  measure();
}

function onKeydown(event) {
  if (event.key !== 'Escape') return;
  event.preventDefault();
  event.stopImmediatePropagation();
  emit('close');
}

onMounted(() => {
  if (!steps.value.length) {
    emit('close');
    return;
  }

  measure();
  window.addEventListener('resize', measure);
  window.addEventListener('scroll', onScroll, true);
  window.addEventListener('keydown', onKeydown, true);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', measure);
  window.removeEventListener('scroll', onScroll, true);
  window.removeEventListener('keydown', onKeydown, true);
  cancelAnimationFrame(frame);
  clearTimeout(scrollTimer);
});
</script>

<style scoped>
.tour {
  position: fixed;
  inset: 0;
  z-index: var(--tour-z, 1800);
}

.tour-spot {
  position: fixed;
  box-sizing: border-box;
  border-radius: 14px;
  box-shadow: 0 0 0 9999px var(--tour-overlay, rgba(0, 0, 0, 0.66)), 0 0 0 2px var(--tour-accent, #7cc6a6);
  pointer-events: none;
  transition: left 0.35s ease, top 0.35s ease, width 0.35s ease, height 0.35s ease, opacity 0.2s ease;
}

.tour-tip {
  position: fixed;
  display: flex;
  gap: 12px;
  width: min(340px, calc(100vw - 24px));
  box-sizing: border-box;
  padding: 12px 14px;
  background: var(--tour-bg, #18181b);
  border: 1px solid var(--tour-border, #3a3a40);
  border-radius: 14px;
  color: var(--tour-text, #e7e7e7);
  transition: left 0.35s ease, top 0.35s ease;
}

.tour-tip :slotted(*) {
  flex: none;
  align-self: flex-start;
}

.tour-spot.still,
.tour-tip.still {
  transition: none;
}

.tour-body {
  flex: 1;
  min-width: 0;
}

.tour-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 3px;
}

.tour-body h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--tour-title, #fff);
}

.tour-body p {
  margin: 0;
  font-size: 13px;
  line-height: 1.4;
  color: var(--tour-muted, #b8bec6);
}

.tour-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;
}

.tour-skip {
  margin-right: auto;
  padding: 0;
  background: transparent;
  border: none;
  font-size: 12px;
  color: #9aa0a6;
  cursor: pointer;
}

.tour-skip:hover {
  color: var(--tour-text, #e7e7e7);
}

.tour-count {
  font-size: 12px;
  color: #70767d;
}

.tour-btn {
  height: 32px;
  padding: 0 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.tour-back {
  background: transparent;
  border: 1px solid var(--tour-border, #3a3a40);
  color: var(--tour-text, #e7e7e7);
}

.tour-next {
  background: var(--tour-accent, #7cc6a6);
  border: 1px solid transparent;
  color: var(--tour-accent-text, #0f1a15);
}
</style>
