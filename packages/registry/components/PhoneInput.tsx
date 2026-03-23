import { default as PhoneInputPackage } from 'react-phone-input-2'
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

    return (
        <div className={`relative flex items-center ${style && style}`}>
            <div className="flex flex-col w-full space-y-1">
                <div className='flex items-center space-x-1'>
                    <label className=" text-textcolor dark:text-darktextcolor">{label ? label : ""}</label>
                    {required &&
                        <span className="text-xs mt-1 text-errorcolor">*</span>
                    }
                </div>
                <PhoneInputPackage
                    id={id}
                    name={name}
                    value={value && value}
                    disabled={disabled && disabled}
                    enableSearch={search && search}
                    onChange={(phone) => setValue && setValue(phone)}
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
                    inputClass="border pl-14 w-full px-3 py-3 h-auto rounded-md text-textcolor border-bordercolor dark:border-darkbordercolor dark:bg-darkbackgroundcolor dark:text-texttetriary  placeholder-placeholder focus:placeholder-textmain focus:outline-hidden focus:border-placeholder focus:ring-0 font-medium text-sm disabled:text-textsecondary disabled:bg-border"
                    searchClass="w-full px-3 pl-0 rounded-md dark:border-darkbordercolor dark:bg-darkbackgroundcolor dark:text-texttetriary dark:hover:bg-darkbackgroundcolor"
                    buttonClass='bg-white border-bordercolor rounded-l-md px-1 dark:border-darkbordercolor dark:bg-darkbackgroundcolor dark:text-texttetriary dark:hover:bg-darkbackgroundcolor  '
                    dropdownClass='customScroll dark:border-darkbordercolor dark:bg-darkbackgroundcolor dark:text-texttetriary dark:hover:bg-darkbackgroundcolor'
                    containerClass="phone-input"

                />
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

            <div className="absolute right-2 top-8">
                <i className="ri-phone-line text-xl text-placeholdercolor" />
            </div>
        </div>

    )
}

export default PhoneInput