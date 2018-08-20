<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card-group mb-0">
            <div class="card p-4 d-block">
              <div class="card-block">
                <h2 class="text-uppercase font-weight-bold">voucher generator</h2>
                <p class="text-muted">Please Sign In</p>
                <div class="mh-2" style="min-height: 25px">
                  <!-- Loader -->
                  
                  <form-error :columns="true"></form-error>
                </div>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="far fa-user"></i></span>
                  <input type="email" class="form-control" placeholder="Username" v-model="user.email" ref="username">
                </div>
                <div class="input-group mb-4">
                  <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                  <input type="password" class="form-control" placeholder="Password" v-model="user.password" @keyup.enter="signInUser(user)">
                </div>
                <div class="row justify-content-end">
                  <div class="col-6 text-right">
                    <button type="button" class="btn btn-primary px-4 font-weight-bold" @click="signInUser(user)"><i class="fa fa-sign-in-alt"></i> Login</button>
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
  export default {
    data: function () {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    mounted () {
      this.$refs.username.focus()
    }
  }
</script>