import {useMapLocationSdk} from "@/common/useMapLocationSdk";
import NavBar from "@/components/NavBar";
import Panel from '@/components/Panel'
import PanelItemLineInput from '@/components/PanelItemLineInput'
import {validated} from "@/utils/utils";
import {Image, Map, Text, View} from '@tarojs/components'
import Taro from "@tarojs/taro";
import React, {useEffect, useMemo, useState} from 'react'
import {useSelector} from "react-redux";
import gengduoju from "@/img/gengduoju.png";
import './index.less'

export default function () {
  console.log('address')

  const {currentLocation: myAddress = {}} = useSelector(state => state.user)
  const [data, setData] = useState({})
  const [location, getLocation] = useMapLocationSdk()

  const rules = {
    name: {
      require: true,
      message: '请填写姓名'
    },
    phone: {
      require: true,
      message: '请填写手机号码'
    },
  }

  const active = useMemo(() => {
    return location && data.name && data.phone && data.address
  }, [data.address, data.name, data.phone, location])

  useEffect(() => {
    return () => {
      Taro.eventCenter.off("setAddress")
    }
  }, [])


  function handleFinash() {
    if (!active) return;
    if (!validated(rules, data)) return
    if (!validated({name: {require: true, message: '请输入公司名称'},}, location)) return

    Taro.eventCenter.trigger("setAddress", {location, user: data})
    Taro.navigateBack()
  }

  return (
    <NavBar title='地址选择' viewBackGround='#F3F5F4' back home>
      <View className='index'>
        <Map className='map' scale={12}
          latitude={myAddress.latitude - 0.05}
          longitude={myAddress.longitude}
          markers={[{
               ...myAddress, label: {
                 content: '我的位置'
               }
             }]}
        />
        <View className='form'>
          {location ? <Panel>
            <View className='address_view'>
              <View className='address'>
                <View className='title'>
                  <Text>{location.name}</Text>
                </View>
                <View className='desc'>
                  <Text>{location.address}</Text>
                </View>
              </View>
              <View className='button' onClick={getLocation}>
                <Text>修改地址</Text>
              </View>
            </View>
          </Panel> : <View />}
          <Panel>
            {location ? <View /> : <View className='select_address' onClick={getLocation}>
              <Text>选择地址</Text>
              <Image src={gengduoju} style={{width: `12rpx`, height: `22rpx`, marginLeft: '10rpx'}} />
            </View>}
            <PanelItemLineInput title='姓名' placeHolder='请填写姓名' value={data.name}
              onChange={v => setData({...data, name: v})}
            />
            <PanelItemLineInput type='number' title='手机号' placeHolder='请填写手机号码' value={data.phone}
              onChange={v => setData({...data, phone: v})}
            />
            <PanelItemLineInput title='门牌号' placeHolder='详细地址，例1层101室' value={data.address}
              onChange={v => setData({...data, address: v})}
            />
            <View className={`confirm ${active ? 'confirm_active' : ''}`} onClick={handleFinash}>
              <Text>完成</Text>
            </View>
          </Panel>
        </View>
      </View>
    </NavBar>
  )
}

