import {isEmpty} from 'lodash'
import {store} from '@/store'

export default function (to, from, next) {

  //  prevent access page without valid code
  if(!isEmpty(to.query) && !isEmpty(to.query.code)) {

    let code = to.query.code
    // TODO: check params link dari email

    store.dispatch("User/validatePasswordResetCode", code).then(() => {
      if(store.state.User.isValidCode === true){
        next()
      } else {
        next({name: 'invalid-reset-password-code'})
      }
    })

  }

  //  redirect to login page, in case

}