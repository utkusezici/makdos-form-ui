import type { JSX } from "react";
import { FieldError } from "react-hook-form";

export interface ICheckBox {
  id?: string;
  name?: string;
  label?: string;
  labelJSX?: JSX.Element;
  labelLeft?: boolean;
  labelRight?: boolean;
  description?: string;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  style?: string;
  error?: FieldError;
  /** Spread directly onto the input element. Typically used for ref forwarding from react-hook-form. */
  innerRef?: React.HTMLAttributes<HTMLInputElement>;
  defaultValue?: boolean;
  labelStyle?: string;
  isForm?: boolean;
}

const CheckBox = ({
  id,
  name,
  label,
  labelJSX,
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
}: ICheckBox) => {
  const handleChange = () => {
    if (!disabled) onChange?.(!checked);
  };

  const renderLabel = () => (
    <div className="flex flex-col ml-2">
      <label
        className={`w-full text-label mb-0 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        htmlFor={isForm ? undefined : name}
        onClick={handleChange}
      >
        {label ?? labelJSX ?? ""}
      </label>
      {error?.message && (
        <div className="flex items-center space-x-1">
          <i className="ri-error-warning-fill text-error" />
          <p className="text-xs text-error">{error.message}</p>
        </div>
      )}
      {description && (
        <span className="text-sm text-border cursor-pointer" onClick={handleChange}>
          {description}
        </span>
      )}
    </div>
  );

  return (
    <div className={`flex items-center${style ? ` ${style}` : ""}`}>
      {labelLeft && renderLabel()}

      <div>
        <input
          type="checkbox"
          id={id}
          name={name}
          onChange={handleChange}
          {...innerRef}
          checked={checked ?? false}
          disabled={disabled}
          className={
            disabled
              ? "w-4 h-4 text-disable-text rounded-full bg-disable-background ring-0 cursor-not-allowed"
              : "w-4 h-4 accent-main hover:accent-main border-2 border-border text-sm cursor-pointer rounded-full outline-hidden ring-0 focus:ring-0 focus:outline-hidden focus:border-none focus:ring-transparent"
          }
        />
      </div>

      {labelRight && renderLabel()}
    </div>
  );
}

export default CheckBox;
