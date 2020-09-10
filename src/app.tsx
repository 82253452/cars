import React from 'react'
import {Provider} from 'react-redux'
import configStore from './store'
// eslint-disable-next-line import/first
import Taro from "@tarojs/taro";
// eslint-disable-next-line import/first
import 'taro-ui/dist/style/index.scss'
// eslint-disable-next-line import/first
import useEffectOnce from "react-use/lib/useEffectOnce";

import './app.less'
import {setBoundingClientRect} from "./actions/theme";

const store = configStore()


export default function ({children}) {


  useEffectOnce(() => {
    const boundingClientRect = Taro.getMenuButtonBoundingClientRect();
    store.dispatch(setBoundingClientRect(boundingClientRect))
  })

  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
