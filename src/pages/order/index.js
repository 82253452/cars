import {ORDER_FINASH_LIST, ORDER_INDEX_LIST, ORDER_STATUS_LIST} from "@/api";
import Panel from "@/components/Panel";
import SwiperScroll from "@/components/SwiperScroll";
import Skeleton from "@/components/Skeleton";
import fahuo from '@/img/fahuo.png'
import gengduo from '@/img/gengduo.png'
import lujing from '@/img/lujing.png'
import shijian from '@/img/shijian.png'
import shouhuo from '@/img/shouhuo.png'
import {useInfiniteQuery} from "@/react-query/react";
import {request} from "@/utils/request";
import {Image, Text, View} from '@tarojs/components'
import {usePullDownRefresh, useReachBottom} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React, {useMemo, useRef, useState} from 'react'
import useEffectOnce from "react-use/lib/useEffectOnce";
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

export default function () {

  console.log('order')
  const swiperRef = useRef()

  return (
    <View className='index'>
      <View className='item_container'>
        <SwiperScroll title='订单页' ref={swiperRef} labels={['全部', '抢单', '派单', '派送中', '待确认', '已完结']}>
          <AllListCurrentView swiperRef={swiperRef} />
          <ListCurrentView swiperRef={swiperRef} />
          <ReceiveView swiperRef={swiperRef} />
          <InTransitView swiperRef={swiperRef} />
          <ConfirmedView swiperRef={swiperRef} />
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
    {isShow ? <Panel padding={0}>
      <View className='item' onClick={() => toDetail(d)}>
        <View className='header'>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <Image src={shijian} style={{width: `30rpx`, height: `30rpx`}} />
            <View><Text className='time'>{d.deliveryTimeStart}-{d.deliveryTimeStart}</Text></View>
          </View>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <View><Text style={{color: orderStatus[d.status].color}}>{orderStatus[d.status].text}</Text></View>
            <Image src={gengduo} style={{width: `12rpx`, height: `22rpx`, marginLeft: '10rpx'}} />
          </View>
        </View>
        <View className='content'>
          <View className='block' style={{justifySelf: 'end'}}>
            <Image src={fahuo} style={{width: `44rpx`, height: `44rpx`}} />
            <View className='text'>
              <View><Text className='title'>{d.addressCityFrom}</Text></View>
              <View><Text className='desc'>{d.addressDistrictFrom}</Text></View>
            </View>
          </View>
          <Image src={lujing} style={{width: `70rpx`, height: `8rpx`}} />
          <View className='block'>
            <Image src={shouhuo} style={{width: `44rpx`, height: `44rpx`}} />
            <View className='text'>
              <View><Text className='title'>{d.addressCityTo}</Text></View>
              <View><Text className='desc'>{d.addressDistrictTo}</Text></View>
            </View>
          </View>
        </View>
        <View className='bottom'>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <View>
              <text className='desc'>费用</text>
            </View>
            <View>
              <text className='number'>￥{d.amount || 0}</text>
            </View>
          </View>
          <View className='title'>
            <View><Text>{d.productName}</Text></View>
          </View>
        </View>
      </View>
    </Panel> : <Skeleton height={182} />}
  </View>
}

function AllListCurrentView({swiperRef}) {
  console.log('AllListCurrentView')
  const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery(ORDER_STATUS_LIST, (key, page = 1) => request(ORDER_STATUS_LIST, {page}), {
    getFetchMore: lastGroup => lastGroup.nextPage
  })
  return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={0}
    swiperRef={swiperRef}
  />
}

function ListCurrentView({swiperRef}) {
  console.log('ListCurrentView')
  const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery(`${ORDER_INDEX_LIST}_0`, (key, page = 1) => request(ORDER_INDEX_LIST, {
    page,
    type: 0
  }), {
    getFetchMore: lastGroup => lastGroup.nextPage
  })
  return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={1}
    swiperRef={swiperRef}
  />
}

function ReceiveView({swiperRef}) {
  console.log('ReceiveView')
  const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery(`${ORDER_INDEX_LIST}_1`, (key, page = 1) => request(ORDER_STATUS_LIST, {
    page,
    status: 1
  }), {
    getFetchMore: lastGroup => lastGroup.nextPage
  })
  return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={2}
    swiperRef={swiperRef}
  />
}

function InTransitView({swiperRef}) {
  console.log('InTransitView')
  const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery(`${ORDER_INDEX_LIST}_2`, (key, page = 1) => request(ORDER_STATUS_LIST, {
    page,
    status: 2
  }), {
    getFetchMore: lastGroup => lastGroup.nextPage
  })
  return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={3}
    swiperRef={swiperRef}
  />
}

function ConfirmedView({swiperRef}) {
  console.log('ConfirmedView')
  const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery(`${ORDER_INDEX_LIST}_3`, (key, page = 1) => request(ORDER_STATUS_LIST, {
    page,
    status: 3
  }), {
    getFetchMore: lastGroup => lastGroup.nextPage
  })
  return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={4}
    swiperRef={swiperRef}
  />
}

function FinalView({swiperRef}) {
  console.log('FinalView')
  const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery(ORDER_FINASH_LIST, (key, page = 1) => request(ORDER_FINASH_LIST, {page}), {
    getFetchMore: lastGroup => lastGroup.nextPage
  })
  return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={5}
    swiperRef={swiperRef}
  />
}



