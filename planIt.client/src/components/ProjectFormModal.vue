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
              <input
                required
                v-model="projectData.name"
                class="m-2 border-dark"
                type="text"
              />
              <p class="m-0">Description:</p>
              <textarea
                v-model="projectData.description"
                class="m-2 border-dark"
                cols="50"
                required
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
              data-bs-dismiss="modal"
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
import { useRoute, useRouter } from "vue-router"
import { AppState } from "../AppState"
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
    const router = useRouter()
    return {
      router,
      projectData,
      async handleSubmit() {
        try {
          if (projectData.value.id) {
            await projectsService.editProject(projectData.value)
            Pop.toast('Plot Edited', 'success')
          } else {
            await projectsService.createProject(projectData.value)
            Pop.toast('Plot Created', 'success')
            projectData.value = {}
            router.push({ name: 'Project', params: { projectId: AppState.projects[0].id } })

          }
          const modelElem = document.getElementById('aundefineda')
          Modal.getOrCreateInstance(modelElem).hide()

        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
    }
  }
}

</script>


<style lang="scss" >
.modal-backdrop.fade {
  display: none !important;
}
.modal-content {
  box-shadow: 0px 0px 0px 100vw rgba(0, 0, 0, 0.445);
}
</style>