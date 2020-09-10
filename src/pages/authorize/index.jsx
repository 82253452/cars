import {setUser} from "@/actions/user";
import {authorize} from "@/utils/request";
import {Button, Image, View} from '@tarojs/components'
import Taro from '@tarojs/taro'
import React from "react";
import {useDispatch} from "react-redux";
import {AtNavBar} from "taro-ui";
import logo from '../../img/logo.png'

import './index.less'

export default function Index() {

  const dispatch = useDispatch()

  async function onGotUserInfo(e) {
    try {
      const user = await authorize(e)
      console.log(user)
      dispatch(setUser(user))
      Taro.navigateBack()
    } catch (ex) {
      await Taro.showToast({
        title: ex.toString(),
        icon: 'none'
      })
    }
  }


  return (
    <View className='wrap'>
      <AtNavBar
        color='#000'
      />
      <View className='logo'>
        <Image src={logo} className='chatu' />
        <View className='title'>CAR</View>
      </View>
      <View className='info'>
        <View className='fs_30'>请允许我们获取以下权限：</View>
        <View className='fs_26'>以下信息仅用于您登录小程序，我们将严格保密绝不外泄</View>
        <View className='fs_30'>公开信息（头像、昵称）</View>
      </View>
      <Button openType='getUserInfo' onGetUserInfo={onGotUserInfo} className='authorize_btn'>点击授权</Button>
      <Button className='authorize_btn' style='background:#EBEBEB;margin-top:30rpx;color:#D3D3D3' onClick={() => {
        Taro.navigateBack()
      }}
      >取消授权</Button>
    </View>
  )
}
