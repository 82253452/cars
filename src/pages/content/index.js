import {INDEX_MESSAGE_DETAIL} from "@/api";
import NavBar from "@/components/NavBar";
import {useQuery} from "@/react-query/react";
import {request} from "@/utils/request";
import {View} from "@tarojs/components";
import {useRouter} from "@tarojs/runtime";
import '@tarojs/taro/html.css'
import React from "react";

export default function () {
  const {params} = useRouter()
  const paramsId = parseInt(params.id)
  const {data = {}} = useQuery([INDEX_MESSAGE_DETAIL, paramsId], () => request(INDEX_MESSAGE_DETAIL, {id: paramsId}))
  return <NavBar back home title='详情' viewBackGround='#fff'>
    <View className='taro_html' style={{width: '100%', minHeight: '500rpx'}}
      dangerouslySetInnerHTML={{__html: data.content}}
    />
  </NavBar>
}
