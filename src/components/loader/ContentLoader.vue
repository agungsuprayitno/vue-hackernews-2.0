<template>
  <div class="content-loader">
    <div class="row col-12 mx-0 align-items-center justify-content-center" style="min-height: 10rem">
      <i class="fas fa-circle-notch fa-spin fa-3x"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ContentLoader"
  }
</script>

<style lang="stylus">

  .content-loader
    position absolute
    top 0
    bottom 0
    left 0
    right 0
    z-index 1
    background rgba(156, 156, 156, .4)

</style>