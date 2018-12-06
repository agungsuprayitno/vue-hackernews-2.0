<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card-group mb-0">
            <div class="card p-4 d-block">
              <div class="card-block">
                <h5 class="text-uppercase font-weight-bold">Submit Your Email to Reset your Password</h5>
                <div class="mh-2" style="min-height: 25px">
                  <!-- Loader -->
                  <notification v-if="!$lodash.isEmpty(notification)"></notification>
                </div>
                <label class="row mx-0 font-weight-bold">Email</label>
                <div class="input-group my-3">
                  <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                  <input type="text" class="form-control" placeholder="Email" v-model="user.email" ref="email" name="email" v-validate="'required|email'" data-vv-as="Email">
                </div>

                <span v-show="errors.has('email')" class="text-danger is-danger">{{ errors.first('email') }}</span>
                <div class="row justify-content-end">
                  <div class="col-6 text-right">
                    <button type="button" class="btn btn-primary px-4 font-weight-bold" @click="submit()"><i class="fa fa-sign-in-alt"></i> Send Email</button>
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
import {mapActions, mapState} from 'vuex'
import Notification from '@/components/Notification.vue'
  export default {
    data: function () {
      return {
        user: {
          email: ''
        }
      }
    },

    computed:{
      ...mapState({
        notification: state => state.Notification.notification
      })
    },

    components:{
      Notification
    },

    methods: {
      ...mapActions({
        sendLinkForgotPassword: 'User/sendLinkForgotPassword'
      }),
      submit() {
        let __self = this;
        //  dispatch Actions Create on user
        this.$validator.validateAll().then((result) => {
          if (result) {
            __self.sendLinkForgotPassword(__self.user)
          }
        })
      }
    },
    mounted () {
      this.$refs.email.focus()
    }
  }
</script>