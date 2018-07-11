import * as types from './mutation-types'

export const setProdTypeList = function ({commit}, prodTypeList) {
  commit(types.SET_PRODTYPE_LIST,prodTypeList)
}
