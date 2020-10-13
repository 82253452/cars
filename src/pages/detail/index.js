import {ORDER_DETAIL, ORDER_FINASH_LIST, ORDER_INDEX_LIST, ORDER_RECEIVE_ORDER, ORDER_STATUS_LIST} from "@/api";
import NavBar from "@/components/NavBar";
import Panel from "@/components/Panel";
import PanelItemText from '@/components/PanelItemText'
import {queryCache} from "@/react-query";
import {useMutation, useQuery} from "@/react-query/react";
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

  const orderStatus = {0: '抢单', 1: '完成', 2: '确认完成', 3: '确认完成', 4: '已完结', 5: '派送取消', 6: '派送异常', 7: '派送超时'}

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
      usePaginatedQuery
      Taro.switchTab({url: '/pages/order/index'})
    }),
    {
      onSettled: () => {
        queryCache.invalidateQueries(ORDER_INDEX_LIST)
        queryCache.invalidateQueries(ORDER_STATUS_LIST)
        queryCache.invalidateQueries(ORDER_FINASH_LIST)
      },
    }
  )

  function confirm() {
    if (data.status >= 4) {
      return
    }
    mutatePostTodo(params.id)
  }

  return <NavBar back home title='详情'>
    <View className='index'>
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
      <View className='info'>
        <View className='info_list'>
          <Panel padding={20}>
            <PanelItemText title='订单编号' value={data.orderNo} />
            <PanelItemText title='姓名' value={data.userName} />
            <PanelItemText title='手机号' value={data.phone} />
            <PanelItemText title='发货地址' value='123123' />
            <PanelItemText title='途经地点' value='123123' />
            <PanelItemText title='收货地址' value='123123' />
            <PanelItemText title='发运时间' value='123123' />
            <PanelItemText title='车型' value={data.title} />
            <PanelItemText title='排放' value='123123' />
            <PanelItemText title='备注' value={data.des} />
          </Panel>
        </View>
        <View className='info-button'>
          <View>
            <Text className='desc'>费用</Text>
            <Text className='number'>￥100</Text>
          </View>
          <View className='buttons'>
            <View className='button'>申诉</View>
            <View className='button red'>取消订单</View>
          </View>
        </View>
      </View>
    </View>
  </NavBar>
}


