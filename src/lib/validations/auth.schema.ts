import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, 'Nome de usuário é obrigatório')
      .min(3, 'Mínimo de 3 caracteres')
      .max(100, 'Máximo de 100 caracteres'),
    displayName: z
      .string()
      .min(1, 'Nome de exibição é obrigatório')
      .max(255, 'Máximo de 255 caracteres'),
    email: z
      .string()
      .min(1, 'E-mail é obrigatório')
      .email('E-mail inválido')
      .max(255, 'Máximo de 255 caracteres'),
    password: z
      .string()
      .min(1, 'Senha é obrigatória')
      .min(6, 'Mínimo de 6 caracteres')
      .max(100, 'Máximo de 100 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
    terms: z.literal(true, {
      errorMap: () => ({ message: 'Você precisa aceitar os termos' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Senhas não conferem',
    path: ['confirmPassword'],
  });

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
