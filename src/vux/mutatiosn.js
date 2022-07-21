export default {
   loginInfo(state,info){
       state.userInfo = info
       state.token = info.token
       console.log(state)
   }
}
