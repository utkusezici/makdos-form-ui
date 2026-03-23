import React, { forwardRef } from 'react'

export interface IDateTime {
    id?: string
    name?: string
    label?: string
    value?: string
    onChange?: any
    inputStyle?: string
    disabled?: boolean
    innerRef?: any
    error?: string
    required?: boolean
    style?: string
    type?: "date" | "datetime-local"

}
const DateTime = ({
    id,
    name,
    label,
    value,
    onChange,
    inputStyle,
    disabled,
    innerRef,
    error,
    required,
    style,
    type
}: IDateTime) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value); // Input değerini iletebilirsiniz
        }
    };


    return (
        <div className={`w-full ${style ? style : ""}`}>

            <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-1 w-full">

                    <label className="text-labelcolor dark:text-darklabelcolor">{label ? label : ""}</label>
                    {required &&
                        <span className="text-xs mt-1 text-errorcolor">*</span>
                    }
                </div>
                <div className="relative flex">
                    <input
                        value={value && value}
                        id={id}
                        name={name}
                        type={type ? type : "date"}
                        data-date-format="DD MMMM YYYY"
                        className={`${inputStyle ? inputStyle : "w-full py-3.5 px-3"} border bg-backgroundcolor rounded-md text-sm border-bordercolor text-textcolor dark:border-darkbordercolor dark:bg-darkbackgroundcolor dark:text-darktextcolor placeholder-placeholdercolor  focus:placeholder-placeholdercolor  focus:border-placeholdercolor focus:outline-hidden focus:ring-0 clearDateInputIcon disabled:text-disabletextcolor disabled:bg-disablebackgroundcolor empty`}
                        disabled={disabled && disabled}
                        onChange={handleInputChange}
                        {...innerRef}
                    />

                </div>
                <div className="h-4">
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

        </div>
    )
}

export default DateTime