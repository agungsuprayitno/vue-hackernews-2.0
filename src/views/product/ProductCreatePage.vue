<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Product Form</strong>
            {{ $route.params.productId }}
          </div>
          <b-form-group label="Product Name" :label-cols="3" :horizontal="true">
            <b-form-input v-model="product.product_name" v-validate="'required|regex:^[A-Za-z][A-Za-z0-9 \-+%]*$'" data-vv-as="Product Name" name="product_name" ref="product_name" type="text"></b-form-input>
            <span v-show="errors.has('product_name')" class="text-danger is-danger">{{ errors.first('product_name') }}</span>
          </b-form-group>
          <b-form-group label="Status" :label-cols="3" :horizontal="true">
            <b-form-select v-model="product.product_status" :options="options" class="mb-3" name="product.status" />
            <span v-show="errors.has('product_status')" class="text-danger is-danger">{{ errors.first('product_description') }}</span>
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

import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      options: [
        { value: this.$constant.status.activeStatus, text: this.$constant.status.activeStatus },
        { value: this.$constant.status.inactiveStatus, text: this.$constant.status.inactiveStatus }
      ],
      product: {
        product_name: '',
        product_status: this.$constant.status.inactiveStatus
      },
      resetValues: {}
    }
  },

  mounted () {
    this.resetValues = {
        product: {...this.product}
      }
  },

  methods: {
    ...mapActions({
      createProduct: 'Product/createProduct'
    }),
    submit () {
      let __self = this
      let input = {
        name: __self.product.product_name,
        status: __self.product.product_status
      }

        //  dispatch Actions Create on product
      this.$validator.validateAll().then((result) => {
        if (!result) {
          window.scrollTo(0, 0)
        } else {
          if (result) {
            __self.createProduct(input)
          }
        }
      })
    },
    reset () {
      //  reset text input
      this.product = {...this.resetValues.product}

      window.scrollTo(0, 0)
      this.$refs.product_name.focus()

      this.errors.clear()
    },
  }
}
</script>

