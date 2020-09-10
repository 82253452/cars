import {SET_BOUNDING_CLIENT_RECT} from "@/constants/theme";

const INITIAL_STATE = {
  boundingClientRect: {}
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_BOUNDING_CLIENT_RECT:
      return {
        ...state,
        boundingClientRect: action.state
      }
    default:
      return state
  }
}
