import {ORDER_FINASH_LIST, ORDER_INDEX_LIST, ORDER_LIST, ORDER_STATUS_LIST} from "@/api";
import Panel from "@/components/Panel";
import PanelItem from "@/components/PanelItem";
import SwiperScroll from "@/components/SwiperScroll";
import {useInfiniteQuery} from "@/react-query/react";
import {request} from "@/utils/request";
import {dateFormat} from "@/utils/utils";
import {Text, View} from '@tarojs/components'
import {usePullDownRefresh, useReachBottom} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React, {useCallback, useRef, useState} from 'react'
import {useSelector} from "react-redux";

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

  console.log('order')


  const {viewHeight} = useSelector(state => state.theme)

  const [swiperHeight, setSwiperHeight] = useState()

  const indexRef = useRef(0)

  function refreshDom() {
    const query = Taro.createSelectorQuery()
    query.select(`.container .item_content_${indexRef.current}`).boundingClientRect().exec(res => {
      res[0] && setSwiperHeight(res[0].height > viewHeight ? res[0].height : viewHeight)
    })
  }


  function toDetail(d) {
    Taro.navigateTo({url: '/pages/detail/index?id=' + d.id})
  }

  function indexChange(i) {
    indexRef.current = i
  }

  function ListView({data, canFetchMore, fetchMore, index, refetch}) {
    useReachBottom(async () => {
      index === indexRef.current && canFetchMore && await fetchMore()
      setTimeout(refreshDom, 200)
    })
    usePullDownRefresh(async () => {
      index === indexRef.current && await refetch()
      setTimeout(refreshDom, 200)
      Taro.stopPullDownRefresh()
    })
    return <View>
      {data.map(r => r.list.map(d => <View className='item' onClick={() => toDetail(d)}>
        <View className='header'>
          <Text className='name'>{d.title}</Text>
          <Text className='province'>{`￥${d.amount}`}</Text>
        </View>
        <Panel padding={0} space={10}>
          <PanelItem icon='tag' paddingUD={10}>
            <View><View><Text className='line_text'>{dateFormat('Y-m-d H:M', new Date(d.ctime))}</Text></View></View>
          </PanelItem>
          <PanelItem icon='phone' paddingUD={10}>
            <View><View><Text className='line_text'>{d.phone}</Text></View></View>
          </PanelItem>
          <PanelItem icon='list' paddingUD={10}>
            <View> <View><Text className='line_text'>{`起点：${d.addressFrom}`}</Text></View></View>
            <View> <View><Text className='line_text'>{`终点：${d.addressTo}`}</Text></View></View>
          </PanelItem>
        </Panel>
      </View>))}
    </View>
  }

  const ListCurrentView = useCallback(() => {
    console.log('ListCurrentView')
    const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery(ORDER_INDEX_LIST, (key, page = 1) => request(ORDER_INDEX_LIST,{page}), {
      getFetchMore: lastGroup => lastGroup.nextPage
    })
    return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={0} />

  }, [])

  const ReceiveView = useCallback(() => {
    console.log('ReceiveView')
    const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery([ORDER_STATUS_LIST,1], (key, page = 1) =>  request(ORDER_STATUS_LIST,{page,status:1}), {
      getFetchMore: lastGroup => lastGroup.nextPage
    })
    return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={1} />

  }, [])
  const InTransitView = useCallback(() => {
    console.log('FinashView')
    const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery([ORDER_STATUS_LIST,2], (key, page = 1) =>  request(ORDER_STATUS_LIST,{page,status:2}), {
      getFetchMore: lastGroup => lastGroup.nextPage
    })
    return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={2} />

  }, [])
  const ConfirmedView = useCallback(() => {
    console.log('FinashView')
    const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery([ORDER_STATUS_LIST,3], (key, page = 1) =>  request(ORDER_STATUS_LIST,{page,status:3}), {
      getFetchMore: lastGroup => lastGroup.nextPage
    })
    return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={2} />

  }, [])

  const FinalView = useCallback(() => {
    console.log('FinalView')
    const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery(ORDER_FINASH_LIST, (key, page = 1) => request(ORDER_FINASH_LIST,{page}), {
      getFetchMore: lastGroup => lastGroup.nextPage
    })
    return <ListView data={data} fetchMore={fetchMore} canFetchMore={canFetchMore} refetch={refetch} index={3} />
  }, [])

  return (
    <View className='index'>
      <View className='item_container'>
        <SwiperScroll labels={['抢单', '派单', '派送中', '待确认','已完结']} onChange={indexChange} swiperH={swiperHeight}>
          <ListCurrentView />
          <ReceiveView />
          <InTransitView />
          <ConfirmedView />
          <FinalView />
        </SwiperScroll>
      </View>
    </View>
  )
}


