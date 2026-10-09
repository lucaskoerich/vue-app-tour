<template>
  <PanelCard title="Observações" @help="show">
    <ul class="notes" data-tour="notes-list">
      <li>
        <span class="author">Sistema · 09:12</span>
        Primeira compra do cliente com este cartão.
      </li>
      <li>
        <span class="author">Carlos M. · 09:40</span>
        Cliente confirmou por telefone o endereço de entrega.
      </li>
    </ul>

    <textarea v-model="text" class="field" rows="3" placeholder="Escreva uma observação..." data-tour="notes-field"></textarea>
    <button type="button" class="add" data-tour="notes-add" :disabled="!text.trim()">Adicionar</button>

    <AppTour v-if="open" :steps="steps" @close="close" />
  </PanelCard>
</template>

<script setup>
import { ref } from 'vue';
import AppTour from '../AppTour.vue';
import PanelCard from './PanelCard.vue';
import { useTour } from '../../composables/useTour';

const text = ref('');

const { open, show, close } = useTour('antifraud-notes-tour', null);

const steps = [
  { selector: '[data-tour="notes-list"]', title: 'Histórico', text: 'Registros do sistema e de outros analistas sobre este pedido, do mais antigo ao mais recente.' },
  { selector: '[data-tour="notes-field"]', title: 'Nova observação', text: 'Anote contatos feitos e o motivo da sua decisão. Isso ajuda em auditorias futuras.' },
  { selector: '[data-tour="notes-add"]', title: 'Adicionar', text: 'Salva a observação no histórico do pedido.' },
];
</script>

<style scoped>
.notes {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 0 12px;
  padding: 0;
  list-style: none;
}

.notes li {
  padding: 10px 12px;
  background: #f7f8fd;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.4;
  color: #1f2340;
}

.author {
  display: block;
  margin-bottom: 2px;
  font-size: 12px;
  color: #6b7090;
}

.field {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  background: #fff;
  border: 1px solid #d3d6ea;
  border-radius: 10px;
  font: inherit;
  font-size: 14px;
  color: #1f2340;
  resize: vertical;
}

.field:focus {
  outline: none;
  border-color: #2b3a9e;
}

.add {
  margin-top: 8px;
  height: 34px;
  padding: 0 16px;
  background: #2b3a9e;
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
}

.add:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
