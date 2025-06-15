'use client'

import { EyeClosedIcon, EyeIcon, type Icon } from '@phosphor-icons/react'
import { Input } from '../base/input'
import { Label } from '../base/label'
import { useState, type ComponentProps } from 'react'

type TextInputProps = {
  icon?: Icon
  error?: string
  label: string
} & ComponentProps<'input'>

export function PasswordInput({
  icon,
  label,
  error,
  ref,
  ...rest
}: TextInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  return (
    <Input.Root>
      <Input.Container>
        <Input.Content>
          <Label.Root>
            {icon && <Label.Icon icon={icon} />}
            <Label.Element>{label}</Label.Element>
          </Label.Root>
          <Input.Element
            type={isPasswordVisible ? 'text' : 'password'}
            ref={ref}
            {...rest}
          />
        </Input.Content>
        {isPasswordVisible ? (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(false)}
            className="size-fit"
          >
            <Input.Icon icon={EyeClosedIcon} />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(true)}
            className="size-fit"
          >
            <Input.Icon icon={EyeIcon} />
          </button>
        )}
      </Input.Container>
      {error && <Input.Error message={error} />}
    </Input.Root>
  )
}
