<template>
  <PanelCard title="Dados principais" @help="show">
    <div class="score" data-tour="main-score">
      <div class="score-ring"><strong>712</strong></div>
      <div>
        <span class="score-label">Score de risco</span>
        <span class="badge warn">Risco moderado</span>
      </div>
    </div>

    <dl class="fields">
      <div data-tour="main-customer">
        <dt>Cliente</dt>
        <dd>Mariana Albuquerque Teixeira</dd>
      </div>
      <div data-tour="main-document">
        <dt>CPF</dt>
        <dd>***.482.157-**</dd>
      </div>
      <div>
        <dt>E-mail</dt>
        <dd>mariana.teixeira@exemplo.com</dd>
      </div>
      <div>
        <dt>Telefone</dt>
        <dd>(11) 9****-4821</dd>
      </div>
      <div data-tour="main-payment">
        <dt>Pagamento</dt>
        <dd>Cartão final 4821 · 3x</dd>
      </div>
      <div>
        <dt>Valor total</dt>
        <dd>R$ 3.249,90</dd>
      </div>
      <div data-tour="main-device">
        <dt>IP / Dispositivo</dt>
        <dd>187.45.xx.xx · Android</dd>
      </div>
      <div>
        <dt>Cliente desde</dt>
        <dd>Primeira compra</dd>
      </div>
    </dl>

    <AppTour v-if="open" :steps="steps" @close="close" />
  </PanelCard>
</template>

<script setup>
import AppTour from '../AppTour.vue';
import PanelCard from './PanelCard.vue';
import { useTour } from '../../composables/useTour';

const { open, show, close } = useTour('antifraud-main-tour', null);

const steps = [
  { selector: '[data-tour="main-score"]', title: 'Score de risco', text: 'Nota de 0 a 1000 calculada para este pedido. Quanto maior, menor a chance de fraude.' },
  { selector: '[data-tour="main-customer"], [data-tour="main-document"]', title: 'Identificação', text: 'Nome e documento do comprador. Confira se batem com o titular do cartão.' },
  { selector: '[data-tour="main-payment"]', title: 'Pagamento', text: 'Forma de pagamento usada e parcelamento. Cartões novos em compras altas merecem atenção.' },
  { selector: '[data-tour="main-device"]', title: 'IP e dispositivo', text: 'Origem técnica da compra. IPs fora da região do cliente podem indicar uso indevido.' },
];
</script>

<style scoped>
.score {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
  padding: 12px;
  background: #f7f8fd;
  border-radius: 12px;
}

.score-ring {
  display: grid;
  place-items: center;
  flex: none;
  width: 64px;
  height: 64px;
  border: 5px solid #f2b705;
  border-radius: 50%;
  color: #1f2340;
}

.score-ring strong {
  font-size: 20px;
}

.score-label {
  display: block;
  margin-bottom: 4px;
  font-size: 12px;
  color: #6b7090;
}

.badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}

.badge.warn {
  background: #fff4cc;
  color: #8a6300;
}

.fields {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 16px;
  margin: 0;
}

.fields dt {
  margin-bottom: 2px;
  font-size: 12px;
  color: #6b7090;
}

.fields dd {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: #1f2340;
  overflow-wrap: anywhere;
}

@media (max-width: 480px) {
  .fields {
    grid-template-columns: 1fr;
  }
}
</style>
