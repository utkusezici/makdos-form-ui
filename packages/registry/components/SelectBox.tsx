import { useEffect, useRef, useState } from 'react'
import CheckBox from './CheckBox'
import { IconChevronDown, IconSearch, IconX } from '@tabler/icons-react'
import { ControllerRenderProps, FieldError, FieldValues } from 'react-hook-form'

export interface SelectBoxItem {
    value?: unknown;
    text: string;
    checked?: boolean;
    icon?: React.ReactNode;
    otherInfo?: unknown;
}

export interface ISelectBox {
    name?: string;
    label?: string;
    multiSelect?: boolean;
    items?: SelectBoxItem[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setItems?: (items: any, valueKey: string, textKey: string, checkedKey?: any) => void;
    selectedItems?: SelectBoxItem | SelectBoxItem[] | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSelectedItems?: (item?: any) => void;
    searchAndAdd?: (val: string) => void;
    defaultSelect?: SelectBoxItem;
    style?: string;
    search?: boolean;
    placeholder?: string;
    onChange?: (item: SelectBoxItem) => void;
    paginate?: boolean;
    error?: FieldError;
    formDefaultValue?: string | number;
    formDefaultTriggerFunction?: (item: SelectBoxItem) => void;
    formClickTriggerFunction?: (item: SelectBoxItem) => void;
    required?: boolean;
    formSelectBox?: boolean;
    disabled?: boolean;
    field?: ControllerRenderProps<FieldValues, string>;
    price?: boolean;
}

// Bileşen dışında tanımlanmış hook — React kurallarına uygun
function useOutsideClick(ref: React.RefObject<HTMLElement | null>, onOutside: () => void) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onOutside();
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, onOutside]);
}

const SelectBox = ({
    name,
    label,
    multiSelect = false,
    items = [],
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
    disabled = false,
    field,
    price
}: ISelectBox) => {
    const [enter, setEnter] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [errorView, setErrorView] = useState(false)
    const [listItems, setListItems] = useState<SelectBoxItem[]>([])
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const wrapperRef = useRef<HTMLDivElement>(null)
    useOutsideClick(wrapperRef, () => {
        setOpenMenu(false)
        setEnter(false)
    })

    const selectItem = (item: SelectBoxItem) => {
        onChange?.(item)

        if (multiSelect) {
            const newItems = items.map((x) =>
                x.value === item.value ? { ...x, checked: !x.checked } : x
            )
            setItems?.(newItems, 'value', 'text', 'checked')

            const current = (Array.isArray(selectedItems) ? selectedItems : []) as SelectBoxItem[]
            const alreadySelected = current.some((x) => x.value === item.value)
            if (alreadySelected) {
                const filtered = current.filter((x) => x.value !== item.value)
                setSelectedItems?.(filtered.length > 0 ? filtered : undefined)
            } else {
                setSelectedItems?.([...current, item])
            }
        } else {
            setSelectedItems?.(item)
            setOpenMenu(false)
            setEnter(!enter)
        }
    }

    useEffect(() => {
        if (defaultSelect) {
            setSelectedItems?.(defaultSelect)
        }
    }, [defaultSelect])

    // selectedItems değiştiğinde form field'ını güncelle
    useEffect(() => {
        field?.onChange(selectedItems)
    }, [selectedItems])

    // formDefaultValue'ya göre başlangıç seçimini yap
    useEffect(() => {
        if (!items.length) return

        if (formDefaultValue !== undefined && formDefaultValue !== null) {
            const byValue = items.find((item) => item.value === formDefaultValue)
            const byText = items.find((item) => item.text === formDefaultValue)
            const match = byValue ?? byText

            if (match) {
                formDefaultTriggerFunction?.(match)
                field?.onChange(match)
                setSelectedItems?.(match)
            } else {
                setSelectedItems?.(undefined)
            }

            // Liste değiştiğinde seçimi sıfırla
            if (listItems.length > 0 && items !== listItems) {
                setSelectedItems?.(undefined)
            }
        }

        setListItems(items)

        // Çoklu seçimde: items içindeki checked olanları selectedItems'a yansıt
        if (multiSelect) {
            const checked = items.filter((x) => x.checked)
            const current = Array.isArray(selectedItems) ? selectedItems : []
            if (JSON.stringify(checked) !== JSON.stringify(current)) {
                setSelectedItems?.(checked)
            }
        }
    }, [formDefaultValue, items])

    useEffect(() => {
        if (error?.message) {
            setErrorView(true)
        }
    }, [error])

    // Klavye navigasyonu
    const handleKeyDown = (e: KeyboardEvent) => {
        if (!openMenu) return

        if (e.key === 'ArrowDown') {
            setActiveIndex((prev) => (prev === null || prev === items.length - 1 ? 0 : prev + 1))
        }
        if (e.key === 'ArrowUp') {
            setActiveIndex((prev) => (prev === null || prev === 0 ? items.length - 1 : prev - 1))
        }
        if (e.key === 'Enter' && activeIndex !== null) {
            const filtered = items.filter((x) =>
                x.text?.toLowerCase().includes(searchInput.toLowerCase())
            )
            selectItem(filtered[activeIndex])
        }
    }

    useEffect(() => {
        if (openMenu && activeIndex !== null && activeIndex !== -1) {
            document.getElementById(`selectbox-item-${activeIndex}`)?.scrollIntoView({
                block: 'nearest',
                inline: 'start',
            })
        }
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [openMenu, activeIndex])

    useEffect(() => {
        setActiveIndex(null)
    }, [searchInput])

    const filteredItems = items.filter((x) =>
        x.text?.toLowerCase().includes(searchInput.toLowerCase())
    )

    const single = (!Array.isArray(selectedItems) && selectedItems) ? selectedItems as SelectBoxItem : undefined
    const multi = Array.isArray(selectedItems) ? selectedItems as SelectBoxItem[] : undefined

    return (
        <div ref={wrapperRef} className={`relative${style ? ` ${style}` : ''}`}>
            <div className="flex space-x-1 w-full">
                {label && <span className="mb-1 text-text">{label}</span>}
                {required && <span className="text-xs mt-1 text-error">*</span>}
            </div>

            <div
                className={`${enter ? 'border-focus-border' : 'border-border'} ${paginate ? 'h-10' : 'py-3.5'} border rounded-lg items-center flex justify-between ${disabled ? 'bg-disable-background cursor-not-allowed' : 'bg-background-form cursor-pointer'}`}
                onClick={() => {
                    if (!disabled) {
                        setEnter(!enter)
                        setOpenMenu(!openMenu)
                    }
                }}
            >
                <div className="flex items-center">
                    {!selectedItems ? (
                        <p className="pl-3 text-placeholder font-medium text-sm">{placeholder}</p>
                    ) : single?.text ? (
                        <p className="pl-3 text-text whitespace-nowrap text-sm">{single.text}</p>
                    ) : (
                        multi?.map((item, i) => (
                            <div className="flex items-center" key={String(item.value ?? i)}>
                                <p className="pl-3 text-text whitespace-nowrap text-sm">{item.text}</p>
                                {i !== multi.length - 1 && (
                                    <p className="text-text whitespace-nowrap text-sm">, </p>
                                )}
                            </div>
                        ))
                    )}
                </div>
                <IconChevronDown size={18} className="mr-3 text-text" />
            </div>

            {openMenu && items.length > 0 && (
                <div className={`${search ? '' : 'border'} ${paginate ? 'bottom-[50px]' : 'mt-2'} absolute border-border rounded-md w-full z-50 bg-white`}>
                    {search && (
                        <div className="relative flex">
                            <input
                                autoFocus
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search"
                                className="w-full py-2 pl-2 pr-6 border rounded-t-lg outline-hidden border-border text-text"
                            />
                            <div className="absolute right-3 top-3">
                                {searchInput.length > 1 ? (
                                    <IconX size={18} className="cursor-pointer text-text" onClick={() => setSearchInput('')} />
                                ) : (
                                    <IconSearch size={18} className="text-text" />
                                )}
                            </div>
                        </div>
                    )}
                    <div className={`${search ? 'border-b border-l border-r rounded-b-md border-border' : 'rounded-md'} max-h-[150px] customScroll overflow-y-auto`}>
                        {filteredItems.map((item, i) => (
                            <div
                                id={`selectbox-item-${i}`}
                                key={String(item.value ?? i)}
                                className={`flex flex-col duration-200 cursor-pointer hover:bg-selectbox-hover-item ${activeIndex === i ? 'bg-selectbox-hover-item' : ''}`}
                                onClick={() => {
                                    selectItem(item)
                                    formClickTriggerFunction?.(item)
                                }}
                            >
                                {i !== 0 && <div className="w-full border-b border-border" />}
                                <div className="flex items-center px-2 py-2 space-x-2">
                                    {multiSelect && (
                                        <CheckBox
                                            id={item.text}
                                            name={item.text}
                                            checked={item.checked}
                                            onChange={() => {
                                                selectItem(item)
                                                setErrorView(false)
                                            }}
                                        />
                                    )}
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center space-x-2">
                                            {item.icon && <p>{item.icon}</p>}
                                            <p className="text-sm font-medium text-text">{item.text}</p>
                                        </div>
                                        {price && (
                                            <p className="text-sm font-medium text-text">
                                                {(item.otherInfo as Record<string, unknown>)?.price as string | number} $
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="h-3 mt-0.5">
                {errorView && error?.message && (
                    <div className="flex items-center space-x-1">
                        <i className="ri-error-warning-fill text-error" />
                        <p className="text-xs text-error">{error.message}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SelectBox
