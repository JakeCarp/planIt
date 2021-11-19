<template>
  <div class="ProfileCanvas">
    <div
      class="offcanvas offcanvas-start background"
      tabindex="-1"
      id="offcanvasExample"
      aria-labelledby="offcanvasLabel"
    >
      <div class="offcanvas-header">
        <h3 class="offcanvas-title" id="offcanvasLabel">Profile</h3>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div
          class="d-flex justify-content-center flex-column align-items-center"
        >
          <i
            @click="edit = !edit"
            aria-label="edit profile"
            class="mdi mdi-pencil selectable1 align-self-end"
            >Edit Profile</i
          >
          <div v-if="edit === true">
            <img
              :src="account.picture"
              alt="user photo"
              height="120"
              width="120"
              class="picrounded elevation-3"
            />
          </div>
          <div class="text-center mb-3" v-if="edit === true">
            <h4 class="mt-2">{{ account.name }}</h4>
            <h5 class="mt-2">{{ account.email }}</h5>
          </div>
        </div>

        <div v-if="edit === false">
          <form>
            <div class="d-flex flex-column mb-3 mt-4">
              <div class="input-group">
                <span class="input-group-text border-dark">Vilain Name</span>
                <input
                  class="form-control border-dark"
                  type="text"
                  placeholder=""
                  name="name"
                  v-model="editProfile.name"
                />
              </div>
            </div>
            <div class="d-flex flex-column">
              <div class="input-group">
                <span class="input-group-text border-dark">Picture URL</span>
                <input
                  class="form-control border-dark"
                  type="text"
                  placeholder=""
                  name="pic-url"
                  v-model="editProfile.picture"
                />
              </div>
            </div>
            <div class="d-flex justify-content-center mt-3">
              <i
                type="submit"
                @click="editAccount"
                v-if="edit === false"
                class="
                  mdi mdi-content-save
                  selectable1
                  align-self-end
                  border
                  p-1
                  rounded
                  bg-light
                "
              >
                Save
              </i>
            </div>
          </form>
        </div>
        <div>
          <div class="card projects border border-3 scroll container">
            <h3 class="my-2">Plots:</h3>
            <div
              class="
                card
                projstrip
                grow2
                mt-3
                elevation-3
                selectable1
                border-0
                grow2
              "
              v-for="proj in projects"
              :key="proj.id"
              @click="routeTo(proj.id)"
            >
              <div class="d-flex justify-content-center">
                <div>
                  <h6 class="p-2 m-0 ms-2 spacing textcontent">
                    {{ proj.name }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from "@vue/reactivity"
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { accountService } from "../services/AccountService"
import { useRouter } from "vue-router"
import { Offcanvas } from "bootstrap"
export default {
  setup() {
    let edit = ref(true)
    let editProfile = ref({})
    const router = useRouter()

    return {
      router,
      editProfile,
      edit,
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),
      async editAccount() {
        try {
          await accountService.editAccount(editProfile.value)
          edit.value = !edit.value
        } catch (error) {
          logger.log(error)
          Pop.toast(error.message, 'error')
        }
      },
      routeTo(id) {
        logger.log(id)
        router.push({ name: 'Project', params: { projectId: id } })
      },
    }
  }
}
</script>


<style lang="scss" scoped>
.picrounded {
  border-radius: 50%;
  object-fit: cover;
}
.background {
  // background: rgb(0, 148, 62);
  // background: linear-gradient(
  //   180deg,
  //   rgba(0, 148, 62, 1) 20%,
  //   rgb(255, 255, 255) 100%
  // );
  background: rgb(255, 255, 255) !important;
}
.projstrip {
  background-color: rgb(209, 207, 207);
  color: rgb(32, 32, 32);
}
.textcontent {
  max-width: 25vh;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.projects {
  width: 100%;
  height: 50vh;
  margin-top: 5vh;
  border-bottom: 0 !important;
  border-right: 0 !important;
  border-left: 0 !important;
  border-color: black !important;
  border-radius: 0;
  background-color: rgba(240, 248, 255, 0);
}
.scroll {
  height: 51vh;
  overflow-y: scroll;
}
.scroll::-webkit-scrollbar {
  width: 0em;
}

.scroll::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.scroll::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  outline: 1px solid slategrey;
}
.grow2 {
  transition: all 0.2s ease-in-out;
}
.grow2:hover {
  transform: scale(1.02);
}
</style>