<template>
  <div class="row">
    <div class="d-flex">
      <h3 class="font">{{ project.name }}</h3>
      <i
        data-bs-toggle="modal"
        data-bs-target="#projModal"
        class="mdi mdi-pencil ms-4 selectable1"
      ></i>
      <i
        @click="removeProject"
        class="mdi mdi-close selectable1 text-danger ms-1"
      ></i>
    </div>
    <div>
      <p class="fontonly">{{ project.description }}</p>
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
</style>
