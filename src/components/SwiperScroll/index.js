import NavBar from '@/components/NavBar'
import Skeleton from "@/components/Skeleton";
import {ScrollView, Swiper, SwiperItem, Text, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, {forwardRef, useImperativeHandle, useState} from "react";
import {useSelector} from "react-redux";
import useEffectOnce from "react-use/lib/useEffectOnce";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import './index.less'

export default forwardRef(({
                             className = '',
                             itemClassNam = '',
                             labels = [],
                             children,
                             onChange,
                             swiperH,
                             header,
                             title
                           }, ref) => {

  console.log('swiperScroll')
  const {viewHeight, boundingClientRect} = useSelector(state => state.theme)
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
    setTimeout(() => {
      refreshDom()
    }, 300)
    Taro.pageScrollTo({scrollTop:0})
    onChange && onChange(current)
  }, [current])

  useImperativeHandle(ref, () => ({
    current,
    setSwiperHeight
  }))


  function refreshDom() {
    const query = Taro.createSelectorQuery()
    query.select(`.container .item_content_${current}`).boundingClientRect().exec(res => {
      res[0] && setSwiperHeight(res[0].height > viewHeight ? res[0].height : viewHeight)
    })
  }

  function selectChange({detail}) {
    setCurrent(detail.current)
  }

  return <NavBar title={title} viewBackGround='#F3F5F4'>
    <View className='container'>
      {header}
      <ScrollView scrollX className='scroll_view' scrollIntoView={`item_${current}`} scrollWithAnimation>
        <View className='item_header'>
          {labels.map((l, i) => <View className='labels-container' id={`item_${i}`}>
            <Text onClick={() => setCurrent(i)} className={`labels ${i === current && 'active'}`}>{l}</Text>
            {i === current && <View className='line' />}
          </View>)}
        </View>
      </ScrollView>
      <Swiper
        className={`item_swiper ${className}`}
        onChange={selectChange}
        current={current}
        style={{height: `${swiperHeight}px`}}
      >
        {labels.map((l, i) => <SwiperItem className={`swiper_item ${itemClassNam}`}>
          <View className={`item_content_${i}`}>
            {current === i ? children[i] : <Gujia swiperHeight={swiperHeight} />}
          </View>
        </SwiperItem>)}
      </Swiper>
    </View>
  </NavBar>
})

function Gujia({swiperHeight}) {
  const rowArray = Array.apply(null, Array(4)).map((_, index) => index)
  const rowProps = rowArray.map(()=>({
    width: '100%%',
    height: '160px'
  }))
  return <View style={{height: `${swiperHeight}px`}}>
    <Skeleton row={4} rowProps={rowProps} />
  </View>
}
