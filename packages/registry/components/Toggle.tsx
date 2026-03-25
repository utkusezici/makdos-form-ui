import { IconAlertTriangleFilled } from '@tabler/icons-react'
import React from 'react'
import type { FieldError } from 'react-hook-form'

export interface IToggle {
  id: string
  name?: string
  label?: string
  isCheck?: boolean
  setIsCheck?: React.Dispatch<React.SetStateAction<boolean>>
  triggerFunction?: (value: boolean) => void
  style?: string
  checkColor?: string
  error?: FieldError;
  labelRight?: boolean;
  labelStyle?: string;
  disabled?: boolean;
}

const Toggle = ({ id, name, label, isCheck, setIsCheck, style, checkColor, error, labelRight, labelStyle, triggerFunction, disabled }: IToggle) => {
  const handleChange = () => {
    if (disabled) return;
    triggerFunction?.(!isCheck);
    setIsCheck?.(!isCheck);
  };

  return (
    <div className={style ?? ""}>
      {!labelRight && (
        <label htmlFor={id} className={`text-label unselectable cursor-pointer${labelStyle ? ` ${labelStyle}` : ""}`}>{label}</label>
      )}
      <div className={labelRight ? "flex items-center" : ""}>
        <label htmlFor={id} className="flex items-center cursor-pointer">
          <div className="relative">
            <input type="checkbox" id={id} name={name} className="sr-only" onChange={handleChange} checked={isCheck ?? false} />
            <div className={`block w-10 h-6 rounded-full ${isCheck ? (checkColor ?? "bg-toggle-checked") : "bg-toggle-unchecked"}`} />
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isCheck ? "translate-x-full" : ""}`} />
          </div>
        </label>
        {labelRight && (
          <label htmlFor={id} className={`text-label unselectable cursor-pointer${labelStyle ? ` ${labelStyle}` : ""}`}>{label}</label>
        )}
      </div>

      {error?.message && (
        <div className="flex items-center space-x-1">
          <IconAlertTriangleFilled className="text-error" size={12} />
          <p className="text-xs text-error">{error.message}</p>
        </div>
      )}
    </div>
  )
}

export default Toggle
