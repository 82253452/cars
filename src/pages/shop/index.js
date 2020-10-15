import NavBar from "@/components/NavBar";
import avatar from '@/img/logo.png'
import {Image, View} from '@tarojs/components'
import React from 'react'

import './index.less'

export default function () {

  console.log('shopping')


  return (
    <NavBar back home title='积分商城' viewBackGround='#F3F5F4'>
      <View className='index'>
        <View className='list'>
          <View className='item'>
            <Image src={avatar} />
            <View className='title'>华为 HUAWEI Mate 30 麒麟990旗舰芯片</View>
            <View className='info'>
              <View className='info_s'>
                <View className='price'>10 积分</View>
                <View className='num'>剩余 500个</View>
              </View>
              <View className='button'>兑换</View>
            </View>
          </View>
          <View className='item'>
            <Image src={avatar} />
            <View className='title'>华为 HUAWEI Mate 30 麒麟990旗舰芯片</View>
            <View className='info'>
              <View className='info_s'>
                <View className='price'>10 积分</View>
                <View className='num'>剩余 500个</View>
              </View>
              <View className='button'>兑换</View>
            </View>
          </View>
          <View className='item'>
            <Image src={avatar} />
            <View className='title'>华为 HUAWEI Mate 30 麒麟990旗舰芯片</View>
            <View className='info'>
              <View className='info_s'>
                <View className='price'>10 积分</View>
                <View className='num'>剩余 500个</View>
              </View>
              <View className='button'>兑换</View>
            </View>
          </View>
        </View>
      </View>
    </NavBar>
  )
}


