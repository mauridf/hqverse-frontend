import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { authService } from '@/lib/services/auth.service';
import { useAuthStore } from '@/lib/stores/auth.store';
import { httpClient } from '@/lib/api/client';
import type { LoginDto, RegisterDto, UpdateUserDto, ChangePasswordDto } from '@/lib/types';

interface AxiosErrorLike {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, isAuthenticated, setAuth, setUser, clearAuth, setLoading } = useAuthStore();

  // Query para buscar perfil
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ['auth', 'profile'],
    queryFn: authService.getProfile,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  // Atualizar store quando perfil for carregado
  useEffect(() => {
    if (profile) {
      setUser(profile);
    }
  }, [profile, setUser]);

  // Mutation para login
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      const { accessToken, refreshToken, user } = data;
      httpClient.setAuthTokens(accessToken, refreshToken);
      setAuth(accessToken, refreshToken, user);
      toast.success('Bem-vindo de volta! 🎉');
      router.push('/dashboard');
    },
    onError: (error: unknown) => {
      const msg = (error as AxiosErrorLike).response?.data?.message || 'Erro ao fazer login';
      toast.error(msg);
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  // Mutation para registro
  const registerMutation = useMutation({
    mutationFn: authService.register,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      const { accessToken, refreshToken, user } = data;
      httpClient.setAuthTokens(accessToken, refreshToken);
      setAuth(accessToken, refreshToken, user);
      toast.success('Conta criada com sucesso! 🎉');
      router.push('/dashboard');
    },
    onError: (error: unknown) => {
      const msg = (error as AxiosErrorLike).response?.data?.message || 'Erro ao criar conta';
      toast.error(msg);
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  // Mutation para logout
  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      httpClient.clearAuthTokens();
      clearAuth();
      queryClient.clear();
      toast.success('Logout realizado com sucesso');
      router.push('/');
    },
    onError: () => {
      // Mesmo com erro, limpar tokens localmente
      httpClient.clearAuthTokens();
      clearAuth();
      queryClient.clear();
      router.push('/');
    },
  });

  // Mutation para atualizar perfil
  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      queryClient.setQueryData(['auth', 'profile'], updatedUser);
      toast.success('Perfil atualizado com sucesso!');
    },
    onError: (error: unknown) => {
      const msg = (error as AxiosErrorLike).response?.data?.message || 'Erro ao atualizar perfil';
      toast.error(msg);
    },
  });

  // Mutation para alterar senha
  const changePasswordMutation = useMutation({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      toast.success('Senha alterada com sucesso!');
    },
    onError: (error: unknown) => {
      const msg = (error as AxiosErrorLike).response?.data?.message || 'Erro ao alterar senha';
      toast.error(msg);
    },
  });

  // Login function
  const login = useCallback(
    async (data: LoginDto) => {
      await loginMutation.mutateAsync(data);
    },
    [loginMutation]
  );

  // Register function
  const register = useCallback(
    async (data: RegisterDto) => {
      await registerMutation.mutateAsync(data);
    },
    [registerMutation]
  );

  // Logout function
  const logout = useCallback(async () => {
    await logoutMutation.mutateAsync();
  }, [logoutMutation]);

  // Update profile function
  const updateProfile = useCallback(
    async (data: UpdateUserDto) => {
      await updateProfileMutation.mutateAsync(data);
    },
    [updateProfileMutation]
  );

  // Change password function
  const changePassword = useCallback(
    async (data: ChangePasswordDto) => {
      await changePasswordMutation.mutateAsync(data);
    },
    [changePasswordMutation]
  );

  return {
    user,
    isAuthenticated,
    isLoading: isProfileLoading || loginMutation.isPending || registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    isRegistering: registerMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isUpdatingProfile: updateProfileMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,
    error: profileError,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    refetchProfile,
  };
}
