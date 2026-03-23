import { IconCalendar } from '@tabler/icons-react'
import moment from 'moment'
import { useEffect, useState, useRef } from 'react'
import DateTime from './DateTime'
import { useOutSideClick } from 'hooks'
import Button from './Button'

type Props = {
    placeholder: string
    value: any
    onChange: (value: any) => void
    style?: string
    onChangeDateTime: (date: any) => void
}

function DatePicketBig({ placeholder, value, onChange, style, onChangeDateTime }: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [wrapperRef] = useOutSideClick(() => setIsOpen(false))

    const [dateList, setDateList] = useState<any[]>([])
    const [startDate, setStartDate] = useState<string | null>(null)
    const [endDate, setEndDate] = useState<string | null>(null)
    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

    const onListDate = async () => {
        let dates = [
            {
                text: "Bugün",
                startDate: moment().format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                text: "Son 7 Gün",
                startDate: moment().subtract(7, 'days').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                text: "Son 30 Gün",
                startDate: moment().subtract(30, 'days').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                text: "Son 60 Gün",
                startDate: moment().subtract(60, 'days').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                text: "Son 120 Gün",
                startDate: moment().subtract(120, 'days').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },

            {
                text: "Bu Ay",
                startDate: moment().startOf('month').format('YYYY-MM-DD'),
                endDate: moment().endOf('month').format('YYYY-MM-DD')
            },
            {
                text: "Geçen Ay",
                startDate: moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
                endDate: moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
            },
            {
                text: "Son 3 Ay ",
                startDate: moment().subtract(3, 'months').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                text: "Son 6 Ay",
                startDate: moment().subtract(6, 'months').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },

            {
                text: "Son 12 Ay",
                startDate: moment().subtract(12, 'months').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                text: "Son 24 Ay",
                startDate: moment().subtract(24, 'months').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                text: "Günümüze Kadarki Çeyrek (QTD)",
                startDate: moment().startOf('quarter').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },

            {
                text: "Geçen Çeyrek",
                startDate: moment().subtract(1, 'quarter').startOf('quarter').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                text: "Günümüze Kadarki Yıl (YTD)",
                startDate: moment().startOf('year').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                text: "Geçen Yıl",
                startDate: moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD'),
                endDate: moment().format('YYYY-MM-DD')
            },
            {
                text: "Custom",
                startDate: undefined,
                endDate: undefined
            }
        ]
        setDateList(dates)
    }

    const onSelectDate = (date: any) => {
        onChange(date)
        onChangeDateTime(date)
        setStartDate("")
        setEndDate("")
        setIsOpen(false)
    }

    const onChangeDate = (date: any, type: string) => {
        let startDateNew = type === "start_date" ? date : startDate
        let endDateNew = type === "end_date" ? date : endDate
        if (type === "start_date") {
            setStartDate(startDateNew)
        } else if (type === "end_date") {
            setEndDate(endDateNew)
        }

        // Önceki debounce timer'ı temizle
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current)
        }

        // Her iki tarih de var ve geçerli tarih formatında mı kontrol et
        if (startDateNew && endDateNew) {
            const isStartDateValid = moment(startDateNew, 'YYYY-MM-DD', true).isValid()
            const isEndDateValid = moment(endDateNew, 'YYYY-MM-DD', true).isValid()

            // Her iki tarih de geçerliyse debounce ile API isteği at
            if (isStartDateValid && isEndDateValid) {
                debounceTimerRef.current = setTimeout(() => {
                    onChange({ text: "Custom", startDate: startDateNew, endDate: endDateNew })
                    onChangeDateTime({ text: "Custom", startDate: startDateNew, endDate: endDateNew })
                    setIsOpen(false)
                }, 800) // 800ms bekle
            }
        }

    }


    useEffect(() => {
        onListDate()

        // Cleanup: component unmount olduğunda timer'ı temizle
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current)
            }
        }
    }, [])

    return (
        <div className={`relative w-full  cursor-pointer ${style ? style : ""}`}>
            <div onClick={() => setIsOpen(true)} className='border flex items-center justify-between rounded-lg bg-white w-full px-3 py-3 border-bordercolor text-textcolor placeholder-placeholdercolor  focus:placeholder-focusplaceholdercolor focus:outline-hidden    disabled:text-disabletextcolor disabled:bg-darkdisablebackgroundcolor'>
                <p>{value ? (value?.text !== "Custom" ? value?.text : `${value?.startDate} - ${value?.endDate}`) : placeholder}</p>
                <IconCalendar className='text-iconcolor' />
            </div>
            <div className="h-4"></div>

            <div ref={wrapperRef} className={`absolute bg-white rounded-lg shadow-lg top-13 left-0 p-4 w-[570px] max-h-[600px] z-50 ${isOpen ? "block" : "hidden"}`}>
                <div className='grid grid-cols-2 gap-4 items-start'>
                    <div>
                        <p className='text-main text-lg font-semibold'>Gün</p>
                        {dateList.slice(0, 5).map((item) => (
                            <div onClick={() => onSelectDate(item)} className='mb-1 hover:text-main cursor-pointer duration-300' key={item.text}>
                                <p>{item.text}</p>
                            </div>
                        ))}

                    </div>

                    <div>
                        <p className='text-main text-lg font-semibold'>Ay</p>
                        {dateList.slice(5, 11).map((item) => (
                            <div onClick={() => onSelectDate(item)} className='mb-1 hover:text-main cursor-pointer duration-300' key={item.text}>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>


                    <div>
                        <p className='text-main text-lg font-semibold'>Çeyrek</p>
                        {dateList.slice(11, 13).map((item) => (
                            <div onClick={() => onSelectDate(item)} className='mb-1 hover:text-main cursor-pointer duration-300' key={item.text}>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <p className='text-main text-lg font-semibold'>Yıl</p>
                        {dateList.slice(13, 15).map((item) => (
                            <div onClick={() => onSelectDate(item)} className='mb-1 hover:text-main cursor-pointer duration-300' key={item.text}>
                                <p>{item.text}</p>
                            </div>
                        ))}
                    </div>
                    <p className='text-main text-lg font-semibold col-span-2'>Tarih Aralığı</p>

                    <div>
                        <DateTime
                            name="start_date"
                            value={startDate ? startDate : undefined}
                            onChange={(value: string) => onChangeDate(value, "start_date")}
                            label='Başlangıç Tarihi'
                        />

                    </div>
                    <div>
                        <DateTime
                            name="end_date"
                            value={endDate ? endDate : undefined}
                            onChange={(value: string) => onChangeDate(value, "end_date")}
                            label='Bitiş Tarihi'
                        />
                    </div>
                </div>
                <div className='flex justify-end mt-4'>
                    <Button
                        onClick={() => { onChange(null); onChangeDateTime(null); setIsOpen(false) }}
                        text='Temizle'
                        buttonType='bordered'
                    />
                </div>

            </div>

        </div>
    )
}

export default DatePicketBig