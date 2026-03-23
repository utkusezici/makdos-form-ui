import { IconAlertTriangleFilled, IconEye, IconEyeOff, IconSearch } from '@tabler/icons-react'
import { ReactNode, createRef, forwardRef, useEffect, useRef, useState } from 'react'
export interface ITextInput {
  id?: string
  name?: string
  label?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: any
  type?: "text" | "password" | "number" | "domain" | "search" | "email"
  required?: boolean
  disabled?: boolean
  min?: number
  max?: number
  style?: string
  innerRef?: any
  customIcon?: string
  inputStyle?: string
  leftIcon?: ReactNode
  error?: string
  onKeyUp?: any
  field?: any,
}


const TextInput = ({
  id,
  name,
  label,
  placeholder,
  value = "",
  defaultValue,
  onChange,
  type,
  required,
  disabled,
  min,
  max,
  style,
  innerRef,
  customIcon,
  inputStyle,
  leftIcon,
  error,
  onKeyUp,
  field,
  
}: ITextInput) => {

  const [changeIcon, setChangeIcon] = useState(true)

  const [isFocus, setIsFocus] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      if (field) {
        field.onChange(e.target.value)
      }
      onChange(e.target.value); // Input değerini iletebilirsiniz
    }
  };

  useEffect(() => { // value değiştiğinde form içerisindeki value yu değiştirmek için
    if (value) {
      if (field) {
        field.onChange(value)
      }
    }
  }, [value])


  return (
    <div className={`relative w-full flex items-center ${style ? style : ""}`}>
      <div className={`${label ? "space-y-1" : ""} flex flex-col w-full`}>
        <div className="flex items-center space-x-1 w-full">
          {type !== "search" ?
            <label className={`text-text`}>{label ? label : ""}</label>
            :
            <></>
          }
          {required &&
            <span className="text-xs mt-1 text-error">*</span>
          }
        </div>
        <input
          id={id}
          name={name}
          type={type ? (type === "number" && "number") || (type === "password" && changeIcon ? "password" : "text") || (type === "domain" && "url") : "text"}
          placeholder={placeholder ? placeholder : "Dummy"}
          value={value && value}
          defaultValue={defaultValue && defaultValue}
          min={min && min}
          max={max && max}
          onChange={handleInputChange}
          disabled={disabled && disabled}
          className={`${type === "domain" ? `${inputStyle} pl-20 py-3 ` : (leftIcon ? (type === "password" ? "pl-10 pr-10 py-3" : "pl-10 pr-3 py-3") : (inputStyle ? inputStyle : "w-full px-3 py-3"))}  ${type === "search" && "pr-8"} ${error ? "focus:border-error " : " focus:border-focus-border"} border rounded-lg  border-border text-text placeholder-placeholder  focus:placeholder-focus-placeholder dark:placeholder:text-placeholder focus:outline-hidden   disabled:text-disable-text disabled:bg-dark-disable-background `}
          {...innerRef}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onKeyUp={onKeyUp}

        />
        {leftIcon ?
          <div className={`absolute left-2 top-[40px] ${isFocus ? "text-focus-icon" : "text-icon"} `}>
            {leftIcon}
          </div>
          :
          <></>
        }
        <div className="h-4">
          {error ?
            <div className="flex items-center space-x-1 ">
              <IconAlertTriangleFilled className="text-error" size={12} />
              <p className="text-xs text-error">{error ? error : ""}</p>
            </div>
            :
            <></>
          }
        </div>


      </div>
      {type === "password" ?
        <div className={`absolute right-2 top-10 ${isFocus ? "text-focus-icon" : "text-icon"}`} onClick={() => setChangeIcon(!changeIcon)}>
          {changeIcon ?
            <IconEyeOff />
            :
            <IconEye />
          }
          <i className={`${changeIcon ? "ri-eye-off-line " : "ri-eye-line"} text-xl `} />
        </div>
        :
        <></>
      }
      {type === "domain" ?
        <div className="flex absolute left-2 bottom-2.5 space-x-1 items-center">
          <p className="text-placeholder">https://</p>
          <svg width="1" height="18" viewBox="0 0 1 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1" height="18" fill="#DEE2E6" />
          </svg>
        </div>
        :
        <></>
      }
      {type === "search" ?
        <div className={`${label ? "top-3.5" : "top-3"} absolute right-2 `}>
          <IconSearch className={`"text-xl ${isFocus ? "text-focus-icon" : "text-icon"}`} />
        </div>
        :
        <></>
      }
      {customIcon ?
        <div className="absolute right-2 top-8">
          <i className={`"text-xl ${customIcon} ${isFocus ? "text-focus-icon" : "text-icon"}`} />
        </div>
        :
        <></>
      }
    </div>
  )
}

export default TextInput