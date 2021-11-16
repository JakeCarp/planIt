<template>
  <div class="projectsPage"></div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core"
import { logger } from "../utils/Logger"
import Pop from "../utils/Pop"
import { useRoute } from "vue-router"
import { sprintsService } from "../services/SprintsService"
import { AppState } from "../AppState"
export default {
  setup() {
    const account = computed(() => AppState.account)
    const route = useRoute()
    onMounted(async () => {
      try {
        if (account) {
          await sprintsService.getAll(route.params.id)
        }
      }
      catch (error) {
        logger.error(error)
        Pop.toast(error.message, 'error')
      }
    })
    return {
      sprints: computed(() => AppState.sprints)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>