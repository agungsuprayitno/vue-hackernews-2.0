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
            <b-form-select size="md" :options="activeStatus" value-field="id" text-field="title" v-model="voucherInput.active" v-validate="'required'" data-vv-as="Active status" name="active" value="Please select" class="mb3">
            </b-form-select>
            <div class="col-12 my-2">If active status set to "Yes", the voucher will be generated with the secret code</div>
          </b-form-group>

          <b-form-group label="" :label-cols="3" :horizontal="true">
            <div class="row" v-for="(voucherOrderItem, index) in voucherOrderItemArr" :key="index">

              <div class="col-md-4">
                <label>Product</label>
                <b-form-select size="md" :options="productList" value-field="id" text-field="title" v-model="voucherOrderItem.product" v-validate="'required'" data-vv-as="Product" name="product" value="Please select" class="mb3" v-on:input="productOnChange(voucherOrderItem.product)">
                </b-form-select>
                <span v-show="errors.has('product')" class="text-danger is-danger">{{ errors.first('product') }}</span>
              </div>
              <div class="col-md-4">
                  <label>Product Variant</label>
                <b-form-select size="md" :options="productVariantList" value-field="id" text-field="title" v-model="voucherOrderItem.productVariant" v-validate="'required'" data-vv-as="Product variant" name="product_variant" value="Please select" class="mb3">
                </b-form-select>
                <span v-show="errors.has('product_variant')" class="text-danger is-danger">{{ errors.first('product_variant') }}</span>
              </div>
              <div class="col-md-2">
                  <label>Quantity</label>
                  <b-form-input v-model="voucherOrderItem.quantity" data-vv-as="Quantity" name="quantity" type="text" v-validate="'required|numeric'"></b-form-input>
                <span v-show="errors.has('quantity')" class="text-danger is-danger">{{ errors.first('quantity') }}</span>
              </div>
              <div class="col-md-1 row align-items-end">
                <button class="btn btn-link" @click="addVoucherOrderItemArr"><i class="fas fa-plus-square fa-2x"></i> </button>
              </div>
              <div class="col-md-1 row align-items-end">
                <button class="btn btn-link" @click="removeVoucherOrderItemArr(index)"><i class="fas fa-trash fa-2x"></i> </button>
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

import {mapState, mapActions} from 'vuex'
import { mapWaitingActions } from 'vue-wait'
export default {
  data () {
    return {
      resetValues: {},
      voucherInput: {
        remark: '',
        active: ''
      },
      activeStatus: [
        { id: 'NO', title: 'No' },
        { id: 'YES', title: 'Yes' }
      ],
      voucherOrderItemArr: [],
      blockRemoval: true,
    }
  },

  computed: {
    ...mapState({
      productList: state => state.Product.productList,
      productVariantList: state => state.ProductVariant.productVariantList
    })
  },

  mounted () {
    this.resetValues = {
      // voucher: JSON.parse(JSON.stringify(this.voucher))
    }
    //  create new row product variant and quantity
    this.addVoucherOrderItemArr()
    this.$store.dispatch('Product/getAllProductList')
  },

  watch: {
    voucherOrderItemArr () {
      this.blockRemoval = this.voucherOrderItemArr.length <= 1
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
    productOnChange(productId) {
      this.getProductVariantListByProductId(productId)
    },
    addVoucherOrderItemArr () {
      let checkEmptyVoucherOrderItemArr = this.voucherOrderItemArr.filter(voucherOrderItem => voucherOrderItem.number === null)

      if (checkEmptyVoucherOrderItemArr.length >= 1 && this.voucherOrderItemArr.length > 0) return

      this.voucherOrderItemArr.push({
        product: this.productList,
        productVariant: this.productVariantList,
        quantity: 15
      })
    },
    removeVoucherOrderItemArr (voucherOrderItemId) {
      if (!this.blockRemoval) this.voucherOrderItemArr.splice(voucherOrderItemId, 1)
    },
    submit() {
      let __self = this

      if(confirm('Are you sure want to generate this voucher(s)?')) {

        // mapping key and value voucherOrderItemArr to be voucherOrderItem
        let voucherOrderItem = __self.voucherOrderItemArr.flatMap(function (order) {
          let orderItem = {
            "productVariantId": parseInt(order.productVariant),
            "quantity": parseInt(order.quantity)
          };

          return (order.quantity == 0 || __self.$lodash.isEmpty(order.product) || isNaN(order.product) || isNaN(order.productVariant)) ? null : orderItem;
        })

        // validate 'null' contain voucherOrderItem
        let isNotValidVariant = voucherOrderItem.some(item => {
          return item == null
        } );

        if(!isNotValidVariant) {
          let input = {
            remark: __self.voucherInput.remark,
            voucherOrderItem: voucherOrderItem,
            active: __self.voucherInput.active
          }
          //  dispatch Actions Create on Voucher
          this.$validator.validateAll().then((result) => {
            if (result) {
              __self.createVoucher({voucherOrder: input, router: __self.$router})
            } else {
              if (process.env.VUE_ENV !== 'server') {
                window.scrollTo(0, 0)
              }
            }
          })
        } else {
          //  TODO: jadi error form or toast
          alert("Product, Product Variant or Quantity cannot be blank or 0")
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

