import {
  ORDER_CLOSE,
  ORDER_DETAIL,
  ORDER_FINASH_LIST,
  ORDER_INDEX_LIST,
  ORDER_RECEIVE_ORDER,
  ORDER_STATUS_LIST, ORDER_STOP
} from "@/api";
import NavBar from "@/components/NavBar";
import Panel from "@/components/Panel";
import PanelItemText from '@/components/PanelItemText'
import {queryCache} from "@/react-query";
import {useMutation, useQuery} from "@/react-query/react";
import {request} from "@/utils/request";
import {Map, Text, View} from '@tarojs/components'
import {useRouter} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React from 'react'
import {useSelector} from "react-redux";

import './index.less'

export default function () {

  console.log('detail')
  const {params} = useRouter()
  const paramsId = parseInt(params.id)
  const myOrderStatus = {0: '关闭订单', 1: '', 2: '', 3: '确认完成', 4: '已完结', 5: '派送取消', 6: '派送异常', 7: '派送超时'}
  const receiveStatus = {0: '抢单', 1: '开始派送', 2: '确认完成', 3: '', 4: '已完结', 5: '派送取消', 6: '派送异常', 7: '派送超时'}
  const appealStatus = [1, 3, 4, 5, 6, 7]
  const user = useSelector(state => state.user)
  const discharge = ['国四', '国五', '国六']

  const {
    data = {
      latitudeFrom: 39.99126,
      longitudeFrom: 116.46029,
      latitudeTo: 39.99126,
      longitudeTo: 116.46029
    }
  } = useQuery([ORDER_DETAIL, paramsId], () => request(ORDER_DETAIL, {id: paramsId}))

  console.log(data)


  const [nextOrder] = useMutation(
    () => request(ORDER_RECEIVE_ORDER, {id: paramsId}),
    {
      onMutate: () => {
        const previousTodos = queryCache.getQueryData([ORDER_DETAIL, paramsId])
        queryCache.setQueryData([ORDER_DETAIL, data.id], {...data, status: data.status + 1})
        return () => queryCache.setQueryData([ORDER_DETAIL, paramsId], previousTodos)
      },
      onError: (err, newTodo, rollback) => rollback(),
      onSettled: () => {
        queryCache.invalidateQueries([ORDER_DETAIL, data.id])
        queryCache.invalidateQueries(ORDER_INDEX_LIST)
        queryCache.invalidateQueries(ORDER_STATUS_LIST)
        queryCache.invalidateQueries(ORDER_FINASH_LIST)
      },
    }
  )

  const [closeOrder] = useMutation(
    () => request(ORDER_CLOSE, {id: paramsId}).then(() => {
      Taro.switchTab({url: '/pages/order/index'})
    }),
    {
      onSettled: () => {
        queryCache.invalidateQueries(ORDER_INDEX_LIST)
      },
    }
  )

  const [stopOrder] = useMutation(
    () => request(ORDER_STOP, {id: paramsId}),
    {
      onMutate: () => {
        const previousTodos = queryCache.getQueryData([ORDER_DETAIL, paramsId])
        queryCache.setQueryData([ORDER_DETAIL, data.id], {...data, status: 1})
        return () => queryCache.setQueryData([ORDER_DETAIL, paramsId], previousTodos)
      },
      onError: (err, newTodo, rollback) => rollback(),
      onSettled: () => {
        queryCache.invalidateQueries(ORDER_INDEX_LIST)
        queryCache.invalidateQueries(ORDER_STATUS_LIST)
        queryCache.invalidateQueries(ORDER_FINASH_LIST)
      },
    }
  )

  function handelConfirm() {
    if (data.status >= 4) {
      return
    }
    if (user.id === data.userId) {
      if (data.status === 0) {
        Taro.showModal({title: '确定关闭订单?'}).then(({confirm}) => {
          confirm && closeOrder()
        })
      } else {
        nextOrder()
      }
      return
    }
    nextOrder()
  }

  function OrderStatusButtons() {
    if (user.id === data.userId) {
      return data.status === 0 ? <View className='buttons'>
        <View className='button red' onClick={handelConfirm}>{myOrderStatus[data.status]}</View>
      </View> : <View className='buttons'>
        <View className='button'>申诉</View>
      </View>
    } else {
      return <View className='buttons'>
        {appealStatus.some(s => s === data.status) ? <View className='button'>申诉</View> : ''}
        {data.status === 2 ? <View className='button red' onClick={stopOrder}>停止配送</View> : ''}
        {receiveStatus[data.status] ?
          <View className='button red' onClick={handelConfirm}>{receiveStatus[data.status]}</View> : ''}
      </View>
    }
  }

  return <NavBar back home title='详情'>
    <View className='index'>
      <Map scale={8} className='map' latitude={data.latitudeFrom - 1.2} longitude={data.longitudeFrom}
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
            <PanelItemText title='姓名' value={data.userName} />
            <PanelItemText title='手机号' value={data.phone} />
            <PanelItemText title='发货地址' value={data.addressFrom} />
            <PanelItemText title='途经地点' value={data.addressRoute} />
            <PanelItemText title='收货地址' value={data.addressTo} />
            <PanelItemText title='发运时间' value={`${data.deliveryTimeStart} -> ${data.deliveryTimeEnd}`} />
            <PanelItemText title='车型' value={data.productName} />
            <PanelItemText title='排放' value={discharge[data.discharge - 1]} />
            <PanelItemText title='备注' value={data.remark} />
          </Panel>
        </View>
        <View className='info-button'>
          <View>
            <Text className='desc'>费用</Text>
            <Text className='number'>￥100</Text>
          </View>
          <OrderStatusButtons />
        </View>
      </View>
    </View>
  </NavBar>
}


