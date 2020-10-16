import Panel from '@/components/Panel'
import bangzhu from '@/img/bangzhu.png'
import dingdan2 from '@/img/dingdan2.png'
import dizhibo from '@/img/dizhibo.png'
import jiage from '@/img/jiage.png'
import jianyi from '@/img/jianyi.png'
import kefu from '@/img/kefu.png'
import avatar from '@/img/logo.png'
import qianbao from '@/img/qianbao.png'
import qiyerenzheng from '@/img/qiyerenzheng.png'
import sijirenzheng from '@/img/sijirenzheng.png'
import weijinpin from '@/img/weijinpin.png'
import xinyu from '@/img/xinyu.png'

import {BOTTOM_GAP} from "@/utils/Const";
import {Button, Image, Text, View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import React from "react";
import {useSelector} from "react-redux";
import './center.less'

export default function () {
  console.log('center')

  const {boundingClientRect} = useSelector(state => state.theme)
  const {bottom, right, width, height} = boundingClientRect
  const user = useSelector(state => state.user)

  function userAuth() {
    Taro.navigateTo({url: '/pages/authorize/index'})
  }

  return <View className='container'>
    <View className='user-info' style={{paddingTop: `${bottom + BOTTOM_GAP}px`}}>
      <View className='info' onClick={userAuth}>
        <Image className='avatar' src={user.avatarurl || avatar} />
        <View className='user'>
          <Text className='nick_name'>{user.nickname || '登录'}</Text>
          <View className='integral'>
            <Image src={xinyu} style={{width: '26rpx', height: '34rpx'}} />
            <Text>信誉积分：100</Text>
          </View>
        </View>
      </View>
    </View>
    <Header />
    <Items />
  </View>
}

function Header() {
  return <Panel marginTop={-45}>
    <View className='header_nav'>
      <View className='item'>
        <Image src={dingdan2} style={{width: '76rpx', height: '82rpx'}} />
        <Text>全部订单</Text>
      </View>
      <View className='item'>
        <Image src={dizhibo} style={{width: '76rpx', height: '82rpx'}} />
        <Text>地址薄</Text>
      </View>
      <View className='item'>
        <Image src={qianbao} style={{width: '76rpx', height: '82rpx'}} />
        <Text>钱包</Text>
      </View>
    </View>
  </Panel>
}
function Items() {
  function toCompany() {
    Taro.navigateTo({url: '/pages/companyCertification/index'})
  }
  function makeCall() {
    Taro.makePhoneCall({phoneNumber: '15901320019'})
  }
  return <Panel space={0} borderRadius={0}>
    <View className='items_list'>
      <View className='header'>
        <View className='line' />
        <View className='text'>其他功能</View>
      </View>
      <View className='item'>
        <View className='block border_bottom' onClick={toCompany}>
          <Image src={qiyerenzheng} style={{width: '45rpx', height: '45rpx'}} />
          <View className='block_r'>
            <View className='button'>企业认证</View>
            <View className='desc'>一点多票每票减40</View>
          </View>
        </View>
        <View className='block border_bottom'>
          <Image src={sijirenzheng} style={{width: '45rpx', height: '45rpx'}} />
          <View className='block_r'>
            <View className='button yellow'>司机认证</View>
            <View className='desc'>实时货物行程信息</View>
          </View>
        </View>
        <View className='block border_bottom'>
          <Image src={jiage} style={{width: '45rpx', height: '45rpx'}} />
          <View className='block_r'>
            <View className='title'>价格查询</View>
            <View className='desc'>每公斤3毛3起</View>
          </View>
        </View>
        <View className='block border_bottom'>
          <Image src={weijinpin} style={{width: '45rpx', height: '45rpx'}} />
          <View className='block_r'>
            <View className='title'>违禁品查询</View>
            <View className='desc'>违禁拒收特殊规范</View>
          </View>
        </View>
        <View className='block border_bottom'>
          <Image src={bangzhu} style={{width: '45rpx', height: '45rpx'}} />
          <View className='block_r'>
            <View className='title'>帮助中心</View>
            <View className='desc'>常见问题快速解决</View>
          </View>
        </View>
        <Button  openType='feedback' className='block border_bottom content'>
          <Image src={jianyi} style={{width: '45rpx', height: '45rpx'}} />
          <View className='block_r'>
            <Text className='title' style={{lineHeight:'38rpx'}}>建议反馈</Text>
            <Text className='desc' style={{lineHeight:'38rpx'}}>服务建议反馈</Text>
          </View>
        </Button>
        <View className='block' onClick={makeCall}>
          <Image src={kefu} style={{width: '45rpx', height: '45rpx'}} />
          <View className='block_r'>
            <View className='title'>客服</View>
            <View className='desc'>服务时间8点-21点</View>
          </View>
        </View>
        <View className='block center'>
          <View className='block_button'>
            邀请有奖
          </View>
        </View>
      </View>
    </View>
  </Panel>
}
