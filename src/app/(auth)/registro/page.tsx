import Link from 'next/link'
import { SignUpForm } from './components/sign-up-form'

export default function SignUpPage() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-2">
        <h1 className="font-heading text-foreground text-4xl font-bold">
          Registro
        </h1>
        <p className="text-muted-foreground w-4/5 text-sm">
          Crie uma conta para acessar o <strong>delta</strong>.
        </p>
      </div>
      <SignUpForm />
      <p className="text-muted-foreground text-sm">
        Já tem uma conta?{' '}
        <Link className="text-foreground font-semibold" href="/entrar">
          Entre
        </Link>
      </p>
    </div>
  )
}
