<template>
  <div class="sprints">
    <div class="card m-2">
      {{ sprint.name }}
      <i v-if="sprint.isOpen" class="mdi mdi-cookie"></i>
    </div>
  </div>
</template>


<script>
export default {
  props: { sprint: { type: Object, required: true } },
  setup(props) {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>