import Panel from '@/components/Panel'
import bangzhu from '@/img/bangzhu.png'
import dingdan2 from '@/img/dingdan2.png'
import dizhibo from '@/img/dizhibo.png'
import jiage from '@/img/jiage.png'
import jianyi from '@/img/jianyi.png'
import kefu from '@/img/kefu.png'
import avatar from '@/img/agerenzhongxin.png'
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
            <Text>信誉:{user.creditScore} 积分:{user.integral}</Text>
          </View>
        </View>
      </View>
    </View>
    <Header />
    <Items />
  </View>
}

function Header() {
  return <Panel style={{marginTop:'-45rpx',padding:'40rpx 0'}}>
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
  const user = useSelector(state => state.user)
  const isCompanyAuth = user.company && user.company.status===2
  const isDriverAuth = user.driver && user.driver.status===2
  function toCompany() {
    isCompanyAuth || Taro.navigateTo({url: '/pages/companyCertification/index'})
  }
  function makeCall() {
    Taro.makePhoneCall({phoneNumber: '15901320019'})
  }
  function toDriver(){
    isDriverAuth || Taro.navigateTo({url: '/pages/driver/index'})
  }
  return <Panel style={{borderRadius:'0',padding:'30rpx 0 0 0',width:'100%'}}>
    <View className='items_list'>
      <View className='header'>
        <View className='line' />
        <View className='text'>其他功能</View>
      </View>
      <View className='item'>
        <View className='block border_bottom' onClick={toCompany}>
          <Image src={qiyerenzheng} style={{width: '45rpx', height: '45rpx'}} />
          <View className='block_r'>
            <View className='button'>{isCompanyAuth?'已认证':'企业认证'}</View>
            <View className='desc'>一点多票每票减40</View>
          </View>
        </View>
        <View className='block border_bottom' onClick={toDriver}>
          <Image src={sijirenzheng} style={{width: '45rpx', height: '45rpx'}} />
          <View className='block_r'>
            <View className='button yellow'>{isDriverAuth?'已认证':'司机认证'}</View>
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
          <Button  openType='share' className='content block_button'>
            邀请有奖
          </Button>
        </View>
      </View>
    </View>
  </Panel>
}
