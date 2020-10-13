import {Image, Input, Text, View} from "@tarojs/components";
import React from "react";
import './index.less'

export default function ({
                           headerImg, headerImgWidth, headerImgHeight,
                           tailImg, tailImgWidth, tailImgHeight,
                           title, placeHolder, style, onClick,
                             disabled,value, onChange,onInputClick
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
      <Input placeholder={placeHolder} placeholderClass='input-placeholder' value={value} disabled={disabled} onClick={onInputClick}
        onBlur={e => onChange(e.detail.value)}
      />
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

