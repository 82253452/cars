import {BOTTOM_GAP} from "@/utils/Const";
import {Image, Text, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, {useMemo} from "react";
import backIcon from '../../img/fanhui.png'
import homeIcon from '../../img/nav-home.png'
import './index.less'

export default function ({title = '', fixed = true, home = false, back = false, backUrl}) {

  const {bottom,right,width,height} = useMemo(Taro.getMenuButtonBoundingClientRect,[]);

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
    <View className='nav-warp' style={{height: `${bottom + BOTTOM_GAP}px`}} hidden={!fixed} />
    <View className={`nav-con ${fixed && 'nav-fixed'}`} style={{height: `${bottom + BOTTOM_GAP}px`}}>
      <View className='nav' style={{height: `${height + BOTTOM_GAP}px`}}>
        <View className={`${(home || back) && 'icon'}`} style={{width: `${width}px`, marginLeft: `calc(100% - ${right}px)`,height:`${height}px`}}>
          {(home || back) && <View className='button' onClick={_back}><Image style={{width: '17rpx', height: '29rpx'}} src={backIcon} /></View>}
          {(home || back) && <View className='line' />}
          {(home || back) && <View className='button' onClick={_home} ><Image style={{width: '30rpx', height: '30rpx'}} src={homeIcon} /></View>}
        </View>
        <View className='title' style={{width: `${right - width * 2}px`,height:`${height}px`}}>
          <Text>{title}</Text>
        </View>
      </View>
    </View>
  </View>
}
