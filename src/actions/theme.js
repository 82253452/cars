import {SET_BOUNDING_CLIENT_RECT, SET_VIEW_HEIGHT, SET_WINDOW_HEIGHT} from "@/constants/theme";

export const setBoundingClientRect = (state) => {
  return {
    type: SET_BOUNDING_CLIENT_RECT,
    state
  }
}

export const setWindowHeight = (state) => {
  return {
    type: SET_WINDOW_HEIGHT,
    state
  }
}
export const setViewHeight = (state) => {
  return {
    type: SET_VIEW_HEIGHT,
    state
  }
}
