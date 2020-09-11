import {ORDER_DETAIL} from "@/api";
import NavBar from "@/components/NavBar";
import {useQuery} from "@/react-query/react";
import {BOTTOM_GAP} from "@/utils/Const";
import {request} from "@/utils/request";
import {Map, Text, View} from '@tarojs/components'
import {useRouter} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React, {useMemo} from 'react'
import {AtIcon} from "taro-ui";

import './index.less'

export default function () {

  console.log('detail')
  const {params} = useRouter()
  const {bottom} = useMemo(Taro.getMenuButtonBoundingClientRect, []);

  const {
    data = {
      latitudeFrom: 39.99126,
      longitudeFrom: 116.46029,
      latitudeTo: 39.99126,
      longitudeTo: 116.46029
    }
  } = useQuery([ORDER_DETAIL, params.id], () => request(ORDER_DETAIL, {id: params.id}))

  console.log(data)

  return (
    <View className='index'>
      <NavBar back home title='详情' />
      <View style={{height: `calc(100vh - 450rpx - ${bottom + BOTTOM_GAP}px)`}}>
        <Map scale={8} className='map' latitude={data.latitudeFrom} longitude={data.longitudeFrom}
          polyline={[{
               points: [{
                 latitude: data.latitudeFrom,
                 longitude: data.longitudeFrom,
               }, {
                 latitude: data.latitudeTo,
                 longitude: data.longitudeTo,
               }],
               width: 5,
               color: '#4FC469',
             }]}
          markers={[{
               latitude: data.latitudeFrom,
               longitude: data.longitudeFrom,
               label: {
                 content: '起点'
               }
             }, {
               latitude: data.latitudeTo,
               longitude: data.longitudeTo,
               label: {
                 content: '终点'
               }
             }]}
        />
      </View>
      <View className='info'>
        <View className='info-header'>
          <AtIcon value='map-pin' size='20' color='#4FC469' />
          <View className='content'>
            <Text className='title'>{data.title}</Text>
            <Text className='desc'>{`姓名：${data.userName}`}</Text>
            <Text className='desc'>{`手机：${data.phone}`}</Text>
            <Text className='desc'>{`起点：${data.addressFrom}`}</Text>
            <Text className='desc'>{`终点：${data.addressTo}`}</Text>
            <Text className='desc'>{`价格：${data.amount}`}</Text>
          </View>
        </View>
        <View className='info-button'>
          <Text>抢单</Text>
        </View>
      </View>
    </View>
  )
}


