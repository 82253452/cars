import {PRODUCT_Detail} from "@/api";
import Panel from "@/components/Panel";
import chenggong from '@/img/chenggong.png'
import dingwei from "@/img/dingwei.png";
import backIcon from "@/img/fanhui.png";
import gengduo from "@/img/gengduo.png";
import {useQuery} from "@/react-query/react";
import {BOTTOM_GAP} from "@/utils/Const";
import {request} from "@/utils/request";
import {Image, Text, View} from '@tarojs/components'
import {usePullDownRefresh, useRouter} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React from 'react'
import {useDispatch, useSelector} from "react-redux";

import './index.less'

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


  return (<View className='container'>
      <Header />
      <Address />
      <Product />
      <Button />
    </View>
  )
}

function Product() {
  return <View>
    <Panel padding={20}>
      <View className='product_info'>
        <View>
          <Image className='img'
            src='https://kan-jian.oss-cn-beijing.aliyuncs.com/topic/20200708/20200708155048_wahe.44.00.png'
          />
        </View>
        <View className='details'>
          <Text className='name'>华为 HUAWEI Mate 30 麒麟旗舰990旗舰芯片</Text>
          <View className='detail'>
            <Text>数量：1</Text>
            <Text>属性：白色框</Text>
          </View>
          <View className='price'>2888积分</View>
        </View>
      </View>
    </Panel>
    <Panel padding={20}>
      <View className='order_detail'>
        <View className='title'>订单信息</View>
        <View className='desc'>
          <Text>收货人姓名：</Text>
          <Text>张三</Text>
        </View>
        <View className='desc'>
          <Text>收货人电话：</Text>
          <Text>18324558799</Text>
        </View>
        <View className='desc'>
          <Text>订单备注：</Text>
          <Text>白色框（120宽黑皮）+抱枕</Text>
        </View>
      </View>
    </Panel>
  </View>
}

function Button() {
  return <View className='buttons'>
    <View>
      <Text className='desc'>积分</Text>
      <Text className='price'>-2888</Text>
    </View>
    <View>
      <View className='button'>
        申诉
      </View>
    </View>
  </View>
}

function Header() {

  const {boundingClientRect} = useSelector(state => state.theme)
  const {bottom, right, width, height} = boundingClientRect

  function _back() {
    Taro.navigateBack()
  }

  return <View className='header'>
    <View className='nav-con' style={{height: `${bottom + BOTTOM_GAP}px`}}>
      <View className='nav' style={{height: `${height + BOTTOM_GAP}px`}}>
        <View className={`'icon'}`}
          style={{width: `${width}px`, marginLeft: `calc(100% - ${right}px)`, height: `${height}px`}}
        >
          <View className='button' onClick={_back}><Image style={{width: '17rpx', height: '29rpx'}}
            src={backIcon}
          /></View>
        </View>
        <View className='title' style={{width: `${right - width * 2}px`, height: `${height}px`}}>
          <Text>订单详情</Text>
        </View>
      </View>
    </View>
    <View className='desc'>
      <Image src={chenggong} style={{width: '46rpx', height: '46rpx'}} />
      <Text>兑换成功</Text>
    </View>
  </View>
}

function Address() {
  return <View>
    <Panel style={{marginTop: '-70rpx'}}>
      <View className='address_content'>
        <Image src={dingwei} style={{width: '42rpx', height: '52rpx'}} />
        <View className='center'>
          <View>
            <Text className='name'>Sofie Hubert</Text>
            <Text className='phone'>188****3498</Text>
          </View>
          <View className='address'>
            北京市朝阳区四惠桥南侧甲1号伊莎文…
          </View>
        </View>
        <Image src={gengduo} style={{width: `12rpx`, height: `22rpx`, marginLeft: '10rpx'}} /></View>
    </Panel>
  </View>
}
