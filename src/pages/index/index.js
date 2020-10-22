import {setData} from "@/actions/order";
import {BANNER_LIST, CAR_LIST, ORDER_SUBMIT} from "@/api";
import {useMapDirectionSdkEffect, useMapLocationSdk} from "@/common/useMapLocationSdk";
import NavBar from "@/components/NavBar";
import Panel from '@/components/Panel'
import PanelItemImgSelect from '@/components/PanelItemImgSelect'
import PanelItemInput from '@/components/PanelItemInput'
import PanelItemMultipleSelect from '@/components/PanelItemMultipleSelect'
import PanelItemSelect from '@/components/PanelItemSelect'
import PanelItemTextArea from '@/components/PanelItemTextArea'
import dizhipu from '@/img/dizhipu.png'
import fahuo from '@/img/fahuo.png'
import gonggao from '@/img/gonggao.png'
import shouhuo from '@/img/shouhuo.png'
import tianjia from '@/img/tianjia.png'
import tujing from '@/img/tujing.png'
import {useQuery} from '@/react-query'
import {request} from "@/utils/request";
import {validated} from "@/utils/utils";
import {Image, Swiper, SwiperItem, Text, View} from '@tarojs/components'
import Taro from "@tarojs/taro";
import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import useEffectOnce from "react-use/lib/useEffectOnce";
import './index.less'

export default function () {
  console.log('index')

  const data = useSelector(state => state.order)
  const dispatch = useDispatch()

  return (
    <NavBar title='物流' viewBackGround='#F3F5F4'>
      <View className='index'>
        <Banner />
        <Notice />
        <Address />
        <Content />
        <Panel>
          <PanelItemInput title='备注' placeHolder='选填，请输入备注' value={data.remark}
            onChange={v => dispatch(setData({remark: v}))}
          />
        </Panel>
        <SendProduct />
      </View>
    </NavBar>
  )
}

function Notice() {
  return <Swiper className='notice_swiper'
    autoplay
    circular
    vertical
  >
    <SwiperItem>
      <View className='notice'>
        <Image src={gonggao} style={{width: '38rpx', height: '32rpx'}} />
        <Text>【物流】想要物流跨域搬家？这些额外收费要了解</Text>
      </View>
    </SwiperItem>
    <SwiperItem>
      <View className='notice'>
        <Image src={gonggao} style={{width: '38rpx', height: '32rpx'}} />
        <Text>【物流】想要物22222</Text>
      </View>
    </SwiperItem>
  </Swiper>
}

function Banner() {
  const {data: banner = {list: []}} = useQuery(BANNER_LIST, () => request(BANNER_LIST))

  return <Swiper
    className='swiper'
    circular
    autoplay
    previousMargin='20rpx'
    nextMargin='20rpx'
  >
    {banner.list.map(l => <SwiperItem>
      <View className='img_view'>
        <Image className='img'
          src={l.src}
        />
      </View>
    </SwiperItem>)}
  </Swiper>
}

function Address() {
  const data = useSelector(state => state.order)
  const dispatch = useDispatch()

  const [addressFrom = [], setAddressFrom] = useState()
  const [addressTo = [], setAddressTo] = useState()
  const [, getLocation] = useMapLocationSdk()

  useEffectOnce(() => {
    Taro.getStorage({key: 'addressFrom'}).then(res => {
      res && res.data && setAddressFrom(res.data)
    })
    Taro.getStorage({key: 'addressTo'}).then(res => res && res.data && setAddressTo(res.data))
  })

  function toAddressFrom() {
    Taro.eventCenter.on('setAddress', (d) => {
        addressFrom.push(d)
        setAddressFrom([...addressFrom])
        Taro.setStorageSync('addressFrom', addressFrom)
        dispatch(setData({addressFrom: d}))
      }
    )
    Taro.navigateTo({url: '/pages/address/index'})
  }

  function toAddressTo() {
    Taro.eventCenter.on('setAddress', (d) => {
        addressTo.push(d)
        setAddressTo([...addressTo])
        Taro.setStorageSync('addressTo', addressTo)
        dispatch(setData({addressTo: d}))
      }
    )
    Taro.navigateTo({url: '/pages/address/index'})
  }

  return <Panel>
    <PanelItemImgSelect headerImg={fahuo} headerImgWidth={44} headerImgHeight={44} tailImg={dizhipu} tailImgWidth={44}
      tailImgHeight={40} placeHolder='请填写发货地址' value={data.addressFrom?.location?.name}
      range={addressFrom.length ? addressFrom.map(a => a.location.name) : ['无']}
      onChange={e => addressFrom.length && dispatch(setData({addressFrom: addressFrom[e]}))}
      onClick={toAddressFrom}
    />
    {data.addressRoute?.map((a, i) => <PanelItemInput headerImg={tujing} headerImgWidth={14} headerImgHeight={14}
      disabled
      onInputClick={() => {
                                                        getLocation().then(res => {
                                                          data.addressRoute[i] = res
                                                          dispatch(setData({addressRoute: data.addressRoute}))
                                                        })
                                                      }}
      tailImg={tianjia}
      tailImgWidth={26}
      tailImgHeight={26} placeHolder='请填写途径地点'
      value={data.addressRoute[i].name}
      onClick={() => {
                                                        i === 0 ? data.addressRoute.push({}) : delete data.addressRoute[i]
                                                        dispatch(setData({addressRoute: data.addressRoute}))
                                                      }}
    />)}
    <PanelItemImgSelect headerImg={shouhuo} headerImgWidth={44} headerImgHeight={44} tailImg={dizhipu} tailImgWidth={44}
      tailImgHeight={40} placeHolder='请填写收货地址' value={data.addressTo?.location?.name}
      range={addressTo.length ? addressTo.map(a => a.location.name) : ['无']}
      onChange={e => addressTo.length && dispatch(setData({addressTo: addressTo[e]}))}
      onClick={toAddressTo}
    />
  </Panel>
}

function Content() {

  const {data: cars = {list: []}} = useQuery(CAR_LIST, () => request(CAR_LIST))
  const discharge = ['国四', '国五', '国六']
  const driverTop = ['接单高', '驾龄长', '信誉高']
  const data = useSelector(state => state.order)
  const dispatch = useDispatch()

  return <Panel>
    <PanelItemSelect title='车型' placeHolder='请选择车型' range={cars.list.map(c => c.title)}
      value={cars.list.find(c => c.id === data.carTypeId)?.title}
      onChange={v => {
                       dispatch(setData({carTypeId: cars.list[v].id}))
                       dispatch(setData({carTypeName: cars.list[v].title}))
                     }}
    />
    <PanelItemSelect title='排放' range={discharge} placeHolder='请选择排放'
      onChange={v => dispatch(setData({discharge: v * 1 + 1}))}
      value={data.discharge && discharge[data.discharge - 1]}
    />
    <PanelItemSelect title='发运时间' placeHolder='请选择时间' mode='date' onChange={(v, i) => {
      data.time || (data.time = ['', ''])
      data.time[i] = v
      dispatch(setData({time: data.time}))
    }}
      value={data.time}
    />
    <PanelItemTextArea title='货物描述' placeHolder='请输入货物描述，如重量体积，货物类型等' value={data.des}
      onChange={v => dispatch(setData({des: v}))}
    />
    <PanelItemMultipleSelect title='司机优先' range={driverTop} onChange={v => dispatch(setData({driverTop: v * 1 + 1}))}
      value={data.driverTop && driverTop[data.driverTop - 1]}
    />
  </Panel>
}

function SendProduct() {
  const data = useSelector(state => state.order)
  const dispatch = useDispatch()

  const rules = {
    addressFrom: {
      require: true,
      message: '请选择发货地址'
    }, addressTo: {
      require: true,
      message: '请选择收获地址'
    }, carTypeId: {
      require: true,
      message: '请选择车型'
    }, carTypeName: {
      require: true,
      message: '请选择车型'
    }, time: {
      require: true,
      message: '请选择车型'
    }
  }
  useMapDirectionSdkEffect({from: {
      latitude: data.addressFrom?.location?.latitude,
      longitude: data.addressFrom?.location?.longitude
    },
    to: {
      latitude: data.addressTo?.location?.latitude,
      longitude: data.addressTo?.location?.longitude
    },
    waypoints:data.addressRoute.map(r=>r.latitude&&r.longitude?`${r.latitude?.toString()},${r.longitude?.toString()}`:'').join(';')
  },(d)=>{
    if (d[0].distance / 1000 <= 15) {
      dispatch(setData({amount: 380}))
    } else if (d[0].distance / 1000 <= 50) {
      dispatch(setData({amount: parseInt(d[0].distance / 1000 * 7)}))
    } else {
      dispatch(setData({amount: parseInt(d[0].distance / 1000 * 5)}))
    }
  },[data.addressFrom, data.addressTo])

  function confirm() {
    if (!validated(rules, data)) return
    request(ORDER_SUBMIT, data).then(() => {
      Taro.switchTab({url: '/pages/order/index'})
    })
  }

  function handleShowPrice() {
    Taro.showModal({
      title: '计费规则', content: `
    基于订单里程，按照以下定价标准计算订单价格，若运输过程中产生高速路桥费，请客户与司机协商。\n
    起步价（15公里）          380元\n
    分段价（16-50公里）    7元/公里\n
    分段价（51公里以上）5-6元/公里\n
    `, showCancel: false
    })
  }

  return <View className='page_bottom'>
    <View className='left'>
      <View className='desc'>预计</View>
      <View className='price'>￥{data.amount || 0}</View>
    </View>
    <View className='right'>
      <View className='desc decoration' onClick={handleShowPrice}>费用规则说明</View>
      <View className='send_button' onClick={confirm}>
        <View className='text'>立即发货</View>
      </View>
    </View>
  </View>
}

