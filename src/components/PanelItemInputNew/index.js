import {Input, View} from "@tarojs/components";
import React from "react";
import './index.less'

export default function ({title,placeholder, value, onChange, type}) {

  return <View className='panel_item_input'>
    <View className='title'>
      {title}
    </View>
    <Input placeholderClass='placeHolder' type={type} placeholder={placeholder} value={value}
      onBlur={e => onChange(e.detail.value)}
    />
  </View>
}

