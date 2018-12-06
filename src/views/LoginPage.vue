<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card-group mb-0">
            <div class="card d-block">
              <div class="card-block">
                <b-row class="mx-0">
                  <img src="/public/img/logo.png" class="img img-fluid">
                </b-row>
                <div class="mh-2" style="min-height: 25px">
                  <!-- Loader -->
                  <form-loader v-if="isLoggingIn" class="form-control"></form-loader>
                  <!-- Error Alert -->
                  <notification v-if="!$lodash.isEmpty(notification)" :message="'Invalid Username or Password'"></notification>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="fa fa-user"></i></span>
                  <input type="text" class="form-control" placeholder="Username/Email" v-model="user.username" name="username" ref="username" v-validate="'required'" data-vv-as="Username/Email">
                </div>

                <div class="input-group mb-4">
                  <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                  <input type="password" class="form-control" placeholder="Password" v-model="user.password" name="password" v-validate="'required'" data-vv-as="Password" @keyup.enter="signInUser()">
                </div>
                <div class="row justify-content-end">
                  <div class="col-6">
                    <button type="button" class="btn btn-primary px-4 font-weight-bold" @click="signInUser()"><i class="fa fa-sign-in-alt"></i> Login</button>
                  </div>
                  <div class="col-6 text-right">
                    <router-link :to="{name: 'reset-password-submit-email'}" class="btn btn-link px-0"> Reset Password?</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {mapWaitingActions} from 'vue-wait'
import Notification from '@/components/Notification.vue'
import FormLoader from '@/components/loader/FormLoader.vue'
  export default {
    data: function () {
      return {
        user: {
          username: '',
          password: ''
        },
        signInLoader: 'logging-in-user'
      }
    },

    computed:{
      ...mapState({
        notification: state => state.Notification.notification,
        waitingFor: state => state.wait.waitingFor,
      }),

      isLoggingIn () {
        let __self = this
        return __self.waitingFor.find(wait => {
          return wait === __self.signInLoader
        })
      }
    },
    methods: {
      ...mapWaitingActions('Auth', {
        login: 'logging-in-user'
      }),
      signInUser() {
        let __self = this;
        __self.$validator.validateAll().then((result) => {
          if (result) {
            __self.login({user: __self.user, router: __self.$router})
          }
        })
      }
    },
    components: {
      Notification,
      FormLoader
    },
    mounted () {
      this.$refs.username.focus()
    }
  }
</script>