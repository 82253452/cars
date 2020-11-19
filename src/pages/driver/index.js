import {CAR_LIST, COMPANY_CERT, DRIVER_CERT} from "@/api";
import NavBar from "@/components/NavBar";
import Panel from '@/components/Panel'
import PanelItemImage from '@/components/PanelItemImage'
import PanelItemInputNew from '@/components/PanelItemInputNew'
import PanelItemSelect from "@/components/PanelItemSelect";
import {useQuery} from "@/react-query/react";
import {request} from "@/utils/request";
import {validated} from "@/utils/utils";
import {View} from "@tarojs/components";
import Taro from '@tarojs/taro'
import React, {useState} from "react";
import {useSelector} from "react-redux";

import './index.less'

export default function () {

  const user = useSelector(state => state.user)
    const {data: cars = {list: []}} = useQuery(CAR_LIST, () => request(CAR_LIST))
  const [data, setData] = useState(user.driver || {})
  const rules = {
    name: {
      require: true,
      message: '请输入姓名'
    },
    phone: {
      require: true,
      message: '请输入手机号'
    },
    carNumber: {
      require: true,
      message: '请输入车牌号'
    },
    drivingExperience: {
      require: true,
      message: '请输入驾龄'
    },
    carModel: {
      require: true,
      message: '请选择车型'
    },
    userImg: {
      require: true,
      message: '请上传本人照片'
    },
    carImg: {
      require: true,
      message: '请上传汽车照片'
    },
    driversLicense: {
      require: true,
      message: '请上传驾驶本照片'
    },
    drivingLicense: {
      require: true,
      message: '请上传行驶本照片'
    }
  }
  async function handleSubmit() {
    if (validated(rules, data)) {
      await request(DRIVER_CERT, data)
      await Taro.navigateBack()
    }
  }

  return <NavBar title='司机认证' back home viewBackGround='#fff'>
      <View className='container_driver'>
        <Panel style={{borderRadius:0,width:'100%',paddingBottom:'30rpx'}}>
          <PanelItemInputNew title='姓名' value={data.name} placeholder='请输入姓名' onChange={e=>setData({...data,name:e})} />
          <PanelItemInputNew title='手机号' type='number' value={data.phone} placeholder='请输入手机号' onChange={e=>setData({...data,phone:e})} />
          <PanelItemInputNew title='车牌号' value={data.carNumber} placeholder='请输入车牌号' onChange={e=>setData({...data,carNumber:e})} />
          <PanelItemInputNew title='驾龄' type='number' value={data.drivingExperience} placeholder='请输入驾龄' onChange={e=>setData({...data,drivingExperience:e})} />
          <PanelItemInputNew title='物流公司代码' value={data.transCode} placeholder='请输入物流公司代码' onChange={e=>setData({...data,transCode:e})} />
          <PanelItemSelect title='车型' placeHolder='请选择车型' range={cars.list.map(c => c.title)}
            value={cars.list.find(c => c.id === data.carModel)?.title}
            onChange={v => setData({...data,carModel:cars.list[v].id})}
          />
        </Panel>

        <Panel style={{borderRadius:0,width:'100%'}}>
          <PanelItemImage title='本人照片' desc='正面照清晰无遮挡' value={data.userImg} onChange={e=>setData({...data,userImg:e})} />
          <PanelItemImage title='汽车照片' desc='正面照清晰无遮挡' value={data.carImg} onChange={e=>setData({...data,carImg:e})} />
          <PanelItemImage title='驾驶本' desc='正面照清晰无遮挡' value={data.driversLicense} onChange={e=>setData({...data,driversLicense:e})} />
          <PanelItemImage title='行驶本' desc='正面照清晰无遮挡' value={data.drivingLicense} onChange={e=>setData({...data,drivingLicense:e})} />
        </Panel>

        <View className='button' onClick={handleSubmit}>
          提交
        </View>
      </View>
  </NavBar>
}



