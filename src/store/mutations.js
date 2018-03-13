import * as types from './mutation-types'

const mutations = {
  [types.SET_MASK](state,mask){
    state.mask = mask
  },
  [types.SET_MESSAGE](state, message){
    state.message = message
  }
}

export default mutations
