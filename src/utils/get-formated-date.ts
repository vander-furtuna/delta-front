import { parseISO, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function getFormattedDate(dateString: string): string {
  const parsedDate = parseISO(dateString)
  const formattedDate = format(parsedDate, "dd 'de' LLL'.'", {
    locale: ptBR,
  })

  return formattedDate
}
