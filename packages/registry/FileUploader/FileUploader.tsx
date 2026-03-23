import { useState } from 'react'
import FileUploaderModal from './FileUploaderModal'
import { IconEye, IconPaperclip } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

interface FileItem {
  id: number
  name: string
  url: string
}

interface FileUploaderProps {
  id?: string
  name?: string
  label?: string
  placeholder?: string
  value?: FileItem[]
  setValue?: (files: FileItem[] | File[]) => void
  defaultValue?: FileItem[]
  onChange?: (files: FileItem[] | File[]) => void
  required?: boolean
  disabled?: boolean
  min?: number
  max?: number
  formats?: string[]
  multiple?: number
  style?: string
  params?: FormData
  setParams?: (params: FormData) => void
  onlyFile?: boolean
  customStyle?: string
  customElement?: React.ReactNode
  clickID?: string
  onClick?: () => void
  data?: FileItem[]
  view?: string
}

function FileUploader({
  id,
  label,
  value = [],
  setValue,
  onChange,
  required = false,
  disabled = false,
  min,
  max,
  formats,
  multiple,
  style,
  params,
  setParams,
  onlyFile = false,
  customStyle,
  customElement,
  clickID,
  onClick,
  data = [],
  view
}: FileUploaderProps) {

  const [openModal, setOpenModal] = useState<boolean>(false)

  const handleClick = () => {
    if (disabled) return
    onClick ? onClick() : setOpenModal(true)
  }

  const totalFileCount = value.length + data.length
  const fileCountText = totalFileCount > 0
    ? `${totalFileCount} dosya`
    : 'Dosya Seç'

  return (
    <div className={style}>
      <div className="flex flex-col w-full space-y-1">
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-1'>
            {!customStyle && label && !clickID && (
              <label className="text-textcolor dark:text-darktextcolor">{label}</label>
            )}
            {required && (
              <span className="text-xs mt-1 text-error500">*</span>
            )}
          </div>

          {view && (
            <Link to={view.includes("http") ? view : `${import.meta.env.VITE_IMAGE_URL}${view}`} target='_blank'>
              <IconEye className="text-xl text-slate-400 dark:text-textmain" />
            </Link>
          )}
        </div>

        <div className={`flex relative items-center ${clickID ? "hidden" : ""}`}>
          <IconPaperclip
            className="absolute left-2 text-xl text-slate-400 dark:text-textmain cursor-pointer"
            onClick={handleClick}
          />
          <div
            id={clickID}
            className="border w-full bg-white placeholder:font-medium rounded-lg px-9 py-3 border-slate-200 dark:border-darkbordercolor dark:bg-darkinputbackground dark:text-darktexttitle text-slate-500 placeholder-slate-400 dark:placeholder-darktexttitle focus:placeholder-slate-500 focus:outline-hidden font-medium text-sm disabled:text-textsecondary disabled:bg-border cursor-pointer"
            onClick={handleClick}
          >
            {!customStyle ? (
              <div className="flex justify-between items-center space-x-1">
                <p className={`font-medium ${totalFileCount > 0
                  ? 'text-textcolor dark:text-placeholdercolor'
                  : 'text-slate-400 dark:text-placeholdercolor'
                  }`}>
                  {fileCountText}
                </p>
              </div>
            ) : (
              customElement
            )}
          </div>
        </div>

        <FileUploaderModal
          id={id}
          value={value}
          setValue={setValue}
          onChange={onChange}
          min={min}
          max={max}
          formats={formats}
          multiple={multiple}
          isOpen={openModal}
          closeModal={() => setOpenModal(false)}
          params={params}
          setParams={setParams}
          onlyFile={onlyFile}
        />
      </div>
    </div>
  )
}

export default FileUploader