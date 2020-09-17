import NavBar from "@/components/NavBar";
import {Image, Text, View} from "@tarojs/components";
import React from "react";
import './index.less'

export default function () {


  return <NavBar title='物流公司' back home>
    <View className='container'>
      <View className='item'>
        <Image className='img' src='http://img.zhihuizhan.net/Fp2ZUDI8Pchr-y_h7g8QKZt6LoeN'/>
        <View className='info'>
          <Text className='title'>中华三</Text>
          <Text className='desc'>中华三中华三中华三中华三</Text>
        </View>
        <View className='button'>
          <Text>加入</Text>
        </View>
      </View>
      <View className='item'>
        <Image className='img' src='http://img.zhihuizhan.net/Fp2ZUDI8Pchr-y_h7g8QKZt6LoeN'/>
        <View className='info'>
          <Text className='title'>中华三</Text>
          <Text className='desc'>中华三中华三中华三中华三</Text>
        </View>
        <View className='button'>
          <Text>加入</Text>
        </View>
      </View>
    </View>
  </NavBar>

}

