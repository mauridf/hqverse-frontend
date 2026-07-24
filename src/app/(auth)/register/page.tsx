import type { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Criar Conta',
  description: 'Crie sua conta gratuita no HQVerse e comece a colecionar HQs',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
