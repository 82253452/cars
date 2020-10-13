import {Input, Text, View} from "@tarojs/components";
import React from "react";
import './index.less'

export default function ({
                           title, placeHolder, style,
                           value, onChange, type='text'
                         }) {


  return <View className='panel-item-line-input-container'
    style={{...style}}
  >
    <View className='border-view'>
      <View className='title'>
        <Text>{title}</Text>
      </View>
      <Input style={{width:'100%'}} type={type} placeholder={placeHolder} placeholderClass='input-placeholder' value={value}
        onBlur={e => onChange(e.detail.value)}
      />
    </View>
  </View>
}

