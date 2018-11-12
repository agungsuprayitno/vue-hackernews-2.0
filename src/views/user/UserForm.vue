<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>User Form</strong>
          </div>

          <b-form-group label="Username" :label-cols="3" :horizontal="true">
            <b-form-input v-model="userInput.username" v-validate="'required|regex:^[A-Za-z]*$'" data-vv-as="Username" name="username" ref="username" type="text"></b-form-input>
            <span v-show="errors.has('username')" class="text-danger is-danger">{{ errors.first('username') }}</span>
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

import {mapState, mapActions} from 'vuex'
import { mapWaitingActions } from 'vue-wait'
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
      user: state => state.User.user
    }),
    userInput () {
      if(!this.$lodash.isEmpty(this.$route.params.userId)) {
        return this.user
      }
      return {
        username: '',
        password: '',
        confirmPassword: '',
        status: this.$constant.status.inactiveStatus
      }
    }
  },

  asyncData ({store, route}) {
    //  calling get user on edit mode
    if(route.params.userId !== undefined) {
      store.dispatch('User/getUserByUserId', route.params.userId)
    }
  },

  mounted () {
    this.resetValues = {
      user: JSON.parse(JSON.stringify(this.user))
    }
  },

  methods: {
    ...mapActions({
      createUser: 'User/createUser',
      updateUser: 'User/updateUser',
      getUserById: 'User/getUserByUserId'
    }),

    ...mapWaitingActions('User', {
      createUser: 'creating user',
      updateUser: 'updating user',
      getUserById: 'getting user',
    }),
    submit () {
      let __self = this
      let input = {
        username: __self.userInput.username,
        password: __self.userInput.password,
        status: __self.userInput.status
      }

        //  dispatch Actions Create on user
      this.$validator.validateAll().then((result) => {
        if (result) {
          if(!this.$lodash.isEmpty(this.$route.params.userId)){
              input.id = __self.$route.params.userId
              __self.updateUser(input)
          }else {
              __self.createUser(input)
          }
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
      this.$refs.username.focus()

      this.errors.clear()
    },
  }
}
</script>

