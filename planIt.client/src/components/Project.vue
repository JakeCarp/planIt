<template>
  <div class="row">
    <div class="d-flex justi">
      <h1 class="codefont fontbig">{{ project.name }}</h1>
      <div class="d-flex justirow">
        <i
          data-bs-toggle="modal"
          data-bs-target="#projModal"
          title="Edit Plot"
          class="mdi mdi-24px mdi-pencil ms-4 coloredit selectable1"
        ></i>
        <i
          @click="removeProject"
          title="Remove Plot"
          class="mdi mdi-24px mdi-close selectable1 text-danger ms-1"
        ></i>
      </div>
    </div>
    <div>
      <p class="codefont fontmedium">{{ project.description }}</p>
    </div>

    <projectFormModal :project="project" />
    <div class="my-3"></div>
    <div></div>
  </div>
</template>

<script>
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { projectsService } from "../services/ProjectsService"
import { useRouter } from "vue-router"
export default {
  props: { project: { type: Object, required: true } },
  setup(props) {
    const router = useRouter()
    return {
      router,
      async removeProject() {
        try {
          await projectsService.removeProject(props.project.id)
          Pop.toast('Project Removed', 'success')
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
  color: rgb(65, 177, 51);
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
