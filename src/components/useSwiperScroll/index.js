import {ScrollView, Swiper, SwiperItem, Text, View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, {useRef, useState} from "react";
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
                           swiperH,
                           header,
                           title
                         }) {
  const apiRef = React.useRef()

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
    refreshDom()
    onChange && onChange(current)

  }, [current])

  function selectChange({detail}) {
    setCurrent(detail.current)
  }


  function refreshDom() {
    const query = Taro.createSelectorQuery()
    query.select(`.container .item_content_${current}`).boundingClientRect().exec(res => {
      res[0] && setSwiperHeight(res[0].height > viewHeight ? res[0].height : viewHeight)
    })
  }

  apiRef.current = {
    className,
    itemClassNam,
    labels,
    children,
    onChange,
    swiperH,
    header,
    title,
    current,
    swiperHeight,
    selectChange,
    refreshDom
  }
  const SwiperScroll = useSwiperScrollElement(apiRef.current)
  apiRef.current.SwiperScroll = SwiperScroll

  return apiRef.current
}

function useSwiperScrollElement(contextValue) {
  const FormRef = useRef()
  const FormApiRef = useRef()
  FormApiRef.current = contextValue
  if (!FormRef.current) {
    FormRef.current = function SwiperScroll({children}) {
      const {
        current,
        setCurrent,
        header,
        className,
        labels,
        selectChange,
        swiperHeight,
        itemClassNam
      } = FormApiRef.current
      return (<ViewContextProvider value={FormApiRef.current}>
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
                {children[i]}
              </View>
            </SwiperItem>)}
          </Swiper>
        </View>
      </ViewContextProvider>)
    }
  }
  return FormRef.current
}

const ViewContext = React.createContext()

function ViewContextProvider({value, children}) {
  console.log('ViewContextProvider')
  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
}

export function useSwiperViewContext(manualFormContext) {
  console.log('useSwiperViewContext')
  let viewApi = React.useContext(ViewContext)

  if (manualFormContext) {
    return manualFormContext
  }

  if (!viewApi) {
    throw new Error(`You are trying to use the form API outside of a form!`)
  }

  return viewApi
}
