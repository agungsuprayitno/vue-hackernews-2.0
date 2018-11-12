<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Merchant Form</strong>
          </div>
          <b-form-group label="Merchant Name" :label-cols="3" :horizontal="true">
            <b-form-input v-model="merchantInput.name" v-validate="'required|regex:^[A-Za-z][A-Za-z0-9 \-+%]*$'" data-vv-as="Merchant Name" name="merchant_name" ref="merchant_name" type="text"></b-form-input>
            <span v-show="errors.has('merchant_name')" class="text-danger is-danger">{{ errors.first('merchant_name') }}</span>
          </b-form-group>

          <b-form-group label="Merchant Email" :label-cols="3" :horizontal="true">
            <b-form-input v-model="merchantInput.email" v-validate="'required|email'" data-vv-as="Merchant Email" name="merchant_email" type="text"></b-form-input>
            <span v-show="errors.has('merchant_email')" class="text-danger is-danger">{{ errors.first('merchant_email') }}</span>
          </b-form-group>

          <b-form-group label="Merchant Phone Number" :label-cols="3" :horizontal="true">
            <b-form-input v-model="merchantInput.phoneNumber" v-validate="'required|regex:^\\+[0-9\\-'" data-vv-as="Merchant Phone Number" name="phone_number" type="text" @input="phoneCheck()"></b-form-input>
            <span v-show="errors.has('phone_number')" class="text-danger is-danger">{{ errors.first('phone_number') }}</span>
          </b-form-group>

          <b-form-group label="Merchant Code" :label-cols="3" :horizontal="true">
            <b-form-input v-model="merchantInput.code" v-validate="'required|regex:^[A-Za-z][A-Za-z0-9 \-+%]*$'" data-vv-as="Merchant Code" name="code" type="text"></b-form-input>
            <span v-show="errors.has('code')" class="text-danger is-danger">{{ errors.first('code') }}</span>
          </b-form-group>

          <!-- Only show component when the page is edit mode -->
          <b-col md="12" class="px-0" v-if="!$lodash.isEmpty($route.params.merchantId)">
            <b-form-group label="Status" :label-cols="3" :horizontal="true">
              <b-form-select v-model="merchantInput.status" :options="options" class="mb-3" name="merchant_status" />
              <span v-show="errors.has('merchant_status')" class="text-danger is-danger">{{ errors.first('merchant_status') }}</span>
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
      merchant: state => state.Merchant.merchant
    }),
    merchantInput() {
      if(!this.$lodash.isEmpty(this.$route.params.merchantId)) {
        return this.merchant
      }
      return {
        name: '',
        email: '',
        phoneNumber: '',
        code: '',
        status: this.$constant.status.inactiveStatus
      }
    }
  },

  asyncData ({store, route}) {
    //  calling get merchant on edit mode
    if(route.params.merchantId !== undefined) {
      store.dispatch('Merchant/getMerchantByMerchantId', route.params.merchantId)
    }
  },

  mounted () {
    this.resetValues = {
      merchant: JSON.parse(JSON.stringify(this.merchant))
    }
  },

  methods: {
    ...mapActions({
      createMerchant: 'Merchant/createMerchant',
      updateMerchant: 'Merchant/updateMerchant',
      getMerchantById: 'Merchant/getMerchantByMerchantId'
    }),
    phoneCheck() {
      let __self = this

      let result = '';
      let phone = __self.merchantInput.phoneNumber;

      if (phone.length >= 10) {

        //TODO: replace dengan pengecekan ke database
        if (phone.substring(0,2) == '08') {
          result = '+628' + phone.substring(2);
        } else {
          result = phone;
        }

        __self.user.phone = result;
      }
    },
    submit () {
      let __self = this
      let input = {
        name: __self.merchantInput.name,
        status: __self.merchantInput.status
      }

        //  dispatch Actions Create on merchant
      this.$validator.validateAll().then((result) => {
        if (!result) {
          window.scrollTo(0, 0)
        } else {
          if (result) {
            if(!this.$lodash.isEmpty(this.$route.params.merchantId)){
                input.id = __self.$route.params.merchantId
                __self.updateMerchant(input)
            }else {
                __self.createMerchant(input)
            }
          }
        }
      })
    },
    reset () {
      //  reset text input
      this.merchantInput = {...this.resetValues.merchant}

      window.scrollTo(0, 0)
      this.$refs.merchant_name.focus()

      this.errors.clear()
    },
  }
}
</script>

