import {View} from "@tarojs/components";
import React from "react";
import './index.less'

export default function ({children,style, borderRadius = 15, marginTop = 20, space = 30, paddingUD = 30, paddingLR = 0, padding}) {

  return <View className='panel-container' style={{
    marginTop: `${marginTop}rpx`,
    padding: `${padding !== undefined ? padding : paddingUD}rpx ${padding !== undefined ? padding : paddingLR}rpx`,
    width: `calc(100% - ${space * 2}rpx)`,
    borderRadius: `${borderRadius}rpx`,
    ...style
  }}
  >
    {children}
  </View>
}

