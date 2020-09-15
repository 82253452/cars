import {View} from "@tarojs/components";
import React from "react";
import './index.less'

export default function ({children, space = 0, paddingUD = 20, paddingLR = 40, padding}) {

  return <View className='panel-container' style={{
    marginTop: `${space}px`,
    padding: `${padding !== undefined ? padding : paddingUD}rpx ${padding !== undefined ?padding: paddingLR}rpx`
  }}
  >
    {children}
  </View>
}

