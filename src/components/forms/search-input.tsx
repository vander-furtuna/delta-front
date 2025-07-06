'use client '

import { Input } from '../base/input'
import type { ComponentProps } from 'react'

type SearchInputProps = ComponentProps<'input'>

export function SearchInput({ ref, ...rest }: SearchInputProps) {
  return (
    <Input.Root>
      <Input.Container className="h-12">
        <Input.Content>
          <Input.Element ref={ref} {...rest} />
        </Input.Content>
      </Input.Container>
    </Input.Root>
  )
}
