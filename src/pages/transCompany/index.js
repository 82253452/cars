import {TRANS_COMPANY_ATTACH, TRANS_COMPANY_PAGE} from "@/api";
import NavBar from "@/components/NavBar";
import {useInfiniteQuery} from "@/react-query/react";
import {request} from "@/utils/request";
import {Image, Text, View} from "@tarojs/components";
import {usePullDownRefresh, useReachBottom} from "@tarojs/runtime";
import Taro from "@tarojs/taro";
import React from "react";
import {useSelector} from "react-redux";
import './index.less'

export default function () {

  const user = useSelector(state => state.user)

  console.log(user)

  function fetchProjects(key, page = 1) {
    return request(TRANS_COMPANY_PAGE, {page: page})
  }

  const {data = [], fetchMore, canFetchMore, refetch} = useInfiniteQuery(TRANS_COMPANY_PAGE, fetchProjects, {
    getFetchMore: lastGroup => lastGroup.nextPage
  })

  useReachBottom(async () => {
    canFetchMore && await fetchMore()
  })

  usePullDownRefresh(async () => {
    await refetch()
    Taro.stopPullDownRefresh()
  })

  function handlAttach(e) {
    if (e.status === 0) {
      return
    }
    request(TRANS_COMPANY_ATTACH, {transId: e.id}).then(async () => {
      await Taro.showToast({
        title: '申请成功',
        icon: 'none'
      })
      refetch()
    })
  }

  return <NavBar title='物流公司' back home>
    <View className='container'>
      {data.map(d => d.list.map(l => <View className='item'>
        <Image className='img' src='http://img.zhihuizhan.net/Fp2ZUDI8Pchr-y_h7g8QKZt6LoeN' />
        <View className='info'>
          <Text className='title'>{l.name}</Text>
          <Text className='desc'>{l.address}</Text>
        </View>
        <View className='button' onClick={() => handlAttach(l)}>
          <Text>{{null: '加入', 0: '审核中', 2: '未通过'}[l.status] || ''}</Text>
        </View>
      </View>))}
    </View>
  </NavBar>

}

