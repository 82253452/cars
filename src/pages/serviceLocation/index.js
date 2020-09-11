import NavBar from "@/components/NavBar";
import {BOTTOM_GAP} from "@/utils/Const";
import {Map, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, {useMemo} from "react";
import './index.less'

export default function () {
  console.log('serviceLocation')

  const {bottom} = useMemo(Taro.getMenuButtonBoundingClientRect, []);

  return <View className='container'>
    <NavBar back home title='服务网点' />
    <Map style={{height: `calc(100vh - ${bottom + BOTTOM_GAP}px)`}} scale={8} className='map' latitude={39.99126} longitude={116.46029}
      markers={[{
           latitude: 39.99126,
           longitude: 116.46029,
           label: {
             content: '中山网点'
           }
         }, {
           latitude: 39.99126,
           longitude: 116.46029,
           label: {
             content: '夏树网点'
           }
         }]}
    />
  </View>
}

