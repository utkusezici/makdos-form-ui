import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import CheckBox from './CheckBox';
import { IconCircleArrowLeft, IconCircleArrowRight, IconSearch, IconX } from '@tabler/icons-react';

function fixTurkishCharacters(str: string) {
    const charMap = { 'İ': 'i', 'I': 'ı', 'Ğ': 'ğ', 'Ü': 'ü', 'Ş': 'ş', 'Ö': 'ö', 'Ç': 'ç' };
    return str?.replace(/[İIĞÜŞÖÇ]/g, (char) => charMap[char as keyof typeof charMap]);
}


type Props = {
    type: string;
    label: string;
    items: any[];
    selectedItems: any[];
    setSelectedItems: any;
    setItems: any;
    labelType?: string;
    height?: string;
    width?: string;
    autocomplete?: boolean;
}

function ListBox({ type, label, items, selectedItems, setSelectedItems, setItems, labelType, height, width, autocomplete }: Props) {
    const [searchInput, setSearchInput] = useState('');
    const [searchTypeInput, setSearchTypeInput] = useState('')
    const [itemList, setItemList] = useState<any>([])
    const [selectedItemList, setSelectedItemList] = useState<any>([])
    const [firstRender, setFirstRender] = useState(true)

    const addList = async (item: any) => {
        let newFilteredResult: any = []
        if (type === "double") {
            items.map((x) => {
                if (x.id !== item.id) {
                    newFilteredResult.push(x)
                } else {
                    newFilteredResult.push({ ...item, checked: !item.checked })
                }
            })
            setItems(newFilteredResult)

            if (!itemList.find((text: any) => text?.id === item.id)) {
                setItemList([...itemList, item])
            }
            else {
                setItemList(itemList.filter((x: any) => x.id !== item.id));
            }
        }
        else {
            items.map((x) => {
                if (x.id !== item.id) {
                    newFilteredResult.push(x)
                } else {
                    newFilteredResult.push({ ...item, checked: !item.checked })
                }
            })
            setItems(newFilteredResult)
            if (!selectedItems.find((text) => text?.id === item.id)) {
                setSelectedItems([...selectedItems, item])
            }
            else {
                setSelectedItems(selectedItems.filter((x: any) => x.id !== item.id));
            }
        }
    }

    const removeList = async (item: any) => {
        let newSelectedItems: any = []
        selectedItems.map((x: any) => {
            if (x.id !== item.id) {
                newSelectedItems.push(x)
            } else {
                newSelectedItems.push({ ...item, checked: !item.checked })
            }
        })
        setSelectedItems(newSelectedItems)
        if (!selectedItemList.find((text: any) => text?.id === item.id)) {
            setSelectedItemList([...selectedItemList, item])
        }
        else {
            setSelectedItemList(selectedItemList.filter((x: any) => x.id !== item.id));
        }
    }

    const addSelected = async () => {
        const newList = await items.filter((x) => !x.checked);
        setItems(newList)
        let newItemList = itemList.map((x: any) => ({ ...x, checked: false }))
        setSelectedItems(selectedItems?.concat(newItemList))
        setItemList([])
    }

    const addAutoSelected = async () => {
        let features = items.map((item) => {
            if (selectedItems.find((x: any) => x.id === item.id)) {
                return { ...item, checked: true }
            }
            return item
        })
        setItems(features.filter((x: any) => !x.checked))
        setSelectedItems(selectedItems)
        setItemList([])
    }

    const removeSelected = async () => {
        const newList = await selectedItems.filter((x) => !x.checked)
        setSelectedItems(newList)
        let newSelectedItemList = selectedItemList.map((x: any) => ({ ...x, checked: false }))
        setItems(items.concat(newSelectedItemList))
        setSelectedItemList([])
    }

    useEffect(() => {
        if (autocomplete && items?.length > 0 && firstRender) {
            if (selectedItems?.length > 0) {
                addAutoSelected()
                setFirstRender(false)
            }
        }
    }, [items]);

    return (
        <div className="flex items-center w-full space-x-2">
            <div className={`${width ? width : ""} flex flex-col`}>
                <div className='flex justify-between items-end  py-2 bg-white  h-12 border-texttetriary '>
                    <span className="mb-1 text-sm text-textmain">{label}</span>
                    {items?.length > 0 &&
                        <button
                            type='button'
                            className="p-2  text-xs font-medium text-white rounded-md bg-main hover:bg-secondary hover:text-main duration-300 cursor-pointer"
                            onClick={() => {
                                if (itemList.filter((item: any) => item.checked).length == items.length) {
                                    setItems(items.map((x: any) => ({ ...x, checked: false })))
                                    setItemList([])
                                }
                                else {
                                    let newFilteredResult: any = []
                                    items.map((x: any) => {
                                        newFilteredResult.push({ ...x, checked: true })
                                    })
                                    setItems(newFilteredResult)
                                    setItemList(newFilteredResult)
                                }
                            }}
                        >
                            {(itemList.filter((item: any) => item.checked).length == items.length) ? "Tümünü Kaldır" : "Tümünü Seç"}
                        </button>
                    }
                </div>
                <div className="relative flex">
                    <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Search" className="w-full py-2 pl-2 pr-6 bg-white border rounded-t-lg outline-none border-texttetriary" />
                    <div className="absolute right-2 top-2">
                        {searchInput.length > 1 ?
                            <IconX className="text-xl cursor-pointer text-textmain" onClick={() => setSearchInput("")} />
                            :
                            <IconSearch className="text-xl  text-textmain" />
                        }
                    </div>
                </div>


                <div className={`${height ? height : ""} overflow-auto rounded-b-lg border-l border-r border-b border-texttetriary bg-white`}>
                    <div className="">
                        {items?.filter(x => fixTurkishCharacters(x.text)?.toLowerCase().includes(fixTurkishCharacters(searchInput).toLowerCase())).sort((a, b) => a.id - b.id).map((item, i) =>
                            <div className="flex flex-col duration-300 cursor-pointer hover:bg-gray-200 " key={i} onClick={() => addList(item)}  >
                                {i !== 0 &&
                                    <div className="w-full border-b border-texttetriary" />
                                }
                                <div className="flex items-center px-2 py-2 space-x-2">
                                    <CheckBox
                                        id={item.text}
                                        name={item.text}
                                        checked={item.checked}
                                        onChange={() => addList(item)}
                                    />

                                    <p className="text-sm font-medium text-textmain -mt-1">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        )

                        }
                    </div>
                </div>
            </div>
            <div>
                {type === "double" &&
                    <div className="flex flex-col items-center space-y-2">
                        <IconCircleArrowRight size={30} className=" cursor-pointer text-textmain hover:text-main duration-300" onClick={() => addSelected()} />
                        <IconCircleArrowLeft size={30} className=" cursor-pointer text-textmain hover:text-main duration-300" onClick={() => removeSelected()} />
                    </div>
                }
            </div>
            {type === "double" &&
                <div className={`${width && width} flex flex-col`}>
                    <div className='flex justify-between items-end  py-2 bg-white h-12  border-texttetriary '>
                        <span className="mb-1 text-sm text-textmain">{labelType}</span>
                        {selectedItems?.length > 0 &&
                            <button
                                type='button'
                                className="p-2  text-xs font-medium text-white rounded-md bg-main hover:bg-secondary hover:text-main duration-300 cursor-pointer"
                                onClick={() => {
                                    if (selectedItemList.filter((item: any) => item.checked).length == selectedItems.length) {
                                        setSelectedItems(selectedItems.map((x) => ({ ...x, checked: false })))
                                        setSelectedItemList([])
                                    }
                                    else {
                                        let newFilteredResult: any = []
                                        selectedItems.map((x) => {
                                            newFilteredResult.push({ ...x, checked: true })
                                        })
                                        setSelectedItems(newFilteredResult)
                                        setSelectedItemList(newFilteredResult)
                                    }
                                }}
                            >
                                {(selectedItemList.filter((item: any) => item.checked).length == selectedItems.length) ? "Tümünü Kaldır" : "Tümünü Seç"}
                            </button>
                        }
                    </div>
                    <div className="relative flex">
                        <input onChange={(e) => setSearchTypeInput(e.target.value)} placeholder="Search" className="w-full py-2 pl-2 pr-6 bg-white border rounded-t-lg outline-none border-texttetriary" />
                        <div className="absolute right-2 top-2">
                            {searchTypeInput.length > 1 ?
                                <IconX className="text-xl cursor-pointer text-textmain" onClick={() => setSearchTypeInput("")} />
                                :
                                <IconSearch className="text-xl  text-textmain" />
                            }
                        </div>
                    </div>
                    <div className="bg-white border-b border-l border-r rounded-b-lg border-texttetriary">

                        <div className={`${height ? height : height} overflow-auto`}>
                            {selectedItems?.length > 0 &&
                                selectedItems?.filter(x => fixTurkishCharacters(x.text)?.toLowerCase().includes(fixTurkishCharacters(searchTypeInput).toLowerCase())).sort((a, b) => a.id - b.id).map((item, i) =>
                                    <div className="flex flex-col duration-300 cursor-pointer hover:bg-gray-200" key={i} onClick={() => removeList(item)}>
                                        {i !== 0 &&
                                            <div className="w-full border-b border-texttetriary" />
                                        }
                                        <div className="flex items-center px-2 py-2 space-x-2">
                                            <CheckBox
                                                id={item.text}
                                                name={i.toString()}
                                                checked={item.checked}
                                                onChange={() => removeList(item)}
                                            />

                                            <p className="text-sm font-medium text-textmain -mt-1">
                                                {item.text}
                                            </p>

                                        </div>

                                    </div>
                                )

                            }
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default ListBox