<template>
  <div class="col-12">
    <div class="col-12 my-4 px-0">
      <router-link :to="{name: 'create-product'}" class="btn btn-primary"> Create Product</router-link>
    </div>
    <div class="col-12 my-4 px-0">
      <!-- Pagination on Top -->
      <b-pagination :total-rows="paginationData.totalRows" v-model="currentPage" :per-page="paginationData.size" align="right" last-text="Last" first-text="First"></b-pagination>
      
      <!-- Table View -->
      <b-table ref="productTable" outlined responsive hover head-variant="light" :current-page="currentPage" :fields="fields" :items="getProducts">
        <template slot="status" slot-scope="row">
          <label class="font-weight-bold text-success small" v-if="row.value == $constant.status.activeStatus">{{row.value}}</label>
          <label class="font-weight-bold text-danger small" v-else>{{row.value}}</label>
        </template>

        <template slot="actions" slot-scope="row">
          <!--router-link :to="{name: 'edit-product', params: {productId: row.item.id}}" class="font-weight-bold btn btn-outline-warning btn-sm shadow">Edit</router-link> &nbsp;-->
          <router-link :to="{name: 'product-variant-list', params: {productId: row.item.id}}" class="font-weight-bold btn btn-outline-primary btn-sm shadow">Variant</router-link> &nbsp;
          <b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" v-if="row.item.status == $constant.status.activeStatus" @click="toDeactivateProduct(row.item.id)">Block</b-button>
          <b-button :size="'sm'" :variant="'outline-success'" class="font-weight-bold shadow" @click="toActivateProduct(row.item.id)" v-else>Activate</b-button>
          &nbsp;<b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" @click="toDeleteProduct(row.item.id)">Delete</b-button>
        </template>
      </b-table>
    </div>
    
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState({
      products : state => state.Product.products,
      pagination: state => state.Pagination.pagination
    }),
    paginationData () {
      if (this.$lodash.isEmpty(this.products)) return this.pagination
      return this.products.meta.pagination
    },
    fields (){
      return {
        name: {label: 'NAME', sortable: false},
        status: {label: 'STATUS', sortable: false},
        actions: {label: 'ACTION', sortable: false}
      }        
    }
  },

  methods: {
    ...mapActions({
      getProduct: 'Product/getProduct',
      activateProduct: 'Product/activateProduct',
      blockProduct: 'Product/blockProduct',
      deleteProduct: 'Product/deleteProduct',
      setPagination: 'Pagination/setPagination'
    }),
    async getProducts(ctx) {
      // //  set pagination
      this.setPagination({currentPage: ctx.currentPage, size: 10})
       //  set pagination as object, in the future we can parse Sort and Filter too
      await this.getProduct({pagination: this.pagination})
      return this.products.data
    },
    async toDeactivateProduct(productId){
      let status = this.$constant.status.inactiveStatus
      let productInput = {
        id: productId,
        status: status
      }
      await this.blockProduct(productInput)
      this.$refs.productTable.refresh()
    },
    async toActivateProduct(productId){
      let status = this.$constant.status.activeStatus
      let productInput = {
        id: productId,
        status: status
      }
      await this.activateProduct(productInput)
      this.$refs.productTable.refresh()
    },
    async toDeleteProduct(productId){
      if(confirm('Are you sure want to delete this product?')){
        let productInput = {
          id: productId
        }
        await this.deleteProduct(productInput)
        this.$refs.productTable.refresh()
      }
    }
  }
}
</script>

