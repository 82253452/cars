import {BOTTOM_GAP} from "@/utils/Const";
import Taro from "@tarojs/taro";
import React from 'react'
import {Provider} from 'react-redux'
import useEffectOnce from "react-use/lib/useEffectOnce";
import 'taro-ui/dist/style/index.scss'
import {setBoundingClientRect, setViewHeight, setWindowHeight} from "./actions/theme";
import {setUser,setLocation} from "./actions/user";
import './app.less'
import configStore from './store'
import {getUserInfo} from "./utils/request"

const store = configStore()


export default function ({children}) {


  useEffectOnce(() => {
    const boundingClientRect = Taro.getMenuButtonBoundingClientRect();
    store.dispatch(setBoundingClientRect(boundingClientRect))
    const {windowHeight} = Taro.getSystemInfoSync();
    store.dispatch(setWindowHeight(windowHeight))
    store.dispatch(setViewHeight(windowHeight - boundingClientRect.bottom - BOTTOM_GAP))
    getUserInfo().then(res => {
      store.dispatch(setUser(res))
    })
    Taro.getLocation({type: 'wgs84'}).then(res => {
      store.dispatch(setLocation(res))
    })
  })

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
