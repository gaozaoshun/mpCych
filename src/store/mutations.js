import * as types from './mutation-types'

const mutations = {
  [types.SET_PRODTYPE_LIST](state, prodTypeList){
    state.prodTypeList = prodTypeList
  }
}

export default mutations
