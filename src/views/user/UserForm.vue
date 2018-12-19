<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card>
          <div slot="header">
            <strong>User Form</strong>
          </div>
          <notification v-if="!$lodash.isEmpty(notification)"></notification>

          <b-row class="mx-0">
            <content-loader v-if="waitAny"></content-loader>
          </b-row>

          <b-form-group label="Username" :label-cols="3" :horizontal="true">
            <b-form-input v-model="userData.username" v-validate="'required|email'" data-vv-as="Username" name="username" ref="username" type="text" maxlength="64" :disabled="isRouteUserExist"></b-form-input>
            <span v-show="errors.has('username')" class="text-danger is-danger">{{ errors.first('username') }}</span>
          </b-form-group>

          <b-form-group label="Password" :label-cols="3" :horizontal="true">
            <b-form-input v-model="userData.confirmPassword" v-validate="'required|confirmed:password'" data-vv-as="Confirm Password" name="confirm_password" type="password"></b-form-input>
            <span v-show="errors.has('confirm_password')" class="text-danger is-danger">{{ errors.first('confirm_password') }}</span>
          </b-form-group>

          <b-form-group label="Confirm Password" :label-cols="3" :horizontal="true">

            <b-form-input v-model="userData.password" v-validate="'required'" data-vv-as="Password" name="password" ref="password" type="password"></b-form-input>
            <span v-show="errors.has('password')" class="text-danger is-danger">{{ errors.first('password') }}</span>
          </b-form-group>

          <!-- Only show component when the page is edit mode -->
          <b-col md="12" class="px-0" v-if="isRouteUserExist">
            <b-form-group label="Status" :label-cols="3" :horizontal="true">
              <b-form-select v-model="userData.status" :options="options" class="mb-3" name="user_status" />
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
import {mapState, mapGetters} from 'vuex'
import Notification from '@/components/Notification.vue'
import ContentLoader from '@/components/loader/ContentLoader.vue'
import {mapWaitingActions} from 'vue-wait'
export default {
  data () {
    return {
      options: [
        { value: this.$constant.status.activeStatus, text: this.$constant.status.activeStatus },
        { value: this.$constant.status.inactiveStatus, text: this.$constant.status.inactiveStatus }
      ],
      resetValues: {},
      userData: {
        username: '',
        password: '',
        confirmPassword: '',
        status: this.$constant.status.inactiveStatus}
    }
  },

  computed: {
    ...mapState({
      user: state => state.User.user,
      notification: state => state.Notification.notification
    }),
    isRouteUserExist() {
      //  check if page on edit mode
      return !this.$lodash.isEmpty(this.$route.params) && this.$route.params.userId !== undefined
    },
    userInput: {
      get: function () {
        if(this.isRouteUserExist) { return this.user.data }
      },
      set: function (newValue) {
        this.userData = newValue
      }
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
    if(this.isRouteUserExist) {
      //  calling get user on edit mode
      await this.$store.dispatch('User/getUserByUserId', this.$route.params.userId)
      if(this.user.data !== undefined) {
        this.userData = this.user.data
        this.resetValues = {
          user: JSON.parse(JSON.stringify(this.user.data))
        }
      }
    }
  },

  methods: {
    ...mapWaitingActions('User', {
      getUserById: 'getting-user-by-id',
      createUser: 'creating-user',
      updateUser: 'updating-user'
    }),

    submit () {
      let __self = this
      let input = {
        username: __self.userData.username,
        password: __self.userData.password,
        status: __self.userData.status
      }

        //  dispatch Actions Create on user
      this.$validator.validateAll().then((result) => {
        if (result) {
          if(!this.$lodash.isEmpty(this.$route.params.userId)){
              input.id = __self.$route.params.userId
              __self.updateUser({user: input, router: __self.$router})
          }else {
              __self.createUser({user: input, router: __self.$router})
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

