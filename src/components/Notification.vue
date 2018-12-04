<template>
  <b-row class="mx-0">
    <b-alert :show="5"
             dismissible
             fade
             :variant="notificationType"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">
      {{notification.message}}
    </b-alert>
  </b-row>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    name: "Notification",
    data () {
      return {
        dismissCountDown: 0
      }
    },
    computed: {
      ...mapState({
        notification : state => state.Notification.notification,
        notificationType: state => state.Notification.notificationType
      })
    },

    methods: {
      ...mapActions({
        removeNotification: "Notification/removeNotification"
      }),
      countDownChanged (dismissCountDown) {
        this.dismissCountDown = dismissCountDown

        if(dismissCountDown == 0) {
          this.removeNotification()
        }
      }
    }
  }
</script>

<style scoped>

</style>