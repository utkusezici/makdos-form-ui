import { forwardRef } from "react";

export interface ICheckBox {
  id?: string;
  name?: string;
  label?: string;
  labelLeft?: boolean;
  labelRight?: boolean;
  description?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  style?: string;
  error?: any;
  innerRef?: any,
  defaultValue?: boolean,
  isForm?: boolean,
  labelStyle?: string

}

const CheckBox = ({
  id,
  name,
  label,
  labelLeft,
  labelRight,
  description,
  disabled,
  onChange,
  checked,
  style,
  innerRef,
  error,
  isForm,
  labelStyle

}: ICheckBox) => {
  return (
    <div className={`flex items-center ${style ? style : ""}`}>
      {labelLeft ?
        <div className="flex flex-col ml-2">
          <label
            className={` w-full text-labelcolor dark:text-darklabelcolor mb-0 ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${labelStyle ? labelStyle : ""}`}
            htmlFor={isForm ? "" : name}
            onClick={() => {
              !disabled && onChange && onChange(!checked);
            }}
          >
            {label ? label : ""}
          </label>
          {error && !error?.ref?.value ?
            <div className="flex items-center space-x-1 ">
              <i className="ri-error-warning-fill text-errorcolor" />
              <p className="text-xs text-errorcolor">{error ? error?.message : ""}</p>
            </div>
            :
            <></>
          }
          <span
            className={"text-sm text-bordercolor dark:text-darkbordercolor cursor-pointer"}
            onClick={() => {
              !disabled && onChange && onChange(!checked);
            }}
          >
            {description ? description : ""}
          </span>
        </div>
        :
        <></>
      }
      <div>
        <input
          type="checkbox"
          id={id}
          name={name}
          onChange={() => {
            !disabled && onChange && onChange(!checked);
          }}
          {...innerRef}
          checked={checked ? checked : false}
          className={
            disabled
              ? "w-4 h-4 text-disabletextcolor rounded-full  bg-disablebackgroundcolor ring-0 cursor-not-allowed"
              : "w-4 h-4  accent-main hover:accent-main border-2 border-bordercolor  text-sm cursor-pointer rounded-full outline-hidden ring-0  focus:ring-0 focus:outline-hidden focus:border-none focus:ring-transparent"
          }
          disabled={disabled}
        />
      </div>


      {labelRight ?
        <div className="flex flex-col ml-2">
          <label
            className={` w-full text-labelcolor dark:text-darklabelcolor mb-0 ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${labelStyle ? labelStyle : ""}`}
            htmlFor={isForm ? "" : name}
            onClick={() => {
              !disabled && onChange && onChange(!checked);
            }}
          >
            {label}
          </label>
          {error && !error?.ref?.value ?
            <div className="flex items-center space-x-1 ">
              <i className="ri-error-warning-fill text-errorcolor" />
              <p className="text-xs text-errorcolor">{error ? error?.message : ""}</p>
            </div>
            :
            <></>
          }
          <span
            className={"text-sm text-bordercolor cursor-pointer"}
            onClick={() => {
              !disabled && onChange && onChange(!checked);
            }}
          >
            {description}
          </span>
        </div>
        :
        <></>
      }
    </div>
  );
}

export default CheckBox;
