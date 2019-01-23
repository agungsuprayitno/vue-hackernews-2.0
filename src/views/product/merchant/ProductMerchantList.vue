<template>
  <div class="col-12">
    <div class="col-12 my-4 px-0">
      <router-link :to="{name: 'create-product-merchant'}" class="btn btn-primary"><i class="fa fa-plus-square"></i> Enable Merchant</router-link> &nbsp;
      <b-button :size="'md'" :variant="'success'" class="shadow" @click.prevent="enableAllMerchant()" v-if="$lodash.isEmpty(productMerchants.data)"><i class="fa fa-plus-square"></i> Enable All Merchant</b-button>
    </div>

    <div class="col-12 my-4 px-0">
      <notification v-if="!$lodash.isEmpty(notification)"></notification>
      <!-- Pagination on Top -->
      <b-pagination :total-rows="paginationData.totalRows" v-model="currentPage" :per-page="paginationData.size" align="right" last-text="Last" first-text="First"></b-pagination>

      <content-loader v-if="waitAny"></content-loader>
      <!-- Table View -->
      <b-table ref="productMerchantTable" outlined responsive hover head-variant="light" :current-page="currentPage" :fields="fields" :items="getProductMerchants">
        <template slot="status" slot-scope="row">
          <label class="font-weight-bold text-success small" v-if="row.value == $constant.status.activeStatus">{{row.value}}</label>
          <label class="font-weight-bold text-danger small" v-else>{{row.value}}</label>
        </template>

        <template slot="actions" slot-scope="row">
          <!--router-link :to="{name: 'edit-product-merchant', params: {productId: $route.params.productId, productMerchantId: row.item.id}}" class="font-weight-bold btn btn-outline-warning btn-sm shadow">Edit</router-link> &nbsp;-->
          <b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" v-if="row.item.status == $constant.status.activeStatus" @click="toBlockProductMerchant(row.item.id)"><i class="fa fa-ban"></i> Block</b-button>
          <b-button :size="'sm'" :variant="'outline-success'" class="font-weight-bold shadow" @click="toActivateProductMerchant(row.item.id)" v-else><i class="fa fa-check"></i> Activate</b-button>
          &nbsp;<b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" @click="toDeleteProductMerchant(row.item.id)"><i class="fa fa-trash"></i> Delete</b-button>

        </template>
      </b-table>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
import {mapWaitingActions} from 'vue-wait'
import Notification from '@/components/Notification.vue'
import ContentLoader from '@/components/loader/ContentLoader.vue'
export default {
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState({
      productMerchants : state => state.ProductMerchant.productMerchants,
      pagination: state => state.Pagination.pagination,
      notification: state => state.Notification.notification
    }),
    paginationData () {
      if (this.$lodash.isEmpty(this.productMerchants)) return this.pagination
      return this.productMerchants.meta.pagination
    },
    fields (){
      return {
        merchantName: {label: 'MERCHANT NAME', sortable: false},
        status: {label: 'STATUS', sortable: false},
        actions: {label: 'ACTION', sortable: false}
      }
    },
    ...mapGetters({
      waitAny: 'wait/any'
    })
  },

  components: {
    Notification,
    ContentLoader
  },

  methods: {
    ...mapActions({
      setPagination: 'Pagination/setPagination'
    }),

    ...mapWaitingActions('ProductMerchant', {
      getProductMerchant: 'getting-product-merchant',
      activateProductMerchant: 'activating-product-merchant',
      blockProductMerchant: 'blocking-product-merchant',
      deleteProductMerchant: 'deleting-product-merchant',
      enableAllMerchantForProduct: 'deleting-product-merchant'
    }),
    async getProductMerchants(ctx) {
      // //  set pagination
      this.setPagination({currentPage: ctx.currentPage, size: 10})
       //  set pagination as object, in the future we can parse Sort and Filter too
      await this.getProductMerchant({productId: this.$route.params.productId, pagination: this.pagination})
      return this.productMerchants.data
    },
    async toBlockProductMerchant(productMerchantId){
      let productMerchantInput = {
        id: productMerchantId,
        productId: this.$route.params.productId
      }
      await this.blockProductMerchant(productMerchantInput)
      this.$refs.productMerchantTable.refresh()
    },
    async toActivateProductMerchant(productMerchantId){
      let productMerchantInput = {
        id: productMerchantId,
        productId: this.$route.params.productId
      }
      await this.activateProductMerchant(productMerchantInput)
      this.$refs.productMerchantTable.refresh()
    },
    async toDeleteProductMerchant(productMerchantId){
      if(confirm('Are you sure want to delete this product merchant?')){
        let productMerchantInput = {
          id: productMerchantId,
          productId: this.$route.params.productId
        }
        await this.deleteProductMerchant(productMerchantInput)
        this.$refs.productMerchantTable.refresh()
      }
    },

    async enableAllMerchant(){
      if(confirm('Are you sure want to enable all merchant for this product?')) {
        await this.enableAllMerchantForProduct(this.$route.params.productId)
        this.$refs.productMerchantTable.refresh()
      }
    }
  }
}
</script>

