import { IconAlertTriangleFilled } from '@tabler/icons-react'
import { useEffect } from 'react'
import { useDebounce } from 'react-use'

export interface INumeric {
    id?: string
    name?: string
    label?: string
    placeholder?: string
    value?: number
    defaultValue?: number
    onChange?: any
    required?: boolean
    disabled?: boolean
    min?: number
    max?: number
    style?: string
    innerRef?: any
    error?: string
    field?: any
}

const Numeric = ({
    id,
    name,
    label,
    placeholder,
    defaultValue,
    value = defaultValue ? defaultValue : 0,
    onChange,
    required,
    disabled,
    min = -9999999,
    max = 9999999,
    style,
    innerRef,
    error,
    field
}: INumeric) => {



    var [] = useDebounce(
        async () => {
            if (value <= min) {
                onChange(Number(min))
                if (field) {
                    field.onChange(Number(min))
                }
            }
        },
        300,
        [value]
    );

    var [] = useDebounce(
        async () => {
            if (value >= max) {
                onChange(Number(max))
                if (field) {
                    field.onChange(Number(max))
                }
            }
        },
        300,
        [value]
    );

    useEffect(() => { // value değiştiğinde form içerisindeki value yu değiştirmek için
        if (value) {
            if (field) {
                field.onChange(value)
            }
        }

        if (defaultValue) {
            if (field) {
                field.onChange(defaultValue)
            }
        }
    }, [value, defaultValue])

    return (
        <div className={`relative w-full flex items-center ${style ? style : ""}`}>
            <div className={`${label ? "space-y-1" : ""} flex flex-col w-full`}>
                <div className="flex items-center space-x-1 w-full">
                    {label &&
                        <label className="text-label">{label}</label>
                    }
                    {required &&
                        <span className="text-xs mt-1 text-error">*</span>
                    }
                </div>
                <input
                    id={id}
                    name={name}
                    type={"number"}
                    placeholder={placeholder ? placeholder : ""}
                    value={value && value.toString().replace(/^0+/, '')}
                    defaultValue={defaultValue && defaultValue}
                    min={min && min}
                    max={max && max}
                    disabled={disabled && disabled}
                    onChange={(e) => { onChange(Number(e.target.value)) }}
                    className={` w-full px-3 py-3 ${error ? "focus:border-error" : " focus:border-main"} border rounded-lg bg-background-form border-border text-text placeholder-placeholder  focus:placeholder-placeholder focus:outline-hidden disabled:cursor-not-allowed disabled:text-disable-text disabled:bg-disable-background `}
                    {...innerRef}
                />
                <div className="h-4">
                    {error ?
                        <div className="flex items-center space-x-1 ">
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
export default Numeric