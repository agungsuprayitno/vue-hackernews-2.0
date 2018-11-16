<template>
  <div class="col-12">
    <div class="col-12 my-4 px-0">
      <router-link :to="{name: 'create-voucher-order'}" class="btn btn-primary"> Create Voucher</router-link> 
    </div>
    <div class="col-12 my-4 px-0">
      <!-- Pagination on Top -->
      <b-pagination :total-rows="paginationData.totalRows" v-model="currentPage" :per-page="paginationData.size" align="right" last-text="Last" first-text="First"></b-pagination>
      
      <!-- Table View -->
      <b-table ref="voucherTable" outlined responsive hover head-variant="light" :current-page="currentPage" :fields="fields" :items="getVoucherOrders">
        <template slot="status" slot-scope="row">
          <label class="font-weight-bold text-success small" v-if="row.value == $constant.status.activeStatus">{{row.value}}</label>
          <label class="font-weight-bold text-danger small" v-else>{{row.value}}</label>
        </template>

        <template slot="actions" slot-scope="row">
          <router-link :to="{name: 'voucher-list', params: {voucherOrderId: row.item.id}}" class="font-weight-bold btn btn-outline-primary btn-sm">List of voucher</router-link> &nbsp;
          <!--b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" v-if="row.item.status == $constant.status.activeStatus" @click="deactivateUser(row.item.id)">DEACTIVATE</b-button>
          <b-button :size="'sm'" :variant="'outline-success'" class="font-weight-bold shadow" @click="activateUser(row.item.id)" v-else>ACTIVATE</b-button-->
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
      vouchers : state => state.VoucherOrder.voucherOrders,
      pagination: state => state.Pagination.pagination
    }),
    paginationData () {
      if (this.$lodash.isEmpty(this.vouchers)) return this.pagination
      return this.vouchers.meta.pagination
    },
    fields (){
      return {
        batchNumber: {label: 'BATCH NUMBER', sortable: false},
        remark: {label: 'REMARK', sortable: false},
        quantity: {label: 'QUANTITY', sortable: false},
        createdAt: {label: 'CREATED AT', sortable: false},
        status: {label: 'STATUS', sortable: false},
        actions: {label: 'ACTION', sortable: false}
      }        
    }
  },

  methods: {
    ...mapActions({
      getVoucherOrder: 'VoucherOrder/getVoucherOrder',
      setPagination: 'Pagination/setPagination'
    }),
    async getVoucherOrders(ctx) {
      // //  set pagination
      this.setPagination({currentPage: ctx.currentPage, size: 10})
       //  set pagination as object, in the future we can parse Sort and Filter too
      await this.getVoucherOrder({pagination: this.pagination})
      return this.vouchers.data
    }
  }
}
</script>

