import { Suspense } from 'react'
import { ActivitiesFilter } from './components/activities-filter'
import { ActivitiesList } from './components/activities-list'

export default function ActivitiesPage() {
  return (
    <article
      className="flex h-full w-full overflow-y-auto"
      data-color="pratice"
    >
      <Suspense>
        <section className="flex h-full w-full flex-col gap-8 px-8 py-8">
          <div className="flex h-fit w-full flex-col items-center justify-between gap-4 md:flex-row">
            <h1 className="font-heading text-4xl font-semibold">Atividades</h1>
            <ActivitiesFilter />
          </div>

          <ActivitiesList />
        </section>
      </Suspense>
    </article>
  )
}
