import {store} from '@/store'
import {isEmpty} from 'lodash'
import {readCookie, key} from "@/module/CacheModule";
import moment from 'moment'

export function isInvalidToken () {
  let tokenAuthState = store.state.Auth.token
  let token = isEmpty(tokenAuthState) ? readCookie(key) : tokenAuthState
  //  TODO: cari cara yg lebih bagus lagi
  return isEmpty(token) || (!isEmpty(token) && moment().diff(moment(token.expired)) > 0)
}

export default function (to, from, next) {

  if (to.matched.length > 0 && to.matched[0].meta.requiresAuth) {
    if (isInvalidToken()) {
      // eraseCookie(key)
      // push router to login page, if user have no token
      next({name: 'login'})
    }
  }

  if (to.matched.length > 0 && to.matched[0].meta.notRequiresAuth) {
    if (!isInvalidToken()) {

      // redirect to home page, to prevent showing login page while user is logged in
      // next({name: 'home'})
      location.href = '/dashboard'
    }
  }

 // TODO:  pake ini untuk get role access user
  return store.dispatch('Access/getUserAccess').then(() => {
    // if (context.store.getters['access/access'].length === 0) {
    //   // context.store.dispatch('user/signOutUser')
    //   context.store.dispatch('user/setToken', null)
    //   return context.redirect('/')
    // }
  })

}