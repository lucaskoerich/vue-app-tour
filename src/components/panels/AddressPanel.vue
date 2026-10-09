<template>
  <PanelCard title="Endereço" @help="show">
    <div class="alert" data-tour="address-alert">
      <strong>Endereços divergentes</strong>
      <span>Entrega a 412 km do endereço de cobrança.</span>
    </div>

    <div class="blocks">
      <div class="block" data-tour="address-billing">
        <h3>Cobrança</h3>
        <p>Rua das Palmeiras, 220 · Apto 41<br />Vila Nova · São Paulo/SP<br />CEP 01234-000</p>
      </div>
      <div class="block" data-tour="address-delivery">
        <h3>Entrega</h3>
        <p>Av. Central, 1580 · Casa<br />Centro · Uberlândia/MG<br />CEP 38400-100</p>
      </div>
    </div>

    <AppTour v-if="open" :steps="steps" @close="close" />
  </PanelCard>
</template>

<script setup>
import AppTour from '../AppTour.vue';
import PanelCard from './PanelCard.vue';
import { useTour } from '../../composables/useTour';

const { open, show, close } = useTour('antifraud-address-tour', null);

const steps = [
  { selector: '[data-tour="address-alert"]', title: 'Alerta de divergência', text: 'Aparece quando cobrança e entrega ficam longe uma da outra, um sinal clássico de risco.' },
  { selector: '[data-tour="address-billing"]', title: 'Endereço de cobrança', text: 'Endereço cadastrado no cartão ou no cadastro do cliente.' },
  { selector: '[data-tour="address-delivery"]', title: 'Endereço de entrega', text: 'Para onde o pedido será enviado. Compare com a cobrança e com o histórico do cliente.' },
];
</script>

<style scoped>
.alert {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-bottom: 12px;
  padding: 10px 12px;
  background: #fdecf4;
  border-left: 4px solid #d6006f;
  border-radius: 8px;
  font-size: 13px;
  color: #6b1040;
}

.blocks {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.block {
  padding: 12px;
  background: #f7f8fd;
  border-radius: 12px;
}

.block h3 {
  margin: 0 0 6px;
  font-size: 12px;
  color: #6b7090;
}

.block p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #1f2340;
}

@media (max-width: 480px) {
  .blocks {
    grid-template-columns: 1fr;
  }
}
</style>
