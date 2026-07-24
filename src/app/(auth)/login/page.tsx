import type { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Faça login no HQVerse e comece a colecionar',
};

export default function LoginPage() {
  return <LoginForm />;
}
