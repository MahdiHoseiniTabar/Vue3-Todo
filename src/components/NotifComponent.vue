<template>
  <div>
    <i
      :class="['bi bi-envelope-fill  fs-4 pointer', hasUpcomingItem ? 'text-info' : '']"
      data-bs-toggle="dropdown"
    ></i>
    <ul class="dropdown-menu">
      <li v-if="hasUpcomingItem" class="dropdown-item">
        Task
        <b>
          {{ upcomingItem.title }}
        </b>
        is upcoming!
        <br />
        date: {{ upcomingItem.date }}
      </li>
      <li v-else class="dropdown-item">No item exist yet!</li>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from '../stores'

const store = useStore()

const upcomingItem = store.upcomingItem
const hasUpcomingItem = 'title' in upcomingItem
</script>

<style></style>
