<template>
  <div class="row">
    <div class="d-flex justi">
      <h1 class="codefont fontbig">{{ project.name }}</h1>
      <div class="dropdown ms-3">
        <button
          aria-label="dropdown button"
          v-if="project.creatorId === account.id"
          id="dropDownMenu"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          class="dropdown-toggle btn btn-outline-primary"
        >
          <i class="mdi mdi-menu"></i>
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li class="dropdown-item">
            <i
              data-bs-toggle="modal"
              :data-bs-target="'#a' + project.id + 'a'"
              title="Edit Plot"
              class="mdi mdi-24px mdi-pencil coloredit selectable1"
            >
              Edit</i
            >
          </li>
          <li class="dropdown-item">
            <i
              @click="removeProject"
              title="Remove Plot"
              class="mdi mdi-24px mdi-trash-can selectable1 text-danger"
            >
              Delete</i
            >
          </li>
        </ul>
      </div>
    </div>
    <div>
      <p class="codefont fontmedium">{{ project.description }}</p>
    </div>
  </div>
  <projectFormModal :project="project" />
</template>

<script>
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { projectsService } from "../services/ProjectsService"
import { useRouter } from "vue-router"
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState'
export default {
  props: { project: { type: Object, required: true } },
  setup(props) {
    const router = useRouter()
    return {
      account: computed(() => AppState.account),
      router,
      async removeProject() {
        try {
          if (await Pop.confirm()) {
            await projectsService.removeProject(props.project.id)
            Pop.toast('Project Removed', 'success')
          }
          router.push({ name: 'Home' })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }

  }
}
</script>

<style scoped lang="scss">
.font {
  font-family: "Bangers", cursive;
  letter-spacing: 1.2px;

  font-size: 7vh !important;
}
.fontonly {
  font-family: "Bangers", cursive;
  letter-spacing: 1.5px;
}
.codefont {
  font-family: "Fira Code", monospace;
}
.fontbig {
  font-size: 8vh;
}
.fontmedium {
  font-size: 3vh;
}
.coloredit {
  color: rgb(43, 122, 33);
}
@media only screen and (max-width: 500px) {
  .justi {
    justify-content: center;
    flex-direction: column;
  }
  .justirow {
    flex-direction: row;
    justify-content: center;
  }
}
</style>
