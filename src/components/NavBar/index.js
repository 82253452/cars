import {BOTTOM_GAP} from "@/utils/Const";
import {Image, Text, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import backIcon from '../../img/fanhui.png'
import homeIcon from '../../img/nav-home.png'
import './index.less'

export default function ({title = '', fixed = true, home = false, back = false, backUrl}) {

  const boundingClientRect = Taro.getMenuButtonBoundingClientRect();

  function _back() {
    if (backUrl) {
      Taro.navigateTo({url: backUrl}).catch(() => Taro.switchTab({url: backUrl}))
    } else {
      Taro.navigateBack()
    }
  }

  function _home() {
    Taro.switchTab({
      url: '/pages/index/index',
    })
  }

  return <View className='container'>
    <View className='nav-warp' style={{height: `${boundingClientRect.bottom + BOTTOM_GAP}px`}} hidden={!fixed} />
    <View className={`nav-con ${fixed && 'nav-fixed'}`} style={{height: `${boundingClientRect.bottom + BOTTOM_GAP}px`}}>
      <View className='nav' style={{height: `${boundingClientRect.height + BOTTOM_GAP}px`}}>
        <View className={`${(home || back) && 'icon'}`} style={{width: `${boundingClientRect.width}px`, marginLeft: `calc(100% - ${boundingClientRect.right}px)`,height:`${boundingClientRect.height}px`}}>
          {(home || back) && <Image onClick={_back} style={{width: '17rpx', height: '29rpx'}} src={backIcon} />}
          {(home || back) && <Image onClick={_home} style={{width: '30rpx', height: '30rpx'}} src={homeIcon} />}
        </View>
        <View className='title' style={{width: `${boundingClientRect.right - boundingClientRect.width * 2}px`,height:`${boundingClientRect.height}px`}}>
          <Text>{title}</Text>
        </View>
      </View>
    </View>
  </View>
}
