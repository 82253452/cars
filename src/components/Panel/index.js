import {View} from "@tarojs/components";
import Taro from "@tarojs/taro";
import React, {forwardRef, useImperativeHandle, useState} from "react";
import './index.less'

export default forwardRef (({children, style, borderRadius = 15, marginTop = 20, space = 30, paddingUD = 30, paddingLR = 0, padding},ref)=> {

  const [aniActions,setAniActions] = useState()
  const [droggle,setDroggle] = useState(true)

  const animation = Taro.createAnimation({
    duration: 1000,
    timingFunction: "ease",
    delay: 0
  })


  useImperativeHandle(ref, () => ({
    drogglePanel:()=>{
      console.log(droggle)
      if(droggle){
        animation.scale(0.01,0.01).step()
        animation.opacity(0).step({duration:10})
        animation.width('150rpx').height('40rpx').scale(1,1).opacity(1).step({duration:0})
        setAniActions(animation.export())
      }else{
        animation.width(`calc(100% - ${space * 2}rpx)`).height('100%').step({duration:0})
        animation.width(`calc(100% - ${space * 2}rpx)`).height('100%').step({duration:1000})
        setAniActions(animation.export())
      }
      setDroggle(!droggle)
    }
  }))

  return <View className='panel-container' style={{
    marginTop: `${marginTop}rpx`,
    padding: `${padding !== undefined ? padding : paddingUD}rpx ${padding !== undefined ? padding : paddingLR}rpx`,
    width: `calc(100% - ${space * 2}rpx)`,
    borderRadius: `${borderRadius}rpx`,
    ...style
  }}
    animation={aniActions}
  >
    {children}
  </View>
})

