<template>
  <div class="col-12">
    <div class="col-12 my-4 px-0">
      <router-link :to="{name: 'create-product'}" class="btn btn-outline-primary"> Create Product</router-link>
    </div>
    <div class="col-12 my-4 px-0" v-if="!$lodash.isEmpty(products)">
      <!-- Pagination on Top -->
      <b-pagination :total-rows="pagination.totalRows" :per-page="pagination.size" align="right"></b-pagination>
      <!-- Table View -->
      <b-table striped :items="products"></b-table>
      <!-- Pagination on Bottom -->
      <b-pagination :total-rows="pagination.totalRows" :current-page="currentPage" :per-page="pagination.size" align="right"></b-pagination>
    </div>
    
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {  
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState({
      productState : state => state.Product.product
    }),

    products () {
      return this.productState.data
    },

    pagination () {
      return this.productState.meta.pagination
    }
  },

  asyncData ({store}) {
    store.dispatch('Product/getProduct')
  }
}
</script>

