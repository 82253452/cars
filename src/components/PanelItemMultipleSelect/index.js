import {Image, Text, View} from "@tarojs/components";
import React, {useState} from "react";
import gengduo from '../../img/gengduo.png'


import './index.less'

export default function ({title, style, value, onChange, range = []}) {

  const [index, setIndex] = useState(value)

  return <View className='panel-item-multiple-select-container'
    style={{...style}}
  >
    <Text className='title'>{title}</Text>
    {range.map((r, i) => <View onClick={() => {
      setIndex(i)
      onChange(i)
    }} className={`button ${index === i ? 'button-active' : ''}`}
    >
      <Text>{r}</Text>
    </View>)}
  </View>
}

