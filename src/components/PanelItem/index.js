import {View} from "@tarojs/components";
import React from "react";
import {AtIcon} from "taro-ui";
import './index.less'

export default function ({icon, iconColor = '#4FC469', paddingUD = 20, iconSize = 18, children, style, onClick}) {


  return <View className='panel-item-container'
    onClick={onClick}
    style={{
                 ...style,
                 alignItems: `${children.length > 1 ? 'flex-start' : 'center'}`,
                 padding: `${paddingUD}rpx`
               }}
  >
    <AtIcon customStyle={{marginTop: `${children.length > 1 ? '10rpx' : '0'}`}} value={icon} size={iconSize}
      color={iconColor}
    />
    <View className='content'>
      {children}
    </View>
  </View>
}

