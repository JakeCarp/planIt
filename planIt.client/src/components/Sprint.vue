<template>
  <div class="sprints">
    <div class="card m-2">
      {{ sprint.name }}
      <i v-if="sprint.isOpen" class="mdi mdi-cookie"></i>
      <form @submit.prevent="createTask">
        <input
          type="text"
          placeholder="...add task"
          required
          name="title"
          v-model="taskData.name"
        />
        <input
          type="number"
          required
          placeholder="1"
          min="1"
          max="50"
          name="weight"
          v-model="taskData.weight"
        />
        <button type="submit">+</button>
      </form>
      <task v-for="t in tasks" :key="t.id" :task="t" />
    </div>
  </div>
</template>


<script>
import { computed, ref } from '@vue/reactivity'
import { tasksService } from '../services/TasksService'
import Pop from '../utils/Pop'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import { AppState } from '../AppState'

export default {
  props: {
    sprint: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const taskData = ref({})

    logger.log(taskData)
    return {
      tasks: computed(() => AppState.tasks.filter(t => t.sprintId === props.sprint.id)),
      taskData,
      async createTask() {
        try {
          logger.log(taskData.value)
          taskData.value.sprintId = props.sprint.id
          await tasksService.createTask(route.params.projectId, taskData.value)
          taskData.value = {}
        } catch (error) {
          logger.error(error)
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>