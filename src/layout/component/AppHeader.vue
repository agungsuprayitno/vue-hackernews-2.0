<template>
  <div class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#"></a>
    <button class="navbar-toggler sidebar-toggler d-md-down-none mr-auto" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- TODO: change this text to icon -->
     <router-link :to="{name: 'change-password'}" class="navbar-toggler aside-menu-toggler text-white font-sm font-weight-bold"> Change Password</router-link>

    <button class="navbar-toggler aside-menu-toggler" type="button" @click="logoutUser">
    <span class="fa fa-power-off text-white "></span>
    </button>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'app-header',
  methods: {
    ...mapActions({
      "logOutUser" : "Auth/logout"
    }),
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    },
    logoutUser: function () {
      this.logOutUser()
    }
  }
}
</script>
