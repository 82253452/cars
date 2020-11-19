import {COMPANY_CERT} from "@/api";
import NavBar from "@/components/NavBar";
import Panel from '@/components/Panel'
import PanelItemImage from "@/components/PanelItemImage";
import PanelItemInputNew from "@/components/PanelItemInputNew";
import {request} from "@/utils/request";
import {validated} from "@/utils/utils";
import {View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import './index.less'

export default function () {

  const user = useSelector(state => state.user)

  const [data, setData] = useState(user.company || {})

  const rules = {
    name: {
      require: true,
      message: '请输入公司名称'
    },
    legalPerson: {
      require: true,
      message: '请输入法人'
    },
    legalPhone: {
      require: true,
      message: '请输入法人联系方式'
    },
    contactsPhone: {
      require: true,
      message: '请输入负责人联系方式'
    },
    contactsPerson: {
      require: true,
      message: '请输入负责人'
    },
    address: {
      require: true,
      message: '请输入地址'
    },
    businessLicense: {
      require: true,
      message: '请选择营业执照'
    },
    organizationCodeCertificate: {
      require: true,
      message: '请选择组织代码证书'
    }
  }

  async function handleSubmit() {
    if (validated(rules, data)) {
      await request(COMPANY_CERT, data)
      await Taro.navigateBack()
    }
  }

  return <NavBar title='企业认证' back home viewBackGround='#fff'>
    <View className='container'>
      <Panel style={{borderRadius: 0, width: '100%'}}>
        <PanelItemInputNew title='公司名称' value={data.name} placeholder='请输入公司名称'
          onChange={e => setData({...data, name: e})}
        />
        <PanelItemInputNew title='法人' value={data.legalPerson} placeholder='请输入法人'
          onChange={e => setData({...data, legalPerson: e})}
        />
        <PanelItemInputNew title='法人联系方式' value={data.legalPhone} placeholder='请输入法人联系方式'
          onChange={e => setData({...data, legalPhone: e})}
        />
        <PanelItemInputNew title='负责人' value={data.contactsPerson} placeholder='请输入负责人'
          onChange={e => setData({...data, contactsPerson: e})}
        />
        <PanelItemInputNew title='负责人联系方式' value={data.contactsPhone} placeholder='请输入负责人联系方式'
          onChange={e => setData({...data, contactsPhone: e})}
        />
        <PanelItemInputNew title='地址' value={data.address} placeholder='请输入地址'
          onChange={e => setData({...data, address: e})}
        />
        <PanelItemInputNew title='邮箱' value={data.email} placeholder='请输入邮箱'
          onChange={e => setData({...data, email: e})}
        />
      </Panel>

      <Panel style={{borderRadius: 0, width: '100%'}}>
        <PanelItemImage title='营业执照' desc='正面照清晰无遮挡' value={data.businessLicense}
          onChange={e => setData({...data, businessLicense: e})}
        />
        <PanelItemImage title='组织代码证书' desc='正面照清晰无遮挡' value={data.organizationCodeCertificate}
          onChange={e => setData({...data, organizationCodeCertificate: e})}
        />
      </Panel>

      <View className='button' onClick={handleSubmit}>
        提交
      </View>
    </View>
  </NavBar>

}

