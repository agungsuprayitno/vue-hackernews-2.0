<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Merchant Data</strong>
          </div>

          <notification v-if="!$lodash.isEmpty(notification)"></notification>

          <b-row class="mx-0">
            <content-loader v-if="waitAny"></content-loader>
          </b-row>

          <b-form-group label="Code" :label-cols="3" :horizontal="true">
            <b-form-input v-model="merchantData.code" v-validate="'required'" data-vv-as="Merchant's code" name="merchant_code" ref="merchant_code" type="text" disabled></b-form-input>
            <span v-show="errors.has('merchant_code')" class="text-danger is-danger">{{ errors.first('merchant_code') }}</span>
          </b-form-group>

          <b-form-group label="Name" :label-cols="3" :horizontal="true">
            <b-form-input v-model="merchantData.name" v-validate="'required|regex:^[A-Za-z][A-Za-z0-9 \-+%]*$'" data-vv-as="Merchant's name" name="merchant_name" ref="merchant_name" maxlength="64" type="text"></b-form-input>
            <span v-show="errors.has('merchant_name')" class="text-danger is-danger">{{ errors.first('merchant_name') }}</span>
          </b-form-group>

          <b-form-group label="Email" :label-cols="3" :horizontal="true">
            <b-form-input v-model="merchantData.email" v-validate="'required|email'" data-vv-as="Merchant's email" name="merchant_email" type="text" maxlength="64" :disabled="isRouteMerchantExist"></b-form-input>
            <span v-show="errors.has('merchant_email')" class="text-danger is-danger">{{ errors.first('merchant_email') }}</span>
          </b-form-group>

          <b-form-group label="Phone Number" :label-cols="3" :horizontal="true">
            <b-form-input v-model="merchantData.phoneNumber" v-validate="'required'" data-vv-as="Merchant's phone number" name="phone_number" type="text" maxlength="16" :disabled="isRouteMerchantExist" @input="phoneCheck()"></b-form-input>
            <span v-show="errors.has('phone_number')" class="text-danger is-danger">{{ errors.first('phone_number') }}</span>
          </b-form-group>

          <b-form-group label="API Key" :label-cols="3" :horizontal="true">
              <div class="row">
                <div class="col-md-10">
                  <b-form-input v-model="merchantData.apiKey" v-validate="'required'" data-vv-as="Merchant's API key" name="merchant_api_key" ref="merchant_api_key" type="text" disabled></b-form-input>
                </div>
                <div class="col-md-2">
                  <b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" @click="toResetApiKey(merchantData.id)">Reset</b-button>
                </div>
              </div>
            </b-container-fluid>
          </b-form-group>

          <!--&lt;!&ndash; Only show component when the page is edit mode &ndash;&gt;-->
          <!--<b-col md="12" class="px-0" v-if="isRouteMerchantExist">-->
            <!--<b-form-group label="Status" :label-cols="3" :horizontal="true">-->
              <!--<b-form-select v-model="merchantData.status" :options="options" class="mb-3" name="merchant_status" />-->
              <!--<span v-show="errors.has('merchant_status')" class="text-danger is-danger">{{ errors.first('merchant_status') }}</span>-->
            <!--</b-form-group>-->
          <!--</b-col>-->

          <b-form-group label="IP Address" :label-cols="3" :horizontal="true">
            <b-form-textarea v-model="merchantData.ipAddress" v-validate="'required'" data-vv-as="Merchant's IP address" name="merchant_ip_address" placeholder="Enter each IP address per line" :rows="3" :max-rows="3"></b-form-textarea>
            <span v-show="errors.has('merchant_ip_address')" class="text-danger is-danger">{{ errors.first('merchant_ip_address') }}</span>
          </b-form-group>

          <b-form-group label="Reference" :label-cols="3" :horizontal="true">
            <div class="row">
              <div class="col-md-6">
                <b-form-input v-model="merchantData.referenceName" data-vv-as="Merchant's reference name" name="reference_name" type="text" placeholder="Enter reference name"></b-form-input>
              </div>
              <div class="col-md-6">
                  <b-form-input v-model="merchantData.referenceValue" data-vv-as="Merchant's reference value" name="reference_value" type="text" placeholder="Enter reference value1"></b-form-input>
              </div>
            </div>
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
      options: [
        { value: this.$constant.status.activeStatus, text: this.$constant.status.activeStatus },
        { value: this.$constant.status.inactiveStatus, text: this.$constant.status.inactiveStatus }
      ],
      resetValues: {},
      merchantData: {
        code: '<AUTO>',
        apiKey: '<AUTO>'
      }
    }
  },

  computed: {
    ...mapState({
      merchant: state => state.Merchant.merchant,
      notification: state => state.Notification.notification
    }),
    isRouteMerchantExist() {
      //  check if page on edit mode
      return !this.$lodash.isEmpty(this.$route.params) && this.$route.params.merchantId !== undefined
    },
    ...mapGetters({
      waitAny: 'wait/any'
    }),
  },

  components: {
    Notification,
    ContentLoader
  },

  async created () {
    if(this.isRouteMerchantExist) {
      //  calling get merchant on edit mode
      await this.$store.dispatch('Merchant/getMerchantByMerchantId', this.$route.params.merchantId)
      if(this.merchant.data !== undefined) {
        this.merchantData = this.merchant.data

        let reference = this.merchant.data.reference

        for (var i = 0; i < reference.length; i++) {
          if (reference[i].referenceName === 'ip_address') {
            if (i === 0) {
              this.merchantData.ipAddress = reference[i].referenceValue
            } else {
              this.merchantData.ipAddress += '\n' + reference[i].referenceValue
            }
          } else {
            this.merchantData.referenceName = reference[i].referenceName
            this.merchantData.referenceValue = reference[i].referenceValue
          }
        }
        this.resetValues = {
          merchant: JSON.parse(JSON.stringify(this.merchant.data))
        }
      }
    }
  },

  methods: {
    ...mapActions({
      createMerchant: 'Merchant/createMerchant',
      updateMerchant: 'Merchant/updateMerchant',
      resetApiKey: 'Merchant/resetApiKey',
      getMerchantById: 'Merchant/getMerchantByMerchantId'
    }),
    phoneCheck() {
      let __self = this

      let result = '';
      let phone = __self.merchantData.phoneNumber;

      if (phone.length >= 10) {

        //TODO: replace dengan pengecekan ke database
        if (phone.substring(0,2) == '08') {
          result = '+628' + phone.substring(2);
        } else {
          result = phone;
        }
        //__self.user.phone = result;
        __self.merchantData.phoneNumber = result;
      }
    },
    async toResetApiKey(merchantId){
      if(confirm('Are you sure want to reset this merchant\'s API Key?')) {
          let merchantInput = {
          id: merchantId
        }
        await this.resetApiKey(merchantInput)
        alert('API Key has been reset.')
        this.merchantData.apiKey = this.merchant.data.apiKey;
      }
    },
    submit () {
      let __self = this
      let merchantIpAddress = __self.merchantData.ipAddress;
      let merchantIpAddressArr = merchantIpAddress.split("\n");
      let referenceArr = [];
      if(__self.merchantData.referenceName && __self.merchantData.referenceValue) {
        referenceArr.push({
          "referenceName": __self.merchantData.referenceName,
          "referenceValue": __self.merchantData.referenceValue
        });
      }

      let input = {
        name: __self.merchantData.name,
        email: __self.merchantData.email,
        phoneNumber: __self.merchantData.phoneNumber,
        ipAddress: merchantIpAddressArr,
        reference: referenceArr
      }

        //  dispatch Actions Create on merchant
      this.$validator.validateAll().then((result) => {
        if (!result) {
          window.scrollTo(0, 0)
        } else {
          if (result) {
            if(__self.isRouteMerchantExist){
                input.id = __self.$route.params.merchantId
                __self.updateMerchant({merchant: input, router:__self.$router})
            }else {
                __self.createMerchant({merchant: input, router:__self.$router})
            }
          }
        }
      })
    },
    reset () {
      //  reset text input
      this.merchantData = {...this.resetValues.merchant}

      window.scrollTo(0, 0)
      this.$refs.merchant_name.focus()

      this.errors.clear()
    },
  }
}
</script>

