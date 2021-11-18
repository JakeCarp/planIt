<template>
  <div
    class="offcanvas offcanvas-end"
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
              ? 'btn rounded-pill btn-dark no-select '
              : 'btn rounded-pill btn-outline-dark no-select '
          "
        >
          Complete
        </button>
        <span>------------</span>
        <button
          :class="
            task.isComplete
              ? 'btn btn-outline-dark rounded-pill no-select'
              : 'btn btn-dark rounded-pill no-select'
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
        v-if="task.creatorId === account.id"
        class="d-flex justify-content-center align-items-center"
      >
        <button class="btn btn-outline-danger" @click="removeTask">
          Delete Task
        </button>
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
        <textarea
          v-model="noteData"
          rows="2"
          cols="40"
          maxlength="50"
        ></textarea>
        <span @click="createNote" class="input-group-text bg-dark"
          ><i class="mdi mdi-send"></i
        ></span>
      </div>
      <div class="col-12 scroll">
        <div v-for="n in notes" :key="n.id" class="note">
          <div
            v-if="n.creatorId === account.id"
            class="left-bubble bg-dark d-flex mt-3 rounded"
          >
            <div class="ps-5 pt-1 mt-2 ms-3">
              <p class="m-0 text-white">{{ n.body }}</p>
            </div>
          </div>
          <div v-else class="right-bubble bg-secondary">
            <p class="m-0 text-white">{{ n.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { logger } from '../utils/Logger'
import { momentService } from '../services/MomentService'
import Pop from '../utils/Pop'
import { watchEffect } from '@vue/runtime-core'
import { notesService } from '../services/NotesService'
import { useRoute } from 'vue-router'
import { tasksService } from '../services/TasksService'
import { Offcanvas } from 'bootstrap'
import { AppState } from '../AppState'
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
    const route = useRoute()
    const noteData = ref('')
    const taskData = ref({})
    watchEffect(() => {
      taskData.value = { ...props.task };
    });
    return {
      account: computed(() => AppState.account),
      route,
      noteData,
      taskData,
      async createNote() {
        try {
          await notesService.createNote({ body: noteData.value, taskId: taskData.value.id }, route.params.projectId)
          noteData.value = ''
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      },
      async removeTask() {
        try {
          if (await Pop.confirm()) {
            await tasksService.removeTask(route.params.id, props.task.id)
            let offcanvasElem = document.getElementById('a' + props.task.id + 'a')
            Offcanvas.getOrCreateInstance(offcanvasElem).close()
          }
        } catch (error) {
          logger.log(error)
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
.scroll {
  height: auto;
  max-height: 55vh;
  overflow-y: scroll;
}
.left-bubble {
  width: 80%;
  min-height: 10vh;
  clip-path: polygon(
    27% 0,
    100% 0%,
    100% 73%,
    20% 73%,
    20% 37%,
    20% 20%,
    10% 0
  );
}
.right-bubble {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  width: 75%;
  min-height: 5vh;
  height: auto;
  clip-path: polygon(
    27% 0,
    100% 0%,
    100% 73%,
    20% 73%,
    20% 37%,
    20% 20%,
    10% 0
  );
}
.no-select {
  pointer-events: none;
}
</style>