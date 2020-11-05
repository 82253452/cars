import {View} from "@tarojs/components";
import React from "react";
import './index.less'

export default function ({children, style,contentStyle}) {

  return <View className='panel-item-container' style={style}>
    <View className='content' style={contentStyle}>
      {children}
    </View>
  </View>
}

