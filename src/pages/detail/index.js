import {ORDER_DETAIL} from "@/api";
import NavBar from "@/components/NavBar";
import {useQuery} from "@/react-query/react";
import {BOTTOM_GAP} from "@/utils/Const";
import {request} from "@/utils/request";
import {Map, Text, View} from '@tarojs/components'
import {useRouter} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React from 'react'
import {AtIcon} from "taro-ui";

import './index.less'

export default function () {

  console.log('detail')
  const {params} = useRouter()
  const {bottom} = Taro.getMenuButtonBoundingClientRect();

  const {data = {}} = useQuery([ORDER_DETAIL, params.id], () => request(ORDER_DETAIL, {id: params.id}))

  return (
    <View className='index'>
      <NavBar back home title='详情' />
      <View style={{height: `calc(100vh - 300rpx - ${bottom + BOTTOM_GAP}px)`}}>
        <Map className='map' latitude={84} longitude={162} />
      </View>
      <View className='info'>
        <View className='info-header'>
          <AtIcon value='map-pin' size='20' color='#4FC469' />
          <View className='content'>
            <Text className='title'>{data.title}</Text>
            <Text className='desc'>desc</Text>
          </View>
        </View>
        <View className='info-button'>
          <Text>抢单</Text>
        </View>
      </View>
    </View>
  )
}


