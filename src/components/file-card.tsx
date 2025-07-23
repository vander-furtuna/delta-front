'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { PDFIcon } from './icons/pdf-icon'
import { FileIcon, FileTextIcon, FloppyDiskIcon } from '@phosphor-icons/react'
import { ImageIcon } from 'lucide-react'
import type { File } from '@/types/activity'
import { parseFileType } from '@/utils/file/get-file-type'
import { useMemo } from 'react'
import { getFileSizeInMegabytes } from '@/utils/file/get-file-size-in-megabytes'
import { getFileExtension } from '@/utils/file/get-file-extension'
import { getFileName } from '@/utils/file/get-file-name'

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
      return <FileTextIcon className="size-8 text-sky-500" />
    case 'image':
      return <ImageIcon className="size-8 text-emerald-500" />
    default:
      return <FileIcon className="dark:text-primary size-8 text-stone-700" />
  }
}

export function FileCard({ file }: FileCardProps) {
  console.log('FileCard fileType:', file.fileType)
  console.log('FileCard parsed:', parseFileType(file.fileType))

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

  return (
    <div className="border-border flex h-20 w-80 overflow-hidden rounded-md border">
      <div className={fileIconVariants({ color: fileType })}>
        {fileType && getFileIcon(fileType)}
      </div>
      <div className="flex w-full flex-col gap-1 overflow-hidden p-4">
        <p className="text-accent-foreground w-full overflow-hidden text-sm font-semibold text-ellipsis whitespace-nowrap">
          {fileName}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-full">
            <FileIcon className="text-accent-foreground/80 size-4.5" />
            <span className="text-sm uppercase">{fileExtension}</span>
          </div>
          <div className="bg-border h-[80%] w-[1.5px] rounded-full" />
          <div className="flex items-center gap-1 rounded-full">
            <FloppyDiskIcon className="text-accent-foreground/80 size-4.5" />
            <span className="text-sm">{fileSizeInMB} MB</span>
          </div>
        </div>
      </div>
    </div>
  )
}
