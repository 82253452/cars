import NavBar from '@/components/NavBar'
import {Swiper, SwiperItem, Text, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, {useMemo, useState} from "react";
import {useSelector} from "react-redux";
import useEffectOnce from "react-use/lib/useEffectOnce";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import './index.less'

export default function ({
                           className = '',
                           itemClassNam = '',
                           labels = [],
                           children,
                           onChange,
                           swiperH
                         }) {

  console.log('swiperScroll')

  const {viewHeight, boundingClientRect} = useSelector(state => state.theme)
  const {right, top} = boundingClientRect
  const [current, setCurrent] = useState(0)
  const [swiperHeight, setSwiperHeight] = useState(viewHeight)

  useEffectOnce(() => {
    setTimeout(() => {
      refreshDom()
    }, 300)
  })

  useUpdateEffect(() => {
    setSwiperHeight(swiperH)
  }, [swiperH])

  useUpdateEffect(() => {
    refreshDom()
    onChange(current)
  }, [current])

  function refreshDom() {
    const query = Taro.createSelectorQuery()
    query.select(`.container .item_content_${current}`).boundingClientRect().exec(res => {
      res[0] && setSwiperHeight(res[0].height > viewHeight ? res[0].height : viewHeight)
    })
  }


  const labelView = useMemo(() => {
    console.log('labelView')
    return labels.map((l, i) => <View className='labels-container'>
      <Text onClick={() => setCurrent(i)} className={`labels ${i === current && 'active'}`}>{l}</Text>
      {i === current && <View className='line' />}
    </View>)
  }, [current, labels])

  const switerItem = useMemo(() => {
    console.log('swiperitem')
    return labels.map((l, i) => <SwiperItem className={`swiper_item ${itemClassNam}`}>
      <View className={`item_content_${i}`}>
        {children[i]}
      </View>
    </SwiperItem>)
  }, [children, itemClassNam, labels])

  function selectChange({detail}) {
    console.log(detail)
    setCurrent(detail.current)
  }

  return <NavBar>
    <View className='container'>
      <View className='item_header' style={{top: `${top}px`, marginLeft: `calc(100% - ${right}px)`}}>
        {labelView}
      </View>
      <Swiper
        className={`item_swiper ${className}`}
        onChange={selectChange}
        current={current}
        style={{height: `${swiperHeight}px`}}
      >
        {switerItem}
      </Swiper>
    </View>
  </NavBar>

}
