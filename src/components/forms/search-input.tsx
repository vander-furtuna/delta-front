'use client '

import { Input } from '../base/input'
import type { ComponentProps } from 'react'

type SearchInputProps = ComponentProps<'input'>

export function SearchInput({ ref, ...rest }: SearchInputProps) {
  return (
    <Input.Root>
      <Input.Container className="h-12 w-56">
        <Input.Content>
          <Input.Element ref={ref} {...rest} placeholder="Buscar..." />
        </Input.Content>
      </Input.Container>
    </Input.Root>
  )
}
