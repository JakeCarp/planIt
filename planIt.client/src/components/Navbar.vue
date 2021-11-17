<template>
  <nav
    class="
      navbar navbar-expand-lg navbar-dark
      backbar
      px-3
      border1
      border-4
      elevation-3
      d-flex
      justify-content-between
    "
  >
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
    <div>
      <div class="collapse navbar-collapse" id="navbarText">
        <span class="navbar-text">
          <button
            class="
              btn
              selectable
              text-success
              lighten-30
              text-uppercase
              my-2 my-lg-0
            "
            @click="login"
            v-if="!user.isAuthenticated"
          >
            Login
          </button>

          <div class="dropdown my-2 my-lg-0" v-else>
            <div
              class="dropdown-toggle selectable"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="authDropdown"
            >
              <div class="d-flex">
                <div class="d-flex flex-column">
                  <h5 class="me-3 mb-0 text-light">
                    {{ user.villainName }}Villain Name here
                  </h5>
                  <p class="text-light me-3 mb-0 text-end">
                    {{}}Real Name Here
                  </p>
                </div>
                <img
                  :src="user.picture"
                  alt="user photo"
                  height="50"
                  class="picrounded elevation-2"
                />
              </div>
            </div>
            <div
              class="dropdown-menu p-0 list-group w-100"
              aria-labelledby="authDropdown"
            >
              <div
                class="
                  list-group-item list-group-item-action
                  hoverable
                  text-danger
                "
                @click="logout"
              >
                <i class="mdi mdi-logout"></i>
                logout
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  </nav>
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
}
.bordcolor {
  border-color: #00943e !important;
}
</style>
