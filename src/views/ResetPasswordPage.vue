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
                  <notification v-if="!$lodash.isEmpty(notification)"></notification>
                </div>

                <b-form-group label="New Password" :label-cols="4" :horizontal="true">
                  <b-form-input v-model="user.confirmPassword" v-validate="'required|confirmed:password'" data-vv-as="Confirm Password" name="confirm_password" type="password"></b-form-input>
                  <span v-show="errors.has('confirm_password')" class="text-danger is-danger">{{ errors.first('confirm_password') }}</span>
                </b-form-group>

                <b-form-group label="Confirm Password" :label-cols="4" :horizontal="true">
                  <b-form-input v-model="user.password" v-validate="'required'" data-vv-as="New Password" name="password" ref="password" type="password"></b-form-input>
                  <span v-show="errors.has('password')" class="text-danger is-danger">{{ errors.first('password') }}</span>
                </b-form-group>

                <!--<div class="input-group mb-3">-->
                  <!--<span class="input-group-addon">New Password: </span>-->
                  <!--<input type="password" class="form-control" placeholder="Password" v-model="user.password" ref="password" v-validate="'required'" data-vv-as="Password" name="password">-->
                  <!--<span v-show="errors.has('confirm_password')" class="text-danger is-danger">{{ errors.first('confirm_password') }}</span>-->
                <!--</div>-->
                <!--<div class="input-group mb-3">-->
                  <!--<span class="input-group-addon">Confirm Password: </span>-->
                  <!--<input type="password" class="form-control" placeholder="Confirm Password" v-model="user.confirmPassword" v-validate="'required|confirmed:password'" data-vv-as="Password" name="confirm_password">-->
                  <!--<span v-show="errors.has('password')" class="text-danger is-danger">{{ errors.first('password') }}</span>-->
                <!--</div>-->
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
import {mapActions, mapState} from 'vuex'
import Notification from '@/components/Notification.vue'
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
        resetPassword: 'User/resetPassword'
      }),
      submit() {
        let __self = this;
        //  dispatch Actions Create on user
        __self.$validator.validateAll().then((result) => {
          if (result) {
            __self.resetPassword({user: __self.user, router: __self.$router})
          }
        })
      }
    },
    mounted () {
      this.$refs.password.focus()
    }
  }
</script>