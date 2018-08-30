<template>
  <div id="app" vue-server-renderer="true">
    <header class="header">
      
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<style lang="sass">
  @import "../public/scss/style.scss";
</style>
