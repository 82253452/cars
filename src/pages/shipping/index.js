import {ORDER_DETAIL} from "@/api";
import NavBar from "@/components/NavBar";
import {useQuery} from "@/react-query/react";
import {BOTTOM_GAP} from "@/utils/Const";
import {request} from "@/utils/request";
import {Input, Map, Text, View} from '@tarojs/components'
import {useRouter} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React, {useMemo, useState} from 'react'
import useEffectOnce from "react-use/lib/useEffectOnce";
import {AtIcon} from "taro-ui";

import './index.less'

export default function () {

  console.log('detail')

  const [location, setloction] = useState({
    marker: {
      latitude: 39.90469,
      longitude: 116.40717,
      label: {
        content: '我的位置'
      }
    },
    from: {
      latitude: 39.90469,
      longitude: 116.40717,
      label: {
        content: '起点'
      }
    },
    to: {
      latitude: 19.90469,
      longitude: 176.40717,
      label: {
        content: '终点'
      }
    }
  })

  const {params} = useRouter()
  const {bottom} = useMemo(Taro.getMenuButtonBoundingClientRect, []);

  useEffectOnce(() => {
    Taro.getLocation({type: 'wgs84'}).then(res => setloction({
      ...location, marker: {
        ...res, label: {
          content: '我的位置'
        }
      }
    }))
  })

  function sendAddress() {
    Taro.chooseLocation().then(res => {
      setloction({
        ...location, from: {
          ...res, label: {
            content: '起点'
          }
        }
      })
    })
  }

  function receiveAddress() {
    Taro.chooseLocation().then(res => {
      setloction({
        ...location, to: {
          ...res, label: {
            content: '终点'
          }
        }
      })
    })
  }

  return (
    <View className='index'>
      <NavBar back home title='发货' />
      <View style={{height: `calc(100vh - 450rpx - ${bottom + BOTTOM_GAP}px)`}}>
        <Map className='map' scale={12} latitude={location.marker.latitude} longitude={location.marker.longitude}
          polyline={[{
               points: [location.marker, location.from],
               width: 5,
               color: '#999',
               dottedLine: true
             }, {points: [location.from, location.to], width: 5, color: '#4FC469'}]}
          markers={[location.marker, location.from, location.to]}
        />
      </View>
      <View className='info'>
        <View className='info-item'>
          <AtIcon value='user' size='18' color='#4FC469' />
          <View className='content'>
            <Input className='input' placeholder='姓名' />
          </View>
        </View>
        <View className='info-item'>
          <AtIcon value='phone' size='18' color='#4FC469' />
          <View className='content'>
            <Input className='input' type='number' placeholder='联系电话' placeholderClass='input-placeholder' />
          </View>
        </View>
        <View className='info-item'>
          <AtIcon value='map-pin' size='18' color='#4FC469' />
          <View className='content' onClick={sendAddress}>
            <Text className='title'>{location.to.address || '发货地址'}</Text>
          </View>
        </View>
        <View className='info-item'>
          <AtIcon value='map-pin' size='18' color='#4FC469' />
          <View className='content' onClick={receiveAddress}>
            <Text className='title'>{location.to.address || '收货地址'}</Text>
          </View>
        </View>
        <View className='info-button'>
          <Text>确定</Text>
        </View>
      </View>
    </View>
  )
}


