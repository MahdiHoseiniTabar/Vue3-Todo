<template>
  <div class="mt-5">
    <button v-if="!showForm" class="btn btn-success" @click="showForm = true">Add New List</button>
    <div v-else>
      <form @submit.prevent="addNewList">
        <div class="">
          <label for="name">Todo List Name</label>
          <br />
          <input type="text" id="name" class="form-control w-25" v-model="name" required />
        </div>

        <button :disabled="!name.length" type="submit" class="btn btn-success mt-2">Add</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from '../stores/'
const store = useStore()
const name = ref('')
const showForm = ref(false)

const addNewList = () => {
  store.addNewList(name.value)
  showForm.value = false
}
</script>

<style scoped></style>
