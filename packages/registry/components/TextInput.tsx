import { IconAlertTriangleFilled, IconEye, IconEyeOff, IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

export interface ITextInput {
  id?: string
  name?: string
  label?: string
  placeholder?: string
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  type?: "text" | "password" | "number" | "domain" | "search"
  required?: boolean
  disabled?: boolean
  min?: number
  max?: number
  style?: string
  /** Spread directly onto the input element. Typically used for ref forwarding from react-hook-form. */
  innerRef?: React.HTMLAttributes<HTMLInputElement>
  customIcon?: string
  inputStyle?: string
  leftIcon?: ReactNode
  error?: string
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>
  field?: ControllerRenderProps<FieldValues, string>
}

function getInputType(
  type: ITextInput["type"],
  showPassword: boolean
): React.HTMLInputTypeAttribute {
  if (type === "password") return showPassword ? "text" : "password";
  if (type === "domain") return "url";
  return type ?? "text";
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
  const [showPassword, setShowPassword] = useState(false)
  const [isFocus, setIsFocus] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field?.onChange(e.target.value);
    onChange?.(e.target.value);
  };

  useEffect(() => {
    if (value) {
      field?.onChange(value);
    }
  }, [value])

  const inputClass = [
    type === "domain"
      ? `${inputStyle ?? ""} pl-20 py-3`
      : leftIcon
        ? type === "password"
          ? "pl-10 pr-10 py-3"
          : "pl-10 pr-3 py-3"
        : inputStyle
          ? inputStyle
          : "w-full px-3 py-3",
    type === "search" && "pr-8",
    error ? "focus:border-error" : "focus:border-focus-border",
    "border rounded-lg bg-background-form border-border text-text placeholder-placeholder",
    "focus:placeholder-focus-placeholder focus:outline-hidden",
    "disabled:text-disable-text disabled:bg-disable-background",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`relative w-full flex items-center${style ? ` ${style}` : ""}`}>
      <div className={`${label ? "space-y-1" : ""} flex flex-col w-full`}>
        {type !== "search" && (
          <div className="flex items-center space-x-1 w-full">
            <label className="text-text">{label ?? ""}</label>
            {required && <span className="text-xs mt-1 text-error">*</span>}
          </div>
        )}

        <input
          id={id}
          name={name}
          type={getInputType(type, showPassword)}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          min={min}
          max={max}
          onChange={handleInputChange}
          disabled={disabled}
          className={inputClass}
          {...innerRef}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onKeyUp={onKeyUp}
        />

        {leftIcon && (
          <div className={`absolute left-2 top-[40px] ${isFocus ? "text-focus-icon" : "text-icon"}`}>
            {leftIcon}
          </div>
        )}

        <div className="h-4">
          {error && (
            <div className="flex items-center space-x-1">
              <IconAlertTriangleFilled className="text-error" size={12} />
              <p className="text-xs text-error">{error}</p>
            </div>
          )}
        </div>
      </div>

      {type === "password" && (
        <div
          className={`absolute right-2 top-10 ${isFocus ? "text-focus-icon" : "text-icon"} cursor-pointer`}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <IconEye /> : <IconEyeOff />}
        </div>
      )}

      {type === "domain" && (
        <div className="flex absolute left-2 bottom-2.5 space-x-1 items-center">
          <p className="text-placeholder">https://</p>
          <svg width="1" height="18" viewBox="0 0 1 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1" height="18" fill="#DEE2E6" />
          </svg>
        </div>
      )}

      {type === "search" && (
        <div className={`${label ? "top-3.5" : "top-3"} absolute right-2`}>
          <IconSearch className={`text-xl ${isFocus ? "text-focus-icon" : "text-icon"}`} />
        </div>
      )}

      {customIcon && (
        <div className="absolute right-2 top-8">
          <i className={`text-xl ${customIcon} ${isFocus ? "text-focus-icon" : "text-icon"}`} />
        </div>
      )}
    </div>
  )
}

export default TextInput
