import {store} from '@/store'
export default function (to, from, next) {

  return store.dispatch('Access/getUserAccess').then(() => {
    // if (context.store.getters['access/access'].length === 0) {
    //   // context.store.dispatch('user/signOutUser')
    //   context.store.dispatch('user/setToken', null)
    //   return context.redirect('/')
    // }
  })
}