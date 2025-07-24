import Link from 'next/link'
import { RecoverPasswordForm } from './components/recover-password-form'

export default function RecoverPasswordPage() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-2">
        <h1 className="font-heading text-foreground text-4xl font-bold">
          Recuperar Senha
        </h1>
        <p className="text-muted-foreground w-4/5 text-sm">
          Recupere sua senha para acessar o <strong>delta</strong>.
        </p>
      </div>

      <RecoverPasswordForm />

      <p className="text-muted-foreground text-sm">
        Não tem uma conta?{' '}
        <Link className="text-foreground font-semibold" href="/registro">
          Cadastre-se
        </Link>
      </p>
    </div>
  )
}
