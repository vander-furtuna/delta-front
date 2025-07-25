import { Suspense } from 'react'

export default function DashboardPage() {
  return (
    <article className="flex h-full w-full flex-col justify-start gap-2">
      <Suspense>
        <section className="flex h-full w-full flex-col gap-8 px-8 py-8">
          <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row">
            <h1 className="font-heading text-4xl font-semibold">Dashboard</h1>
          </div>
        </section>
      </Suspense>
    </article>
  )
}
