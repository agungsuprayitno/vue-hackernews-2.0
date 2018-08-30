<template>
	<div class="app">
		<AppHeader/>
		<div class="app-body">
			<Sidebar :nav-items="nav" />
			<main class="main">
				<breadcrumb :list="list"/>
				<div class="container-fluid">
					<router-view></router-view>
				</div>
			</main>
			<!-- <AppAside/> -->
		</div>
		<AppFooter/>
	</div>
</template>

<script>
  import {mapState} from 'vuex'
  import nav from './_nav'
  import AppHeader from './component/AppHeader.vue'
  import AppFooter from './component/AppFooter.vue'
  import Breadcrumb from './component/Breadcrumb.vue'
  import Sidebar from './component/Sidebar/Sidebar.vue'

  export default {
    name: 'layout',
    components: {
      AppHeader,
      AppFooter,
      Breadcrumb,
      Sidebar
    },
    computed: {
      ...mapState({
        access: state => state.Access.access
      }),
      name () {
        return this.$route.name
      },
      list () {
        return this.$route.matched
      },
      nav () {
        return this.showNav(nav.items)
      }
    },
    methods: {
      showNav (nav) {
        let navList = []
        let __self = this
        nav.forEach(function (nav) { 
          if (!nav.accessName || nav.accessName.some(access => __self.access.includes(access))) {
            if (nav.children) {
              nav.children = __self.showNav(nav.children)
            }
            navList.push(nav)
          }
        })

        return navList
      }
    }
  }
</script>
