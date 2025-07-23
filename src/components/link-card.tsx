'use client'

import { LinkSimpleIcon } from '@phosphor-icons/react'
import type { Link } from '@/types/activity'

type LinkCardProps = {
  link: Link
}

export function LinkCard({ link }: LinkCardProps) {
  return (
    <a className="border-border flex h-20 w-80 overflow-hidden rounded-md border">
      <div className="border-border border-rf flex size-20 shrink-0 items-center justify-center bg-purple-500/40">
        <LinkSimpleIcon className="size-8 text-purple-500" />
      </div>
      <div className="flex w-full flex-col gap-1 overflow-hidden p-4">
        <p className="text-accent-foreground w-full overflow-hidden text-sm font-semibold text-ellipsis whitespace-nowrap">
          {link.description}
        </p>
        <p className="text-accent-foreground/80 text-sm">{link.link}</p>
      </div>
    </a>
  )
}
