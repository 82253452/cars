import {setPhone} from "@/actions/user";
import {ORDER_LIST, PHONE_INFO} from "@/api";
import SwiperScroll from "@/components/SwiperScroll";
import {useQuery} from "@/react-query/react";
import {APP_ID} from "@/utils/Const";
import {request} from "@/utils/request";
import {dateFormat} from "@/utils/utils";
import {Button, Map, Text, View} from '@tarojs/components'
import Taro from "@tarojs/taro";
import React, {useCallback} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {AtIcon} from "taro-ui";

import './index.less'

const setting = {
  skew: 0,
  rotate: 0,
  showLocation: false,
  showScale: false,
  subKey: '',
  layerStyle: -1,
  enableZoom: true,
  enableScroll: true,
  enableRotate: false,
  showCompass: false,
  enable3D: false,
  enableOverlooking: false,
  enableSatellite: false,
  enableTraffic: false,
}

export default function () {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const {data = {}} = useQuery(ORDER_LIST, () => request(ORDER_LIST))

  console.log('order')

  //解密手机号
  async function getPhoneNumber(e) {
    const {iv, encryptedData} = e.detail
    try {
      const {code} = await Taro.login()
      if (!iv || !encryptedData || !code) {
        return
      }
      const res = await request(PHONE_INFO, {
        iv,
        code,
        encryptedData,
        signature: 'signature',
        rawData: 'rawData',
        appId: APP_ID
      })
      if (!res.data) {
        await Taro.showToast({title: '获取手机号失败 请再次获取', icon: 'none'})
        return
      }
      dispatch(setPhone(res.data))
    } catch (e) {
      await Taro.showToast({title: '获取手机号失败 请再次获取', icon: 'none'})
    }
  }

  function userAuth() {
    Taro.navigateTo({url: '/pages/authorize/index'})
  }

  const IsLogin = () => {
    if (user.nickname) {
      return <View />;
    }
    return <View className='button' onClick={userAuth}><Text>登录</Text></View>
  }

  const IsNoPhone = () => {
    if (user.phone || !user.nickname) {
      return <View />;
    }
    return <Button openType='getPhoneNumber' className='feed-buttom' onGetPhoneNumber={getPhoneNumber}>
      <Text>认证</Text>
    </Button>
  }

  function toDetail(d) {
    Taro.navigateTo({url: '/pages/detail/index?id=' + d.id})
  }

  const OrderItem = useCallback(() => {
    return <View>
      {data.list ? data.list.map((d) => <View className='item' onClick={() => toDetail(d)}>
        <View className='header'>
          <Text className='name'>{d.title}</Text>
          <Text className='province'>date</Text>
        </View>
        <View>
          <Map className='map' setting={setting} enableZoom={false} enableScroll={false} longitude={116.584217}
            latitude={39.896117}
          />
        </View>
        <View className='detail'>
          <View className='line'>
            <AtIcon value='tag' size='20' color='#CAC9CE' />
            <Text className='line_text'>{dateFormat('Y-m-d H:M', new Date(d.ctime))}</Text>
          </View>
          <View className='line'>
            <AtIcon value='phone' size='20' color='#CAC9CE' />
            <Text className='line_text'>15901320019</Text>
          </View>
          <View className='line'>
            <AtIcon value='list' size='20' color='#CAC9CE' />
            <Text className='line_text'>浙江大挂</Text>
          </View>
        </View>
      </View>) : <View />}
    </View>
  }, [data])

  const OrderList = () => {
    if (!user.phone) {
      return <View />;
    }
    return <View className='item_container'>
      <SwiperScroll renderItem={OrderItem} labels={['抢单', '派单']} />
    </View>
  }

  return (
    <View className='index'>
      <IsLogin />
      <IsNoPhone />
      <OrderList />
    </View>
  )
}


