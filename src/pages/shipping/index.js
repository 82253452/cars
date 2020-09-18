import {ORDER_SUBMIT} from "@/api";
import NavBar from "@/components/NavBar";
import Panel from "@/components/Panel";
import PanelItem from "@/components/PanelItem";
import {request} from "@/utils/request";
import {Input, Map, Text, View} from '@tarojs/components'
import {useRouter} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React, {useMemo, useState} from 'react'
import useEffectOnce from "react-use/lib/useEffectOnce";

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

  const [orderReq, setOrderReq] = useState({
    carTypeId: params.id,
  })


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
      setOrderReq({...orderReq, latitudeFrom: res.latitude, longitudeFrom: res.longitude, addressFrom: res.address})
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
      setOrderReq({...orderReq, latitudeTo: res.latitude, longitudeTo: res.longitude, addressTo: res.address})
    })
  }

  function submit() {
    if (!orderReq.userName) {
      Taro.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return
    }
    if (!orderReq.phone) {
      Taro.showToast({
        title: '请填写联系电话',
        icon: 'none'
      })
      return
    }
    if (!orderReq.amount) {
      Taro.showToast({
        title: '请填写价格',
        icon: 'none'
      })
      return
    }
    if (!orderReq.addressFrom) {
      Taro.showToast({
        title: '请选择发货地址',
        icon: 'none'
      })
      return
    }
    if (!orderReq.addressTo) {
      Taro.showToast({
        title: '请选择收获地址',
        icon: 'none'
      })
      return
    }

    request(ORDER_SUBMIT, orderReq).then(() => {
      Taro.switchTab({url: '/pages/order/index'})
    })
  }

  const mapView = useMemo(() => <Map className='map' scale={12} latitude={location.marker.latitude}
    longitude={location.marker.longitude}
    polyline={[{
                                       points: [location.marker, location.from],
                                       width: 5,
                                       color: '#999',
                                       dottedLine: true
                                     }, {points: [location.from, location.to], width: 5, color: '#4FC469'}]}
    markers={[location.marker, location.from, location.to]}
  />, [location])


  return (
    <NavBar back home title='发货'>
      <View className='index'>
        {mapView}
        <Panel padding={20}>
          <PanelItem icon='user'>
            <Input className='input' placeholder='姓名' value={orderReq.userName}
              onBlur={e => setOrderReq({...orderReq, userName: e.detail.value})}
            />
          </PanelItem>
          <PanelItem icon='phone'>
            <Input className='input' type='number' placeholder='联系电话' placeholderClass='input-placeholder'
              value={orderReq.phone}
              onBlur={(e) => setOrderReq({...orderReq, phone: e.detail.value})}
            />
          </PanelItem>
          <PanelItem icon='credit-card'>
            <Input className='input' type='number' placeholder='价格' placeholderClass='input-placeholder'
              value={orderReq.amount}
              onBlur={(e) => setOrderReq({...orderReq, amount: e.detail.value})}
            />
          </PanelItem>
          <PanelItem icon='map-pin' onClick={sendAddress}>
            <Text className='title'>{location.from.address || '发货地址'}</Text>
          </PanelItem>
          <PanelItem icon='map-pin' onClick={receiveAddress}>
            <Text className='title'>{location.to.address || '收货地址'}</Text>
          </PanelItem>
          <PanelItem icon='list'>
            <Input className='input' placeholder='备注' value={orderReq.des}
              onBlur={e => setOrderReq({...orderReq, des: e.detail.value})}
            />
          </PanelItem>
        </Panel>
        <View className='info-button' onClick={submit}>
          <Text>确定</Text>
        </View>
      </View>
    </NavBar>
  )
}


