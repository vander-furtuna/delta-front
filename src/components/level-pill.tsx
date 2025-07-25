import { cn } from '@/lib/utils'
import { type ComponentProps } from 'react'
import { DeltaIcon } from './icons/delta'

type LevelPillProps = {
  level: number
} & ComponentProps<'div'>

export function LevelPill({ level, className, ...props }: LevelPillProps) {
  return (
    <div
      className={cn(
        'bg-primary/20 text-accent-foreground border-primary/50 flex h-6 w-fit items-center gap-1 rounded-full border px-2 py-0.5',
        className,
      )}
      {...props}
    >
      <DeltaIcon className="fill-primary size-3.5" />
      <span className="text-sm leading-tight text-inherit">{level}</span>
    </div>
  )
}
