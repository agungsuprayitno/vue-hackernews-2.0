<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Product Form</strong>
          </div>
          <notification v-if="!$lodash.isEmpty(notification)"></notification>
          <b-form-group label="Product Name" :label-cols="3" :horizontal="true">
            <b-form-input v-model="productInput.name" v-validate="'required'" data-vv-as="Product Name" name="product_name" ref="product_name" type="text"></b-form-input>
            <span v-show="errors.has('product_name')" class="text-danger is-danger">{{ errors.first('product_name') }}</span>
          </b-form-group>
          
          <!-- Only show component when the page is edit mode -->
          <b-col md="12" class="px-0" v-if="!$lodash.isEmpty($route.params.productId)">
            <b-form-group label="Status" :label-cols="3" :horizontal="true">
              <b-form-select v-model="productInput.status" :options="options" class="mb-3" name="product_status" />
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

import {mapState, mapActions} from 'vuex'
import Notification from '@/components/Notification.vue'
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
      product: state => state.Product.product,
      notification: state => state.Notification.notification
    }),
    productInput() {
      if(!this.$lodash.isEmpty(this.$route.params.productId)) {
        return this.product.data
      }
      return {
        name: '',
        status: this.$constant.status.activeStatus
      }
    }
  },

  components: {
    Notification
  },

  asyncData ({store, route}) {
    //  calling get product on edit mode
    if(route.params.productId !== undefined) {
      store.dispatch('Product/getProductByProductId', route.params.productId)
    }
  },

  mounted () {
    this.resetValues = {
      product: JSON.parse(JSON.stringify(this.product))
    }
  },

  methods: {
    ...mapActions({
      createProduct: 'Product/createProduct',
      updateProduct: 'Product/updateProduct',
      getProductById: 'Product/getProductByProductId'
    }),
    submit () {
      let __self = this
      let input = {
        name: __self.productInput.name,
        status: __self.productInput.status
      }

        //  dispatch Actions Create on product
      this.$validator.validateAll().then((result) => {
        if (!result) {
          window.scrollTo(0, 0)
        } else {
          if (result) {
            if(!this.$lodash.isEmpty(this.$route.params.productId)){
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
      this.productInput = {...this.resetValues.product}

      window.scrollTo(0, 0)
      this.$refs.product_name.focus()

      this.errors.clear()
    },
  }
}
</script>

