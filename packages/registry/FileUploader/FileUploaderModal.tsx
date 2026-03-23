import { alertToast } from 'components/Toast/AllToast';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Button from '../components/Button';
import ModalLayout from 'components/ModalLayout/ModalLayout';
import { IconCloudUpload, IconTrash } from '@tabler/icons-react';

interface FileItem {
    id: number
    name: string
    url: string
}

interface FileUploaderModalProps {
    id?: string
    value?: FileItem[]
    setValue?: (files: FileItem[] | File[]) => void
    isOpen?: boolean
    onChange?: (files: FileItem[] | File[]) => void
    min?: number
    max?: number
    formats?: string[]
    multiple?: number
    closeModal?: () => void
    params?: FormData
    setParams?: (params: FormData) => void
    onlyFile?: boolean
    onSave?: (files: FileItem[]) => void
}


function FileUploaderModal({
    id = 'file-uploader',
    value = [],
    setValue,
    isOpen = false,
    onChange,
    min = 1024, // 1KB
    max = 20971520, // 20MB
    formats,
    multiple = 10,
    closeModal,
    setParams,
    onlyFile = false,
    onSave
}: FileUploaderModalProps) {

    const [allFile, setAllFile] = useState<FileItem[]>([])
    const drop = useRef<HTMLLabelElement>(null)


    const handleDragOver = useCallback((e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const handleDragOut = useCallback((e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }, [])

    const validateFiles = useCallback((files: File[]): string | null => {
        if (multiple <= allFile.length || files.length > multiple) {
            return `En fazla ${multiple} adet dosya seçebilirsiniz`
        }

        if (formats && files.some(file =>
            !formats.some(format => file.name.toLowerCase().endsWith(format.toLowerCase()))
        )) {
            return "Bu formatta dosya yükleyemezsiniz"
        }

        if (files.some(file => file.size > max)) {
            return `En fazla ${Math.round(max / 1024 / 1024)} MB boyutunda dosya seçebilirsiniz`
        }

        if (files.some(file => file.size < min)) {
            return `En az ${Math.round(min / 1024)} KB boyutunda dosya seçebilirsiniz`
        }

        return null
    }, [allFile.length, multiple, formats, max, min])

    const processFiles = useCallback((files: File[]) => {
        const errorMessage = validateFiles(files)
        if (errorMessage) {
            alertToast({ title: "File", text: errorMessage })
            return
        }

        const processedFiles: FileItem[] = files.map((file, index) => ({
            id: index + allFile.length,
            name: file.name,
            url: URL.createObjectURL(file)
        }))

        if (onlyFile) {
            setAllFile(processedFiles)
            setValue?.(files)
            onChange?.(files)
        } else {
            const newFiles = [...allFile, ...processedFiles]
            setAllFile(newFiles)
            setValue?.(newFiles)
            onChange?.(newFiles)

            if (setParams) {
                const formData = new FormData()
                files.forEach(file => formData.append("file", file))
                setParams(formData)
            }
        }
    }, [allFile, validateFiles, onlyFile, setValue, onChange, setParams])

    const handleDrop = useCallback((e: DragEvent) => {
        e.preventDefault()
        e.stopPropagation()

        if (!e.dataTransfer?.files) return
        const files = Array.from(e.dataTransfer.files)
        processFiles(files)
    }, [processFiles])

    const onAddFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return
        const files = Array.from(e.target.files)
        processFiles(files)
        e.target.value = '' // Reset input
    }, [processFiles])

    const handleSave = useCallback(() => {
        if (!onlyFile) {
            setValue?.(allFile)
        }

        onSave?.(allFile)
        onChange?.(allFile)
        closeModal?.()
    }, [allFile, onlyFile, setValue, onSave, onChange, closeModal])

    const deleteFile = useCallback((id: number | string) => {
        setAllFile(prevFiles => {
            const filteredFiles = prevFiles.filter(file => {
                // Hem ID hem de name ile karşılaştır
                return file.id !== id && file.name !== id
            })

            setValue?.(filteredFiles)
            onChange?.(filteredFiles)

            return filteredFiles
        })
    }, [setValue, onChange])

    useEffect(() => {
        const dropElement = drop.current
        if (!dropElement) return

        dropElement.addEventListener('dragover', handleDragOver)
        dropElement.addEventListener('drop', handleDrop)
        dropElement.addEventListener('dragleave', handleDragOut)

        return () => {
            dropElement.removeEventListener('dragover', handleDragOver)
            dropElement.removeEventListener('drop', handleDrop)
            dropElement.removeEventListener('dragleave', handleDragOut)
        }
    }, [handleDragOver, handleDrop, handleDragOut])

    useEffect(() => {
        if (value && value.length > 0) {
            setAllFile(value)
        } else {
            setAllFile([])
        }
    }, [value])

    return (
        <ModalLayout
            closeModal={closeModal}
            title="Dosya Yükleyici"
            hideButton
            isOpen={isOpen}
            clickOutsideDisable={false}
        >
            <div className="flex flex-col space-y-4 px-4 ">
                <div className="w-[480px] h-[301px] border-2 border-dashed border-slate-200 dark:border-strokeline py-8">

                    <label
                        ref={drop}
                        htmlFor={id}
                        onClick={() => document.getElementById(id)?.click()}
                        className="flex flex-col space-y-1 items-center relative h-full w-full cursor-pointer"
                    >

                        <div className="flex w-18 px-3 py-2 rounded-full bg-main justify-center">
                            <IconCloudUpload className="text-white" size={40} />
                        </div>
                        <div className="pt-6 text-main font-semibold text-lg flex flex-col text-center">
                            <p>Dosyalarınızı buraya sürükleyip bırakın</p>
                            <p className="text-slate-600 text-sm">veya</p>
                        </div>
                        <Button
                            text="Dosya Yükle"
                            buttonType="primary"
                            type="button"
                        />
                        <div className="text-center pt-4">
                            <p className="text-textmain dark:text-darktexttitle text-xs">
                                Dosya boyutu en fazla {Math.round(max / 1024 / 1024)}MB olmalı
                                {formats && ` ve ${formats.join(', ')} uzantılarına sahip olmalıdır`}.
                            </p>
                        </div>
                        <div>
                            <input
                                id={id}
                                type="file"
                                className="hidden"
                                multiple={multiple > 1}
                                accept={formats ? formats.join(',') : "image/png,image/jpeg,image/jpg,image/gif,image/webp"}
                                onChange={onAddFileInput}
                            />
                        </div>
                    </label>

                </div>
                {allFile.length > 0 && (
                    <div className="flex flex-col space-y-5">
                        {allFile.map((item, index) => (
                            <div key={item.id || index} className="flex justify-between w-full items-center">
                                <p className="text-slate-600 dark:text-texttetriary flex-1">
                                    {item.name?.slice(0, 56)}
                                </p>
                                <button
                                    type="button"
                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                        deleteFile(item.id || item.name)
                                    }}
                                >
                                    <IconTrash className="text-red-500 text-xl" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <div className="border-b border-stroke dark:border-strokeline py-2" />

                <div className="flex justify-end space-x-2">
                    <Button
                        text="Kaydet"
                        buttonType="primary"
                        onClick={handleSave}
                        type="button"
                        icon="ri-checkbox-circle-line"
                        iconRight
                    />
                </div>
            </div>
        </ModalLayout>
    )
}

export default FileUploaderModal