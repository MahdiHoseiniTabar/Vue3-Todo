<template>
  <div>
    <h3>{{ this.$route.params.name }} Todo List</h3>
    <div style="min-height: 30px">
      <h6 v-if="hiddenColumns.length">Columns:</h6>
      <span
        v-for="col in hiddenColumns"
        :key="index + col.title"
        title="click to show"
        class="pointer text-success mx-3 border-bottom"
        @click="col.isHidden = false"
      >
        <i class="bi bi-plus-circle-fill"></i>
        {{ col.title }}
      </span>
    </div>
    <div class="mt-2" v-if="filterdList.length">
      <Filter :showableColumns="showableColumns" @apply="applyFilter($event)" />
    </div>
    <div v-if="filterdList.length" class="d-flex w-80 haeder mt-4">
      <div
        v-for="(col, index) in showableColumns"
        :key="index + col.title"
        :class="[col.isHidden ? 'bg-secondary text-white' : 'bg-white', 'pointer border-bottom']"
        :title="index !== 0 ? `click to hide ${col.title}` : ''"
        @click="index !== 0 ? (col.isHidden = true) : () => {}"
      >
        {{ col.title }}
      </div>
    </div>

    <div v-for="(item, index) in filterdList" :key="item.id" class="d-flex w-80 mb-0 list">
      <div v-if="!columns[0].isHidden" class="border-bottom">{{ index + 1 }}</div>
      <div v-if="!columns[1].isHidden" class="border-bottom">{{ item.title }}</div>
      <div v-if="!columns[2].isHidden" class="border-bottom">{{ item.des }}</div>
      <div v-if="!columns[3].isHidden" class="border-bottom">{{ item.date }}</div>
      <div v-if="!columns[4].isHidden" class="border-bottom">{{ item.priority }}</div>

      <div>
        <i class="bi bi-trash text-danger" @click="removeItem(index)" title="remove item"></i>
        <i
          class="bi bi-pencil-square text-info mx-2"
          @click="editItem(item, index)"
          title="edit item"
          data-bs-toggle="modal"
          data-bs-target="#ToDoModal"
        ></i>
      </div>
    </div>
    <div v-if="!filterdList.length" class="text-danger fw-bold mt-4">There are no item :(</div>

    <button
      class="btn btn-success mt-4"
      data-bs-toggle="modal"
      data-bs-target="#ToDoModal"
      @click="mode = 'create'"
    >
      New item
    </button>
    <TodoModal :listIndex="ListName" :item="selectedItem" :mode="mode" />
  </div>
</template>

<script setup>
import { useStore } from '../stores/'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import TodoModal from './TodoModal.vue'
import Filter from './FilterList.vue'

const store = useStore()
const route = useRoute()
const ListName = route.params.name
const list = store.lists[ListName]

const columns = ref([
  { title: '#', isHidden: false },
  { title: 'title', isHidden: false },
  { title: 'des', isHidden: false },
  { title: 'date', isHidden: false },
  { title: 'priority', isHidden: false }
])
const filter = ref({})
const selectedItem = ref({})
const mode = ref('create')

const showableColumns = computed(() => {
  return columns.value.filter((col) => !col.isHidden)
})
const hiddenColumns = computed(() => {
  return columns.value.filter((col) => col.isHidden)
})
const filterdList = computed(() => {
  const isFilterApplied = filter.value.value && filter.value.key

  return isFilterApplied
    ? list.filter((item, index) => {
        const key = filter.value.key
        const value = filter.value.value
        return key === '#' ? index + 1 === Number(value) : item[key]?.includes(value)
      })
    : list
})

const removeItem = (itemIndex) => {
  store.removeItem(itemIndex, ListName)
}
const editItem = (item, index) => {
  mode.value = 'upate'
  selectedItem.value = { ...item, index }
}
const applyFilter = (e) => {
  filter.value = e.value
}
</script>

<style scoped>
.list > div {
  border-bottom: 1px solid gray;
  flex-basis: 18%;
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.list > div:last-child {
  border: none;
  flex-basis: 50px;
}
.haeder > div {
  flex-basis: 18%;
  text-align: center;
}
.haeder > div:hover {
  font-weight: bold;
}
@media (max-width: 900px) {
  .list > div,
  .haeder > div {
    border-bottom: 1px solid gray;
    flex-basis: 15%;
    text-align: center;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
