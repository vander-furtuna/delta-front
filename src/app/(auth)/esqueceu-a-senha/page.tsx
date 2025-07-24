import Link from 'next/link'
import { ForgetPasswordForm } from './components/forget-password-form'

export default function ForgetPasswordPage() {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex w-full flex-col gap-2">
        <h1 className="font-heading text-foreground text-4xl font-bold">
          Esqueceu a Senha?
        </h1>
        <p className="text-muted-foreground w-4/5 text-sm">
          Informe seu email para receber as instruções de recuperação de senha.
        </p>
      </div>

      <ForgetPasswordForm />

      <p className="text-muted-foreground text-sm">
        Não tem uma conta?{' '}
        <Link className="text-foreground font-semibold" href="/registro">
          Cadastre-se
        </Link>
      </p>
    </div>
  )
}
