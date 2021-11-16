<template>
  <div class="row">
    <div class="col-6">
      <div class="card">
        <h3>{{ project.name }}</h3>
        <h4>{{ project.description }}</h4>

        <button
          data-bs-toggle="modal"
          data-bs-target="#projModal"
          class="btn btn-dark"
        >
          Modal
        </button>
        <projectFormModal :project="projEditable" />
        <div class="my-3">
          <button
            data-bs-toggle="modal"
            data-bs-target="#sprintModal"
            class="btn btn-dark"
          >
            CREATE SPRINT
          </button>
          <!-- <form @submit.prevent="createSprint">
            <p class="m-0">Name:</p>
            <input v-model="newSprintData.name" class="m-2" type="text" />
            <div>
              <button class="btn btn-success">Add Sprint</button>
            </div>
          </form> -->
          <div>
            <Sprint v-for="s in sprints" :key="s.id" :sprint="s" />
          </div>
        </div>
        <div>
          <button @click="removeProject" class="btn btn-warning">Remove</button>
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
import { projectsService } from "../services/ProjectsService"
import { sprintsService } from "../services/SprintsService"
import { useRoute } from 'vue-router'
export default {
  props: { project: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()
    const newSprintData = ref({})
    const projEditable = computed(() => props.project)
    return {
      projEditable,
      route,
      newSprintData,
      sprints: computed(() => AppState.sprints),
      async editProject() {
        try {
          await projectsService.editProject(editProjectData.value, props.project.id)
          editProjectData.value = ({})
          Pop.toast('Project Edited', 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async removeProject() {
        try {
          await projectsService.removeProject(props.project.id)
          Pop.toast('Project Removed', 'success')
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async createSprint() {
        try {
          await sprintsService.createSprint(route.params.projectId, newSprintData.value)
          Pop.toast('Sprint Created', 'success')
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
