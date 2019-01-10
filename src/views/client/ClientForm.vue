<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Client Form</strong>
          </div>
          <notification v-if="!$lodash.isEmpty(notification)"></notification>

          <b-row class="mx-0">
            <content-loader v-if="waitAny"></content-loader>
          </b-row>

          <b-form-group label="Code" :label-cols="3" :horizontal="true">
            <b-form-input v-model="clientData.code" data-vv-as="Client Code" name="client_code" type="text" readOnly></b-form-input>
            <span v-show="errors.has('client_code')" class="text-danger is-danger">{{ errors.first('client_code') }}</span>
          </b-form-group>

          <b-form-group label="Name" :label-cols="3" :horizontal="true">
            <b-form-input v-model="clientData.name" v-validate="'required|regex:^[A-Za-z][A-Za-z0-9 \-+%]*$'" data-vv-as="Client Name" name="client_name" ref="client_name" type="text"></b-form-input>
            <span v-show="errors.has('client_name')" class="text-danger is-danger">{{ errors.first('client_name') }}</span>
          </b-form-group>

          <b-form-group label="Email" :label-cols="3" :horizontal="true">
            <b-form-input v-model="clientData.email" v-validate="'required|email'" data-vv-as="Client Email" name="client_email" type="text" :disabled="isRouteClientExist"></b-form-input>
            <span v-show="errors.has('client_email')" class="text-danger is-danger">{{ errors.first('client_email') }}</span>
          </b-form-group>

          <b-form-group label="Phone Number" :label-cols="3" :horizontal="true">
            <b-form-input v-model="clientData.phoneNumber" v-validate="'required'" data-vv-as="Client Phone Number" name="phone_number" type="text" maxlength="16" :disabled="isRouteClientExist" @input="phoneCheck()"></b-form-input>
            <span v-show="errors.has('phone_number')" class="text-danger is-danger">{{ errors.first('phone_number') }}</span>
          </b-form-group>

          <b-form-group label="API Key" :label-cols="3" :horizontal="true">
            <div class="row">
              <div class="col-md-10" v-if="isRouteClientExist">
                <b-form-input v-model="clientData.apiKey" data-vv-as="Client API Key" name="client_api_key" type="text" readOnly></b-form-input>
              </div>
              <div class="col-md-12" v-else>
                <b-form-input v-model="clientData.apiKey" data-vv-as="Client API Key" name="client_api_key" type="text" readOnly></b-form-input>
              </div>
              <div class="col-md-2" v-if="isRouteClientExist">
                <b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" @click="toResetApiKey(clientData.id)">Reset</b-button>
              </div>
            </div>
          </b-form-group>

          <!--&lt;!&ndash; Only show component when the page is edit mode &ndash;&gt;-->
          <!--<b-col md="12" class="px-0" v-if="isRouteClientExist">-->
            <!--<b-form-group label="Status" :label-cols="3" :horizontal="true">-->
              <!--<b-form-select v-model="clientData.status" :options="options" class="mb-3" name="client_status" />-->
              <!--<span v-show="errors.has('client_status')" class="text-danger is-danger">{{ errors.first('client_status') }}</span>-->
            <!--</b-form-group>-->
          <!--</b-col>-->

          <b-form-group label="IP Address" :label-cols="3" :horizontal="true">
            <b-form-textarea v-model="clientData.ipAddress" v-validate="'required'" data-vv-as="Client's IP address" name="client_ip_address" placeholder="Enter each IP address per line" :rows="3" :max-rows="3"></b-form-textarea>
            <span v-show="errors.has('client_ip_address')" class="text-danger is-danger">{{ errors.first('client_ip_address') }}</span>
          </b-form-group>

          <b-form-group label="Reference" :label-cols="3" :horizontal="true">
            <div class="row">
              <div class="col-md-6">
                <b-form-input v-model="clientData.referenceName" data-vv-as="Client's reference name" name="reference_name" type="text" placeholder="Enter reference name"></b-form-input>
              </div>
              <div class="col-md-6">
                <b-form-input v-model="clientData.referenceValue" data-vv-as="Client's reference value" name="reference_value" type="text" placeholder="Enter reference value1"></b-form-input>
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
      clientData: {
        code: '<AUTO>',
        apiKey: '<AUTO>',
        name: '',
        email: '',
        phoneNumber: ''
      }
    }
  },

  computed: {
    ...mapState({
      client: state => state.Client.client,
      notification: state => state.Notification.notification
    }),
    isRouteClientExist() {
      //  check if page on edit mode
      return !this.$lodash.isEmpty(this.$route.params) && this.$route.params.clientId !== undefined
    },
    ...mapGetters({
      waitAny: 'wait/any'
    }),
  },

  async created () {
    if(this.isRouteClientExist) {
      //  calling get client on edit mode
      await this.$store.dispatch('Client/getClientByClientId', this.$route.params.clientId)
      if(this.client.data !== undefined) {
        this.clientData = this.client.data

        let reference = this.client.data.reference

        for (var i = 0; i < reference.length; i++) {
          if (reference[i].referenceName === 'ip_address') {
            if (i === 0) {
              this.clientData.ipAddress = reference[i].referenceValue
            } else {
              this.clientData.ipAddress += '\n' + reference[i].referenceValue
            }
          } else {
            this.clientData.referenceName = reference[i].referenceName
            this.clientData.referenceValue = reference[i].referenceValue
          }
        }

        this.resetValues = {
          client: JSON.parse(JSON.stringify(this.client.data))
        }
      }
    }
  },

  components: {
    Notification,
    ContentLoader
  },
  methods: {
    ...mapActions({
      createClient: 'Client/createClient',
      updateClient: 'Client/updateClient',
      getClientById: 'Client/getClientByClientId',
      resetApiKey: 'Client/resetApiKey'
    }),
    phoneCheck() {
      let __self = this

      let result = '';
      let phone = __self.clientData.phoneNumber;

      if (phone.length >= 10) {

        //TODO: replace dengan pengecekan ke database
        if (phone.substring(0,2) == '08') {
          result = '+628' + phone.substring(2);
        } else {
          result = phone;
        }
        //__self.user.phone = result;
        __self.clientData.phoneNumber = result;
      }
    },
    async toResetApiKey(clientId){
      if(confirm('Are you sure want to reset this client\'s API Key?')) {
          let clientInput = {
          id: clientId
        }
        await this.resetApiKey(clientInput)
        alert('API Key has been reset.')
        this.clientData.apiKey = this.client.data.apiKey;
      }
    },
    submit () {
      let __self = this

      let clientIpAddress = __self.clientData.ipAddress;
      let clientIpAddressArr = clientIpAddress.split("\n");
      let referenceArr = [];
      if(__self.clientData.referenceName && __self.clientData.referenceValue) {
        referenceArr.push({
          "referenceName": __self.clientData.referenceName,
          "referenceValue": __self.clientData.referenceValue
        });
      }

      let input = {
        name: __self.clientData.name,
        email: __self.clientData.email,
        phoneNumber: __self.clientData.phoneNumber,
        ipAddress: clientIpAddressArr,
        reference: referenceArr
      }

        //  dispatch Actions Create on client
      __self.$validator.validateAll().then((result) => {
        if (!result) {
          window.scrollTo(0, 0)
        } else {
          if (result) {
            if(__self.isRouteClientExist){
                input.id = __self.$route.params.clientId
                __self.updateClient({client: input, router: __self.$router})
            }else {
                __self.createClient({client: input, router: __self.$router})
            }
          }
        }
      })
    },
    reset () {
      //  reset text input
      this.clientData = {...this.resetValues.client}

      window.scrollTo(0, 0)
      this.$refs.client_name.focus()

      this.errors.clear()
    },
  }
}
</script>

