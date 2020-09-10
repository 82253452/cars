import NavBar from '@/components/NavBar'
import {BOTTOM_GAP} from "@/utils/Const";
import {Swiper, SwiperItem, Text, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, {useCallback, useState} from "react";
import useEffectOnce from "react-use/lib/useEffectOnce";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import './index.less'

export default function ({
                           className = '',
                           itemClassNam = '',
                           labels = [],
                           renderItem
                         }) {

  const {windowHeight} = Taro.getSystemInfoSync()
  const {top, right, bottom} = Taro.getMenuButtonBoundingClientRect();

  const viewHeight = windowHeight - bottom - BOTTOM_GAP
  const [current, setCurrent] = useState(0)
  const [swiperHeight, setSwiperHeight] = useState(viewHeight)

  useEffectOnce(() => {
    setTimeout(() => {
      refreshDom()
    },300)
  })

  useUpdateEffect(() => {
    refreshDom()
  }, [current, renderItem])

  function refreshDom() {
    const query = Taro.createSelectorQuery()
    query.select(`.container .item_content_${current}`).boundingClientRect().exec(res => {
      res[0] && setSwiperHeight(res[0].height > viewHeight ? res[0].height : viewHeight)
    })
  }


  const Labels = useCallback(() => {
    return labels.map((l, i) => <View className='labels-container'>
      <Text onClick={() => setCurrent(i)} className={`labels ${i === current && 'active'}`}>{l}</Text>
      {i === current && <View className='line' />}
    </View>)
  }, [current, labels])

  const SwiterItem = useCallback(() => {
    return labels.map((l, i) => <SwiperItem className={`swiper_item ${itemClassNam}`}>
      <View className={`item_content_${i}`}>
        {renderItem(l, i)}
      </View>
    </SwiperItem>)
  }, [itemClassNam, labels, renderItem])

  function selectChange({detail}) {
    setCurrent(detail.current)
  }

  return <View className='container'>
    <NavBar />
    <View className='item_header' style={{top: `${top}px`, marginLeft: `calc(100% - ${right}px)`}}>
      <Labels />
    </View>
    <Swiper
      className={`item_swiper ${className}`}
      onChange={selectChange}
      current={current}
      style={{height: `${swiperHeight}px`}}
    >
      <SwiterItem />
    </Swiper>
  </View>
}
