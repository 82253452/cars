import {ORDER_INDEX_LIST, ORDER_STATUS_LIST} from "@/api";
import Panel from "@/components/Panel";
import SwiperScroll from "@/components/SwiperScroll";
import dingwei from '@/img/dingwei.png'
import jiantou from "@/img/jiantou.png";
import shijian from '@/img/shijian.png'
import sousuo2 from '@/img/sousuo2.png'
import tujing1 from '@/img/tujing (1).png'
import tujing2 from '@/img/tujing (2).png'
import {useInfiniteQuery} from "@/react-query/react";
import {request} from "@/utils/request";
import {getDistance} from "@/utils/utils";
import {Image, Input, Text, View} from '@tarojs/components'
import {usePullDownRefresh, useReachBottom} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React, {useRef} from 'react'
import {useSelector} from "react-redux";
import './index.less'

const orderStatus = {
  0: {
    text: '待接单',
    color: '#CE0801'
  },
  1: {
    text: '待配送',
    color: '#F0741C'
  },
  2: {
    text: '配送中',
    color: '#02BB00'
  },
  3: {
    text: '待完成',
    color: '#333333'
  },
  4: {
    text: '已完成',
    color: '#333333'
  },
  5: {
    text: '派送取消',
    color: '#333333'
  },
  6: {
    text: '派送异常',
    color: '#333333'
  },
  7: {
    text: '派送超时',
    color: '#333333'
  },
}
const discharge = ['国四', '国五', '国六']

export default function () {

  console.log('order')
  const swiperRef = useRef()

  return (
    <View className='index'>
      <View className='item_container'>
        <SwiperScroll title='首页' ref={swiperRef} labels={['全部', '个人单', '企业单']} header={<Search />}>
          <AllListCurrentView swiperRef={swiperRef} />
          <PersonCurrentView swiperRef={swiperRef} />
          <CompanyCurrentView swiperRef={swiperRef} />
        </SwiperScroll>
      </View>
    </View>
  )
}

function Search() {
  return <View className='search'>
    <View className='search_text'>
      <Image src={dingwei} style={{width: '31rpx', height: '38rpx'}} />
      <Text>上海</Text>
      <Image src={jiantou} style={{width: '39rpx', height: '17rpx'}} />
      <Text>杭州</Text>
    </View>
    <View className='search_button'>
      <Input className='input' placeholderClass='placeholder' placeholder='请输入关键词' />
      <Image src={sousuo2} style={{width: '34rpx', height: '34rpx'}} />
    </View>
  </View>
}

function ListView({data, canFetchMore, fetchMore, index, refetch, swiperRef}) {
  const {viewHeight} = useSelector(state => state.theme)
  const {currentLocation={}} = useSelector(state => state.user)
  useReachBottom(async () => {
    index === swiperRef.current.current && canFetchMore && await fetchMore()
    setTimeout(refreshDom, 200)
  })
  usePullDownRefresh(async () => {
    index === swiperRef.current.current && await refetch()
    setTimeout(refreshDom, 200)
    Taro.stopPullDownRefresh()
  })

  function refreshDom() {
    const query = Taro.createSelectorQuery()
    query.select(`.container .item_content_${swiperRef.current.current}`).boundingClientRect().exec(res => {
      res[0] && swiperRef.current.setSwiperHeight(res[0].height > viewHeight ? res[0].height : viewHeight)
    })
  }

  function toDetail(d) {
    Taro.navigateTo({url: '/pages/detail/index?id=' + d.id})
  }

  return <View>
    {data.map(r => r.list.map(d => <Panel padding={0}>
      <View className='item' onClick={() => toDetail(d)}>
        <View className='header'>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <Image src={shijian} style={{width: `30rpx`, height: `30rpx`}} />
            <Text className='time'>{d.deliveryTimeStart}-{d.deliveryTimeStart}</Text>
          </View>
          <View className='distance'>
            距您{getDistance(currentLocation.latitude, currentLocation.longitude, d.latitudeFrom, d.longitudeFrom)}km
          </View>
        </View>
        <View className='center'>
          <View className='center_l'>
            <View className='icon' style={{
              background: {
                0: 'linear-gradient(90deg, #FBD249 0%, #F5A623 100%)',
                1: 'linear-gradient(90deg, #6DA9FF 0%, #277CF7 100%);'
              }[d.orderType]
            }}
            >{{0: '个人', 1: '企业'}[d.orderType]}</View>
            <View className='title'>零部件200t，10m³共20托</View>
          </View>
          <View className='center_c'>
            <Image src={tujing1} style={{width: '14rpx', height: '14rpx'}} />
            <Text>{d.addressFromDetail}</Text>
          </View>
          <View className='center_c'>
            <Image src={tujing2} style={{width: '14rpx', height: '14rpx'}} />
            <Text>{d.addressToDetail}</Text>
          </View>
        </View>
        <View className='bottom'>
          <View className='descs'>
            <text className='number'>￥{d.amount || 0}</text>
            <text className='car_type'>{d.productName}</text>
            <text className='car_type'>{discharge[d.discharge]}</text>
          </View>
          <View className='button_t'>
            抢单
          </View>
        </View>
      </View>
    </Panel>))}
  </View>
}

function AllListCurrentView({swiperRef}) {
  console.log('AllListCurrentView')
  const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery(ORDER_INDEX_LIST, (key, page = 1) => request(ORDER_STATUS_LIST, {page}), {
    getFetchMore: lastGroup => lastGroup.nextPage
  })
  return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={0}
    swiperRef={swiperRef}
  />
}

function PersonCurrentView({swiperRef}) {
  console.log('ListCurrentView')
  const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery([ORDER_INDEX_LIST, 0], (key, page = 1) => request(ORDER_INDEX_LIST, {
    page,
    type: 0
  }), {
    getFetchMore: lastGroup => lastGroup.nextPage
  })
  return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={1}
    swiperRef={swiperRef}
  />
}


function CompanyCurrentView({swiperRef}) {
  console.log('ListCurrentView')
  const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery([ORDER_INDEX_LIST, 1], (key, page = 1) => request(ORDER_INDEX_LIST, {
    page,
    type: 1
  }), {
    getFetchMore: lastGroup => lastGroup.nextPage
  })
  return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={2}
    swiperRef={swiperRef}
  />
}
