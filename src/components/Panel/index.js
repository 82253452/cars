import {View} from "@tarojs/components";
import React, {forwardRef, useImperativeHandle, useState} from "react";
import useUpdateEffect from "react-use/lib/useUpdateEffect";
import './index.less'

export default forwardRef(({children, style, space = 30, animation, animationShow = 'zoomInUp', animationShowHidden = 'zoomOutDown', show = true,callBack}, ref) => {
    const [droggle, setDroggle] = useState(show)
    const [animationName, setAnimationName] = useState(!show ? 'hidden' : animation)

    useUpdateEffect(() => {
      if (animation) {
        droggle ? setAnimationName(animationShow) : setAnimationName(animationShowHidden)
      }
    }, [droggle])

    useImperativeHandle(ref, () => ({
      droggle:droggle,
      drogglePanel: () => {
        callBack&&callBack(!droggle)
        setDroggle(!droggle)
      },
      closePanel: () => {
        callBack&&callBack(false)
        setDroggle(false)
      },
      openPanel: () => {
        callBack&&callBack(true)
        setDroggle(true)
      }
    }))

    return <View className={`panel-container ${animationName}`} style={{
      width: `calc(100% - ${space * 2}rpx)`,
      ...style
    }}
    >
      {children}
    </View>
  }
)

