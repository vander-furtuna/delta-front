import type { Icon } from '@phosphor-icons/react'
import { Input } from '../base/input'
import { Label } from '../base/label'
import type { ComponentProps } from 'react'

type TextInputProps = {
  icon?: Icon
  error?: string
  label?: string
} & ComponentProps<'input'>

export function TextInput({
  icon,
  label,
  error,
  ref,
  ...rest
}: TextInputProps) {
  return (
    <Input.Root>
      <Input.Container>
        <Input.Content>
          <Label.Root>
            {icon && <Label.Icon icon={icon} />}
            <Label.Element>{label}</Label.Element>
          </Label.Root>
          <Input.Element ref={ref} {...rest} />
        </Input.Content>
      </Input.Container>
      {error && <Input.Error message={error} />}
    </Input.Root>
  )
}
