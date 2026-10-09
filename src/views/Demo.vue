<template>
  <div class="page">
    <header class="top">
      <div>
        <span class="eyebrow">Análise antifraude</span>
        <h1>Pedido #48213</h1>
      </div>
      <div class="top-side">
        <span class="status" data-tour="page-status">Aguardando análise</span>
        <button type="button" class="help" aria-label="Ajuda: página" @click="show">?</button>
      </div>
    </header>

    <div class="grid">
      <MainDataPanel class="span-2" />
      <AddressPanel />
      <NotesPanel />
      <OrderItemsPanel class="span-2" />
    </div>

    <footer class="actions">
      <button type="button" class="btn ghost">Enviar para revisão manual</button>
      <button type="button" class="btn danger">Reprovar</button>
      <button type="button" class="btn primary" data-tour="page-approve">Aprovar pedido</button>
    </footer>

    <AppTour v-if="open" :steps="steps" @close="close" />
  </div>
</template>

<script setup>
import AppTour from '../components/AppTour.vue';
import { useTour } from '../composables/useTour';
import AddressPanel from '../components/panels/AddressPanel.vue';
import MainDataPanel from '../components/panels/MainDataPanel.vue';
import NotesPanel from '../components/panels/NotesPanel.vue';
import OrderItemsPanel from '../components/panels/OrderItemsPanel.vue';

const { open, show, close } = useTour('antifraud-page-tour', null);

const steps = [
  { selector: '[data-tour="page-status"]', title: 'Status do pedido', text: 'Mostra em que etapa a análise está. Este pedido ainda aguarda uma decisão.' },
  { selector: '[data-tour="page-approve"]', title: 'Aprovar pedido', text: 'Depois de revisar todos os painéis, finalize a análise por aqui.' },
];
</script>

<style scoped>
.page {
  max-width: 1040px;
  margin: 0 auto;
  padding: 24px 16px 40px;
}

.top {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #d6006f;
}

.top h1 {
  margin: 2px 0 0;
  font-size: 26px;
  color: #1b1f4b;
}

.top-side {
  display: flex;
  align-items: center;
  gap: 10px;
}

.help {
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
}

.help:hover {
  background: #d6006f;
  border-color: #d6006f;
  color: #fff;
}

.status {
  padding: 6px 14px;
  background: #fff4cc;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  color: #8a6300;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-items: start;
}

.span-2 {
  grid-column: span 2;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.btn {
  height: 40px;
  padding: 0 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.btn.ghost {
  background: #fff;
  border: 1px solid #d3d6ea;
  color: #2b3a9e;
}

.btn.danger {
  background: #fff;
  border: 1px solid #d6006f;
  color: #d6006f;
}

.btn.primary {
  background: #d6006f;
  border: 1px solid #d6006f;
  color: #fff;
}

@media (max-width: 760px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .span-2 {
    grid-column: auto;
  }
}
</style>
