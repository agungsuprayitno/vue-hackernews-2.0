<template>
    <div>
        asdsadsad
        {{promo}}
    </div>
</template>

<script>
  export default {
    computed: {
      promo () {
        return this.$store.state.promo
      }
    },
    asyncData ({ store }) {
      return store.dispatch('FETCH_PROMO')
    }
  }
</script>