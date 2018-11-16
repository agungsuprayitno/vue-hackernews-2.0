<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Create Voucher Form</strong> {{productVariants }}
          </div>

          <b-form-group label="Remark" :label-cols="3" :horizontal="true">
            <b-form-input v-model="voucherInput.remark" v-validate="'required'" data-vv-as="Remark" name="remark" ref="remark" type="text"></b-form-input>
            <span v-show="errors.has('remark')" class="text-danger is-danger">{{ errors.first('remark') }}</span>
          </b-form-group>

          <b-form-group label="Product Variant" :label-cols="3" :horizontal="true">
            <div class="row">
              <div class="col-md-6">
                <b-form-select size="md" :options="productVariants" value-field="id" text-field="title" v-model="voucherInput.productVariant" v-validate="'required'" data-vv-as="Product variant" name="product_variant" value="Please select">
                </b-form-select>
                <!--b-form-input v-model="voucherInput.productVariant" data-vv-as="Product Variant" name="product_variant" type="text"></b-form-input-->
              </div>
              <div class="col-md-6">
                  <b-form-input v-model="voucherInput.quantity" data-vv-as="Quantity" name="quantity" type="text"></b-form-input>
              </div>
            </div>
          </b-form-group>

          <div slot="footer">
            <b-button type="submit" size="sm" variant="primary" @click.prevent="submit"><i class="fa fa-check"></i> Generate</b-button>&nbsp;
            <b-button type="reset" size="sm" variant="danger" @click.prevent="reset"><i class="fa fa-ban"></i> Reset</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>

import {mapState, mapActions, mapGetters} from 'vuex'
import { mapWaitingActions } from 'vue-wait'
export default {
  data () {
    return {
      options: [
        { value: this.$constant.status.activeStatus, text: this.$constant.status.activeStatus },
        { value: this.$constant.status.inactiveStatus, text: this.$constant.status.inactiveStatus }
      ],
      resetValues: {}
    }
  },

  computed: {
    ...mapState({
      voucher: state => state.Voucher.voucher
    }),
    // ...mapGetters({
    //   productVariants: 'product/products'
    // }),
    voucherInput () {
      if(!this.$lodash.isEmpty(this.$route.params)) {
        return this.voucher.data
      }
      return {
        remark: '',
        productVariant: '',
        quantity: '',
        active: 'NO'
      }
    }
  },

  // async fetch ({store}) {
  //   await store.dispatch('product/getProductList')
  // },

  asyncData ({store, route}) {
    //  calling get voucher on edit mode
    if(route.params.voucherOrderId !== undefined) {
      store.dispatch('Voucher/getVoucherOrderById', route.params.voucherOrderId)
    }
  },

  mounted () {
    this.resetValues = {
      voucher: JSON.parse(JSON.stringify(this.voucher))
    }
  },

  methods: {
    ...mapActions({
      createVoucher: 'Voucher/createVoucher',
      getVoucherOrderById: 'Voucher/getVoucherOrderById'
    }),

    ...mapWaitingActions('Voucher', {
      createVoucher: 'generating voucher',
      getVoucherOrderById: 'getting voucher order',
    }),
    submit () {
      if(confirm('Are you sure want to generate this voucher(s)?')) {
        
        let __self = this

        let voucherOrderItemArr = [];
        if(__self.voucherInput.productVariant && __self.voucherInput.quantity) {
          voucherOrderItemArr.push({ 
            "productVariantId": __self.voucherInput.productVariant,
            "quantity": __self.voucherInput.quantity
          });
        }

        let input = {
          remark: __self.voucherInput.remark,
          voucherOrderItem: voucherOrderItemArr,
          active: 'NO'
        }

          //  dispatch Actions Create on Voucher
        this.$validator.validateAll().then((result) => {
          if (result) {
            if(!this.$lodash.isEmpty(this.$route.params.voucherOrderId)){
                input.id = __self.$route.params.voucherOrderId
                __self.updateVoucher(input)
            }else {
                __self.createVoucher(input)
            }
          } else {
            if (process.env.VUE_ENV !== 'server') {
              window.scrollTo(0, 0)
            }
          }
        })
      }
    },
    reset () {
      //  reset text input
      this.voucherInput = {...this.resetValues.voucher}

      window.scrollTo(0, 0)
      this.$refs.remark.focus()

      this.errors.clear()
    },
  }
}
</script>

