import {SET_DATA} from "@/constants/order";

const INITIAL_STATE = {
  addressRoute:[''],
  addressFrom:{},
  addressTo:{},
  myAddress:{},
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        ...action.state
      }
    default:
      return state
  }
}
