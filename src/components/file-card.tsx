'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { PDFIcon } from './icons/pdf-icon'
import {
  FileIcon,
  FileTextIcon,
  FloppyDiskIcon,
  ImageIcon,
} from '@phosphor-icons/react'
import type { File } from '@/types/activity'
import { parseFileType } from '@/utils/file/get-file-type'
import { useCallback, useMemo } from 'react'
import { getFileSizeInMegabytes } from '@/utils/file/get-file-size-in-megabytes'
import { getFileExtension } from '@/utils/file/get-file-extension'
import { getFileName } from '@/utils/file/get-file-name'
import { useMutation } from '@tanstack/react-query'
import { getFileLinkService } from '@/services/activities/get-file-link-service'

const fileIconVariants = cva(
  'border-border size-20 border-rf flex items-center justify-center shrink-0',
  {
    variants: {
      color: {
        default: 'bg-primary/40',
        pdf: 'bg-rose-500/40',
        doc: 'bg-sky-500/40',
        image: 'bg-emerald-500/40',
      },
    },
    defaultVariants: {
      color: 'default',
    },
  },
)

type FileCardProps = {
  file: File
}

function getFileIcon(fileType: string | null) {
  switch (fileType) {
    case 'pdf':
      return <PDFIcon className="size-8 fill-rose-500" />
    case 'doc':
      return <FileTextIcon className="size-8 text-sky-500" weight="duotone" />
    case 'image':
      return <ImageIcon className="size-8 text-emerald-500" weight="duotone" />
    default:
      return (
        <FileIcon
          className="dark:text-primary size-8 text-stone-700"
          weight="duotone"
        />
      )
  }
}

export function FileCard({ file }: FileCardProps) {
  const fileType = useMemo(() => {
    const parsedType = parseFileType(file.fileType)
    return parsedType as VariantProps<typeof fileIconVariants>['color']
  }, [file.fileType])

  const fileSizeInMB = useMemo(
    () => getFileSizeInMegabytes(file.size),
    [file.size],
  )

  const fileExtension = useMemo(
    () => getFileExtension(file.fileType),
    [file.fileType],
  )

  const fileName = useMemo(() => getFileName(file.fileName), [file.fileName])

  const { mutateAsync: getFileLinkMutate } = useMutation({
    mutationKey: ['getFileLink', file.id],
    mutationFn: () =>
      getFileLinkService({
        fileId: file.id,
      }),
    onSuccess: (data) => {
      console.log('File fetched successfully:', data)
    },
  })

  const handleGetFile = useCallback(async () => {
    const fileLink = await getFileLinkMutate()

    if (fileLink) {
      window.open(fileLink, '_blank')
    } else {
      console.error('Failed to fetch file link')
    }
  }, [getFileLinkMutate])

  return (
    <button
      className="border-border flex h-20 w-80 overflow-hidden rounded-md border"
      onClick={handleGetFile}
    >
      <div className={fileIconVariants({ color: fileType })}>
        {fileType && getFileIcon(fileType)}
      </div>
      <div className="flex w-full flex-col gap-1 overflow-hidden p-4">
        <p className="text-accent-foreground w-full overflow-hidden text-start text-sm font-semibold text-ellipsis whitespace-nowrap">
          {fileName}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full">
            <FileIcon
              weight="duotone"
              className="text-accent-foreground/80 size-4.5"
            />
            <span className="text-sm uppercase">{fileExtension}</span>
          </div>
          <div className="bg-border h-[80%] w-[1.5px] rounded-full" />
          <div className="flex items-center gap-1 rounded-full">
            <FloppyDiskIcon
              weight="duotone"
              className="text-accent-foreground/80 size-4.5"
            />
            <span className="text-sm">{fileSizeInMB} MB</span>
          </div>
        </div>
      </div>
    </button>
  )
}

export function FileCardSkeleton() {
  return (
    <div className="border-border flex h-20 w-80 animate-pulse items-center justify-start overflow-hidden rounded-md border">
      <div className={fileIconVariants({ color: 'default' })}>
        <FileIcon weight="duotone" className="size-8 text-stone-700" />
      </div>
      <div className="flex w-full flex-col gap-1 overflow-hidden p-4">
        <div className="bg-accent h-5 w-[80%] rounded-full" />
        <div className="flex items-center gap-1">
          <div className="bg-accent h-4 w-16 rounded-full" />
          <div className="bg-accent h-4 w-16 rounded-full" />
        </div>
      </div>
    </div>
  )
}
