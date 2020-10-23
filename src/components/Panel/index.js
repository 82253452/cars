import {View} from "@tarojs/components";
import React, {forwardRef, useImperativeHandle, useState} from "react";
import './index.less'

export default forwardRef (({children, style, borderRadius = 15, marginTop = 20, space = 30, paddingUD = 30, paddingLR = 0, padding,animation},ref)=> {

  const [droggle,setDroggle] = useState(true)
  const [animationName,setAnimationName] = useState(animation)

  useImperativeHandle(ref, () => ({
    drogglePanel:()=>{
      if(droggle){
        setAnimationName('zoomOutDown')
      }else{
        setAnimationName('zoomInUp')
      }
      setDroggle(!droggle)
    },
    closePanel:()=>{
      if(droggle){
        setAnimationName('zoomOutDown')
        setDroggle(!droggle)
      }
    },
    openPanel:()=>{
      if(!droggle){
        setAnimationName('zoomInUp')
        setDroggle(!droggle)
      }
    }
  }))

  return <View className={`panel-container ${animationName}`} style={{
    marginTop: `${marginTop}rpx`,
    padding: `${padding !== undefined ? padding : paddingUD}rpx ${padding !== undefined ? padding : paddingLR}rpx`,
    width: `calc(100% - ${space * 2}rpx)`,
    borderRadius: `${borderRadius}rpx`,
    ...style
  }}
  >
    {children}
  </View>
})

