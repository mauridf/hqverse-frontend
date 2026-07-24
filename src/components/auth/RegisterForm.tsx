import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Eye, EyeOff, Mail, Lock, User, UserRound, 
  CheckCircle, XCircle 
} from 'lucide-react';
import { registerSchema, type RegisterInput } from '@/lib/validations/auth.schema';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export function RegisterForm() {
  const { register: registerUser, isRegistering } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    letter: false,
    number: false,
  });

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = form.watch('password');

  useEffect(() => {
    const length = password.length >= 8;
    const letter = /[a-zA-Z]/.test(password);
    const number = /[0-9]/.test(password);

    setPasswordChecks({ length, letter, number });

    let strength = 0;
    if (length) strength += 33;
    if (letter) strength += 33;
    if (number) strength += 34;
    setPasswordStrength(strength);
  }, [password]);

  const onSubmit = async (data: RegisterInput) => {
    await registerUser(data);
  };

  const getStrengthColor = () => {
    if (passwordStrength < 40) return 'bg-error';
    if (passwordStrength < 80) return 'bg-tertiary-fixed-dim';
    return 'bg-green-500';
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.12)] border border-outline-variant overflow-hidden">
      {/* Card Header */}
      <div className="p-6 bg-white border-b border-outline-variant text-center space-y-2">
        <h1 className="text-headline-md font-headline-md text-primary leading-tight">
          Crie sua conta gratuita
        </h1>
        <p className="text-body-md font-body-md text-on-surface-variant">
          Junte-se à comunidade de colecionadores
        </p>
      </div>

      {/* Registration Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Username */}
          <div className="space-y-2">
            <label 
              htmlFor="username" 
              className="font-label-heroic text-label-heroic text-primary"
            >
              NOME DE USUÁRIO
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-outline" />
              <Input
                id="username"
                placeholder="ex: hq_collector"
                className="pl-9 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary transition-all"
                {...form.register('username')}
              />
            </div>
            {form.formState.errors.username && (
              <p className="text-label-sm text-error">{form.formState.errors.username.message}</p>
            )}
          </div>

          {/* Display Name */}
          <div className="space-y-2">
            <label 
              htmlFor="displayName" 
              className="font-label-heroic text-label-heroic text-primary"
            >
              NOME DE EXIBIÇÃO
            </label>
            <div className="relative">
              <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-outline" />
              <Input
                id="displayName"
                placeholder="Seu nome público"
                className="pl-9 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary transition-all"
                {...form.register('displayName')}
              />
            </div>
            {form.formState.errors.displayName && (
              <p className="text-label-sm text-error">{form.formState.errors.displayName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label 
            htmlFor="email" 
            className="font-label-heroic text-label-heroic text-primary"
          >
            E-MAIL
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-outline" />
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="pl-9 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary transition-all"
              {...form.register('email')}
            />
          </div>
          {form.formState.errors.email && (
            <p className="text-label-sm text-error">{form.formState.errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label 
            htmlFor="password" 
            className="font-label-heroic text-label-heroic text-primary"
          >
            SENHA
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-outline" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-9 pr-10 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary transition-all"
              {...form.register('password')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {/* Strength Bar */}
          <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden mt-1">
            <div 
              className={`h-full transition-all duration-300 ${getStrengthColor()}`}
              style={{ width: `${passwordStrength}%` }}
            />
          </div>

          {/* Checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pt-1">
            <div 
              className={`flex items-center gap-1 text-label-sm font-label-sm transition-colors ${
                passwordChecks.length ? 'text-secondary' : 'text-outline'
              }`}
            >
              {passwordChecks.length ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              Mínimo 8 caracteres
            </div>
            <div 
              className={`flex items-center gap-1 text-label-sm font-label-sm transition-colors ${
                passwordChecks.letter ? 'text-secondary' : 'text-outline'
              }`}
            >
              {passwordChecks.letter ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              Pelo menos 1 letra
            </div>
            <div 
              className={`flex items-center gap-1 text-label-sm font-label-sm transition-colors ${
                passwordChecks.number ? 'text-secondary' : 'text-outline'
              }`}
            >
              {passwordChecks.number ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              Pelo menos 1 número
            </div>
          </div>
          {form.formState.errors.password && (
            <p className="text-label-sm text-error">{form.formState.errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label 
            htmlFor="confirmPassword" 
            className="font-label-heroic text-label-heroic text-primary"
          >
            CONFIRMAR SENHA
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-outline" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="pl-9 pr-10 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-secondary transition-all"
              {...form.register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {form.formState.errors.confirmPassword && (
            <p className="text-label-sm text-error">{form.formState.errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3 pt-1">
          <Checkbox 
            id="terms" 
            className="mt-1"
            {...form.register('terms')}
          />
          <label htmlFor="terms" className="text-label-sm font-label-sm text-on-surface-variant">
            Li e aceito os{' '}
            <a href="#" className="text-secondary font-bold hover:underline">
              Termos de Uso
            </a>{' '}
            e a{' '}
            <a href="#" className="text-secondary font-bold hover:underline">
              Política de Privacidade
            </a>.
          </label>
        </div>
        {form.formState.errors.terms && (
          <p className="text-label-sm text-error">{form.formState.errors.terms.message}</p>
        )}

        {/* CTA Button */}
        <Button
          type="submit"
          disabled={isRegistering}
          className="w-full bg-secondary text-white py-6 rounded-xl font-label-heroic text-label-heroic tracking-widest shadow-lg shadow-secondary/20 hover:scale-[1.02] hover:brightness-110 active:scale-95 transition-all uppercase"
        >
          {isRegistering ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              CRIANDO CONTA...
            </>
          ) : (
            'CRIAR CONTA'
          )}
        </Button>

        {/* Footer Link */}
        <div className="text-center pt-2">
          <p className="text-body-md font-body-md text-on-surface-variant">
            Já tem conta?{' '}
            <Link href="/login" className="text-secondary font-bold hover:underline">
              Faça login
            </Link>
          </p>
        </div>
      </form>

      {/* Bottom Text Decoration */}
      <p className="text-center pb-6 text-label-sm font-label-sm text-outline uppercase tracking-widest">
        Protegido por HQVerse Security Framework
      </p>
    </div>
  );
}
