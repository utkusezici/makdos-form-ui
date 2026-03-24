
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { useNavigate, useLocation, createSearchParams } from 'react-router-dom';
import SelectBox from './SelectBox';
import { useSearchParams } from 'react-router-dom';
import { useWindowSize } from 'hooks';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import { informationToast } from 'components/Toast/AllToast';

type Props = {
    pageTotal: number
    pageLimit: number
    onPageLimitChange: (value: number) => void
}

function Paginate({ pageTotal, pageLimit, onPageLimitChange }: Props) {

    const navigate = useNavigate()
    const location = useLocation()
    const [selected, setSelected] = useState(1)
    const { width } = useWindowSize()
    const [pageCount, setPageCount] = useState(0);

    const [selectedCount, setSelectedCount] = useState({
        id: 3,
        text: pageLimit.toString(),
        checked: false
    })

    const [searchParams, setSearchParams] = useSearchParams()

    const [selectBoxItems, setSelectBoxItems] = useState([
        {
            id: 1,
            text: "20",
            checked: false
        },
        {
            id: 2,
            text: "50",
            checked: false
        },
        {
            id: 3,
            text: "100",
            checked: false
        },
        {
            id: 4,
            text: "200",
            checked: false
        },
        {
            id: 5,
            text: "500",
            checked: false
        },
    ])


    const handlePageClick = ({ selected }: any) => {
        if (selected === 0) {
            navigate(location.pathname)
        }
        else {
            navigate({
                pathname: location.pathname, search: createSearchParams({
                    p: selected + 1
                }).toString()
            })
        }
        setSelected(selected + 1)
    }

    const limitChange = (value: any) => {
        if (value.text !== "") {
            onPageLimitChange(parseInt(value.text))
        } else {
            onPageLimitChange(10)
        }
    }

    useEffect(() => {
        if (pageLimit > 0) {
            setPageCount(pageTotal)
        }
    }, [pageTotal, pageLimit]);

    useEffect(() => {
        if (searchParams.get("p")) {
            setSelected(parseInt(searchParams.get("p") || "1"))
        }
    }, [])

    return (
        <div className="flex justify-end items-center space-x-5">
            <div className="flex items-center justify-end  space-x-2 ">
                <p className="text-sm font-medium text-textmain">Sayfa Başına Kayıt</p>
                <div className="w-[70px]">
                    <SelectBox
                        items={selectBoxItems}
                        setItems={(v: any) => setSelectBoxItems(v)}
                        selectedItems={selectedCount}
                        setSelectedItems={(v: any) => setSelectedCount(v)}
                        paginate={true}
                        onChange={(v: any) => {
                            limitChange(v)
                            informationToast({ title: "Yükleniyor", text: "Lütfen bekleyiniz." })
                            if (searchParams.get("p")) {
                                navigate(location.pathname)
                                setSelected(1)
                            }
                        }}
                        style="h-[40px]"
                    />
                </div>
            </div>
            <div className="flex justify-end ">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel={<IconChevronRight size={20} className='text-textmain' />}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={width ? (width > 500 ? 2 : 1) : 2}
                    marginPagesDisplayed={width ? (width > 500 ? 3 : 1) : 3}
                    pageCount={pageCount}
                    previousLabel={<IconChevronLeft size={20} className='text-textmain' />}
                    className="flex items-center justify-center transparent "
                    nextClassName="flex rounded-lg bg-white text-textmain w-8 h-8  hover:text-main justify-center items-center  font-semibold border border-bordercolor cursor-pointer"
                    previousClassName="flex rounded-lg bg-white text-textmain w-8 h-8  hover:text-main justify-center items-center  font-semibold border border-bordercolor cursor-pointer"
                    pageLinkClassName="bg-white text-textmain mr-1.5 ml-1.5 py-2  w-8 h-8  text-xs rounded-lg flex justify-center items-center font-semibold border border-bordercolor cursor-pointer"
                    breakClassName="text-textmain hover:text-main "
                    pageClassName="flex text-textmain hover:text-main cursor-pointer"
                    activeLinkClassName="bg-white mr-1.5 ml-1.5 py-2 text-main w-8 h-8  text-sm rounded-lg flex justify-center items-center font-semibold border border-bordercolor"
                    forcePage={selected - 1}
                />
            </div>
        </div>
    )
}

export default Paginate