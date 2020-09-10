import NavBar from "@/components/NavBar";
import {Image, Text, View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import React from "react";
import {useSelector} from "react-redux";
import avatar from '../../img/logo.png'
import './center.less'

export default function () {
  const user = useSelector(state => state.user)

  console.log('center')

  function userAuth() {
    Taro.navigateTo({url: '/pages/authorize/index'})
  }

  return <View className='container'>
    <NavBar title='个人中心' />
    <View className='info' onClick={userAuth}>
      <Image className='avatar' src={user.avatarurl || avatar} />
      <Text className='nick_name'>{user.nickname || '登录'}</Text>
    </View>
  </View>
}

