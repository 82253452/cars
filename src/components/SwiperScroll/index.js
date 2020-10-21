import NavBar from '@/components/NavBar'
import Skeleton from "@/components/Skeleton";
import {ScrollView, Swiper, SwiperItem, Text, View} from "@tarojs/components";
import {useReady} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React, {forwardRef, useImperativeHandle, useMemo, useState} from "react";
import {useSelector} from "react-redux";
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
  const {viewHeight} = useSelector(state => state.theme)
  const [current, setCurrent] = useState(0)
  const [swiperHeight, setSwiperHeight] = useState(viewHeight)


  useUpdateEffect(() => {
    setSwiperHeight(swiperH)
  }, [swiperH])

  useUpdateEffect(() => {
    Taro.pageScrollTo({scrollTop:0})
    onChange && onChange(current)
  }, [current])

  useImperativeHandle(ref, () => ({
    current,
    setSwiperHeight,
    refreshDom
  }))

  const swiperHeightMemo = useMemo(()=>swiperHeight,[swiperHeight])

  useReady(()=>{
    labels.forEach((l,i)=>{
      Taro.createIntersectionObserver().relativeToViewport().observe(`.item_content_${i}`, (res) => {
        if(i===res.id*1 && res.intersectionRatio>0){
          setTimeout(()=>setSwiperHeight(res.boundingClientRect.height> viewHeight ? res.boundingClientRect.height : viewHeight),500)
        }
      })
    })
  })


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
        style={{height: `${swiperHeightMemo}px`}}
      >
        {labels.map((l, i) => <SwiperItem className={`swiper_item ${itemClassNam}`}>
          <View className={`item_content_${i}`} style={{minHeight:`${swiperH}rpx`}}  id={i} >
            {/*{current === i ? children[i] : <Gujia swiperHeight={swiperHeight} />}*/}
            {children[i]}
          </View>
        </SwiperItem>)}
      </Swiper>
    </View>
  </NavBar>
})

