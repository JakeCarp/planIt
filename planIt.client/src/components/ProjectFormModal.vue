<template>
  <div class="projectFormModal">
    <!-- Modal -->
    <div
      id="projModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Plot a Scheme</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="projForm" @submit.prevent="createProject">
              <p class="m-0">Name:</p>
              <input v-model="projectData.name" class="m-2" type="text" />
              <p class="m-0">Description:</p>
              <textarea
                v-model="projectData.description"
                class="m-2"
                cols="50"
              />
              <div></div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" form="projForm" class="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from "@vue/reactivity"
import { Modal } from "bootstrap"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { projectsService } from "../services/ProjectsService"
export default {
  setup() {
    const projectData = ref({})
    return {
      projectData,
      async createProject() {
        try {
          await projectsService.createProject(projectData.value)
          const modelElem = document.getElementById('projModal')
          Modal.getOrCreateInstance(modelElem).toggle()
          Pop.toast('Project Created', 'success')

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
    }
  }
}
</script>


<style lang="scss" scoped>
</style>