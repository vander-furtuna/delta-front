import { Button } from '@/components/forms/button'
import { SearchInput } from '@/components/forms/search-input'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/ssr'

export default function DashboardPage() {
  return (
    <article className="w-full" data-color="pratice">
      <section className="px-4 py-4">
        <div>
          <h1 className="font-heading text-4xl font-semibold">Práticas</h1>

          <div className="flex">
            <SearchInput />
            <Button>
              <MagnifyingGlassIcon />
            </Button>
          </div>
        </div>
      </section>
    </article>
  )
}
