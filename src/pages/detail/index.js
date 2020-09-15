import {ORDER_DETAIL, ORDER_RECEIVE_ORDER} from "@/api";
import NavBar from "@/components/NavBar";
import Panel from "@/components/Panel";
import PanelItem from "@/components/PanelItem";
import {useMutation, useQuery} from "@/react-query/react";
import {queryCache} from "@/react-query";
import {BOTTOM_GAP} from "@/utils/Const";
import {request} from "@/utils/request";
import {Map, Text, View} from '@tarojs/components'
import {useRouter} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React, {useMemo} from 'react'

import './index.less'

export default function () {

  console.log('detail')
  const {params} = useRouter()
  const {bottom} = useMemo(Taro.getMenuButtonBoundingClientRect, []);

  const orderStatus = {0: '抢单', 1: '完成', 2: '确认完成', 3: '已完结', 4: '已取消'}

  const {
    data = {
      latitudeFrom: 39.99126,
      longitudeFrom: 116.46029,
      latitudeTo: 39.99126,
      longitudeTo: 116.46029
    }
  } = useQuery([ORDER_DETAIL, params.id], () => request(ORDER_DETAIL, {id: params.id}))

  const [mutatePostTodo] = useMutation(
    id => request(ORDER_RECEIVE_ORDER, {id}).then(() => {
      Taro.switchTab({url: '/pages/order/index'})
    }),
    {
      onSettled: () => {
        queryCache.invalidateQueries('ORDER_LIST_DATA_0')
        queryCache.invalidateQueries('ORDER_LIST_DATA_1')
        queryCache.invalidateQueries('ORDER_LIST_DATA_2')
        queryCache.invalidateQueries('ORDER_LIST_DATA_3')
      },
    }
  )

  function confirm() {
    if (data.status >= 3) {
      return
    }
    mutatePostTodo(params.id)
  }

  return <NavBar back home title='详情'>
    <View className='index'>
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
        <Panel padding={20}>
          <PanelItem icon='map-pin' paddingUD={5}>
            <Text className='title'>{data.title}</Text>
            <Text className='desc'>{`姓名：${data.userName}`}</Text>
            <Text className='desc'>{`手机：${data.phone}`}</Text>
            <Text className='desc'>{`起点：${data.addressFrom}`}</Text>
            <Text className='desc'>{`终点：${data.addressTo}`}</Text>
            <Text className='desc'>{`价格：￥${data.amount}`}</Text>
          </PanelItem>
        </Panel>
        <View className='info-button' style={{backgroundColor: `${data.status >= 3 ? '#999' : '#4FC469'}`}}
          onClick={confirm}
        >
          <Text>{`${orderStatus[data.status]}`}</Text>
        </View>
      </View>
    </View>
  </NavBar>
}


