'use client '

import { cn } from '@/lib/utils'
import { Input } from '../base/input'
import type { ComponentProps } from 'react'

type SearchInputProps = ComponentProps<'input'>

export function SearchInput({ ref, className, ...rest }: SearchInputProps) {
  return (
    <Input.Root>
      <Input.Container className={cn('h-12 w-56', className)}>
        <Input.Content>
          <Input.Element ref={ref} {...rest} placeholder="Buscar..." />
        </Input.Content>
      </Input.Container>
    </Input.Root>
  )
}
