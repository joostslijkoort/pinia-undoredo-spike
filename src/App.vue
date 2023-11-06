<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { defineStore } from 'pinia'

const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    count: 10,
    omitted: 10, 
  }),
  actions: {
    incrementCount() {
      this.count++
    },
    incrementOmitted() {
      this.omitted++;
    },
  },
  undo: {
    omit: ['omitted'],
  },
})

const counterStore = useCounterStore()
</script>

<template>
  <div>
    <button @click="counterStore.incrementOmitted()">Increment omitted</button>
    <button @click="counterStore.incrementCount()">increment count ({{counterStore.count}})</button>
    <button @click="counterStore.undo()" :disabled=!counterStore.hasUndo()>undo</button>
    <button @click="counterStore.redo()" :disabled=!counterStore.hasRedo()>redo</button>
  </div>
  <!-- count:{{counterStore.count}}
  count2:{{counterStore.count2}}
  blaat: {{counterStore.blaat}}

  hasUndo: {{counterStore.hasUndo()}}
  hasRedo: {{counterStore.hasRedo()}} -->
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
