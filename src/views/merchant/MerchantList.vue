<template>
  <div class="col-12">
    <div class="col-12 my-4 px-0">
      <router-link :to="{name: 'create-merchant'}" class="btn btn-primary"> Create Merchant</router-link>
    </div>
    <div class="col-12 my-4 px-0">
      <notification v-if="!$lodash.isEmpty(notification)"></notification>
      <!-- Pagination on Top -->
      <b-pagination :total-rows="paginationData.totalRows" v-model="currentPage" :per-page="paginationData.size" align="right" last-text="Last" first-text="First"></b-pagination>
      
      <!-- Table View -->
      <b-table ref="merchantTable" outlined responsive hover head-variant="light" :current-page="currentPage" :fields="fields" :items="getMerchants">
        <template slot="status" slot-scope="row">
          <label class="font-weight-bold text-success small" v-if="row.value == $constant.status.activeStatus">{{row.value}}</label>
          <label class="font-weight-bold text-danger small" v-else>{{row.value}}</label>
        </template>

        <template slot="actions" slot-scope="row">
          <router-link :to="{name: 'edit-merchant', params: {merchantId: row.item.id}}" class="font-weight-bold btn btn-outline-success btn-sm">Edit</router-link> &nbsp;
          <b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" v-if="row.item.status == $constant.status.activeStatus" @click="toBlockMerchant(row.item.id)">Block</b-button>
          <b-button :size="'sm'" :variant="'outline-success'" class="font-weight-bold shadow" @click="toActivateMerchant(row.item.id)" v-else>Activate</b-button>
          &nbsp;<b-button :size="'sm'" :variant="'outline-warning'" class="font-weight-bold shadow" @click="toDeleteMerchant(row.item.id)">Delete</b-button>
        </template>
      </b-table>
    </div>
    
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Notification from '@/components/Notification.vue'
export default {
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState({
      merchants : state => state.Merchant.merchants,
      pagination: state => state.Pagination.pagination,
      notification: state => state.Notification.notification
    }),
    paginationData () {
      if (this.$lodash.isEmpty(this.merchants)) return this.pagination
      return this.merchants.meta.pagination
    },
    fields (){
      return {
        name: {label: 'NAME', sortable: false},
        code: {label: 'CODE', sortable: false},
        email: {label: 'EMAIL', sortable: false},
        phoneNumber: {label: 'PHONE NUMBER', sortable: false},
        status: {label: 'STATUS', sortable: false},
        actions: {label: 'ACTION', sortable: false}
      }        
    }
  },

  components: {
    Notification
  },

  methods: {
    ...mapActions({
      getMerchant: 'Merchant/getMerchant',
      updateMerchant: 'Merchant/updateMerchant',
      activateMerchant: 'Merchant/activateMerchant',
      blockMerchant: 'Merchant/blockMerchant',
      deleteMerchant: 'Merchant/deleteMerchant',
      setPagination: 'Pagination/setPagination'
    }),
    async getMerchants(ctx) {
      // //  set pagination
      this.setPagination({currentPage: ctx.currentPage, size: 10})
       //  set pagination as object, in the future we can parse Sort and Filter too
      await this.getMerchant({pagination: this.pagination})
      return this.merchants.data
    },
    async toBlockMerchant(merchantId){
      let merchantInput = {
        id: merchantId
      }
      await this.blockMerchant(merchantInput)
      this.$refs.merchantTable.refresh()
    },
    async toActivateMerchant(merchantId){
      let merchantInput = {
        id: merchantId
      }
      await this.activateMerchant(merchantInput)
      this.$refs.merchantTable.refresh()
    },
    async toDeleteMerchant(merchantId){
      if(confirm('Are you sure want to delete this merchant?')){
        let merchantInput = {
          id: merchantId
        }
        await this.deleteMerchant(merchantInput)
        this.$refs.merchantTable.refresh()
      }
    }
  }
}
</script>

