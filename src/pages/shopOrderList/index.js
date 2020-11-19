import {PRODUCT_ORDER_LIST} from "@/api";
import Panel from "@/components/Panel";
import Skeleton from "@/components/Skeleton";
import SwiperScroll from "@/components/SwiperScroll";
import gengduo from "@/img/gengduo.png";
import shangcheng from "@/img/shangcheng.png";
import {useInfiniteQuery} from "@/react-query/react";
import {request} from "@/utils/request";
import {Image, Text, View} from '@tarojs/components'
import {usePullDownRefresh, useReachBottom} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React, {useMemo, useRef, useState} from 'react'
import useEffectOnce from "react-use/lib/useEffectOnce";

import './index.less'


export default function () {

  console.log('order')
  const swiperRef = useRef()

  return (
    <View className='index'>
      <View className='item_container'>
        <SwiperScroll back home title='订单页' ref={swiperRef} labels={['全部', '待发货', '运送中', '已完成']}>
          <AllListView swiperRef={swiperRef} />
          <DeliveringView swiperRef={swiperRef} />
          <ReceivingView swiperRef={swiperRef} />
          <FinalView swiperRef={swiperRef} />
        </SwiperScroll>
      </View>
    </View>
  )
}

function ListView({data, canFetchMore, fetchMore, index, refetch, swiperRef}) {
  useReachBottom(async () => {
    index === swiperRef.current.current && canFetchMore && await fetchMore()
    setTimeout(swiperRef.current.refreshDom, 200)
  })
  usePullDownRefresh(async () => {
    index === swiperRef.current.current && await refetch()
    setTimeout(swiperRef.current.refreshDom, 200)
    Taro.stopPullDownRefresh()
  })

  return <View>
    {data.map((r, i) => r.list.map((d, j) => <PanelBlock id={`${index}_${i}_${j}`} d={d} />))}
  </View>
}

function PanelBlock({d, id}) {
  const [show, setShow] = useState(false)

  const isShow = useMemo(() => show, [show])

  function toDetail(e) {
    Taro.navigateTo({url: '/pages/detail/index?id=' + e.id})
  }

  useEffectOnce(() => {
    setTimeout(() => {
      Taro.createIntersectionObserver().relativeToViewport().observe(`.item_observer_${id}`, (res) => {
        if (res.intersectionRatio > 0) {
          setShow(true)
        } else if (res.intersectionRatio === 0) {
          setShow(false)
        }
      })
    }, 300)
  })

  return <View className={`item_observer_${id}`} id={id}>
    {isShow ? <Panel style={{padding:'20rpx 0'}}>
      <View className='item' onClick={() => toDetail(d)}>
        <View className='header'>
          <View className='header_left'>
            <Image src={shangcheng} style={{width: '30rpx', height: '30rpx'}} />
            <View className='title'>积分商城兑换</View>
          </View>
          <View className='header_right'>
            <View className='status'>{{0:'待发货',1:'运送中',2:'已完成'}[d.status]}</View>
            <Image src={gengduo} style={{width: `12rpx`, height: `22rpx`, marginLeft: '10rpx'}} />
          </View>
        </View>
        <View className='content'>
          <View className='product_info'>
            <View>
              <Image className='img'
                src='https://kan-jian.oss-cn-beijing.aliyuncs.com/topic/20200708/20200708155048_wahe.44.00.png'
              />
            </View>
            <View className='details'>
              <Text className='name'>{d.productName}</Text>
              <View className='detail'>
                <Text>数量：{d.num||1}</Text>
                <Text style={{marginLeft:'30rpx'}}>属性：{d.attribute}</Text>
              </View>
              <View className='price'>{d.amount}{d.orderType===0?'积分':'￥'}</View>
            </View>
          </View>
        </View>
      </View>
    </Panel> : <Skeleton height={150} />}
  </View>
}

function AllListView({swiperRef}) {
  console.log('AllListCurrentView')
  const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery(PRODUCT_ORDER_LIST, (key, page = 1) => request(PRODUCT_ORDER_LIST, {page}), {
    getFetchMore: lastGroup => lastGroup.nextPage
  })
  return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={0}
    swiperRef={swiperRef}
  />
}

function DeliveringView({swiperRef}) {
  console.log('DeliveringView')
  const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery([PRODUCT_ORDER_LIST,0], (key, page = 1) => request(PRODUCT_ORDER_LIST, {page,status:0}), {
    getFetchMore: lastGroup => lastGroup.nextPage
  })
  return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={1}
    swiperRef={swiperRef}
  />
}

function ReceivingView({swiperRef}) {
  console.log('ReceivingView')
  const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery([PRODUCT_ORDER_LIST,1], (key, page = 1) => request(PRODUCT_ORDER_LIST, {page,status:1}), {
    getFetchMore: lastGroup => lastGroup.nextPage
  })
  return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={2}
    swiperRef={swiperRef}
  />
}

function FinalView({swiperRef}) {
  console.log('FinalView')
  const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery([PRODUCT_ORDER_LIST,2], (key, page = 1) => request(PRODUCT_ORDER_LIST, {page,status:2}), {
    getFetchMore: lastGroup => lastGroup.nextPage
  })
  return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={3}
    swiperRef={swiperRef}
  />
}
