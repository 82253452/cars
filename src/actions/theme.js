import {SET_BOUNDING_CLIENT_RECT} from "@/constants/theme";

export const setBoundingClientRect = (state) => {
  return {
    type: SET_BOUNDING_CLIENT_RECT,
    state
  }
}

