<template>
  <div class="task">
    <p class="text-light">{{ task.name }}</p>
    <p>{{ task.weight }}</p>
  </div>
</template>


<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>