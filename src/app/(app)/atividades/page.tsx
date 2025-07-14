import { ActivitiesFilter } from './components/activities-filter'
import { ActivitiesList } from './components/activities-list'

export default function ActivitiesPage() {
  return (
    <article
      className="h-full w-full overflow-x-hidden overflow-y-auto"
      data-color="pratice"
    >
      <section className="flex flex-col gap-8 px-8 py-8">
        <div className="flex w-full items-center justify-between gap-4">
          <h1 className="font-heading text-4xl font-semibold">Atividades</h1>

          <ActivitiesFilter />
        </div>

        <ActivitiesList />
      </section>
    </article>
  )
}
