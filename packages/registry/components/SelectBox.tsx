import { forwardRef, useEffect, useRef, useState } from 'react'
import CheckBox from './CheckBox'
import { IconChevronDown, IconPlus, IconSearch, IconX } from '@tabler/icons-react'
import { useFormContext } from 'react-hook-form'

export interface ISelectBox {
    name?: any,
    label?: string,
    multiSelect?: boolean,
    items?: any,
    setItems?: any,
    selectedItems?: any,
    setSelectedItems?: any,
    defaultSelect?: any,
    style?: string,
    search?: boolean,
    searchAndAdd?: any,
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
    field?: any,
    price?: boolean
}

const SelectBox = ({
    name,
    label,
    multiSelect = false,
    items,
    setItems,
    selectedItems,
    setSelectedItems,
    defaultSelect,
    style,
    search,
    searchAndAdd,
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
    field,
    price
}: ISelectBox) => {
    let setValue: any, watch: any;

    if (formSelectBox) {
        const formContext = useFormContext();
        setValue = formContext.setValue;
        watch = formContext.watch;
    }

    const [enter, setEnter] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [searchInput, setSearchInput] = useState("")
    const [errorView, setErrorView] = useState(false)
    const [listItems, setListItems] = useState([])
    const [activeIndex, setActiveIndex] = useState<number | null>(null) // Aktif item indexini tutan state


    const selectItem = (item: any) => {
        if (onChange) {
            onChange(item)
        }
        let newFilteredResult: any[] = []
        if (multiSelect) {
            items.map((x: any) => {
                if (x.value !== item.value) {
                    newFilteredResult.push(x)
                } else {
                    newFilteredResult.push({ ...item, checked: !item.checked })
                }
            })
            setItems(newFilteredResult, "value", "text", "checked")
            let newSelectedItems = selectedItems ? selectedItems : []
            if (!newSelectedItems?.find((text: any) => text?.value === item.value)) {
                setSelectedItems([...newSelectedItems, item])
            }
            else {
                let filteredSelectedItems = newSelectedItems.filter((x: any) => x.value !== item.value)
                if (filteredSelectedItems.length > 0) {
                    setSelectedItems(filteredSelectedItems)
                } else {
                    setSelectedItems()
                }
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

        if (items && formSelectBox && !multiSelect) {
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

        let selectedItemList = items.filter((x: any) => x?.checked)
        if (multiSelect && items && JSON.stringify(selectedItemList) !== JSON.stringify(selectedItems)) {
            setSelectedItems(selectedItemList)
            if (field) {
                field.onChange(selectedItemList)
            }
            if (formSelectBox && setValue) {
                setValue(name, selectedItemList)
            }
        }
    }, [formDefaultValue, items])

    useEffect(() => {
        if (error?.message) {
            setErrorView(true)
        }
    }, [error])

    // Klavye ile gezinme ve seçim
    const handleKeyDown = (e: any) => {
        if (openMenu) {
            if (e.key === 'ArrowDown') {
                setActiveIndex((prevIndex) => (prevIndex === null || prevIndex === items.length - 1) ? 0 : prevIndex + 1)
            }
            if (e.key === 'ArrowUp') {
                setActiveIndex((prevIndex) => (prevIndex === null || prevIndex === 0) ? items.length - 1 : prevIndex - 1)
            }
            if (e.key === 'Enter' && activeIndex !== null) {
                if (searchInput === "") {
                    selectItem(items[activeIndex])
                } else {
                    selectItem(items.filter((x: any) => x.text?.toLowerCase().includes(searchInput.toLowerCase()))[activeIndex])
                }
            }
        }
    }

    useEffect(() => {

        if (openMenu && activeIndex !== -1) {
            const activeItem = document.getElementById(`selectbox-item-${activeIndex}`);
            activeItem?.scrollIntoView({
                block: 'nearest',
                inline: 'start'
            });
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [openMenu, activeIndex])

    useEffect(() => {
        setActiveIndex(null)
    }, [searchInput])

    return (
        <div ref={wrapperRef} className={`relative ${style ? style : ""}`}>
            <div className="flex space-x-1 w-full ">
                {label &&
                    <span className="mb-1 text-textcolor dark:text-darktextcolor">{label ? label : "Dummy"}</span>
                }
                {required &&
                    <span className="text-xs mt-1 text-errorcolor">*</span>
                }
            </div>
            <div className={`${enter ? " border-focusbordercolor" : "border-bordercolor"} ${paginate ? "h-10" : "py-3.5"} border rounded-lg items-center   flex justify-between cursor-pointer ${disabled ? "bg-disablebackgroundcolor" : "bg-backgroundcolor dark:border-darkbordercolor dark:bg-darkinputbackground dark:text-darktextcolor"}`}
                onClick={() => {
                    !disabled && setEnter(!enter)
                    !disabled && setOpenMenu(!openMenu)
                }}>
                <div className='flex items-center'>
                    {!selectedItems ?
                        <p className="pl-3 text-placeholdercolor font-medium text-sm ">{placeholder && placeholder}</p>
                        :
                        (selectedItems?.text ?
                            <p className="pl-3 text-textcolor whitespace-nowrap text-sm dark:text-darktextcolor">{selectedItems?.text}</p>
                            :
                            selectedItems?.map((item: any, i: number) => (
                                <div className='flex items-center' key={i} >

                                    <p className="pl-3 text-textcolor whitespace-nowrap text-sm dark:text-darktextcolor">{item?.text}</p>
                                    {
                                        i !== selectedItems?.length - 1 &&
                                        <p className=" text-textcolor whitespace-nowrap text-sm dark:text-darktextcolor">, </p>
                                    }
                                </div>

                            ))
                        )
                    }

                </div>
                <IconChevronDown size={18} className="mr-3 text-textcolor" />
            </div>

            {openMenu && items?.length > 0 &&
                <div className={`${search ? "" : "border"} ${paginate ? "bottom-[50px]" : "mt-2"} absolute border-bordercolor dark:border-darkbordercolor rounded-md w-full z-50`} >
                    {search &&
                        <div className="relative flex">
                            <input autoFocus value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search" className="w-full py-2 pl-2 pr-6 bg-backgroundcolor border rounded-t-lg outline-hidden dark:border-darkbordercolor dark:bg-darkinputbackground dark:text-darktextcolor border-bordercolor text-textcolor" />
                            <div className="absolute right-3 top-3">
                                {searchInput.length > 1 ?
                                    <div className='flex items-center space-x-2'>
                                        <IconX size={18} className=" cursor-pointer  text-textcolor" onClick={() => setSearchInput("")} />
                                        {
                                            searchAndAdd &&
                                            <IconPlus onClick={() => { searchAndAdd(searchInput); setSearchInput("") }} size={18} className=" cursor-pointer  text-textcolor" />
                                        }
                                    </div>
                                    :
                                    <IconSearch size={18} className=" text-textcolor" />
                                }
                            </div>
                        </div>
                    }
                    <div className={`${search ? "border-b border-l border-r rounded-b-md border-bordercolor " : "rounded-md"} max-h-[150px] customScroll dark:border-darkbordercolor dark:bg-darkinputbackground dark:text-darktextcolor bg-backgroundcolor overflow-y-auto `}>
                        {items?.filter((x: any) => x.text?.toLowerCase().includes(searchInput.toLowerCase())).map((item: any, i: number) =>
                            <div id={`selectbox-item-${i}`}
                                className={` flex flex-col duration-200 cursor-pointer hover:bg-selectboxhoveritembg dark:hover:bg-darkselectboxhoveritembg ${activeIndex === i ? 'bg-selectboxhoveritembg dark:bg-darkselectboxhoveritembg' : ''}`} key={i} onClick={() => { selectItem(item); formClickTriggerFunction && formClickTriggerFunction(item) }} >
                                {i !== 0 &&
                                    <div className="w-full border-b border-bordercolor dark:border-darkbordercolor" />
                                }
                                <div className="flex items-center px-2 py-2 space-x-2">
                                    {multiSelect &&
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
                                    <div className='flex items-center justify-between w-full'>
                                        <div className="flex items-center  space-x-2">
                                            {item.icon &&
                                                <p>{item.icon}</p>
                                            }
                                            <p className="text-sm font-medium text-textcolor dark:text-darktextcolor">
                                                {item?.text}
                                            </p>
                                        </div>
                                        {price &&
                                            <p className="text-sm font-medium text-textcolor dark:text-darktextcolor">
                                                {item?.otherInfo?.price} $
                                            </p>

                                        }
                                    </div>

                                </div>
                            </div>
                        )
                        }
                    </div>
                </div>
            }
            <div className="h-3 mt-0.5">
                {errorView ?
                    <div className="flex items-center space-x-1 ">
                        <i className="ri-error-warning-fill text-errorcolor" />
                        <p className="text-xs text-errorcolor">{error ? error?.message : ""}</p>
                    </div>
                    :
                    <></>
                }
            </div>
        </div >
    )
}

export default SelectBox