<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>Change Password</strong>
          </div>

          <notification v-if="!$lodash.isEmpty(notification)"></notification>

          <b-form-group label="Old Password" :label-cols="3" :horizontal="true">
            <b-form-input v-model="userInput.oldPassword" v-validate="'required'" data-vv-as="Old Password" name="old_password" type="password" ref="oldPassword"></b-form-input>
            <span v-show="errors.has('old_password')" class="text-danger is-danger">{{ errors.first('old_password') }}</span>
          </b-form-group>

          <b-form-group label="Password" :label-cols="3" :horizontal="true">
            <b-form-input v-model="userInput.confirmPassword" v-validate="'required|confirmed:password'" data-vv-as="Confirm Password" name="confirm_password" type="password"></b-form-input>
            <span v-show="errors.has('confirm_password')" class="text-danger is-danger">{{ errors.first('confirm_password') }}</span>
          </b-form-group>

          <b-form-group label="Confirm Password" :label-cols="3" :horizontal="true">
            <b-form-input v-model="userInput.password" v-validate="'required'" data-vv-as="Password" name="password" ref="password" type="password"></b-form-input>
            <span v-show="errors.has('password')" class="text-danger is-danger">{{ errors.first('password') }}</span>
          </b-form-group>

          <!-- Only show component when the page is edit mode -->
          <b-col md="12" class="px-0" v-if="!$lodash.isEmpty($route.params.userId)">
            <b-form-group label="Status" :label-cols="3" :horizontal="true">
              <b-form-select v-model="userInput.status" :options="options" class="mb-3" name="user_status" />
              <span v-show="errors.has('user_status')" class="text-danger is-danger">{{ errors.first('user_status') }}</span>
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

import {mapActions, mapState} from 'vuex'
import Notification from '@/components/Notification.vue'
export default {
  data () {
    return {
      resetValues: {}
    }
  },

  computed: {
    userInput () {
      return {
        oldPassword: '',
        password: '',
        confirmPassword: ''
      }
    },
    ...mapState({
      notification: state => state.Notification.notification
    })
  },

  components:{
    Notification
  },

  methods: {
    ...mapActions({
      changePassword: 'User/changePassword'
    }),

    submit () {
      let __self = this
      let input = {
        oldPassword: __self.userInput.oldPassword,
        password: __self.userInput.password
      }

      //  dispatch Actions Create on user
      this.$validator.validateAll().then((result) => {
        if (result) {
            __self.changePassword({user: input, router: __self.$router})
        } else {
          if (process.env.VUE_ENV !== 'server') {
            window.scrollTo(0, 0)
          }
        }
      })
    },
    reset () {
      //  reset text input
      this.userInput = {...this.resetValues.user}

      window.scrollTo(0, 0)
      this.$refs.oldPassword.focus()

      this.errors.clear()
    },
  }
}
</script>

