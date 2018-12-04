<template>
  <div class="col-12">
    <div class="col-12 my-4 px-0">
      <router-link :to="{name: 'create-client'}" class="btn btn-primary"> Create Client</router-link>
    </div>
    <div class="col-12 my-4 px-0">
      <!-- Pagination on Top -->
      <b-pagination :total-rows="paginationData.totalRows" v-model="currentPage" :per-page="paginationData.size" align="right" last-text="Last" first-text="First"></b-pagination>
      
      <!-- Table View -->
      <b-table ref="clientTable" outlined responsive hover head-variant="light" :current-page="currentPage" :fields="fields" :items="getClients">
        <template slot="status" slot-scope="row">
          <label class="font-weight-bold text-success small" v-if="row.value == $constant.status.activeStatus">{{row.value}}</label>
          <label class="font-weight-bold text-danger small" v-else>{{row.value}}</label>
        </template>

        <template slot="actions" slot-scope="row">
          <router-link :to="{name: 'edit-client', params: {clientId: row.item.id}}" class="font-weight-bold shadow btn btn-outline-warning btn-sm">Edit</router-link> &nbsp;
          <b-button :size="'sm'" :variant="'outline-danger'" class="font-weight-bold shadow" v-if="row.item.status == $constant.status.activeStatus" @click="toBlockClient(row.item.id)">Block</b-button>
          <b-button :size="'sm'" :variant="'outline-success'" class="font-weight-bold shadow" @click="toActivateClient(row.item.id)" v-else>Activate</b-button>
          &nbsp;<b-button :size="'sm'" :variant="'outline-warning'" class="font-weight-bold shadow" @click="toDeleteClient(row.item.id)">Delete</b-button>
        </template>
      </b-table>
    </div>
    
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      currentPage: 1
    }
  },
  computed: {
    ...mapState({
      clients : state => state.Client.clients,
      pagination: state => state.Pagination.pagination
    }),
    paginationData () {
      if (this.$lodash.isEmpty(this.clients)) return this.pagination
      return this.clients.meta.pagination
    },
    fields (){
      return {
        name: {label: 'NAME', sortable: false},
        email: {label: 'EMAIL', sortable: false},
        phone_number: {label: 'PHONE NUMBER', sortable: false},
        code: {label: 'CODE', sortable: false},
        status: {label: 'STATUS', sortable: false},
        actions: {label: 'ACTION', sortable: false}
      }        
    }
  },

  methods: {
    ...mapActions({
      getClient: 'Client/getClient',
      updateClient: 'Client/updateClient',
      activateClient: 'Client/activateClient',
      blockClient: 'Client/blockClient',
      deleteClient: 'Client/deleteClient',
      setPagination: 'Pagination/setPagination'
    }),
    async getClients(ctx) {
      // //  set pagination
      this.setPagination({currentPage: ctx.currentPage, size: 10})
       //  set pagination as object, in the future we can parse Sort and Filter too
      await this.getClient({pagination: this.pagination})
      return this.clients.data
    },
    async toBlockClient(clientId){
      let status = this.$constant.status.inactiveStatus
      let clientInput = {
        id: clientId,
        status: status
      }
      await this.blockClient(clientInput)
      this.$refs.clientTable.refresh()
    },
    async toActivateClient(clientId){
      let status = this.$constant.status.activeStatus
      let clientInput = {
        id: clientId,
        status: status
      }
      await this.activateClient(clientInput)
      this.$refs.clientTable.refresh()
    },
    async toDeleteClient(clientId){
      if(confirm('Are you sure want to delete this client?')){
        let clientInput = {
          id: clientId
        }
        await this.deleteClient(clientInput)
        this.$refs.clientTable.refresh()
      }
    }    
  }
}
</script>

