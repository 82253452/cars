import {View} from "@tarojs/components";
import React from "react";
import './index.less'

export default function ({height}) {


  return <View className='skeleton' style={{
    width: 'calc(100% - 60rpx)',
    height: `${height}px`,
    background: '#EAEAEA',
    marginTop: '20rpx',
    borderRadius: `15rpx`,
  }}
  />
}

