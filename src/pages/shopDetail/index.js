import {PRODUCT_Detail} from "@/api";
import useForm from "@/common/useForm";
import useFormItem from "@/common/useFormItem";
import NavBar from "@/components/NavBar";
import Panel from '@/components/Panel'
import PanelItem from "@/components/PanelItem";
import dizhipu from "@/img/dizhipu.png";
import fahuo from "@/img/fahuo.png";
import jia from "@/img/jia (1).png";
import jian from "@/img/jian.png";
import zhedie from "@/img/zhedie.png";
import {useQuery} from "@/react-query/react";
import {request} from "@/utils/request";
import {Image, Input, Picker, Swiper, SwiperItem, Text, View} from '@tarojs/components'
import {usePullDownRefresh, useRouter} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";

import './index.less'
import useEffectOnce from "react-use/lib/useEffectOnce";

export default function () {

  console.log('shopDetail')

  const {params} = useRouter()
  const id = parseInt(params.id)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const {data = {}, refetch} = useQuery([PRODUCT_Detail, id], () => request(PRODUCT_Detail, {id}))


  usePullDownRefresh(async () => {
    await refetch()
    Taro.stopPullDownRefresh()
  })
  const {Form,meta:{isValid},handleSubmit} = useForm()

  function handleButton(id) {
    // Taro.showModal({title: '确定兑换商品?'}).then(({confirm}) => {
    //   confirm && request(PRODUCT_ORDER_SUBMIT, {id}).then(() => {
    //     Taro.showToast({title: '兑换成功', icon: 'none'})
    //   })
    // })
  }

  return (
    <NavBar back home title='商品详情' viewBackGround='#F3F5F4'>
      <View className='container'>
        <Form>
          <Banner list={data.img?.split(',')} />
          <View className='detail'>
            <View className='name'>{data.name}</View>
            <View className='detail_c'>
              <Text className='price'>{data.price}积分</Text>
              <Text className='num'>剩余{data.num}件</Text>
            </View>
          </View>
          <Detail content={data.detail} />
          <Buttons isValid={isValid} handleSubmit={handleSubmit} price={data.price} />
        </Form>
      </View>
    </NavBar>
  )
}

function Banner({list = []}) {
  return <Swiper
    className='swiper'
    autoplay
  >
    {list.map(l => <SwiperItem>
      <View className='img_view'>
        <Image src={l} />
      </View>
    </SwiperItem>)}
  </Swiper>
}

function Detail({content}) {
  return <View className='block'>
    <View className='title'>商品详情</View>
    <View className='content'>{content}</View>
  </View>
}


const productAttribute = ['接单高', '驾龄长', '信誉高']

function Buttons({price = 0,isValid,handleSubmit}) {
  const panelRef = useRef()
  const [droggle,setDroggle] = useState(false)
  const text = useMemo(()=>droggle?'确定':'立即兑换',[droggle])

  const addressProps = useFormItem('address', {
    required: true,
    error: '请选择地址',
    placeholder: '请选择地址',
  })
  const phoneProps = useFormItem('phone', {
    required: true,
    error: '请输入手机号',
    placeholder: '请输入手机号',
    placeholderClass: 'placeholder',
  })
  const remarkProps = useFormItem('remark', {
    required: true,
    error: '请输入备注',
    placeholder: '请输入备注', placeholderClass: 'placeholder'
  })
  const attributeProps = useFormItem('attribute')
  const numProps = useFormItem('num')


  function submit() {
    if(!droggle){
      panelRef.current.openPanel()
    }else{
      handleSubmit().then(d=>{
        console.log(d)
      }).catch(err=>{
        console.log(err)
      })
      console.log(isValid)
    }
  }

  return <View className='fix_block'>
    <Panel ref={panelRef} animationShowHidden='zoomOutDownNone' animation show={false} callBack={(d)=>setDroggle(d)}>
      <Close panelRef={panelRef} />
      <FormItemAddressSelect  {...addressProps} cacheKey='product_address' />
      <FormNumtItem title='数量' {...numProps} />
      <FormInputItem title='手机号' {...phoneProps} />
      <FormMultipleSelect title='属性' {...attributeProps} />
      <FormInputItem title='备注' {...remarkProps} />
    </Panel>
    <View className='bottom'>
      <View className='price'>积分<Text>{price}</Text></View>
      <View className='button' onClick={submit}>
        {text}
      </View>
    </View>
  </View>
}

function FormItemAddressSelect({style, value, placeholder, onBlur,cacheKey}) {
  const [address = [], setAddress] = useState()
  useEffectOnce(() => {
    Taro.getStorage({key:cacheKey}).then(res => {
      res && res.data && setAddress(res.data)
    })
  })
  function toAddress() {
    Taro.eventCenter.on('setAddress', (d) => {
        address.push(d)
        setAddress([...address])
        Taro.setStorageSync(cacheKey, address)
      }
    )
    Taro.navigateTo({url: '/pages/address/index'})
  }
  return <PanelItem style={{marginLeft: '20rpx'}}>
    <View className='form-item-address-container' style={style}>
      <View style={{width: `44rpx`, height: `44rpx`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Image src={fahuo} style={{width: `${44}rpx`, height: `${44}rpx`}} />
      </View>
      <View className='border-view'>
        <Picker className='picker' mode='selector' range={address.length ? address.map(a => a.location.name) : ['无']}
          onChange={event => address.length&&onBlur({target:{value:address[event.detail.value]}})}
        >
          <Text
            className={value ? 'text' : 'placeHolder'}
          >{value?.location?.name || placeholder}</Text>
        </Picker>
        <View onClick={toAddress} style={{
          width: `44rpx`,
          height: `44rpx`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        ><Image src={dizhipu}
          style={{width: `${44}rpx`, height: `${40}rpx`}}
        /></View>
      </View>
    </View>
  </PanelItem>
}


function Close({panelRef}) {
  function drogglePanel() {
    panelRef.current.closePanel()
  }

  return <View
    style={{width: '100%', display: 'flex', justifyContent: "center", alignItems: 'center', padding: '10px 0 10rpx 0'}}
    onClick={drogglePanel}
  >
    <Image src={zhedie} style={{width: '96rpx  ', height: '8rpx'}} />
  </View>
}

function FormInputItem({title, ...ext}) {
  return <PanelItem style={{marginLeft: '20rpx'}}>
    <View className='title'>{title}</View>
    <Input className='input' {...ext} />
  </PanelItem>
}

function FormNumtItem({title, value = 1, onBlur}) {
  function handleChange(i) {
    onBlur && onBlur({target: {value: value + i}})
  }

  return <PanelItem style={{marginLeft: '20rpx'}}>
    <View className='title'>{title}</View>
    <View className='form_num_buttons'>
      <Image src={jian} style={{width: '52rpx', height: '52rpx', marginRight: '30rpx'}}
        onClick={() => handleChange(-1)}
      />
      <View>{value}</View>
      <Image src={jia} style={{width: '52rpx', height: '52rpx', marginLeft: '30rpx'}} onClick={() => handleChange(1)} />
    </View>
  </PanelItem>
}

function FormMultipleSelect({title, value, onBlur}) {
  return <PanelItem style={{marginLeft: '20rpx', paddingRight: '20rpx'}}>
    <View className='title'>{title}</View>
    <View className='form_buttons'>
      {productAttribute.map((r, i) => <View onClick={() => {
        onBlur({target: {value: i}})
      }} className={`button ${value === i ? 'button_active' : ''}`}
      >
        <Text>{r}</Text>
      </View>)}
    </View>
  </PanelItem>
}
