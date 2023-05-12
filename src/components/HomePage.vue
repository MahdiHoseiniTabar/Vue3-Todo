<template>
  <div>
    <h3>Todo Lists:</h3>
    <div v-for="(value, key, index) in lists" :key="key" class="mx-4">
      <div class="pointer border-bottom list-item py-2" @click="openList(key)">
        {{ index + 1 }} - {{ key }}
      </div>
    </div>
    <ListCreatorVue />
  </div>
</template>

<script setup>
import { useStore } from '../stores/'
import { useRouter } from 'vue-router'
import ListCreatorVue from './ListCreator.vue'

const store = useStore()
const lists = store.lists
const router = useRouter()
const openList = (name) => {
  router.push(`/todo/${name}`)
}
</script>

<style scoped>
.list-item:hover {
  background-color: rgb(212, 240, 245);
}
</style>
