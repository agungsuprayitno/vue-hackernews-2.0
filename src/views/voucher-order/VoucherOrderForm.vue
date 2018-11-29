<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Create Voucher Form</strong>
          </div>

          <b-form-group label="Remark" :label-cols="3" :horizontal="true">
            <b-form-input v-model="voucherInput.remark" v-validate="'required'" data-vv-as="Remark" name="remark" ref="remark" type="text"></b-form-input>
            <span v-show="errors.has('remark')" class="text-danger is-danger">{{ errors.first('remark') }}</span>
          </b-form-group>

          <b-form-group label="Active status" :label-cols="3" :horizontal="true">
            <b-form-select size="md" :options="activeStatus" value-field="id" text-field="title" v-model="voucherInput.active" v-validate="'required'" data-vv-as="Active status" name="active" value="Please select" class="mb3" >
            </b-form-select>
            
          </b-form-group>

          <b-form-group label="" :label-cols="3" :horizontal="true">
            <div class="row">
              <div class="col-md-4">
                <label>Product</label>
                <b-form-select size="md" :options="productList" value-field="id" text-field="title" v-model="voucherInput.product" v-validate="'required'" data-vv-as="Product" name="product" value="Please select" class="mb3" v-on:input="productOnChange()">
                </b-form-select>
                <span v-show="errors.has('product')" class="text-danger is-danger">{{ errors.first('product') }}</span>
                <!--b-form-input v-model="voucherInput.productVariant" data-vv-as="Product Variant" name="product_variant" type="text"></b-form-input-->
              </div>
              <div class="col-md-4">
                  <label>Product Variant</label>
                  <b-form-select size="md" :options="productVariantList" value-field="id" text-field="title" v-model="voucherInput.productVariant" v-validate="'required'" data-vv-as="Product variant" name="product_variant" value="Please select" class="mb3">
                  </b-form-select>
                <!--b-form-input v-model="voucherInput.productVariant" data-vv-as="Product Variant" name="product_variant" type="text"></b-form-input-->
              </div>
              <div class="col-md-4">
                  <label>Quantity</label>
                  <b-form-input v-model="voucherInput.quantity" data-vv-as="Quantity" name="quantity" type="text" ></b-form-input>
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
        { id: this.$constant.status.activeStatus, title: this.$constant.status.activeStatus },
        { id: this.$constant.status.inactiveStatus, title: this.$constant.status.inactiveStatus }
      ],
      activeStatus: [
        { id: 'NO', title: 'No' },
        { id: 'YES', title: 'Yes' }
      ],
      resetValues: {},
      voucherInput: {
        remark: '',
        quantity: '100',
        active: 'NO'
      }
    }
  },

  computed: {
    ...mapState({
      productList: state => state.Product.productList,
      productVariantList: state => state.ProductVariant.productVariantList
    })
  },

  asyncData ({store, route}) {
    store.dispatch('Product/getAllProductList')
  },

  mounted () {
    this.resetValues = {
      // voucher: JSON.parse(JSON.stringify(this.voucher))
    }
  },

  methods: {
    ...mapActions({
      createVoucher: 'Voucher/createVoucher',
      getVoucherOrderById: 'Voucher/getVoucherOrderById',
      getProductVariantListByProductId: 'ProductVariant/getProductVariantList'
    }),

    ...mapWaitingActions('Voucher', {
      createVoucher: 'generating voucher',
      getVoucherOrderById: 'getting voucher order',
    }),
    productOnChange() {
      this.getProductVariantListByProductId(this.voucherInput.product)
    },
    submit() {
      let __self = this

      let voucherOrderItemArr = [];
      if(__self.voucherInput.productVariant && __self.voucherInput.quantity) {
        if(confirm('Are you sure want to generate this voucher(s)?')) {
          voucherOrderItemArr.push({ 
            "productVariantId": __self.voucherInput.productVariant,
            "quantity": __self.voucherInput.quantity
          });
         
          let input = {
            remark: __self.voucherInput.remark,
            voucherOrderItem: voucherOrderItemArr,
            active: __self.voucherInput.active
          }

            //  dispatch Actions Create on Voucher
          this.$validator.validateAll().then((result) => {
            if (result) {
              if(!this.$lodash.isEmpty(this.$route.params.voucherOrderId)){
                  input.id = __self.$route.params.voucherOrderId
                  __self.updateVoucher(input)
              }else {
                __self.createVoucher({voucherOrder: input, router: __self.$router})
              }
            } else {
              if (process.env.VUE_ENV !== 'server') {
                window.scrollTo(0, 0)
              }
            }
          })
        }
      }
  },
    reset() {
      //  reset text input
      this.voucherInput = {...this.resetValues.voucher}

      window.scrollTo(0, 0)
      this.$refs.remark.focus()

      this.errors.clear()
    }
  }
}
</script>

