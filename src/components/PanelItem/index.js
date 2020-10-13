import {Image, Text, View} from "@tarojs/components";
import React from "react";
import {AtIcon} from "taro-ui";
import './index.less'

export default function ({icon, title, iconColor = '#4FC469', iconImg, iconImgWidth, iconImgHeight, paddingUD = 20, iconSize = 18, children, style, onClick}) {


    return <View className='panel-item-container'
      onClick={onClick}
      style={{
                     ...style,
                     alignItems: `${children.length > 1 ? 'flex-start' : 'center'}`,
                     padding: `${paddingUD}rpx`
                 }}
    >
        {title ?
            <View className='title' style={{marginTop: `${children.length > 1 ? '10rpx' : '0'}`, color: iconColor}}>
                <Text>{title}</Text>
            </View> : iconImg ? <Image src={iconImg}
              style={{width: `${iconImgWidth}rpx`, height: `${iconImgHeight}rpx`}}
            /> :
                <AtIcon customStyle={{marginTop: `${children.length > 1 ? '10rpx' : '0'}`}} value={icon} size={iconSize}
                  color={iconColor}
                />}
        <View className='content'>
            {children}
        </View>
    </View>
}

