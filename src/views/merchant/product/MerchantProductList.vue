<template>
  <div class="col-12">
    <div class="col-12 my-4 px-0">
      <router-link :to="{name: 'create-product-merchant'}" class="btn btn-primary"><i class="fa fa-plus-square"></i> Enable Product</router-link> &nbsp;
      <b-button :size="'md'" :variant="'success'" class="shadow" @click.prevent="enableAllProduct()" v-if="$lodash.isEmpty(productMerchants.data)"><i class="fa fa-plus-square"></i> Enable All Product</b-button>
    </div>

    <div class="col-12 my-4 px-0">
      <notification v-if="!$lodash.isEmpty(notification)"></notification>
      <!-- Pagination on Top -->
      <b-pagination :total-rows="paginationData.totalRows" v-model="currentPage" :per-page="paginationData.size" align="right" last-text="Last" first-text="First"></b-pagination>

      <content-loader v-if="waitAny"></content-loader>
      <!-- Table View -->
      <b-table ref="merchantProductTable" outlined responsive hover head-variant="light" :current-page="currentPage" :fields="fields" :items="getMerchantProducts">
        <template slot="status" slot-scope="row">
          <label class="font-weight-bold text-success small" v-if="row.value == $constant.status.activeStatus">{{row.value}}</label>
          <label class="font-weight-bold text-danger small" v-else>{{row.value}}</label>
        </template>

        <template slot="actions" slot-scope="row">
          <b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" v-if="row.item.status == $constant.status.activeStatus" @click="toBlockMerchantProduct(row.item.id)"><i class="fa fa-ban"></i> Block</b-button>
          <b-button :size="'sm'" :variant="'outline-success'" class="font-weight-bold shadow" @click="toActivateMerchantProduct(row.item.id)" v-else><i class="fa fa-check"></i> Activate</b-button>
          &nbsp;<b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" @click="toDeleteMerchantProduct(row.item.id)"><i class="fa fa-trash"></i> Delete</b-button>

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
        productName: {label: 'PRODUCT NAME', sortable: false},
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
      getMerchantProduct: 'getting-merchant-product',
      activateProductMerchant: 'activating-merchant-product',
      blockProductMerchant: 'blocking-merchant-product',
      deleteProductMerchant: 'deleting-merchant-product',
      enableAllProductForMerchant: 'enabling-merchant-product'
    }),
    async getMerchantProducts(ctx) {
      // //  set pagination
      this.setPagination({currentPage: ctx.currentPage, size: 10})
       //  set pagination as object, in the future we can parse Sort and Filter too
      await this.getMerchantProduct({merchantId: this.$route.params.merchantId, pagination: this.pagination})
      return this.productMerchants.data
    },
    async toBlockMerchantProduct(merchantProductId){
      let merchantProductInput = {
        id: merchantProductId,
        merchantId: this.$route.params.merchantId
      }
      await this.blockProductMerchant(merchantProductInput)
      this.$refs.merchantProductTable.refresh()
    },
    async toActivateMerchantProduct(merchantProductId){
      let productMerchantInput = {
        id: merchantProductId,
        merchantId: this.$route.params.merchantId
      }
      await this.activateProductMerchant(productMerchantInput)
      this.$refs.merchantProductTable.refresh()
    },
    async toDeleteMerchantProduct(merchantProductId){
      if(confirm('Are you sure want to delete this merchant product?')){
        let merchantProductInput = {
          id: merchantProductId,
          merchantId: this.$route.params.merchantId
        }
        await this.deleteProductMerchant(merchantProductInput)
        this.$refs.merchantProductTable.refresh()
      }
    },

    async enableAllProduct(){
      if(confirm('Are you sure want to enable all product for this merchant?')) {
        await this.enableAllProductForMerchant(this.$route.params.merchantId)
        this.$refs.merchantProductTable.refresh()
      }
    }
  }
}
</script>

