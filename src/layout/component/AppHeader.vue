<template>
  <div class="app-header navbar">
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
    <b-link class="navbar-brand" to="#"></b-link>
    <button class="navbar-toggler sidebar-toggler d-md-down-none mr-auto" type="button" @click="sidebarToggle">
      <span class="navbar-toggler-icon"></span>
    </button>
     <!--<button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" @click="asideToggle">-->
      <!--<span class="navbar-toggler-icon"></span>-->
    <!--</button>-->
    <button class="navbar-toggler aside-menu-toggler d-md-down-none" type="button" >
    <span class="fa fa-power-off text-white"></span>
    </button>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  name: 'app-header',
  methods: {
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
      this.signOutUser()
    }
  }
}
</script>
