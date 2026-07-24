import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { LoadingSpinner } from './LoadingSpinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  redirectTo?: string;
}

export function AuthGuard({ 
  children, 
  requireAdmin = false, 
  redirectTo = '/login' 
}: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (requireAdmin && user?.role !== 'Admin' && user?.role !== 'Moderator') {
        router.push('/');
        return;
      }
    }
  }, [isAuthenticated, isLoading, router, redirectTo, requireAdmin, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (requireAdmin && user?.role !== 'Admin' && user?.role !== 'Moderator') {
    return null;
  }

  return <>{children}</>;
}
