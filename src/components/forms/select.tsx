'use client'

import {
  useCallback,
  useId,
  useState,
  type ComponentProps,
  type ReactNode,
} from 'react'

import {
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { XIcon } from '@phosphor-icons/react'
import { Button } from '../ui/button'

export type Options = {
  value: string
  label: string
  icon?: ReactNode
}

type SelectProps = {
  options: Options[]
  placeholder?: string
  onValueChange?: (value: string | undefined) => void
} & ComponentProps<typeof SelectPrimitive>

export function Select({
  options,
  placeholder,
  value,
  onValueChange,
  ...props
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value)

  const handleValueChange = useCallback(
    (value: string | undefined) => {
      setSelectedValue(value ?? '')
      if (onValueChange) {
        onValueChange(value)
      }
    },
    [onValueChange],
  )

  const id = useId()
  return (
    <SelectPrimitive
      {...props}
      value={selectedValue}
      onValueChange={handleValueChange}
    >
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

        <Button
          onClick={() => handleValueChange(undefined)}
          variant="ghost"
          className="bg-accent w-full"
        >
          <XIcon className="text-muted-foreground/80 size-4" weight="duotone" />
          Limpar
        </Button>
      </SelectContent>
    </SelectPrimitive>
  )
}
