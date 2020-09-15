import {setPhone, setUser} from "@/actions/user";
import {LOGIN, PHONE_INFO} from "@/api";
import {APP_ID} from "@/utils/Const";
import {request} from "@/utils/request";
import Taro from "@tarojs/taro";
import {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";

export function useLoginCode() {

  const interval = useRef()
  const [code, setCode] = useState()

  useEffect(async () => {
    const r = await Taro.login()
    setCode(r.code)
    interval.current = setInterval(async () => {
      const res = await Taro.login()
      setCode(res.code)
    }, 1000 * 60 * 4)
    return clearInterval(interval.current)
  }, [])

  return code

}

export function useGetUserInfo() {

  const code = useLoginCode()

  const dispatch = useDispatch()

  async function authorize(e) {
    const data = await request(LOGIN, {
      code,
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      signature: e.detail.signature,
      rawData: e.detail.rawData,
      appId: APP_ID
    })
    if (!data || !data.token) {
      throw new Error('登录失败！请联系管理员')
      return
    }
    Taro.setStorageSync('X-Token', data.token)
    dispatch(setUser(data))
    Taro.navigateBack()
    return data
  }

  return authorize

}

export function usePhoneNumber() {
  const code = useLoginCode()
  const codeRef = useRef()
  codeRef.current = code

  const dispatch = useDispatch()

  async function getPhoneNumber(e) {
    const {iv, encryptedData} = e.detail
    if (!iv || !encryptedData) {
      throw new Error('用户拒绝')
    }
    if (!codeRef.current) {
      throw new Error('获取code失败 请重新点击')
    }
    const res = await request(PHONE_INFO, {
      iv,
      code: codeRef.current,
      encryptedData,
      signature: 'signature',
      rawData: 'rawData',
      appId: APP_ID
    })
    if (!res) {
      await Taro.showToast({title: '获取手机号失败 请再次获取', icon: 'none'})
      return
    }
    dispatch(setPhone(res))
    return res
  }


  return getPhoneNumber

}
