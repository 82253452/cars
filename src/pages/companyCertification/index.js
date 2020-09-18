import {COMPANY_CERT} from "@/api";
import ImageSelecter from '@/components/ImageSelecter'
import NavBar from "@/components/NavBar";
import Panel from '@/components/Panel'
import PanelItem from '@/components/PanelItem'
import {request} from "@/utils/request";
import {Button, Form, View} from "@tarojs/components";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {AtForm, AtIcon, AtInput} from "taro-ui";
import './index.less'

export default function () {

  const user = useSelector(state => state.user)

  const [data = {}, setData] = useState(user.company)

  async function handleSubmit(e) {
    await request(COMPANY_CERT, e[0].detail.value)
  }

  return <NavBar title='企业认证' back home viewBackGround='#fff'>
    <Form onSubmit={handleSubmit}>
      <View className='container'>
        <Panel padding={0}>
          <PanelItem icon='bullet-list'>
            <AtInput name='name' value={data.name} placeholder='企业名称' />
          </PanelItem>
          <PanelItem icon='bullet-list'>
            <AtInput name='legalPerson' value={data.legalPerson} placeholder='企业法人' />
          </PanelItem>
          <PanelItem icon='bullet-list'>
            <AtInput name='legalPhone' value={data.legalPhone} placeholder='法人联系方式' />
          </PanelItem>
        </Panel>

        <Panel space={10} padding={0}>
          <PanelItem title='营业执照'>
            <View className='image-list'>
              <ImageSelecter value={data.img} width={100} height={100} onChange={(e) => data.img = e}>
                <View className='up-img'>
                  <AtIcon value='upload' color='#f5f5f5' />
                </View>
              </ImageSelecter>
            </View>
          </PanelItem>
        </Panel>

        <Panel space={10} padding={0}>
          <PanelItem title='组织机构代码证'>
            <View className='image-list'>
              <ImageSelecter value={data.img} width={200} height={200}>
                <View className='up-img'>
                  <AtIcon value='upload' color='#f5f5f5' />
                </View>
              </ImageSelecter>
            </View>
          </PanelItem>
        </Panel>

        <Panel space={10} padding={0}>
          <PanelItem icon='bullet-list'>
            <AtInput name='address' value={data.name} placeholder='公司地址' />
          </PanelItem>
          <PanelItem icon='bullet-list'>
            <AtInput name='contactsPerson' value={data.name} placeholder='企业负责人' />
          </PanelItem>
          <PanelItem icon='bullet-list'>
            <AtInput name='contactsPhone' value={data.name} placeholder='负责人联系方式' />
          </PanelItem>
          <PanelItem icon='bullet-list'>
            <AtInput name='email' value={data.name} placeholder='邮箱地址' />
          </PanelItem>
        </Panel>
        <View className='button'>
          <Button className='submit' formType='submit'>
            提交
          </Button>
        </View>
      </View>
    </Form>
  </NavBar>

}

