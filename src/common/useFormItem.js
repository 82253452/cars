import {useFormContext} from "@/common/useForm";
import React, {useEffect} from "react";
import useEffectOnce from "react-use/lib/useEffectOnce";

export default function (key, ext) {
  const apiRef = React.useRef()
  const {data, setData, setMetaValue, _validateKey} = useFormContext()
  const value = data[key]

  useEffectOnce(() => {
    setMetaValue({[key]: ext})
  })

  function onBlur(e) {
    _validateKey(key, e.target.value)
    setData((old) => ({...old, [key]: e.target.value}))
  }

  apiRef.current = {
    value,
    onBlur,
    ...ext
  }

  return apiRef.current
}


