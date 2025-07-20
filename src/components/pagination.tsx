'use client'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'
import { ComponentProps } from 'react'

import { Button } from './ui/button'

interface paginationProps extends ComponentProps<'div'> {
  page: number
  numberOfElements: number
  size: number
  onPageChange: (pageNumber: number) => Promise<void> | void
}

export function Pagination({
  page,
  numberOfElements,
  size,
  onPageChange,
}: paginationProps) {
  const pages = Math.ceil(numberOfElements / size) || 1

  return (
    <div className="flex shrink-0 items-center justify-between">
      <span className="text-muted-foreground text-sm">
        Total de {numberOfElements} item(s)
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="flex text-sm font-medium">
          Página {page + 1} de {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(0)}
            disabled={page === 0}
          >
            <ChevronsLeft />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
          >
            <ChevronLeft />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(page + 1)}
            disabled={page === pages - 1}
          >
            <ChevronRight />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPageChange(pages - 1)}
            disabled={page === pages - 1}
          >
            <ChevronsRight />
            <span className="sr-only">Última página</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
