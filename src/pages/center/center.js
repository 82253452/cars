import NavBar from "@/components/NavBar";
import Panel from '@/components/Panel'
import PanelItem from '@/components/PanelItem'
import {Button, Image, Text, View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import React from "react";
import {useSelector} from "react-redux";
import avatar from '../../img/logo.png'
import './center.less'

export default function () {
  console.log('center')

  const user = useSelector(state => state.user)

  function userAuth() {
    Taro.navigateTo({url: '/pages/authorize/index'})
  }

  function makeCall() {
    Taro.makePhoneCall({phoneNumber: '15901320019'})
  }

  function toServiceLocation() {
    Taro.navigateTo({url: '/pages/serviceLocation/index'})
  }

  return <NavBar title='个人中心' viewBackGround='#f5f5f5'>
    <View className='container'>
      <View className='user-info'>
        <View className='info' onClick={userAuth}>
          <Image className='avatar' src={user.avatarurl || avatar} />
          <Text className='nick_name'>{user.nickname || '登录'}</Text>
        </View>
        <View className='circle'>
          <Text className='title'>信誉</Text>
          <Text className='number'>100</Text>
        </View>
      </View>

      <Panel>
        <PanelItem icon='credit-card'>
          <Text>{`￥${user.amount || 0}`}</Text>
        </PanelItem>
        <PanelItem icon='home'>
          <Text>{`地址 ${user.country || ''} ${user.province || ''} ${user.city || ''}`}</Text>
        </PanelItem>
        <PanelItem icon='phone'>
          <Text>15901320019</Text>
        </PanelItem>
      </Panel>

      <Panel space={10}>
        <PanelItem icon='help'>
          <Button openType='feedback' className='content'>
            问题反馈
          </Button>
        </PanelItem>
        <PanelItem icon='phone' onClick={makeCall}>
          <Text>致电客服</Text>
        </PanelItem>
        <PanelItem icon='map-pin' onClick={toServiceLocation}>
          <Text>服务网点</Text>
        </PanelItem>
      </Panel>

      <Panel space={10}>
        <PanelItem icon='settings'>
          <Text>设置</Text>
        </PanelItem>
      </Panel>

    </View>
  </NavBar>

}

