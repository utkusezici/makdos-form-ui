import { IconAlertTriangleFilled } from '@tabler/icons-react';
import React from 'react';
import PhoneInputPackage from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

export interface IPhoneInput {
    id?: string;
    name?: string;
    label?: string;
    placeholder?: string;
    value?: string;
    setValue?: any;
    disabled?: boolean;
    style?: string;
    innerRef?: any;
    search?: boolean;
    error?: string,
    required?: boolean

}

const PhoneInput = ({
    id,
    name,
    label,
    placeholder,
    value,
    setValue,
    disabled,
    style,
    innerRef,
    search,
    error,
    required,
    ...otherProps
}: IPhoneInput
) => {

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setValue) {
            setValue(e.target.value); // Input değerini iletebilirsiniz
        }
    };

    return (
        <div className={`flex items-center w-full ${style ? style : ""}`}>
            <div className="flex flex-col w-full space-y-1">
                <div className='flex items-center space-x-1'>
                    <label className=" text-text">{label ? label : ""}</label>
                    {required &&
                        <span className="text-xs mt-1 text-error">*</span>
                    }
                </div>
                <PhoneInputPackage
                    id={id}
                    name={name}
                    value={value && value}
                    disabled={disabled && disabled}
                    enableSearch={search && search}
                    onChange={handleInputChange}
                    enableClickOutside={true}
                    disableSearchIcon
                    autoFormat={true}
                    countryCodeEditable={false}
                    preserveOrder={['tr', 'preferredCountries']}
                    country="tr"
                    searchPlaceholder="Search"
                    placeholder={placeholder && placeholder}
                    {...innerRef}
                    {...otherProps}
                    regions={['america', 'europe', 'asia', 'oceania', 'africa']}
                    inputClass="border! w-full! pl-14! px-3 py-3.5! h-auto! rounded-md! text-text! border-border! placeholder-placeholder! focus:placeholder-text-main! focus:outline-hidden! focus:border-placeholder! focus:ring-0! font-medium! text-sm! disabled:text-text-secondary! disabled:bg-border!"
                    searchClass="w-full! px-3! pl-0! rounded-md!"
                    buttonClass='bg-white! border-border! rounded-l-md! px-1!'
                    dropdownClass='customScroll'
                />
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

            {/* <div className="absolute right-0 top-8">
                <IconPhone className="text-placeholder" />
            </div> */}
        </div>

    )
}

export default PhoneInput