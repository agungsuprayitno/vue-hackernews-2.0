<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Merchant Product Form</strong>
          </div>
          <notification v-if="!$lodash.isEmpty(notification)"></notification>

          <b-row class="mx-0">
            <content-loader v-if="waitAny"></content-loader>
          </b-row>

          <b-form-group label="Product" :label-cols="3" :horizontal="true">

            <b-form-select v-model="productMerchantData.productId" v-validate="'required'" data-vv-as="Product" name="product">
              <option v-for="product in products.data" :value="product.id">{{product.name}}</option>
            </b-form-select>

            <span v-show="errors.has('product')" class="text-danger is-danger">{{ errors.first('product') }}</span>
          </b-form-group>

          <div slot="footer">
            <b-button type="submit" size="sm" variant="primary" @click.prevent="submit"><i class="fa fa-check"></i> Submit</b-button>&nbsp;
            <b-button type="reset" size="sm" variant="danger" @click.prevent="reset"><i class="fa fa-ban"></i> Reset</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>

import {mapState, mapActions, mapGetters} from 'vuex'
import Notification from '@/components/Notification.vue'
import ContentLoader from '@/components/loader/ContentLoader.vue'

export default {
  data () {
    return {
      resetValues: {},
      productMerchantData: {
        merchantId: '',
        productId: '',
        status: ''
      },
      filter: null
    }
  },

  created(){
    this.$store.dispatch("ProductMerchant/getAllProduct")
  },

  computed: {
    ...mapState({
      productMerchant: state => state.ProductMerchant.productMerchant,
      notification: state => state.Notification.notification,
      products: state => state.ProductMerchant.productList
    }),
    isRouteVariantIdExist() {
      //  check if page on edit mode
      return !this.$lodash.isEmpty(this.$route.params) && this.$route.params.merchantProductId !== undefined
    },
    ...mapGetters({
      waitAny: 'wait/any'
    }),
  },

  components: {
    Notification,
    ContentLoader
  },

  methods: {
    ...mapActions({
      createMerchantProduct: 'ProductMerchant/createMerchantProduct',
      updateProductMerchant: 'ProductMerchant/updateProductMerchant',
      getProductMerchantById: 'ProductMerchant/getProductMerchantByProductMerchantId'
    }),
    submit () {
      let __self = this
      let input = {
        merchantId: __self.$route.params.merchantId,
        status: __self.productMerchantData.status,
        productId: __self.productMerchantData.productId
      }

      //  dispatch Actions Create on product
      this.$validator.validateAll().then((result) => {
        if (!result) {
          window.scrollTo(0, 0)
        } else {
          if (result) {
            if(__self.isRouteVariantIdExist){
                input.id = __self.$route.params.merchantProductId
                __self.updateProductMerchant({productMerchant: input, router: __self.$router})
            }else {
                __self.createMerchantProduct({productMerchant: input, router: __self.$router})
            }
          }
        }
      })
    },
    reset () {
      //  reset text input
      this.productMerchantData = {...this.resetValues.productMerchant}

      window.scrollTo(0, 0)
      this.$refs.merchant.focus()

      this.errors.clear()
    },
  }
}
</script>

