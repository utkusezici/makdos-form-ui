import { IconAlertTriangleFilled } from '@tabler/icons-react'
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

                    <label className="text-text">{label ? label : ""}</label>
                    {required &&
                        <span className="text-xs mt-1 text-error">*</span>
                    }
                </div>
                <div className="relative flex">
                    <input
                        value={value && value}
                        id={id}
                        name={name}
                        type={type ? type : "date"}
                        data-date-format="DD MMMM YYYY"
                        className={`${inputStyle ? inputStyle : "w-full py-3.5 px-3"} border rounded-md text-sm border-border text-text placeholder-placeholder  focus:placeholder-focus-placeholder  focus:border-focus-border focus:outline-hidden focus:ring-0 clearDateInputIcon disabled:text-disable-text disabled:bg-disable-background empty`}
                        disabled={disabled && disabled}
                        onChange={handleInputChange}
                        {...innerRef}
                    />

                </div>
                <div className="h-4">
                    {error ?
                        <div className="flex items-center space-x-1">
                            <IconAlertTriangleFilled className="text-error" size={12} />
                            <p className="text-xs text-error">{error ? error : ""}</p>
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