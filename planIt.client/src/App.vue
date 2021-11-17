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
main {
  flex-grow: 1;
}
.background {
  background-image: url("./assets/img/purple-abstract-halftone-background_52683-42247.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
