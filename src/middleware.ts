import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clona os cabeçalhos da requisição original
  const requestHeaders = new Headers(request.headers)

  // Adiciona a URL completa em um cabeçalho customizado
  requestHeaders.set('x-url', request.url)
  // Adiciona apenas o pathname em outro cabeçalho customizado
  requestHeaders.set('x-pathname', request.nextUrl.pathname)

  // Retorna a resposta, continuando o fluxo com os novos cabeçalhos
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
