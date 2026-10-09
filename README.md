# AppTour

Tour guiado para Vue 3: escurece a tela, destaca um elemento por vez e mostra um balão com título e texto. Sem dependências além do Vue.

## Implementando em 3 passos

### 1. Copie dois arquivos para o seu projeto

```
src/components/AppTour.vue
src/composables/useTour.js
```

### 2. Marque os elementos que quer destacar

```html
<button data-tour="novo">Novo item</button>
<div data-tour="lista">...</div>
```

### 3. Use no seu componente

```vue
<template>
  <button @click="show">?</button>

  <AppTour v-if="open" :steps="steps" @close="close" />
</template>

<script setup>
import AppTour from './components/AppTour.vue';
import { useTour } from './composables/useTour';

const { open, show, close } = useTour('minha-tela');

const steps = [
  { selector: '[data-tour="novo"]', title: 'Novo item', text: 'Clique aqui para criar um item.' },
  { selector: '[data-tour="lista"]', title: 'Lista', text: 'Seus itens aparecem aqui.' },
];
</script>
```

Pronto. O tour abre sozinho na primeira visita e depois só pelo botão `?`.

## Opções

### Passos (`steps`)

| Campo | O que faz |
| --- | --- |
| `selector` | Seletor CSS do elemento (obrigatório) |
| `title`, `text` | Conteúdo do balão |
| `placement` | `'above'` ou `'below'`. Padrão: automático |
| `first` | `true` destaca só o primeiro elemento que casar o seletor |

Passos cujo elemento não está na tela são ignorados.

### Abertura (`useTour`)

```js
useTour('chave-unica')        // abre sozinho na 1ª visita (após 1,2s)
useTour('chave-unica', 3000)  // abre sozinho após 3s
useTour('chave-unica', null)  // nunca abre sozinho, só com show()
```

Use uma chave diferente por tour. Para ver o tour de novo no desenvolvimento, apague a chave no `localStorage`.

### Textos dos botões

```vue
<AppTour :steps="steps" :labels="{ next: 'Next', back: 'Back', cancel: 'Skip', done: 'Got it' }" @close="close" />
```

### Mascote (opcional)

```vue
<AppTour :steps="steps" @close="close">
  <template #mascot>
    <img src="/mascote.svg" width="52" height="52" alt="" />
  </template>
</AppTour>
```

### Cores

Defina no `:root` do seu CSS global:

```css
:root {
  --tour-accent: #d6006f;       /* contorno e botão principal */
  --tour-accent-text: #fff;     /* texto do botão principal */
  --tour-bg: #fff;              /* fundo do balão */
  --tour-title: #1b1f4b;        /* título */
  --tour-text: #1f2340;         /* texto geral */
  --tour-muted: #5b6080;        /* descrição */
  --tour-border: #d3d6ea;       /* bordas */
  --tour-overlay: rgba(27, 31, 75, 0.6); /* fundo escurecido */
}
```

## Vários tours na mesma tela

Cada um com sua chave e `null` no delay, abertos por botões diferentes:

```js
const { open, show, close } = useTour('painel-endereco', null);
```

Veja o exemplo completo em `src/components/panels`.

## Rodando o exemplo

```bash
npm install
npm run dev
```
