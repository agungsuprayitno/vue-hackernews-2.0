import {store} from '@/store'
import {isEmpty} from 'lodash'

export function isInvalidToken () {
  let tokenAuthState = store.state.Auth.token
  console.log(tokenAuthState);
  // let token = isEmpty(tokenAuthState) ? readCookie(key) : tokenAuthState
  // return isEmpty(token) || (!isEmpty(token) && moment().diff(moment(token.expired)) > 0)
  return isEmpty(tokenAuthState)
}

export default function (to, from, next) {
  if (to.matched[0].meta.requiresAuth) {
    if (isInvalidToken()) {
      // eraseCookie(key)
      // push router to login page, if user have no token
      next({name: 'login'})
    }
  }

  //return store.dispatch('Access/getUserAccess').then(() => {
    // if (context.store.getters['access/access'].length === 0) {
    //   // context.store.dispatch('user/signOutUser')
    //   context.store.dispatch('user/setToken', null)
    //   return context.redirect('/')
    // }
  //})

}