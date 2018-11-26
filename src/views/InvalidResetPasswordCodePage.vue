<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card-group mb-0">
            <div class="card p-4 d-block">
              <div class="card-block">
                <h5>This link is invalid or already expired!</h5>
                <router-link class="btn btn-link" :to="{name: 'login'}"><i class="fas fa-arrow-left"></i> Back to Login</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
  export default {
    data: function () {
      return {
        user: {
          email: ''
        }
      }
    },  
    methods: {
      ...mapActions({
        sendLinkForgotPassword: 'User/sendLinkForgotPassword'
      }),
      submit() {
        let __self = this;
        __self.sendLinkForgotPassword(__self.user)
      }
    },
    mounted () {
      this.$refs.email.focus()
    }
  }
</script>