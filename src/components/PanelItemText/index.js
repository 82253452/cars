import {Input, Text, View} from "@tarojs/components";
import React from "react";
import './index.less'

export default function ({
                           title, value, style,
                         }) {


  return <View className='panel-item-line-input-container'
    style={{...style}}
  >
    <View className='border-view'>
      <View className='title'>
        <Text>{title}</Text>
      </View>
      <View className='text'>
        <Text>{value}</Text>
      </View>
    </View>
  </View>
}

