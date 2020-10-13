import NavBar from "@/components/NavBar";
import Panel from '@/components/Panel'
import PanelItemLineInput from '@/components/PanelItemLineInput'
import {WX_KEY} from "@/utils/Const";
import {Map, Text, View} from '@tarojs/components'
import Taro from "@tarojs/taro";
import React, {useEffect, useMemo, useRef, useState} from 'react'
import {useSelector} from "react-redux";
import './index.less'

// eslint-disable-next-line import/no-commonjs
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

export default function () {
  console.log('address')

  const {myAddress} = useSelector(state => state.order)

  const [data, setData] = useState({})

  const [location, setloction] = useState()

  const active = useMemo(() => {
    return location && data.name && data.phone && data.address
  }, [data.address, data.name, data.phone, location])

  const qqMapSdkRef = useRef()

  useEffect(() => {
    qqMapSdkRef.current = new QQMapWX({
      key: WX_KEY
    });
    console.log(qqMapSdkRef.current)
    return () => {
      Taro.eventCenter.off("setAddress")
    }
  }, [])


  function selectAddress() {
    Taro.chooseLocation().then(res => {
      qqMapSdkRef.current.reverseGeocoder({
        location: {
          latitude: res.latitude,
          longitude: res.longitude
        },
        success: r=> {
          console.log(r)
          res.info=r.result.ad_info
          setloction(res)
        },
      });
    })
  }

  function handleFinash() {
    if (!active) return;
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
              <View className='button' onClick={selectAddress}>
                <Text>修改地址</Text>
              </View>
            </View>
          </Panel> : <View />}
          <Panel>
            {location ? <View /> : <View className='select_address' onClick={selectAddress}>
              <Text>选择地址</Text>
            </View>}
            <PanelItemLineInput title='姓名' placeHolder='请填写发货人的姓名' value={data.name}
              onChange={v => setData({...data, name: v})}
            />
            <PanelItemLineInput type='number' title='手机号' placeHolder='请填写发货人手机号码' value={data.phone}
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

