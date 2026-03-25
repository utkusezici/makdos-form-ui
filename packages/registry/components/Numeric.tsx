import { IconAlertTriangleFilled } from '@tabler/icons-react'
import { useEffect } from 'react'
import { useDebounce } from 'react-use'
import { ControllerRenderProps, FieldValues } from 'react-hook-form'

export interface INumeric {
    id?: string
    name?: string
    label?: string
    placeholder?: string
    value?: number
    defaultValue?: number
    onChange?: (value: number) => void
    required?: boolean
    disabled?: boolean
    min?: number
    max?: number
    style?: string
    /** Spread directly onto the input element. Typically used for ref forwarding from react-hook-form. */
    innerRef?: React.HTMLAttributes<HTMLInputElement>
    error?: string
    field?: ControllerRenderProps<FieldValues, string>
}

const Numeric = ({
    id,
    name,
    label,
    placeholder,
    defaultValue,
    value = defaultValue ?? 0,
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
    // Kullanıcı yazmayı bitirdiğinde (300ms sonra) min/max sınırlarını uygula
    useDebounce(
        () => {
            if (value < min) {
                onChange?.(min);
                field?.onChange(min);
            } else if (value > max) {
                onChange?.(max);
                field?.onChange(max);
            }
        },
        300,
        [value]
    );

    // Dışarıdan gelen value / defaultValue değişikliklerini form field'ına yansıt
    useEffect(() => {
        if (value !== undefined) {
            field?.onChange(value);
        }
    }, [value, defaultValue])

    return (
        <div className={`relative w-full flex items-center${style ? ` ${style}` : ""}`}>
            <div className={`${label ? "space-y-1" : ""} flex flex-col w-full`}>
                <div className="flex items-center space-x-1 w-full">
                    {label && <label className="text-label">{label}</label>}
                    {required && <span className="text-xs mt-1 text-error">*</span>}
                </div>
                <input
                    id={id}
                    name={name}
                    type="number"
                    placeholder={placeholder}
                    value={value?.toString().replace(/^0+/, "") ?? ""}
                    defaultValue={defaultValue}
                    min={min}
                    max={max}
                    disabled={disabled}
                    onChange={(e) => onChange?.(Number(e.target.value))}
                    className={`w-full px-3 py-3 ${error ? "focus:border-error" : "focus:border-main"} border rounded-lg bg-background-form border-border text-text placeholder-placeholder focus:placeholder-placeholder focus:outline-hidden disabled:cursor-not-allowed disabled:text-disable-text disabled:bg-disable-background`}
                    {...innerRef}
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
        </div>
    )
}
export default Numeric
