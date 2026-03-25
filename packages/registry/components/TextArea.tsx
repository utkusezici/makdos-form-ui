import { IconAlertTriangleFilled } from '@tabler/icons-react'
import React, { useEffect } from 'react'
import type { ControllerRenderProps, FieldValues } from 'react-hook-form'

export interface ITextArea {
  id?: string
  name?: string
  label?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  rows?: number
  required?: boolean
  disabled?: boolean
  style?: string
  /** Spread directly onto the textarea element. Typically used for ref forwarding from react-hook-form. */
  innerRef?: React.HTMLAttributes<HTMLTextAreaElement>
  inputStyle?: string
  error?: string
  field?: ControllerRenderProps<FieldValues, string>
  /** @deprecated Use `onKeyDown` instead — `onKeyPress` is deprecated in HTML. */
  onKeyPress?: React.KeyboardEventHandler<HTMLTextAreaElement>
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
  style,
  innerRef,
  inputStyle,
  error,
  field,
  onKeyPress,
}: ITextArea) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    field?.onChange(e.target.value);
    onChange?.(e.target.value);
  };

  useEffect(() => {
    if (value) {
      field?.onChange(value);
    }
  }, [value])

  return (
    <div className={`flex flex-col space-y-1${style ? ` ${style}` : ""}`}>
      <div className='flex items-center space-x-1'>
        {label && <label className="text-text">{label}</label>}
        {required && <span className="text-xs mt-1 text-error">*</span>}
      </div>

      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        defaultValue={defaultValue}
        rows={rows}
        disabled={disabled}
        className={`${inputStyle ?? "w-full py-2 px-2"} ${error ? "focus:border-error" : "focus:border-focus-border"} border rounded-lg bg-background-form border-border text-text placeholder-placeholder focus:placeholder-focus-placeholder focus:outline-hidden disabled:text-disable-text disabled:bg-disable-background`}
        {...innerRef}
        onKeyPress={onKeyPress}
      />

      <div className="h-4">
        {error && (
          <div className="flex items-center space-x-1">
            <IconAlertTriangleFilled className="text-error" size={12} />
            <p className="text-xs text-error">{error}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TextArea
