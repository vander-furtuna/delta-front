import type { Icon } from '@phosphor-icons/react'
import { Input } from '../base/input'
import { Label } from '../base/label'
import type { ComponentProps } from 'react'

type TextareaProps = {
  icon?: Icon
  error?: string
  label?: string
} & ComponentProps<'textarea'>

export function Textarea({ icon, label, error, ref, ...rest }: TextareaProps) {
  return (
    <Input.Root>
      <Input.Container className="h-24">
        <Input.Content>
          <Label.Root>
            {icon && <Label.Icon icon={icon} />}
            <Label.Element>{label}</Label.Element>
          </Label.Root>
          <Input.TextareaElement ref={ref} {...rest} />
        </Input.Content>
      </Input.Container>
      {error && <Input.Error message={error} />}
    </Input.Root>
  )
}
