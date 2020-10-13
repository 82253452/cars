import {Image, Picker, Text, View} from "@tarojs/components";
import React from "react";
import './index.less'

export default function ({
                           headerImg, headerImgWidth, headerImgHeight,
                           tailImg, tailImgWidth, tailImgHeight,
                           title, placeHolder, style,
                           value, onChange, onClick,
                           mode = 'selector', range
                         }) {


  return <View className='panel-item-input-container'
    style={{...style}}
  >
    {title ? <View className='title'>
        <Text>{title}</Text>
      </View> :
      <View style={{width: `44rpx`, height: `44rpx`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Image src={headerImg}
          style={{width: `${headerImgWidth}rpx`, height: `${headerImgHeight}rpx`}}
        />
      </View>}
    <View className='border-view'>
      <Picker className='picker' mode={mode} range={range} onChange={event => onChange && onChange(event.detail.value)}>
        <Text
          className={value ? 'text' : 'placeHolder'}
        >{value || placeHolder}</Text>
      </Picker>
      {tailImg && <View onClick={onClick} style={{
        width: `44rpx`,
        height: `44rpx`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      ><Image src={tailImg}
        style={{width: `${tailImgWidth}rpx`, height: `${tailImgHeight}rpx`}}
      /></View>}
    </View>
  </View>
}

