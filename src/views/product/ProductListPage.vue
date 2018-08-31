<template>
  <div class="col-12">
    
    <router-link :to="{name: 'create-product'}" class="btn btn-outline-primary"> Create Product</router-link>

    <b-table stripd :items="products">

    </b-table>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {

  computed: {
    ...mapState({
      products : state => state.Product.products
    })
  },

  asyncData ({store}) {
    store.dispatch('Product/getProduct')
  }
}
</script>

