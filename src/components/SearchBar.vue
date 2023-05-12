<template>
  <div style="flex-basis: 30%">
    <form @submit.prevent>
      <input
        type="text"
        class="form-control"
        v-model="query"
        placeholder="search in title, description"
        @blur="isFocus = false"
        @focus="isFocus = true"
      />
      <i class="bi bi-search"></i>
    </form>
    <ul v-if="isFocus && curremtItems.length" class="search-item border">
      <li v-for="item in curremtItems" :key="item.title">{{ item.title }} - {{ item.des }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useStore } from '../stores'

const store = useStore()
const curremtItems = ref([])
const query = ref('')
const isFocus = ref(false)

watch(query, (newVal) => {
  curremtItems.value = store.searchedItems(newVal)
})
</script>

<style scoped>
.bi-search {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 8px;
}
.search-item {
  position: absolute;
  right: 0;
  left: 0;
  border-radius: 8px;
  background-color: white;
  z-index: 10;
}
</style>
