<template>
  <div class="modal" tabindex="-1" id="ToDoModal" data-bs-backdrop="static">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">New Item</div>
        <div class="modal-body">
          <form @submit.prevent>
            <div>
              <label for="title">title</label>
              <input id="title" v-model="todo.title" type="text" class="form-control" required />
            </div>
            <div>
              <label for="des">des</label>
              <input id="des" v-model="todo.des" type="text" class="form-control" required />
            </div>
            <div>
              <label for="date">date</label>
              <input id="date" v-model="todo.date" type="date" class="form-control" required />
            </div>
            <div>
              <label for="priority">priority</label>
              <select
                id="priority"
                v-model="todo.priority"
                type="text"
                class="form-select"
                required
              >
                <option value="low">low</option>
                <option value="high">high</option>
              </select>
            </div>
            <div class="text-end">
              <button
                :disabled="!canBeSubmit"
                class="btn btn-success mx-2"
                @click="manipulateItem"
                data-bs-dismiss="modal"
              >
                {{ mode === 'create' ? 'create' : 'update' }}
              </button>
              <button class="btn btn-danger" @click="resetItem" data-bs-dismiss="modal">
                close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useStore } from '../stores'

const store = useStore()

const props = defineProps({
  listIndex: { type: String, required: true },
  item: {
    index: Number,
    title: String,
    des: String,
    date: String,
    priority: String
  },
  mode: String
})
const todo = ref({
  title: props.item.title ? props.item.title : '',
  des: props.item.des ? props.item.des : '',
  date: props.item.date ? props.item.date : '',
  priority: props.item.priority ? props.item.priority : ''
})
const mode = ref(props.mode)

const canBeSubmit = computed(() => {
  return todo.value.title.length && todo.value.des.length && todo.value.date.length
})

const resetItem = () => {
  todo.value.title = ''
  todo.value.des = ''
  todo.value.date = ''
  todo.value.priority = ''
}
const manipulateItem = () => {
  if (mode.value === 'create') {
    store.addItem({ ...todo.value }, props.listIndex)
  } else {
    store.updateItem({ ...todo.value }, props.listIndex)
  }
  resetItem()
}

watch(
  () => props.item,
  (newVal) => {
    todo.value = { ...newVal }
  }
)
watch(
  () => props.mode,
  (newVal) => {
    mode.value = newVal
  }
)
</script>

<style scoped>
form > div {
  margin-bottom: 1rem;
}
</style>
