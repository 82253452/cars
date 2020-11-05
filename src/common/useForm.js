import Taro from "@tarojs/taro";
import React, {useCallback, useRef, useState} from "react";

export default function () {
  const apiRef = React.useRef()
  const [data, setData] = useState({})
  const [meta, setMeta] = useState({isValid: false})

  const setMetaValue = useCallback((v) => {
    setMeta(old => ({...old, ...v}))
  }, [])

  const showToast = useCallback(async (v, message) => {
    if (!v) {
      Taro.showToast({
        title: message,
        icon: 'none'
      })
      setMetaValue({isValid: false})
      throw new Error(message)
    }
    if (typeof v === 'object') {
      if (v instanceof Array) {
        if (!v.length) {
          Taro.showToast({
            title: message,
            icon: 'none'
          })
          setMetaValue({isValid: false})
          throw new Error(message)
        }
      } else if (v instanceof Object) {
        if (!Object.keys(v).length) {
          Taro.showToast({
            title: message,
            icon: 'none'
          })
          setMetaValue({isValid: false})
          throw new Error(message)
        }
      }
    }
    return true
  }, [setMetaValue])

  const _validate = useCallback(async () => {
    for (const k of Object.keys(meta)) {
      if (!meta[k]) {
        continue;
      }
      if (!meta[k].required && !meta[k].validate) {
        continue;
      }
      const message = meta[k].error || '不能为空'
      const value = data[k]
      if (meta[k].required) {
        await showToast(value, message)
      }
      meta[k].validate && meta[k].validate().catch((err) => {
        Taro.showToast({
          title: err || '校验不通过',
          icon: 'none'
        })
        throw new Error(err || '校验不通过')
      })
    }
    console.log('111111111111111')
    setMetaValue({isValid: true})
  }, [data, meta, setMetaValue, showToast])

  const handleSubmit = useCallback(async () => {
    await _validate()
    return data
  }, [_validate, data])

  const _validateKey = useCallback(async (key, value) => {
    if (key) {
      if (!meta[key]) {
        return
      }
      if (!meta[key].required && !meta[key].validate) {
        return
      }
      const message = meta[key].error || '不能为空'
      if (meta[key].required) {
        if (!showToast(value, message)) {
          return
        }
      }
      if (meta[key].validate) {
        meta[key].validate(value).catch((err) => {
          Taro.showToast({
            title: err || '校验不通过',
            icon: 'none'
          })
        })

      }
    }
  }, [meta, showToast])


  apiRef.current = {
    data,
    setData,
    meta,
    setMeta,
    setMetaValue,
    _validate,
    handleSubmit,
    _validateKey
  }
  const Form = useFormElement(apiRef.current)
  apiRef.current.Form = Form
  return apiRef.current
}

const ViewContext = React.createContext()

function ViewContextProvider({value, children}) {
  return <ViewContext.Provider value={value}>{children}</ViewContext.Provider>
}

function useFormElement(contextValue) {
  const FormRef = useRef()
  const FormApiRef = useRef()
  FormApiRef.current = contextValue
  if (!FormRef.current) {
    FormRef.current = ({children}) => {
      return (<ViewContextProvider value={FormApiRef.current}>
        {children}
      </ViewContextProvider>)
    }
  }
  return FormRef.current
}


export function useFormContext(manualFormContext) {
  let viewApi = React.useContext(ViewContext)

  if (manualFormContext) {
    return manualFormContext
  }

  if (!viewApi) {
    throw new Error(`You are trying to use the form API outside of a form!`)
  }

  return viewApi
}

