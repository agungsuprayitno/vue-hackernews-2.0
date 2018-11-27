<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card-group mb-0">
            <div class="card p-4 d-block">
              <div class="card-block">
                <h4 class="text-uppercase font-weight-bold">Reset Your Password</h4>
                <div class="mh-2" style="min-height: 25px">
                  <!-- Loader -->
                  <!-- TODO: set error disini klo password tidak cocok -->
                  <!--<form-error :columns="true"></form-error>-->
                </div>

                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="far fa-lock"></i></span>
                  <input type="password" class="form-control" placeholder="Password" v-model="user.password" ref="password">
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="far fa-lock"></i></span>
                  <input type="password" class="form-control" placeholder="Confirm Password" v-model="user.confirmPassword">
                </div>
                <div class="row justify-content-end">
                  <div class="col-6 text-right">
                    <button type="button" class="btn btn-primary px-4 font-weight-bold" @click="submit()"><i class="fa fa-sign-in-alt"></i> Submit</button>
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
        user: {
          password: '',
          confirmPassword: '',
          code : this.$route.query.code
        }
      }
    },  
    methods: {
      ...mapActions({
        resetPassword: 'User/resetPassword'
      }),
      submit() {
        let __self = this;
        this.resetPassword({user: __self.user, router: __self.$router})
      }
    },
    mounted () {
      this.$refs.password.focus()
    }
  }
</script>