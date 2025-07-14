'use client'

import { useId, type ComponentProps, type ReactNode } from 'react'

import {
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type Options = {
  value: string
  label: string
  icon?: ReactNode
}

type SelectProps = {
  options: Options[]
  placeholder?: string
} & ComponentProps<typeof SelectPrimitive>

export function Select({ options, placeholder, ...props }: SelectProps) {
  const id = useId()
  return (
    <SelectPrimitive {...props}>
      <SelectTrigger
        id={id}
        className="[&>span_svg]:text-muted-foreground/80 bg-accent dark:bg-accent focus:border-primary dark:focus:border-primary h-12! border-0 border-b-2 ring-0 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="[&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.icon}
            <span className="truncate">{option.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </SelectPrimitive>
  )
}
