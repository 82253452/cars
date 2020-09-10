import {CAR_LIST} from "@/api";
import NavBar from "@/components/NavBar";
import {useQuery} from '@/react-query'
import {request} from "@/utils/request";
import {Image, Swiper, SwiperItem, Text, View} from '@tarojs/components'
import Taro from "@tarojs/taro";
import React from 'react'
import {useSelector} from "react-redux";
import {AtIcon} from "taro-ui";

import './index.less'

export default function () {
  console.log('index')
  const {data = {list: []}} = useQuery(CAR_LIST, () => request(CAR_LIST))

  function toShipping(d) {
    Taro.navigateTo({url: '/pages/shipping/index?id=' + d.id})
  }

  const CarItem = () => {
    return data.list.map(o => <View className='item' onClick={() => toShipping(o)}>
      <View className='left'>
        <Text>{o.title}</Text>
        <Text className='desc'>{o.carLength}米*{o.carWidth}米*{o.carHeight}米</Text>
        <AtIcon value='arrow-right' size='20' color='#4FC469' />
      </View>
      <View>
        <Image className='item_img'
          src={o.img}
        />
      </View>
    </View>)
  }
  return (
    <View className='index'>
      <NavBar title='物流' />
      <Swiper
        className='swiper'
        circular
        autoplay
      >
        <SwiperItem>
          <Image className='img'
            src='https://kan-jian.oss-cn-beijing.aliyuncs.com/wx_temp/1806317dd79a462b954682ffdc1cd62a.jpeg'
          />
        </SwiperItem>
        <SwiperItem>
          <Image className='img'
            src='https://kan-jian.oss-cn-beijing.aliyuncs.com/wx_temp/3712a246a8c94925878570a2eae9e6af.jpeg'
          />
        </SwiperItem>
        <SwiperItem>
          <Image className='img'
            src='https://kan-jian.oss-cn-beijing.aliyuncs.com/wx_temp/1806317dd79a462b954682ffdc1cd62a.jpeg'
          />
        </SwiperItem>
      </Swiper>
      <View className='container'>
        <View className='header'>
          <Text>{data.list.length} 种车型</Text>
        </View>
        <CarItem />
      </View>

    </View>
  )
}


