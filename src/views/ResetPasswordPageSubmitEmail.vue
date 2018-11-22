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
                  <!-- TODO: set error disini klo email not found -->
                  <!--<form-error :columns="true"></form-error>-->
                </div>
                <label class="row mx-0 font-weight-bold">Email</label>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="far fa-user"></i></span>
                  <input type="email" class="form-control" placeholder="Email" v-model="email" ref="email">
                </div>
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
import {mapActions} from 'vuex'
  export default {
    data: function () {
      return {
        email: ''
      }
    },  
    methods: {
      ...mapActions({
        sendLinkForgotPassword: 'User/sendLinkForgotPassword'
      }),
      submit() {
        let __self = this;
        __self.sendLinkForgotPassword(__self.email)
      }
    },
    mounted () {
      this.$refs.email.focus()
    }
  }
</script>