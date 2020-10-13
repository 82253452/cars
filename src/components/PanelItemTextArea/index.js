import {Text, Textarea, View} from "@tarojs/components";
import React from "react";


import './index.less'

export default function ({title, placeHolder, style, onClick,value,onChange}) {
  return <View className='panel-item-textarea-container'
    onClick={onClick}
    style={{...style}}
  >
    <Text className='title'>{title}</Text>
    <Textarea placeholder={placeHolder} placeholderClass='textarea-placeholder' value={value} onBlur={e=>onChange && onChange(e.detail.value)} />
  </View>
}

