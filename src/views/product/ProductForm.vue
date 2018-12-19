<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Product Form</strong>
          </div>
          <notification v-if="!$lodash.isEmpty(notification)"></notification>
          <b-row class="mx-0">
            <content-loader v-if="waitAny"></content-loader>
          </b-row>
          <b-form-group label="Product Name" :label-cols="3" :horizontal="true">
            <b-form-input v-model="productData.name" v-validate="'required'" data-vv-as="Product Name" name="product_name" ref="product_name" type="text"></b-form-input>
            <span v-show="errors.has('product_name')" class="text-danger is-danger">{{ errors.first('product_name') }}</span>
          </b-form-group>

          <!-- Only show component when the page is edit mode -->
          <b-col md="12" class="px-0" v-if="!$lodash.isEmpty($route.params.productId)">
            <b-form-group label="Status" :label-cols="3" :horizontal="true">
              <b-form-select v-model="productData.status" :options="options" class="mb-3" name="product_status" />
              <span v-show="errors.has('product_status')" class="text-danger is-danger">{{ errors.first('product_status') }}</span>
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
      productData: {
        name: '',
        status: this.$constant.status.activeStatus
      }
    }
  },

  computed: {
    ...mapState({
      product: state => state.Product.product,
      notification: state => state.Notification.notification
    }),
    ...mapGetters({
      waitAny: 'wait/any'
    }),
    isRouteProductIdExist() {
      //  check if page on edit mode
      return !this.$lodash.isEmpty(this.$route.params) && this.$route.params.productId !== undefined
    }
  },

  components: {
    Notification,
    ContentLoader
  },

  //  TODO: enable this when Product can be update
  // async created () {
  //   if(this.isRouteProductIdExist) {
  //     //  calling get Product on edit mode
  //     await this.$store.dispatch('Product/getProductByProductId', this.$route.params.productId)
  //     if(this.product.data !== undefined) {
  //       this.productData = this.product.data
  //       this.resetValues = {
  //         user: JSON.parse(JSON.stringify(this.product.data))
  //       }
  //     }
  //   }
  // },

  methods: {
    ...mapActions({
      createProduct: 'Product/createProduct',
      updateProduct: 'Product/updateProduct',
      getProductById: 'Product/getProductByProductId'
    }),
    submit () {
      let __self = this
      let input = {
        name: __self.productData.name,
        status: __self.productData.status
      }

        //  dispatch Actions Create on product
      this.$validator.validateAll().then((result) => {
        if (!result) {
          window.scrollTo(0, 0)
        } else {
          if (result) {
            if(this.isRouteProductIdExist){
                input.id = __self.$route.params.productId
                __self.updateProduct({product: input, router: __self.$router})
            }else {
                __self.createProduct({product: input, router: __self.$router})

            }
          }
        }
      })
    },
    reset () {
      //  reset text input
      this.productData = {...this.resetValues.product}

      window.scrollTo(0, 0)
      this.$refs.product_name.focus()

      this.errors.clear()
    },
  }
}
</script>

