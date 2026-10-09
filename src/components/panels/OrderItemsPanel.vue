<template>
  <PanelCard title="Itens do pedido" @help="show">
    <div class="table-wrap">
      <table class="items" data-tour="items-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th class="num">Qtd</th>
            <th class="num">Valor</th>
            <th>Alerta</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.sku" class="item-row">
            <td>
              <strong>{{ item.name }}</strong>
              <span class="sku">{{ item.sku }}</span>
            </td>
            <td class="num">{{ item.qty }}</td>
            <td class="num">{{ item.price }}</td>
            <td>
              <span v-if="item.flag" class="flag" data-tour="items-flag">{{ item.flag }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="total" data-tour="items-total">
      <span>Total do pedido</span>
      <strong>R$ 3.249,90</strong>
    </div>

    <AppTour v-if="open" :steps="steps" @close="close" />
  </PanelCard>
</template>

<script setup>
import AppTour from '../AppTour.vue';
import PanelCard from './PanelCard.vue';
import { useTour } from '../../composables/useTour';

const items = [
  { sku: 'SMT-2231', name: 'Smartphone 256 GB', qty: 1, price: 'R$ 2.499,90', flag: 'Alto valor' },
  { sku: 'CAP-0098', name: 'Capa protetora', qty: 1, price: 'R$ 49,90' },
  { sku: 'FON-5510', name: 'Fone sem fio', qty: 2, price: 'R$ 350,00', flag: 'Revenda comum' },
];

const { open, show, close } = useTour('antifraud-items-tour', null);

const steps = [
  { selector: '[data-tour="items-table"]', title: 'Lista de itens', text: 'Tudo o que foi comprado, com quantidade e valor de cada item.' },
  { selector: '[data-tour="items-flag"]', title: 'Alertas por item', text: 'Produtos visados por fraudadores, como eletrônicos de alto valor, recebem uma marcação.' },
  { selector: '[data-tour="items-total"]', title: 'Total', text: 'Soma do pedido. Compare com o ticket médio do cliente para identificar compras fora do padrão.' },
];
</script>

<style scoped>
.table-wrap {
  overflow-x: auto;
}

.items {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  color: #1f2340;
}

.items th {
  padding: 0 8px 8px 0;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  color: #6b7090;
}

.items td {
  padding: 10px 8px 10px 0;
  border-top: 1px solid #eceef7;
  vertical-align: top;
}

.num {
  text-align: right;
  white-space: nowrap;
}

.sku {
  display: block;
  font-size: 12px;
  color: #6b7090;
}

.flag {
  display: inline-block;
  padding: 3px 8px;
  background: #fdecf4;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  color: #a1004f;
}

.total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
  padding: 12px;
  background: #f7f8fd;
  border-radius: 10px;
  font-size: 14px;
  color: #6b7090;
}

.total strong {
  font-size: 18px;
  color: #1f2340;
}
</style>
