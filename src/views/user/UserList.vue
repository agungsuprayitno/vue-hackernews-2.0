<template>
  <div class="col-12">
    <div class="col-12 my-4 px-0">
      <router-link :to="{name: 'create-user'}" class="btn btn-primary"> Create User</router-link>
    </div>
    <div class="col-12 my-4 px-0">
      <notification v-if="!$lodash.isEmpty(notification)"></notification>
      <!-- Pagination on Top -->
      <b-pagination :total-rows="paginationData.totalRows" v-model="currentPage" :per-page="paginationData.size" align="right" last-text="Last" first-text="First"></b-pagination>
      
      <!-- Table View -->
      <b-table ref="userTable" outlined responsive hover head-variant="light" :current-page="currentPage" :fields="fields" :items="getUsers">
        <template slot="status" slot-scope="row">
          <label class="font-weight-bold text-success small" v-if="row.value == $constant.status.activeStatus">{{row.value}}</label>
          <label class="font-weight-bold text-danger small" v-else>{{row.value}}</label>
        </template>

        <template slot="actions" slot-scope="row">
          <router-link :to="{name: 'edit-user', params: {userId: row.item.id}}" class="font-weight-bold btn btn-outline-warning btn-sm">Edit</router-link> &nbsp;
          <b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" v-if="row.item.status == $constant.status.activeStatus" @click="deactivateUser(row.item.id)">DEACTIVATE</b-button>
          <b-button :size="'sm'" :variant="'outline-success'" class="font-weight-bold shadow" @click="activateUser(row.item.id)" v-else>ACTIVATE</b-button>
        </template>
      </b-table>
    </div>
    
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import Notification from '@/components/Notification.vue'
export default {
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState({
      users : state => state.User.users,
      pagination: state => state.Pagination.pagination,
      notification: state => state.Notification.notification
    }),
    paginationData () {
      if (this.$lodash.isEmpty(this.users)) return this.pagination
      return this.users.meta.pagination
    },
    fields (){
      return {
        username: {label: 'USERNAME', sortable: false},
        client: {label: 'CLIENT', sortable: false},
        status: {label: 'STATUS', sortable: false},
        actions: {label: 'ACTION', sortable: false}
      }        
    }
  },

  components: {
    Notification
  },

  methods: {
    ...mapActions({
      getUser: 'User/getUser',
      updateUser: 'User/updateUser',
      setPagination: 'Pagination/setPagination'
    }),
    async getUsers(ctx) {
      // //  set pagination
      this.setPagination({currentPage: ctx.currentPage, size: 10})
       //  set pagination as object, in the future we can parse Sort and Filter too
      await this.getUser({pagination: this.pagination})
      return this.users.data
    },
    async deactivateUser(userId){
      let status = this.$constant.status.inactiveStatus
      let userInput = {
        id: userId,
        status: status
      }
      await this.updateUser(userInput)
      this.$refs.userTable.refresh()
    },
    async activateUser(userId){
      let status = this.$constant.status.activeStatus
      let userInput = {
        id: userId,
        status: status
      }
      await this.updateUser(userInput)
      this.$refs.userTable.refresh()
    }    
  }
}
</script>

