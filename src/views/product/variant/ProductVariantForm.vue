<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Product Variant Form</strong>
          </div>
          <notification v-if="!$lodash.isEmpty(notification)"></notification>

          <b-row class="mx-0">
            <content-loader v-if="waitAny"></content-loader>
          </b-row>
          
          <b-form-group label="SKU Code" :label-cols="3" :horizontal="true">
            <b-form-input v-model="productVariantInput.skuCode" :disabled="isRouteVariantIdExist" v-validate="'required'" data-vv-as="SKU Code" name="sku_code" ref="sku_code" type="text"></b-form-input>
            <span v-show="errors.has('sku_code')" class="text-danger is-danger">{{ errors.first('sku_code') }}</span>
          </b-form-group>
          
          <b-form-group label="Denom" :label-cols="3" :horizontal="true">
            <b-form-input v-model="productVariantInput.denom" v-validate="'required'" data-vv-as="Denom" name="denom" type="text"></b-form-input>
            <span v-show="errors.has('denom')" class="text-danger is-danger">{{ errors.first('denom') }}</span>
          </b-form-group>

          <!-- Only show component when the page is edit mode -->
          <b-col md="12" class="px-0" v-if="isRouteVariantIdExist">
            <b-form-group label="Status" :label-cols="3" :horizontal="true">
              <b-form-select v-model="productVariantInput.status" :options="options" class="mb-3" name="product_variant_status" />
              <span v-show="errors.has('product_variant_status')" class="text-danger is-danger">{{ errors.first('product_status') }}</span>
            </b-form-group>
          </b-col>

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
      options: [
        { value: this.$constant.status.activeStatus, text: this.$constant.status.activeStatus },
        { value: this.$constant.status.inactiveStatus, text: this.$constant.status.inactiveStatus }
      ],
      resetValues: {}
    }
  },

  computed: {
    ...mapState({
      productVariant: state => state.ProductVariant.productVariant,
      notification: state => state.Notification.notification
    }),
    isRouteVariantIdExist() {
      //  check if page on edit mode
      return !this.$lodash.isEmpty(this.$route.params) && this.$route.params.productVariantId !== undefined
    },
    productVariantInput() {
       //  check if page on edit mode
      if(this.isRouteVariantIdExist) return this.productVariant.data
      
      let productVariantInput = {
        skuCode: '',
        denom: '',
        status: this.$constant.status.inactiveStatus
      }
      return productVariantInput
    },

    ...mapGetters({
      waitAny: 'wait/any'
    }),
  },

  components: {
    Notification,
    ContentLoader
  },

  asyncData ({store, route}) {
    //  calling get product variant on edit mode
    if(route.params.productVariantId !== undefined) {
      store.dispatch('ProductVariant/getProductVariantByProductVariantId', {productId: route.params.productId, productVariantId: route.params.productVariantId})
    }
  },

  mounted () {
    this.resetValues = {
      productVariant: JSON.parse(JSON.stringify(this.productVariant))
    }
  },

  methods: {
    ...mapActions({
      createProductVariant: 'ProductVariant/createProductVariant',
      updateProductVariant: 'ProductVariant/updateProductVariant',
      getProductVariantById: 'ProductVariant/getProductVariantByProductVariantId'
    }),
    submit () {
      let __self = this
      let input = {
        skuCode: __self.productVariantInput.skuCode,
        denom: __self.productVariantInput.denom,
        status: __self.productVariantInput.status,
        productId: __self.$route.params.productId
      }

        //  dispatch Actions Create on product
      this.$validator.validateAll().then((result) => {
        if (!result) {
          window.scrollTo(0, 0)
        } else {
          if (result) {
            if(__self.isRouteVariantIdExist){
                input.id = __self.$route.params.productVariantId
                __self.updateProductVariant({productVariant: input, router: __self.$router})
            }else {
                __self.createProductVariant({productVariant: input, router: __self.$router})
            }
          }
        }
      })
    },
    reset () {
      //  reset text input
      this.productVariantInput = {...this.resetValues.productVariant}

      window.scrollTo(0, 0)
      this.$refs.sku_code.focus()

      this.errors.clear()
    },
  }
}
</script>

