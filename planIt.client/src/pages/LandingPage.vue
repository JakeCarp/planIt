<template>
  <div class="landing container-fluid">
    <div class="row justify-content-center align-items-center height100">
      <div class="col-7">
        <div class="card spec border-5 p-4 size d-flex">
          <div class="mt-3 mb-3">
            <h1 class="codefont text-center fw-bold">Welcome to</h1>
          </div>
          <div class="text-center animate__animated animate__jackInTheBox">
            <img src="../assets/img/villainism.png" width="500" alt="" />
          </div>
          <div class="mt-3 mb-3 text-center">
            <h1 class="codefont fw-bold mt-3">login to plot a scheme</h1>
          </div>
          <div class="text-center mt-5">
            <i
              v-show="!user.isAuthenticated"
              @click="login"
              class="
                mdi-18px
                selectable
                fs-5
                border border-dark border-3
                p-1
                px-2
                pb-2
                me-4
                text-white
              "
            >
              Login
            </i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity"
import { useRouter } from "vue-router"
import { AppState } from "../AppState"
import { router } from "../router"
import { AuthService } from "../services/AuthService"
export default {
  setup() {
    const router = useRouter()
    return {
      router,
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        await AuthService.loginWithPopup()
        router.push({ name: 'Home' })
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.spec {
  border-radius: 0;
  background-color: #9c9c9c;
  border-color: #131313;
}
.codefont {
  font-family: "Fira Code", monospace;
}
.size {
  height: 70vh;
}
.height100 {
  height: 100vh;
}
</style>