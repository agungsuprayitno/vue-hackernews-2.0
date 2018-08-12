<template>
  <div class="app-footer">
    <span> &copy; {{year}} INDOMOG.</span>
    <span class="ml-auto">Powered by INDOMOG</span>
  </div>
</template>
<script>
export default {
  name: 'app-footer',
  data: function () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
