<template>
  <div class="row">
    <div class="col-6">
      <div class="card">
        <h3>{{ project.name }}</h3>
        <h4>{{ project.description }}</h4>
        <form @submit.prevent="editProject">
          <p class="m-0">Name:</p>
          <input v-model="editProjectData.name" class="m-2" type="text" />
          <p class="m-0">Description:</p>
          <input
            v-model="editProjectData.description"
            class="m-2"
            type="text"
          />
          <div>
            <button class="btn btn-warning">Edit</button>
          </div>
        </form>
        <div class="my-3">
          <div>
            <button @click="getAllSprints" class="btn btn-warning">
              Get Sprints
            </button>
          </div>
          <div>CREATE SPRINT</div>
          <form @submit.prevent="createSprint">
            <p class="m-0">Name:</p>
            <input v-model="newSprint.name" class="m-2" type="text" />
            <div>
              <button class="btn btn-success">Add Sprint</button>
            </div>
          </form>
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
export default {
  props: { project: { type: Object, required: true } },
  setup(props) {
    const editProjectData = ref({})
    return {
      editProjectData,
      projects: computed(() => AppState.projects),
      sprints: computed(() => AppState.sprints),
      async editProject() {
        try {
          await projectsService.editProject(editProjectData, props.project.id)
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
          await sprintsService.createSprint(newSprintData.value)
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
