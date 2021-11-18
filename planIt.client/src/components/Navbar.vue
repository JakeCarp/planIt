<template>
  <nav
    v-if="user.isAuthenticated"
    class="
      navbar navbar-expand-lg navbar-dark
      backbar
      px-3
      border1
      border-4
      elevation-3
      d-flex
      justi
    "
  >
    <div
      class="selectable1"
      data-bs-toggle="offcanvas"
      href="#offcanvasExample"
      role="button"
      aria-label="Profile"
    >
      <div v-show="user.isAuthenticated" class="ms-4">
        <div class="d-flex">
          <div class="d-flex flex-column">
            <h5 class="me-3 mb-0 text-white text-end">
              {{ account.name }}
            </h5>
            <p class="text-white me-3 mb-0 text-end">{{ account.email }}</p>
          </div>
          <img
            :src="account.picture"
            alt="user photo"
            height="50"
            width="50"
            class="picrounded elevation-2"
          />
        </div>
      </div>
    </div>
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="ms-3 d-flex flex-column align-items-center logo-container">
        <img
          alt="logo"
          src="../assets/img/villainism.png"
          height="60"
          class="logo"
        />
      </div>
    </router-link>
    <i
      v-if="user.isAuthenticated"
      @click="logout"
      class="
        mdi-18px
        selectable
        border border-dark border-3
        fs-5
        text-white
        p-1
        px-2
        pb-2
        me-4
      "
    >
      Logout
    </i>
    <div v-else>
      <i
        v-show="user.isAuthenticated"
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
          text-light
        "
      >
        Login
      </i>
    </div>
  </nav>
  <ProfileCanvas />
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed } from 'vue'
import { useRouter } from "vue-router"
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
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })

      }
    }
  }
}
</script>

<style scoped>
.justi {
  justify-content: space-between;
}
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.backbar {
  background-color: #00943e;
}
.border1 {
  border-top: 0 !important;
  border-left: 0 !important;
  border-right: 0 !important;
  border-color: black !important;
}
.picrounded {
  border-radius: 50%;
  object-fit: cover;
}
.bordcolor {
  border-color: #00943e !important;
}
@media only screen and (max-width: 500px) {
  .justi {
    justify-content: center;
    flex-direction: column;
  }
}
</style>
