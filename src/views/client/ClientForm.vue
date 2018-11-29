<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Client Form</strong>
          </div>
          <b-form-group label="Client Name" :label-cols="3" :horizontal="true">
            <b-form-input v-model="clientInput.name" v-validate="'required|regex:^[A-Za-z][A-Za-z0-9 \-+%]*$'" data-vv-as="Client Name" name="client_name" ref="client_name" type="text"></b-form-input>
            <span v-show="errors.has('client_name')" class="text-danger is-danger">{{ errors.first('client_name') }}</span>
          </b-form-group>

          <b-form-group label="Client Email" :label-cols="3" :horizontal="true">
            <b-form-input v-model="clientInput.email" v-validate="'required|email'" data-vv-as="Client Email" name="client_email" type="text"></b-form-input>
            <span v-show="errors.has('client_email')" class="text-danger is-danger">{{ errors.first('client_email') }}</span>
          </b-form-group>

          <b-form-group label="Client Phone Number" :label-cols="3" :horizontal="true">
            <b-form-input v-model="clientInput.phoneNumber" v-validate="'required'" data-vv-as="Client Phone Number" name="phone_number" type="text"></b-form-input>
            <span v-show="errors.has('phone_number')" class="text-danger is-danger">{{ errors.first('phone_number') }}</span>
          </b-form-group>

          <b-form-group label="Client Address" :label-cols="3" :horizontal="true">
            <b-form-textarea v-model="address" v-validate="'required'" data-vv-as="Address" name="address" ></b-form-textarea>
            <span v-show="errors.has('address')" class="text-danger is-danger">{{ errors.first('address') }}</span>
          </b-form-group>

          <!-- Only show component when the page is edit mode -->
          <b-col md="12" class="px-0" v-if="!$lodash.isEmpty($route.params.clientId)">
            <b-form-group label="Status" :label-cols="3" :horizontal="true">
              <b-form-select v-model="clientInput.status" :options="options" class="mb-3" name="client_status" />
              <span v-show="errors.has('client_status')" class="text-danger is-danger">{{ errors.first('client_status') }}</span>
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
      resetValues: {},
      address:''
    }
  },

  computed: {
    ...mapState({
      client: state => state.Client.client
    }),
    clientInput() {
      if(!this.$lodash.isEmpty(this.$route.params.clientId)) {
        return this.client
      }
      return {
        name: '',
        email: '',
        phoneNumber: '',
      }
    }
  },

  asyncData ({store, route}) {
    //  calling get client on edit mode
    if(route.params.clientId !== undefined) {
      store.dispatch('Client/getClientByClientId', route.params.clientId)
    }
  },

  mounted () {
    this.resetValues = {
      client: JSON.parse(JSON.stringify(this.client))
    }
  },

  methods: {
    ...mapActions({
      createClient: 'Client/createClient',
      updateClient: 'Client/updateClient',
      getClientById: 'Client/getClientByClientId'
    }),
    submit () {
      let __self = this
      let input = {
        name: __self.clientInput.name,
        email: __self.clientInput.email,
        phoneNumber: __self.clientInput.phoneNumber,
        reference: [
          {
            referenceName: "address", referenceValue: __self.address
          }
        ]
      }

        //  dispatch Actions Create on client
      this.$validator.validateAll().then((result) => {
        if (!result) {
          window.scrollTo(0, 0)
        } else {
          if (result) {
            if(!this.$lodash.isEmpty(this.$route.params.clientId)){
                input.id = __self.$route.params.clientId
                __self.updateClient(input)
            }else {
                __self.createClient(input)
            }
          }
        }
      })
    },
    reset () {
      //  reset text input
      this.clientInput = {...this.resetValues.client}

      window.scrollTo(0, 0)
      this.$refs.client_name.focus()

      this.errors.clear()
    },
  }
}
</script>

