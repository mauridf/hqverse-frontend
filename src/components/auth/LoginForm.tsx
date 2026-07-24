'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, Bolt, Compass } from 'lucide-react';
import { loginSchema, type LoginInput } from '@/lib/validations/auth.schema';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';

export function LoginForm() {
  const { login, isLoggingIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    await login(data);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    form.setValue('email', value);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailValid(isValid && value.length > 0);
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-popover border border-outline-variant/30 overflow-hidden">
      {/* Heroic Accent Strip */}
      <div className="h-1.5 w-full bg-linear-to-r from-primary via-secondary to-primary" />

      <div className="p-6 md:p-8">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <Image
              src="/images/hqverse-logo.svg"
              alt="HQVERSE Logo"
              width={160}
              height={48}
              className="h-12 w-auto"
              priority
            />
          </div>
          <p className="font-headline-md text-headline-md text-primary tracking-tight">
            A maior comunidade de HQs
          </p>
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label 
              htmlFor="email" 
              className="font-label-heroic text-label-heroic text-primary uppercase"
            >
              E-mail
            </label>
            <div className={`
              relative group rounded-lg border transition-all
              ${form.formState.errors.email ? 'border-error' : 'border-outline-variant'}
              ${!form.formState.errors.email && 'focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10'}
              bg-surface-container-low
            `}>
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-outline" />
              <Input
                id="email"
                type="email"
                placeholder="heroi@hqverse.com.br"
                className="w-full pl-10 pr-10 py-3 bg-transparent border-none focus:ring-0 text-body-md placeholder:text-outline/50"
                {...form.register('email', {
                  onChange: handleEmailChange,
                })}
              />
              {emailValid && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary transition-opacity">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </div>
            {form.formState.errors.email && (
              <p className="text-label-sm text-error">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label 
                htmlFor="password" 
                className="font-label-heroic text-label-heroic text-primary uppercase"
              >
                Senha
              </label>
              <Link 
                href="/forgot-password" 
                className="text-label-sm font-label-sm text-secondary hover:underline transition-all"
              >
                Esqueceu a senha?
              </Link>
            </div>
            <div className={`
              relative group rounded-lg border transition-all
              ${form.formState.errors.password ? 'border-error' : 'border-outline-variant'}
              ${!form.formState.errors.password && 'focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10'}
              bg-surface-container-low
            `}>
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-outline" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-transparent border-none focus:ring-0 text-body-md placeholder:text-outline/50"
                {...form.register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors p-1"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-label-sm text-error">{form.formState.errors.password.message}</p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <div className="flex items-center gap-2 cursor-pointer group">
              <Checkbox id="remember" />
              <label 
                htmlFor="remember"
                className="text-body-md text-on-surface-variant group-hover:text-primary transition-colors cursor-pointer"
              >
                Lembrar-me
              </label>
            </div>
          </div>

          {/* Main CTA */}
          <Button
            type="submit"
            disabled={isLoggingIn}
            className="w-full bg-secondary text-on-secondary font-label-heroic text-label-heroic py-6 rounded-xl shadow-[0_10px_20px_-5px_rgba(186,0,53,0.2)] hover:shadow-[0_20px_25px_-5px_rgba(186,0,53,0.3)] hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest"
          >
            {isLoggingIn ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                ENTRANDO...
              </>
            ) : (
              <>
                ENTRAR
                <Bolt className="h-5 w-5" />
              </>
            )}
          </Button>

          {/* Create Account */}
          <div className="text-center pt-2">
            <span className="text-body-md text-on-surface-variant">Novo por aqui?</span>
            <Link 
              href="/register" 
              className="ml-2 font-label-heroic text-label-heroic text-primary border-b-2 border-transparent hover:border-secondary transition-all"
            >
              Criar conta
            </Link>
          </div>
        </form>

        {/* Separator */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-outline-variant" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-surface-container-lowest px-3 text-label-sm uppercase text-outline font-medium tracking-tighter">
              OU
            </span>
          </div>
        </div>

        {/* Secondary Option */}
        <Link href="/">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6 border-2 border-primary text-primary font-label-heroic text-label-heroic rounded-xl hover:bg-primary hover:text-on-primary transition-all duration-200"
          >
            <Compass className="h-5 w-5" />
            NAVEGAR COMO VISITANTE
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container-low px-6 py-3 border-t border-outline-variant/30 flex justify-center items-center">
        <p className="text-label-sm font-label-sm text-on-surface-variant/70">
          © 2024 HQVerse. Collect the Impossible.
        </p>
      </footer>
    </div>
  );
}
