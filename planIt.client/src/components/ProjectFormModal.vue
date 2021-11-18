<template>
  <div class="projectFormModal">
    <!-- Modal -->
    <div
      :id="'a' + projectData.id + 'a'"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modelTitleId"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ projectData.id ? "Edit Plot" : "New Plot" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form id="projForm" @submit.prevent="handleSubmit">
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
              class="btn btn-secondary text-white"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              form="projForm"
              class="btn btn-primary text-white"
            >
              {{ projectData.id ? "Save" : "Create" }}
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
import { watchEffect } from '@vue/runtime-core'
export default {
  props: {
    project: {
      type: Object
    }
  },

  setup(props) {
    const projectData = ref({})
    watchEffect(() => {
      projectData.value = { ...props.project }
    });
    return {
      projectData,
      async handleSubmit() {
        try {
          if (projectData.value.id) {
            await projectsService.editProject(projectData.value)
            Pop.toast('Scheme Edited', 'success')
          } else {
            await projectsService.createProject(projectData.value)
            Pop.toast('Scheme Created', 'success')
            projectData.value = {}
          }
          const modelElem = document.getElementById('projModal')
          Modal.getOrCreateInstance(modelElem).toggle()

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