import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import type { ErrorResponse } from '@/lib/types';

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse;
    if (data?.message) {
      return data.message;
    }
    if (error.message) {
      return error.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Ocorreu um erro inesperado';
}

export function getErrorDetails(error: unknown): Record<string, string[]> | undefined {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse;
    if (data?.errors) {
      return data.errors;
    }
  }
  return undefined;
}

export function showErrorToast(error: unknown, fallbackMessage?: string): void {
  const message = getErrorMessage(error) || fallbackMessage || 'Ocorreu um erro inesperado';
  toast.error(message);
}

export function showSuccessToast(message: string): void {
  toast.success(message);
}

export function showWarningToast(message: string): void {
  toast(message, {
    icon: '⚠️',
  });
}

export function showInfoToast(message: string): void {
  toast(message, {
    icon: 'ℹ️',
  });
}

export function handleApiError(error: unknown, context?: string): never {
  const message = getErrorMessage(error);
  console.error(`[${context || 'API'}] Error:`, error);
  throw new Error(message);
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return !error.response || error.code === 'ECONNABORTED';
  }
  return false;
}

export function isValidationError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 400 || error.response?.status === 422;
  }
  return false;
}

export function isAuthError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 401;
  }
  return false;
}

export function isForbiddenError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 403;
  }
  return false;
}

export function isNotFoundError(error: unknown): boolean {
  if (error instanceof AxiosError) {
    return error.response?.status === 404;
  }
  return false;
}
