import { useEffect, useRef, useState } from 'react'
import CheckBox from './CheckBox'
import { IconChevronDown, IconSearch, IconX } from '@tabler/icons-react'
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
        if (multiSelect && items && JSON.stringify(selectedItemList) !== JSON.stringify(selectedItems)) { //listede check olanlar sayfa yüklendiği zaman seçilsin diye
            setSelectedItems(selectedItemList)

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
                    <span className="mb-1 text-text">{label ? label : "Dummy"}</span>
                }
                {required &&
                    <span className="text-xs mt-1 text-error">*</span>
                }
            </div>
            <div className={`${enter ? " border-focus-border" : "border-border"} ${paginate ? "h-10" : "py-3.5"} border rounded-lg items-center flex justify-between  ${disabled ? "bg-disable-background cursor-not-allowed" : "cursor-pointer"}`}
                onClick={() => {
                    !disabled && setEnter(!enter)
                    !disabled && setOpenMenu(!openMenu)
                }}>
                <div className='flex items-center'>
                    {!selectedItems ?
                        <p className="pl-3 text-placeholder font-medium text-sm ">{placeholder && placeholder}</p>
                        :
                        (selectedItems?.text ?
                            <p className="pl-3 text-text whitespace-nowrap text-sm">{selectedItems?.text}</p>
                            :
                            selectedItems?.map((item: any, i: number) => (
                                <div className='flex items-center' key={i} >

                                    <p className="pl-3 text-text whitespace-nowrap text-sm">{item?.text}</p>
                                    {
                                        i !== selectedItems?.length - 1 &&
                                        <p className=" text-text whitespace-nowrap text-sm">, </p>
                                    }
                                </div>

                            ))
                        )
                    }

                </div>
                <IconChevronDown size={18} className="mr-3 text-text" />
            </div>

            {openMenu && items?.length > 0 &&
                <div className={`${search ? "" : "border"} ${paginate ? "bottom-[50px]" : "mt-2"} absolute border-border rounded-md w-full z-50 bg-white`} >
                    {search &&
                        <div className="relative flex">
                            <input autoFocus onChange={(e) => setSearchInput(e.target.value)} placeholder="Search" className="w-full py-2 pl-2 pr-6 border rounded-t-lg outline-hidden border-border text-text" />
                            <div className="absolute right-3 top-3">
                                {searchInput.length > 1 ?
                                    <IconX size={18} className=" cursor-pointer  text-text" onClick={() => setSearchInput("")} />
                                    :
                                    <IconSearch size={18} className=" text-text" />
                                }
                            </div>
                        </div>
                    }
                    <div className={`${search ? "border-b border-l border-r rounded-b-md border-border " : "rounded-md"} max-h-[150px] customScroll overflow-y-auto `}>
                        {items?.filter((x: any) => x.text?.toLowerCase().includes(searchInput.toLowerCase())).map((item: any, i: number) =>
                            <div id={`selectbox-item-${i}`}
                                className={` flex flex-col duration-200 cursor-pointer hover:bg-selectbox-hover-item ${activeIndex === i ? 'bg-selectbox-hover-item' : ''}`} key={i} onClick={() => { selectItem(item); formClickTriggerFunction && formClickTriggerFunction(item) }} >
                                {i !== 0 &&
                                    <div className="w-full border-b border-border" />
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
                                            <p className="text-sm font-medium text-text">
                                                {item?.text}
                                            </p>
                                        </div>
                                        {price &&
                                            <p className="text-sm font-medium text-text">
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
                        <i className="ri-error-warning-fill text-error" />
                        <p className="text-xs text-error">{error ? error?.message : ""}</p>
                    </div>
                    :
                    <></>
                }
            </div>
        </div >
    )
}

export default SelectBox