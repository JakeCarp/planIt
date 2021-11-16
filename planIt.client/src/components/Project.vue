<template>
  <div class="row">
    <div class="col-6">
      <h3>{{ project.name }}</h3>
      <h4>{{ project.description }}</h4>
      <i
        data-bs-toggle="modal"
        data-bs-target="#projModal"
        class="mdi mdi-pencil"
      ></i>
      <projectFormModal :project="project" />
      <div class="my-3"></div>
      <div>
        <button @click="removeProject" class="btn btn-warning">Remove</button>
      </div>
    </div>
  </div>
</template>

<script>
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { projectsService } from "../services/ProjectsService"
export default {
  props: { project: { type: Object, required: true } },
  setup(props) {
    return {
      async removeProject() {
        try {
          await projectsService.removeProject(props.project.id)
          Pop.toast('Project Removed', 'success')
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
</style>
