<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Notification from './components/NotifComponent.vue'
import SearchBar from './components/SearchBar.vue'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <SearchBar class="search" />
      <Notification />
    </nav>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
  width: 100%;
  box-shadow: 2px 0px 2px gray;
  background-color: rgb(230, 230, 230);
  padding: 0 1rem;
  position: relative;
}
.notif {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}
main {
  padding-top: 1rem;
}
nav {
  display: flex;
  justify-content: space-between;
  width: 100%;
  text-align: center;
  padding: 1rem 0;
  font-size: 1rem;
}
.search {
  flex-grow: 0.3;
}
@media (min-width: 1024px) {
  header {
    line-height: 1.5;
  }

  nav {
    text-align: left;
    padding-left: 2rem;
    padding-right: 2rem;
    font-size: 1rem;
    padding: 1rem 0;
  }
}
@media (max-width: 650px) {
  .search {
    flex-grow: 0.8;
  }
}
</style>
