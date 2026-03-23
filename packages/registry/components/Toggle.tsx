import React from 'react'

export interface IToggle {
  id: string
  name?: string
  label?: string
  isCheck?: boolean
  setIsCheck?: React.Dispatch<React.SetStateAction<boolean>>
  triggerFunction?: any
  style?: string
  checkColor?: string
  defaultValue?: boolean
  error?: any;
  labelRight?: boolean;
  labelStyle?: string;
  disabled?: boolean;

}

const Toggle = ({ id, name, label, isCheck, setIsCheck, style, checkColor, error, labelRight, labelStyle, triggerFunction, disabled }: IToggle) => {
  const handleChange = () => {
    if (disabled) return;
    if (triggerFunction) {
      triggerFunction(!isCheck);
    }
    if (!setIsCheck) return;
    setIsCheck(!isCheck);

  };

  return (
    <div className={`${style ? style : ""}`}>
      {!labelRight &&
        <label htmlFor={id} className={`text-labelcolor unselectable cursor-pointer dark:text-darklabelcolor ${labelStyle ? labelStyle : ""}`}>{label}</label>
      }
      <div className={`${labelRight ? "flex items-center " : ""}`}>
        <label htmlFor={id} className="flex items-center cursor-pointer">
          <div className="relative">
            <input type="checkbox" id={id} name={name} className="sr-only" onChange={handleChange} />
            <div className={`block w-10 h-6 rounded-full ${isCheck ? (checkColor ? checkColor : "bg-togglecheckedcolor dark:bg-darktogglecheckedcolor") : "bg-toggleuncheckedcolor dark:bg-darktoggleuncheckedcolor"} `}></div>
            <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${isCheck ? "translate-x-full" : ""}`}></div>
          </div>
          <div className="ml-3 text-texttitle font-medium">
          </div>
        </label>
        {labelRight &&
          <label htmlFor={id} className={`text-labelcolor unselectable cursor-pointer dark:text-darktextcolor ${labelStyle ? labelStyle : ""}`}>{label}</label>
        }
      </div>


      {error?.message &&
        <div className="flex items-center space-x-1 ">
          <i className="ri-error-warning-fill text-errorcolor dark:text-darkerrorcolor" />
          <p className="text-xs text-errorcolor  dark:text-darkerrorcolor">{error.message}</p>
        </div>
      }
    </div>
  )
}

export default Toggle
