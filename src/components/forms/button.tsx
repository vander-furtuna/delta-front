import { Button as BaseButton } from '@/components/base/button'
import type { ComponentProps } from 'react'

type ButtonProps = ComponentProps<typeof BaseButton.Root>

export function Button({ ...rest }: ButtonProps) {
  return <BaseButton.Root {...rest} />
}
