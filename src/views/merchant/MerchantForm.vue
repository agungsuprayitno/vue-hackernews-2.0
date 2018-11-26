<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Merchant Data</strong>
          </div>
          <b-form-group label="Code" :label-cols="3" :horizontal="true">
            <b-form-input v-model="merchantInput.code" v-validate="'required'" data-vv-as="Merchant's code" name="merchant_code" ref="merchant_code" type="text" disabled></b-form-input>
            <span v-show="errors.has('merchant_code')" class="text-danger is-danger">{{ errors.first('merchant_code') }}</span>
          </b-form-group>

          <b-form-group label="Name" :label-cols="3" :horizontal="true">
            <b-form-input v-model="merchantInput.name" v-validate="'required|regex:^[A-Za-z][A-Za-z0-9 \-+%]*$'" data-vv-as="Merchant's name" name="merchant_name" ref="merchant_name" type="text"></b-form-input>
            <span v-show="errors.has('merchant_name')" class="text-danger is-danger">{{ errors.first('merchant_name') }}</span>
          </b-form-group>
      
          <b-form-group label="Email" :label-cols="3" :horizontal="true">
            <b-form-input v-model="merchantInput.email" v-validate="'required|email'" data-vv-as="Merchant's email" name="merchant_email" type="text" :disabled="isMerchantExist"></b-form-input>
            <span v-show="errors.has('merchant_email')" class="text-danger is-danger">{{ errors.first('merchant_email') }}</span>
          </b-form-group>

          <b-form-group label="Phone Number" :label-cols="3" :horizontal="true">
            <!--b-form-input v-model="merchantInput.phoneNumber" v-validate="'required|regex:^\\+[0-9]\\-'" data-vv-as="Merchant Phone Number" name="phone_number" type="text" @input="phoneCheck()"></b-form-input-->
            <b-form-input v-model="merchantInput.phoneNumber" v-validate="'required'" data-vv-as="Merchant's phone number" name="phone_number" type="text"  :disabled="isMerchantExist" @input="phoneCheck()"></b-form-input>
            <span v-show="errors.has('phone_number')" class="text-danger is-danger">{{ errors.first('phone_number') }}</span>
          </b-form-group>

          <!--b-form-group label="Merchant Code" :label-cols="3" :horizontal="true">
            <b-form-input v-model="merchantInput.code" v-validate="'required|regex:^[A-Za-z][A-Za-z0-9 \-+%]*$'" data-vv-as="Merchant Code" name="code" type="text"></b-form-input>
            <span v-show="errors.has('code')" class="text-danger is-danger">{{ errors.first('code') }}</span>
          </b-form-group-->

          <b-form-group label="API Key" :label-cols="3" :horizontal="true">
            <b-form-input v-model="merchantInput.apiKey" v-validate="'required'" data-vv-as="Merchant's API key" name="merchant_api_key" ref="merchant_api_key" type="text" disabled></b-form-input>
          </b-form-group>

          <b-form-group label="IP Address" :label-cols="3" :horizontal="true">
            <b-form-textarea v-model="merchantInput.ipAddress" v-validate="'required'" data-vv-as="Merchant's IP address" name="merchant_ip_address" placeholder="Enter each IP address per line" :rows="3" :max-rows="3"></b-form-textarea>
            <span v-show="errors.has('merchant_ip_address')" class="text-danger is-danger">{{ errors.first('merchant_ip_address') }}</span>
          </b-form-group>

          <b-form-group label="Reference" :label-cols="3" :horizontal="true">
            <div class="row">
              <div class="col-md-6">
                <b-form-input v-model="merchantInput.referenceName" data-vv-as="Merchant's reference name" name="reference_name" type="text" placeholder="Enter reference name"></b-form-input>
              </div>
              <div class="col-md-6">
                  <b-form-input v-model="merchantInput.referenceValue" data-vv-as="Merchant's reference value" name="reference_value" type="text" placeholder="Enter reference value1"></b-form-input>
              </div>
            </div>
          </b-form-group>

          <!-- Only show component when the page is edit mode -->
          <!--b-col md="12" class="px-0" v-if="!$lodash.isEmpty($route.params.merchantId)">
            <b-form-group label="Status" :label-cols="3" :horizontal="true">
              <b-form-select v-model="merchantInput.status" :options="options" class="mb-3" name="merchant_status" />
              <span v-show="errors.has('merchant_status')" class="text-danger is-danger">{{ errors.first('merchant_status') }}</span>
            </b-form-group>
          </b-col-->

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
    isMerchantExist() {
      //  check if page on edit mode
      return !this.$lodash.isEmpty(this.$route.params)
    },
    merchantInput() {
      if(this.isMerchantExist) {
        let reference = this.merchant.data.reference;
        for(var i=0; i<reference.length; i++) {
          if(reference[i].referenceName==='ip_address') {
            if(i===0){
              this.merchant.data.ipAddress = reference[i].referenceValue; 
            } else {
              this.merchant.data.ipAddress += '\n' + reference[i].referenceValue; 
            }
          } else {
            this.merchant.data.referenceName = reference[i].referenceName;
            this.merchant.data.referenceValue = reference[i].referenceValue;
          }
        }
        return this.merchant.data
      }
      return {
        code: '<AUTO>',
        apiKey: '<AUTO>'
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
        //__self.user.phone = result;
        __self.merchantInput.phoneNumber = result;
      }
    },
    submit () {
      let __self = this
      let merchantIpAddress = __self.merchantInput.ipAddress;
      let merchantIpAddressArr = merchantIpAddress.split("\n");
      let referenceArr = [];
      if(__self.merchantInput.referenceName && __self.merchantInput.referenceValue) {
        referenceArr.push({ 
          "referenceName": __self.merchantInput.referenceName,
          "referenceValue": __self.merchantInput.referenceValue
        });
      }

      let input = {
        name: __self.merchantInput.name,
        email: __self.merchantInput.email,
        phoneNumber: __self.merchantInput.phoneNumber,
        ipAddress: merchantIpAddressArr,
        reference: referenceArr
      }

        //  dispatch Actions Create on merchant
      this.$validator.validateAll().then((result) => {
        if (!result) {
          window.scrollTo(0, 0)
        } else {
          if (result) {
            if(__self.isMerchantExist){
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
      this.merchantInput = {...this.resetValues.merchant}

      window.scrollTo(0, 0)
      this.$refs.merchant_name.focus()

      this.errors.clear()
    },
  }
}
</script>

