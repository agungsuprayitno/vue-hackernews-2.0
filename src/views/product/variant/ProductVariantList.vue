<template>
  <div class="col-12">
    <div class="col-12 my-4 px-0">
      <router-link :to="{name: 'create-product-variant'}" class="btn btn-primary"> Create Variant</router-link>
    </div>
    <div class="col-12 my-4 px-0">
      <!-- Pagination on Top -->
      <b-pagination :total-rows="paginationData.totalRows" v-model="currentPage" :per-page="paginationData.size" align="right" last-text="Last" first-text="First"></b-pagination>
      
      <!-- Table View -->
      <b-table ref="productVariantTable" outlined responsive hover head-variant="light" :current-page="currentPage" :fields="fields" :items="getProductVariants">
        <template slot="status" slot-scope="row">
          <label class="font-weight-bold text-success small" v-if="row.value == $constant.status.activeStatus">{{row.value}}</label>
          <label class="font-weight-bold text-danger small" v-else>{{row.value}}</label>
        </template>

        <template slot="actions" slot-scope="row">
          <!--router-link :to="{name: 'edit-product-variant', params: {productId: $route.params.productId, productVariantId: row.item.id}}" class="font-weight-bold btn btn-outline-warning btn-sm shadow">Edit</router-link> &nbsp;-->
          <b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" v-if="row.item.status == $constant.status.activeStatus" @click="toBlockProductVariant(row.item.id)">Block</b-button>
          <b-button :size="'sm'" :variant="'outline-success'" class="font-weight-bold shadow" @click="toActivateProductVariant(row.item.id)" v-else>Activate</b-button>
          &nbsp;<b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" @click="toDeleteProductVariant(row.item.id)">Delete</b-button>

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
      productVariants : state => state.ProductVariant.productVariants,
      pagination: state => state.Pagination.pagination
    }),
    paginationData () {
      if (this.$lodash.isEmpty(this.productVariants)) return this.pagination
      return this.productVariants.meta.pagination
    },
    fields (){
      return {
        skuCode: {label: 'SKU CODE', sortable: false},
        denom: {label: 'DENOM', sortable: false},
        status: {label: 'STATUS', sortable: false},
        actions: {label: 'ACTION', sortable: false}
      }        
    }
  },

  methods: {
    ...mapActions({
      getProduct: 'ProductVariant/getProductVariant',
      activateProductVariant: 'ProductVariant/activateProductVariant',
      blockProductVariant: 'ProductVariant/blockProductVariant',
      deleteProductVariant: 'ProductVariant/deleteProductVariant',
      setPagination: 'Pagination/setPagination'
    }),
    async getProductVariants(ctx) {
      // //  set pagination
      this.setPagination({currentPage: ctx.currentPage, size: 10})
       //  set pagination as object, in the future we can parse Sort and Filter too
      await this.getProduct({productId: this.$route.params.productId, pagination: this.pagination})
      return this.productVariants.data
    },
    async toBlockProductVariant(productVariantId){
      let status = this.$constant.status.inactiveStatus
      let productVariantInput = {
        id: productVariantId,
        productId: this.$route.params.productId
      }
      await this.blockProductVariant(productVariantInput)
      this.$refs.productVariantTable.refresh()
    },
    async toActivateProductVariant(productVariantId){
      let status = this.$constant.status.activeStatus
      let productVariantInput = {
        id: productVariantId,
        productId: this.$route.params.productId
      }
      await this.activateProductVariant(productVariantInput)
      this.$refs.productVariantTable.refresh()
    },
    async toDeleteProductVariant(productVariantId){
      if(confirm('Are you sure want to delete this product variant?')){
        let productVariantInput = {
          id: productVariantId,
          productId: this.$route.params.productId
        }
        await this.deleteProductVariant(productVariantInput)
        this.$refs.productVariantTable.refresh()
      }
    }    
  }
}
</script>

