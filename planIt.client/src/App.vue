<template>
  <header>
    <Navbar />
  </header>
  <main class="background">
    <router-view />
  </main>
  <footer></footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
@import url("https://fonts.googleapis.com/css2?family=Bangers&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300&display=swap");

main {
  flex-grow: 1;
}
.background {
  background-image: url("./assets/img/purple-abstract-halftone-background_52683-42247.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
