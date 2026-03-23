import React, { forwardRef, useEffect, useState } from 'react'

export interface ITextArea {
  id?: string
  name?: string
  label?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: any
  rows?: number
  required?: boolean
  disabled?: boolean
  min?: number
  max?: number
  style?: string
  innerRef?: any
  inputStyle?: string
  error?: string
  field?: any,
  onKeyPress?: any,
  ticketDetails?: boolean
}

const TextArea = ({
  id,
  name,
  label,
  placeholder,
  value = "",
  defaultValue,
  onChange,
  rows,
  required,
  disabled,
  min,
  max,
  style,
  innerRef,
  inputStyle,
  error,
  field,
  onKeyPress,
  ticketDetails
}: ITextArea) => {

  const [change, setChange] = useState<ITextArea | Record<string, any>>()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      if (field) {
        field.onChange(e.target.value)
      }
      onChange(e.target.value);
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
    <div className={`flex flex-col space-y-1 ${style && style}`}>
      <div className='flex items-center space-x-1'>
        {label &&
          <label className=" text-textcolor dark:text-darktextcolor">{label ? label : ""}</label>
        }

        {required &&
          <span className="text-xs mt-1 text-errorcolor">*</span>
        }
      </div>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder ? placeholder : ""}
        value={value && value}
        onChange={handleInputChange}
        defaultValue={defaultValue && defaultValue}
        rows={rows && rows}
        min={min && min}
        max={max && max}
        disabled={disabled && disabled}
        className={`${inputStyle ? inputStyle : "w-full py-2 px-2"}  ${error ? "focus:border-errorcolor " : " focus:border-focusbordercolor"} border rounded-lg bg-backgroundcolor dark:bg-darkbackgroundcolor dark:text-darktextcolor dark:border-darkbordercolor border-bordercolor text-textcolor placeholder-placeholdercolor  focus:placeholder-focusplaceholdercolor dark:placeholder:text-placeholdercolor  focus:outline-hidden    disabled:text-disabletextcolor disabled:bg-darkdisablebackgroundcolor `}
        {...change}
        {...innerRef}
        onKeyPress={onKeyPress && onKeyPress}

      />
      <div className={`${ticketDetails ? '' : 'h-4'}`}>
        {error ?
          <div className="flex items-center space-x-1">
            <i className="ri-error-warning-fill text-errorcolor" />
            <p className="text-xs text-errorcolor">{error ? error : ""}</p>
          </div>
          :
          <></>
        }
      </div>

    </div>
  )
}

export default TextArea