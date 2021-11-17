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
    <div class="offcanvas-body"></div>
  </div>
</template>


<script>
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
  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
</style>