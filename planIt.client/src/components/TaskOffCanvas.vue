<template>
  <div
    class="offcanvas offcanvas-end background"
    tabindex="-1"
    :id="'a' + task.id + 'a'"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title class" id="offcanvasBottomLabel">
        {{ task.name.toUpperCase() }} - Details
      </h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="d-flex justify-content-between align-items-center">
        <button
          :class="
            task.isComplete
              ? 'btn rounded-pill btn-dark '
              : 'btn rounded-pill btn-outline-dark '
          "
        >
          Complete
        </button>
        <span>------------</span>
        <button
          :class="
            task.isComplete
              ? 'btn btn-outline-dark rounded-pill'
              : 'btn btn-dark rounded-pill'
          "
        >
          Incomplete
        </button>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <p>Created: {{ timeAgo(task.createdAt) }}</p>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <p v-if="task.isComplete">Completed: {{ timeAgo(task.completedOn) }}</p>
      </div>
      <div
        class="
          offcanvas-header
          border-bottom border-dark border-3
          justify-content-center
          d-flex
        "
      >
        <h4>Notes</h4>
      </div>
      <div class="d-flex justify-content-start mt-3">
        <h5>Add a Note:</h5>
      </div>
      <div class="mt-3 input-group d-flex justify-content-center">
        <textarea v-model="noteData" rows="2" cols="40"></textarea>
        <span @click="createNote" class="input-group-text bg-primary"
          ><i class="mdi mdi-send"></i
        ></span>
      </div>
      <div class="col-12">
        <!-- <div v-for="n in notes" :key="n.id" class="note">
          {{ n.body }}
        </div> -->
      </div>
    </div>
  </div>
</template>


<script>
import { ref } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import { momentService } from '../services/MomentService'
import Pop from '../utils/Pop'
import { watchEffect } from '@vue/runtime-core'
import { notesService } from '../services/NotesService'
export default {
  props: {
    task: {
      type: Object,
      required: true
    },
    notes: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const noteData = ref('')
    const taskData = ref({})
    watchEffect(() => {
      taskData.value = { ...props.task };
    });
    return {
      noteData,
      taskData,
      async createNote() {
        try {
          await notesService.createNote({ body: noteData.value, taskId: taskData.value.id })
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      timeAgo(time) {
        logger.log("[CREATED]", time)
        if (!time) {
          const date = new Date()
          taskData.completedOn = date
          return momentService.timeAgo(date)
        }
        let timeAgo = momentService.timeAgo(time)
        return timeAgo
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.background {
  background: rgb(255, 255, 255) !important;
}
</style>