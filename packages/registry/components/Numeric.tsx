import React, { useEffect, useState } from 'react'
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
    min = -9999999999999,
    max = 99999999999999,
    style,
    innerRef,
    error,
    field
}: INumeric) => {

    const [inputValue, setInputValue] = useState<string>(value?.toString() || '');

    // Debounced validation - kullanıcı yazmayı bıraktıktan sonra çalışır
    useDebounce(
        async () => {
            // Eğer input boşsa ve bir süre boş kaldıysa min değeri ata
            if (inputValue === '' || inputValue === null || inputValue === undefined) {
                const newValue = min >= 0 ? min : 0;
                setInputValue(newValue.toString());
                onChange(newValue);
                if (field) {
                    field.onChange(newValue);
                }
                return;
            }

            const numValue = Number(inputValue);

            // Sayı değilse işlem yapma
            if (isNaN(numValue)) {
                return;
            }

            // Min/Max kontrolü
            if (numValue < min) {
                setInputValue(min.toString());
                onChange(Number(min));
                if (field) {
                    field.onChange(Number(min));
                }
            } else if (numValue > max) {
                setInputValue(max.toString());
                onChange(Number(max));
                if (field) {
                    field.onChange(Number(max));
                }
            } else {
                onChange(numValue);
                if (field) {
                    field.onChange(numValue);
                }
            }
        },
        800, // Biraz daha uzun süre - kullanıcının yazmasını bekle
        [inputValue, min, max]
    );

    // Dış değer değişikliklerini input state'ine yansıt
    useEffect(() => {
        if (value !== undefined && value !== null) {
            setInputValue(value.toString());
        }
    }, [value]);

    // Default value için ayrı effect
    useEffect(() => {
        if (defaultValue !== undefined && defaultValue !== null && (value === undefined || value === null)) {
            setInputValue(defaultValue.toString());
            if (field) {
                field.onChange(defaultValue);
            }
        }
    }, [defaultValue]);

    // Input değişiklik handler'ı
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        // Boş string'i veya sadece sayı karakterlerini kabul et
        if (newValue === '' || /^-?\d*\.?\d*$/.test(newValue)) {
            setInputValue(newValue);
        }
    };

    return (
        <div className={`relative w-full flex items-center ${style ? style : ""}`}>
            <div className={`${label ? "space-y-1" : ""} flex flex-col w-full`}>
                <div className="flex items-center space-x-1 w-full">
                    {label &&
                        <label className="text-labelcolor dark:text-darklabelcolor">{label}</label>
                    }
                    {required &&
                        <span className="text-xs mt-1 text-errorcolor">*</span>
                    }
                </div>
                <input
                    id={id}
                    name={name}
                    type="text"
                    inputMode="numeric"
                    placeholder={placeholder ? placeholder : ""}
                    value={inputValue}
                    min={min && min}
                    max={max && max}
                    disabled={disabled && disabled}
                    onChange={handleInputChange}
                    className={` w-full px-3 py-3 ${error ? "focus:border-errorcolor" : " focus:border-main"} border rounded-lg border-bordercolor bg-white dark:bg-darkbackgroundcolor dark:text-darktextcolor dark:border-darkbordercolor text-textcolor placeholder-placeholdercolor  focus:placeholder-placeholdercolor focus:outline-hidden disabled:cursor-not-allowed disabled:text-disabletextcolor disabled:bg-disablebackgroundcolor `}
                    {...innerRef}
                />
                <div className="h-4">
                    {error ?
                        <div className="flex items-center space-x-1 ">
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
export default Numeric