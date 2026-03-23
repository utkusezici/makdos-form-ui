import React, { forwardRef, useEffect, useRef, useState } from 'react'
import CheckBox from './CheckBox'
import { IconArrowBigDownLine, IconChevronDown } from '@tabler/icons-react'
import { useFormContext } from 'react-hook-form'

export interface ISelectBoxGroup {
    name?: any,
    label?: string,
    type?: "checkbox" | "radio",
    items?: any,
    setItems?: any,
    selectedItems?: any,
    setSelectedItems?: any,
    defaultSelect?: any,
    style?: string,
    search?: boolean,
    placeholder?: string,
    onChange?: any,
    paginate?: boolean,
    error?: any,
    formDefaultValue?: any,
    formDefaultTriggerFunction?: any,
    formClickTriggerFunction?: any,
    required?: boolean,
    formSelectBox?: boolean,
    disabled?: boolean,
    field?: any
}

const SelectBoxGroup = ({
    name,
    label,
    type,
    items,
    setItems,
    selectedItems,
    setSelectedItems,
    defaultSelect,
    style,
    search,
    placeholder,
    onChange,
    paginate = false,
    error,
    formDefaultValue,
    formDefaultTriggerFunction,
    formClickTriggerFunction,
    required,
    formSelectBox,
    disabled = false,
    field
}: ISelectBoxGroup) => {
    const formContext = useFormContext();
    let setValue: any, watch: any;

    if (formSelectBox) {
        setValue = formContext.setValue;
        watch = formContext.watch;
    }

    const [enter, setEnter] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [errorView, setErrorView] = useState(false)
    const [listItems, setListItems] = useState([])

    const selectItem = (item: any) => {
        if (onChange) {
            onChange(item)
        }
        let newFilteredResult: any[] = []
        if (type === "checkbox") {
            items.map((x: any) => {
                if (x.value !== item.value) {
                    newFilteredResult.push(x)
                } else {
                    newFilteredResult.push({ ...item, checked: !item.checked })
                }
            })
            setItems(newFilteredResult)

            if (!selectedItems.find((text: any) => text?.value === item.value)) {
                setSelectedItems([...selectedItems, item])
            }
            else {
                setSelectedItems(selectedItems.filter((x: any) => x.value !== item.value));
            }
        }
        else {
            setSelectedItems(item)
            setOpenMenu(false)
            setEnter(!enter)
        }
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    function useOutsideAlerter(ref: any) {
        useEffect(() => {
            function handleClickOutside(event: any) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpenMenu(false);
                    setEnter(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useEffect(() => {
        if (defaultSelect) {
            setSelectedItems(defaultSelect)
        }
    }, [defaultSelect])


    useEffect(() => { //selectedItems state'i değiştiği zaman formun field'ına set ediyoruz.
        if (field) {
            field.onChange(selectedItems)
        }
    }, [selectedItems])

    useEffect(() => { //formun defaultundan gelen value değerine göre selectedItems state'ini set ediyoruz.

        if (items && formSelectBox) {
            if (items?.find((item: any) => item.value === formDefaultValue) || items?.find((item: any) => item.text === formDefaultValue)) {
                const selectedItem = items?.find((item: any) => item.value === formDefaultValue);
                if (selectedItem) {
                    if (formDefaultTriggerFunction) {
                        formDefaultTriggerFunction(selectedItem)
                    }
                    if (formSelectBox) {
                        setValue(name, selectedItem)
                    }
                    return setSelectedItems(selectedItem);
                }

                const selectedItem2 = items?.find((item: any) => item.text === formDefaultValue);
                if (selectedItem2) {
                    if (formDefaultTriggerFunction)
                        formDefaultTriggerFunction(selectedItem2)
                    return setSelectedItems(selectedItem2);
                }
            } else {
                if (formDefaultValue)
                    setSelectedItems()
            }
            if (listItems?.length > 0) {
                if (JSON.stringify(items) !== JSON.stringify(listItems)) {
                    setSelectedItems()
                }
            }


            setListItems(items)
        }
    }, [formDefaultValue, items,])


    useEffect(() => {
        if (error?.message) {
            setErrorView(true)
        }
    }, [error])


    return (
        <div ref={wrapperRef} className={`relative ${style ? style : ""}`}>
            <div className="flex space-x-1 w-full ">
                {label &&
                    <span className="mb-1 text-labelcolor">{label ? label : "Dummy"}</span>
                }
                {required &&
                    <span className="text-xs mt-1 text-error">*</span>
                }
            </div>
            <div className={`${enter ? "ring-4 ring-blue-100 border-main" : "border-bordercolor"} ${paginate ? "h-10" : "py-3.5"} border rounded-lg items-center   flex justify-between cursor-pointer ${disabled ? "bg-disablebackgroundcolor" : "bg-backgroundcolor"}`}
                onClick={() => {
                    !disabled && setEnter(!enter)
                    !disabled && setOpenMenu(!openMenu)
                }}>
                <div>
                    {!selectedItems ?
                        <p className="pl-3 text-placeholdercolor font-medium text-sm ">{placeholder && placeholder}</p>
                        :
                        <p className="pl-3 text-textcolor whitespace-nowrap text-sm">{selectedItems?.text}</p>
                    }
                </div>
                <IconChevronDown size={18} className="mr-3 text-textcolor" />
            </div>

            {openMenu && items?.length > 0 &&
                <div className={`${search ? "" : "border"} ${paginate ? "bottom-[50px]" : "mt-2"} absolute border-bordercolor rounded-md w-full z-50`} >
                    {search &&
                        <div className="relative flex">
                            <input autoFocus onChange={(e) => setSearchInput(e.target.value)} placeholder="Search" className="w-full py-2 pl-2 pr-6 bg-backgroundcolor border rounded-t-lg outline-hidden border-bordercolor text-textcolor" />
                            <div className="absolute right-2 top-2">
                                {searchInput.length > 1 ?
                                    <i className="text-xl cursor-pointer ri-close-line text-textcolor" onClick={() => setSearchInput("")} />
                                    :
                                    <i className="text-xl ri-search-line text-textcolor" />
                                }
                            </div>
                        </div>
                    }
                    <div className={`${search ? "border-b border-l border-r rounded-b-md border-bordercolor " : "rounded-md"} max-h-[200px] customScroll  bg-backgroundcolor overflow-y-auto `}>
                        {items.map((groupItem: any, index: number) =>
                            <div key={index}>
                                {index !== 0 &&
                                    <div className="w-full border-b border-bordercolor" />
                                }

                                <div className="p-2">
                                    <p className="text-sm font-bold text-textcolor mb-2">
                                        {groupItem?.group}
                                    </p>

                                    {groupItem.items?.filter((x: any) => x.text?.toLowerCase().includes(searchInput.toLowerCase())).map((item: any, i: number) =>
                                        <div className="flex flex-col duration-200 cursor-pointer hover:bg-selectboxhoveritembg " key={i} onClick={() => { selectItem(item); formClickTriggerFunction && formClickTriggerFunction(item) }} >
                                            {i !== 0 &&
                                                <div className="w-full border-b border-backgroundcolor" />
                                            }
                                            <div className="flex items-center px-2 py-2 space-x-2">
                                                {type === "checkbox" &&
                                                    <CheckBox
                                                        id={item?.text}
                                                        name={item?.text}
                                                        checked={item?.checked}
                                                        onChange={() => {
                                                            selectItem(item);
                                                            setErrorView(false)
                                                        }}
                                                    />
                                                }
                                                <div className="flex items-center space-x-2">
                                                    {item.icon &&
                                                        <p>{item.icon}</p>
                                                    }
                                                    <p className="text-sm font-medium text-textcolor">
                                                        {item.icon ? "" : "- "} {item?.text}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                    }
                                </div>

                            </div>

                        )}


                    </div>
                </div>
            }
            <div className="h-3 mt-0.5">
                {errorView ?
                    <div className="flex items-center space-x-1 ">
                        <i className="ri-error-warning-fill text-error" />
                        <p className="text-xs text-error">{error ? error?.message : ""}</p>
                    </div>
                    :
                    <></>
                }
            </div>
        </div>
    )
}

export default SelectBoxGroup