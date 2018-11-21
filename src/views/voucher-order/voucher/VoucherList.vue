<template>
  <div class="col-12">
    <div class="col-12 my-4 px-0">
      <!-- Pagination on Top -->
      <b-pagination :total-rows="paginationData.totalRows" v-model="currentPage" :per-page="paginationData.size" align="right" last-text="Last" first-text="First"></b-pagination>
      
      <!-- Table View -->
      <b-table ref="voucherTable" outlined responsive hover head-variant="light" :current-page="currentPage" :fields="fields" :items="getVouchers">
        <template slot="status" slot-scope="row">
          <label class="font-weight-bold text-success small" v-if="row.value == $constant.status.activeStatus">{{row.value}}</label>
          <label class="font-weight-bold text-danger small" v-else>{{row.value}}</label>
        </template>

        <template slot="actions" slot-scope="row">
          <b-button :size="'sm'" :variant="'outline-success'" class="font-weight-bold shadow" v-if="row.item.status == $constant.status.inactiveStatus" @click="toActivateVoucher(row.item.serialNumber)">Activate</b-button>
          <b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" v-if="row.item.status == $constant.status.activeStatus" @click="toRevokeVoucher(row.item.serialNumber)">Revoke</b-button>
        </template>
      </b-table>
    </div>
    <b-modal ref="activateModalRef" hide-footer title="Activate Voucher">
      <div class="d-block" v-if="voucher.length>0">
        <h3>SUCCESS!</h3>
        <div>&nbsp;</div>
        <h6>Secret Code: <strong><big>{{voucher[0].SecretCode}}</big></strong></h6>
        <h6>Expired At: <strong>{{voucher[0].ExpiredAt}}</strong></h6>
        <h6>Serial Number: <strong>{{voucher[0].SerialNumber}}</strong></h6>
        <h6>Denom: <strong>{{voucher[0].Denom}}</strong></h6>
        <h6>Activated At: <strong>{{voucher[0].ActivatedAt}}</strong></h6>
        <div>&nbsp;</div>
      </div>
      <b-btn class="mt-3" variant="outline-success" block @click="hideActivateModal">Return</b-btn>
    </b-modal>    
    <b-modal ref="revokeModalRef" hide-footer title="Revoke Voucher">
      <div class="d-block" v-if="voucher.length>0">
        <h3>Revoke is successful</h3>
        <div>&nbsp;</div>
        <h6>Serial Number: <strong>{{voucher[0].serialNumber}}</strong></h6>
        <h6>Denom: <strong>{{voucher[0].denom}}</strong></h6>
        <h6>Revoked At: <strong>{{voucher[0].revokedAt}}</strong></h6>
        <div>&nbsp;</div>
      </div>
      <b-btn class="mt-3" variant="outline-success" block @click="hideRevokeModal">Return</b-btn>
    </b-modal>    
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
      voucher : state => state.Voucher.voucher,
      vouchers : state => state.Voucher.vouchers,
      pagination: state => state.Pagination.pagination
    }),
    paginationData () {
      if (this.$lodash.isEmpty(this.vouchers)) return this.pagination
      return this.vouchers.meta.pagination
    },
    fields (){
      return {
        serialNumber: {label: 'SERIAL NUMBER', sortable: false},
        denom: {label: 'DENOM', sortable: false},
        expiredAt: {label: 'EXPIRED AT', sortable: false},
        createdAt: {label: 'CREATED AT', sortable: false},
        status: {label: 'STATUS', sortable: false},
        actions: {label: 'ACTION', sortable: false}
      }        
    }
  },

  methods: {
    ...mapActions({
      getVoucher: 'Voucher/getVoucher',
      activateVoucher: 'Voucher/activateVoucher',
      revokeVoucher: 'Voucher/revokeVoucher',
      setPagination: 'Pagination/setPagination'
    }),
    async getVouchers(ctx) {
      // //  set pagination
      this.setPagination({currentPage: ctx.currentPage, size: 10})
       //  set pagination as object, in the future we can parse Sort and Filter too
      await this.getVoucher({voucherOrderId: this.$route.params.voucherOrderId, pagination: this.pagination})
      return this.vouchers.data
    },
    async toActivateVoucher(serialNumber){
      this.activate(serialNumber)
    },
    async toRevokeVoucher(serialNumber){
      this.revoke(serialNumber)
    },
    showActivateModal () {
      this.$refs.activateModalRef.show()
    },
    hideActivateModal () {
      this.$refs.activateModalRef.hide()
      this.$refs.voucherTable.refresh()
    },
    showRevokeModal () {
      this.$refs.revokeModalRef.show()
    },
    hideRevokeModal () {
      this.$refs.revokeModalRef.hide()
      this.$refs.voucherTable.refresh()
    },
    activate (serialNumber) {
      if(confirm('Are you sure want to activate this voucher?')) {
        let __self = this
        let input = {
          serialNumber: serialNumber
        }
        //  dispatch Actions Create on product
        this.$validator.validateAll().then((result) => {
          if (!result) {
            window.scrollTo(0, 0)
          } else {
            if (result) {
              __self.activateVoucher(input)
              __self.showActivateModal()
            }
          }
        })
      }
    },
    revoke (serialNumber) {
      if(confirm('Voucher that has been revoked won\'t be able being redeemed.\nAre you sure want to revoke this voucher?')) {
        let __self = this
        let input = {
          serialNumber: serialNumber
        }
        //  dispatch Actions Create on product
        this.$validator.validateAll().then((result) => {
          if (!result) {
            window.scrollTo(0, 0)
          } else {
            if (result) {
              __self.revokeVoucher(input)
              __self.showRevokeModal()
            }
          }
        })
      }
    }
  }
}
</script>

