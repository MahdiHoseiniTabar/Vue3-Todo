<template>
  <div>
    <h6>Filter:</h6>
    <i v-if="!filter" class="bi bi-plus-circle-fill text-info mx-2" @click="addFilter"></i>
    <div v-else class="d-flex">
      <div class="w-25">
        <label for="key">select a field</label>
        <select id="key" v-model="filter.key" class="form-select">
          <option v-for="col in props.showableColumns" :key="col.title">
            {{ col.title }}
          </option>
        </select>
      </div>

      <div class="w-25 mx-2">
        <label for="value">value</label>
        <input
          class="form-control"
          id="value"
          v-model="filter.value"
          :type="filter.key === 'date' ? 'date' : 'text'"
        />
      </div>
      <button type="button" class="btn btn-danger align-self-end mx-2" @click="filter = null">
        <i class="bi bi-x-circle-fill"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
  showableColumns: {
    title: String
  }
})
const emit = defineEmits(['apply'])
const filter = ref(null)
const addFilter = () => {
  filter.value = { key: '', value: '' }
}
watch(
  filter,
  (newVal) => {
    if (newVal && newVal.key && newVal.value && newVal.key.length && newVal.value.length) {
      emit('apply', filter)
    }
  },
  { deep: true }
)
</script>

<style></style>
