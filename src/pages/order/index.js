import {ORDER_FINASH_LIST, ORDER_INDEX_LIST, ORDER_STATUS_LIST} from "@/api";
import Panel from "@/components/Panel";
import SwiperScroll from "@/components/SwiperScroll";
import {useInfiniteQuery} from "@/react-query/react";
import {request} from "@/utils/request";
import {Image, Text, View} from '@tarojs/components'
import {usePullDownRefresh, useReachBottom} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React, {useCallback, useRef, useState} from 'react'
import {useSelector} from "react-redux";
import gengduo from '../../img/gengduo.png'
import fahuo from '../../img/fahuo.png'
import shouhuo from '../../img/shouhuo.png'
import './index.less'

export default function () {

  console.log('order')


  const {viewHeight} = useSelector(state => state.theme)

  const [swiperHeight, setSwiperHeight] = useState()

  const indexRef = useRef(0)

  const orderStatus = {0: '#CE0801', 1: '#F0741C', 2: '#02BB00'}

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
      {data.map(r => r.list.map(d => <Panel padding={0}>
        <View className='item' onClick={() => toDetail(d)}>
          <View className='header'>
            <View>
              <Image src={gengduo} style={{width: `12rpx`, height: `22rpx`}} />
              <Text className='time'>2020年12月11日-2021年1月30日</Text>
            </View>
            <View>
              <Text style={{color:orderStatus[d.status]||'#000'}}>待接单</Text>
              <Image src={gengduo} style={{width: `12rpx`, height: `22rpx`, marginLeft: '10rpx'}} />
            </View>
          </View>
          <View className='content'>
            <View className='block' style={{justifySelf:'end'}}>
              <Image src={fahuo} style={{width: `44rpx`, height: `44rpx`}} />
              <View className='text'>
                <View className='title'>{d.addressCityFrom}</View>
                <View className='desc'>{d.addressDistrictFrom}</View>
              </View>
            </View>
            <Image src={gengduo} style={{width: `59rpx`, height: `8rpx`}} />
            <View className='block'>
              <Image src={shouhuo} style={{width: `44rpx`, height: `44rpx`}} />
              <View className='text'>
                <View className='title'>{d.addressCityTo}</View>
                <View className='desc'>{d.addressDistrictTo}</View>
              </View>
            </View>
          </View>
          <View className='bottom'>
            <View>
              <text className='desc'>费用</text>
              <text className='number'>￥100</text>
            </View>
            <View className='title'>
              <Text>{d.productName}</Text>
            </View>
          </View>
          {/*<View className='header'>*/}
          {/*  <Text className='name'>{d.title}</Text>*/}
          {/*  <Text className='province'>{`￥${d.amount}`}</Text>*/}
          {/*</View>*/}
          {/*<Panel padding={0} space={10}>*/}
          {/*  <PanelItem icon='tag' paddingUD={10}>*/}
          {/*    <View><View><Text className='line_text'>{dateFormat('Y-m-d H:M', new Date(d.ctime))}</Text></View></View>*/}
          {/*  </PanelItem>*/}
          {/*  <PanelItem icon='phone' paddingUD={10}>*/}
          {/*    <View><View><Text className='line_text'>{d.phone}</Text></View></View>*/}
          {/*  </PanelItem>*/}
          {/*  <PanelItem icon='list' paddingUD={10}>*/}
          {/*    <View> <View><Text className='line_text'>{`起点：${d.addressFrom}`}</Text></View></View>*/}
          {/*    <View> <View><Text className='line_text'>{`终点：${d.addressTo}`}</Text></View></View>*/}
          {/*  </PanelItem>*/}
          {/*</Panel>*/}
        </View>
      </Panel>))}
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


