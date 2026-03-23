import React, { forwardRef } from 'react'

export interface ITime {
    id?: string
    name?: string
    label?: string
    value?: string
    onChange?: any
    style?: string
    disabled?: boolean
    innerRef?: any
    error?: string
    required?: boolean
    step?: string
}
const Time = ({
    id,
    name,
    label,
    value,
    onChange,
    style,
    disabled,
    innerRef,
    error,
    required,
    step = "1"
}: ITime) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value); // Input değerini iletebilirsiniz
        }
    };


    return (
        <div className="w-full">

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
                        type="time"
                        step={step}
                        data-date-format="DD MMMM YYYY"
                        className={`${style ? style : "w-full py-3 px-3"} border bg-backgroundcolor rounded-md text-sm border-bordercolor dark:border-darkbordercolor text-textcolor dark:text-darktextcolor placeholder-placeholdercolor dark:placeholder-darkplaceholdercolor focus:placeholder-placeholdercolor  focus:border-bordercolor focus:outline-hidden focus:ring-0 clearDateInputIcon disabled:text-disabletextcolor disabled:bg-disablebackgroundcolor empty`}
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

export default Time