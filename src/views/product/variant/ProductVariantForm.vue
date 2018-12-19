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
            <b-form-input v-model="productVariantData.skuCode" :disabled="isRouteVariantIdExist" v-validate="'required'" data-vv-as="SKU Code" name="sku_code" ref="sku_code" type="text"></b-form-input>
            <span v-show="errors.has('sku_code')" class="text-danger is-danger">{{ errors.first('sku_code') }}</span>
          </b-form-group>

          <b-form-group label="Denom" :label-cols="3" :horizontal="true">
            <b-form-input v-model="productVariantData.denom" v-validate="'required'" data-vv-as="Denom" name="denom" type="text"></b-form-input>
            <span v-show="errors.has('denom')" class="text-danger is-danger">{{ errors.first('denom') }}</span>
          </b-form-group>

          <!-- Only show component when the page is edit mode -->
          <b-col md="12" class="px-0" v-if="isRouteVariantIdExist">
            <b-form-group label="Status" :label-cols="3" :horizontal="true">
              <b-form-select v-model="productVariantData.status" :options="options" class="mb-3" name="product_variant_status" />
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
      resetValues: {},
      productVariantData: {
        skuCode: '',
        denom: '',
        status: this.$constant.status.inactiveStatus
      }
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
    ...mapGetters({
      waitAny: 'wait/any'
    }),
  },

  components: {
    Notification,
    ContentLoader
  },

  //  TODO: enable this when Product Variant can be update
  // async created () {
  //   if(this.isRouteVariantIdExist) {
  //     //  calling get productVariant on edit mode
  //     await this.$store.dispatch('ProductVariant/getProductVariantByProductVariantId', {productId: this.$route.params.productId, productVariantId: this.$route.params.productVariantId})
  //     if(this.productVariant.data !== undefined) {
  //       this.productVariantData = this.productVariant.data
  //       this.resetValues = {
  //         user: JSON.parse(JSON.stringify(this.productVariant.data))
  //       }
  //     }
  //   }
  // },

  methods: {
    ...mapActions({
      createProductVariant: 'ProductVariant/createProductVariant',
      updateProductVariant: 'ProductVariant/updateProductVariant',
      getProductVariantById: 'ProductVariant/getProductVariantByProductVariantId'
    }),
    submit () {
      let __self = this
      let input = {
        skuCode: __self.productVariantData.skuCode,
        denom: __self.productVariantData.denom,
        status: __self.productVariantData.status,
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
      this.productVariantData = {...this.resetValues.productVariant}

      window.scrollTo(0, 0)
      this.$refs.sku_code.focus()

      this.errors.clear()
    },
  }
}
</script>

