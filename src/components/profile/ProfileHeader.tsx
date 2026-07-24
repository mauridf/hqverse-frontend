'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Edit, Key, Calendar, Verified } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';
import type { UserDto } from '@/lib/types';

interface ProfileHeaderProps {
  user: UserDto;
  onEdit: () => void;
  onChangePassword: () => void;
}

export function ProfileHeader({ user, onEdit, onChangePassword }: ProfileHeaderProps) {
  const [isHovering, setIsHovering] = useState(false);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-error/10 text-error';
      case 'Moderator':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-on-tertiary-fixed-variant/10 text-on-tertiary-fixed-variant';
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
      {/* Avatar */}
      <div className="md:col-span-3 flex justify-center md:justify-start">
        <div 
          className="relative w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden shadow-card group"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Avatar com borda heroica */}
          <div className="absolute inset-[-4px] border-3 border-secondary rounded-xl clip-path-polygon z-[-1] pointer-events-none" />
          
          <Image
            src={user.avatarUrl || '/images/default-avatar.png'}
            alt={user.displayName || 'User'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Hover overlay para trocar foto */}
          <div 
            className={cn(
              'absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center cursor-pointer',
              isHovering ? 'opacity-100' : 'opacity-0'
            )}
          >
            <Edit className="h-10 w-10 text-white" />
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="md:col-span-6 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-headline-lg text-primary tracking-tight">
            {user.displayName}
          </h1>
          <Badge className={cn('flex items-center gap-1 px-3 py-1', getRoleBadgeColor(user.role))}>
            <Verified className="h-4 w-4" />
            {user.role}
          </Badge>
        </div>

        <p className="text-body-lg text-on-surface-variant font-medium">
          @{user.username}
        </p>

        <div className="flex items-center gap-2 text-on-surface-variant">
          <Calendar className="h-4 w-4" />
          <span className="text-label-sm font-label-sm">
            Membro desde: {new Date(user.createdAt).toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
          </span>
        </div>

        {user.bio && (
          <div className="bg-surface-container-low p-3 rounded-xl border-l-4 border-secondary max-w-xl">
            <p className="text-body-md text-on-surface italic">&ldquo;{user.bio}&rdquo;</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="md:col-span-3 flex md:flex-col gap-2 justify-end">
        <Button
          onClick={onEdit}
          className="flex-1 bg-secondary text-on-secondary py-2 rounded-xl font-label-heroic text-label-heroic shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Edit className="h-4 w-4" />
          Editar Perfil
        </Button>
        <Button
          onClick={onChangePassword}
          variant="outline"
          className="flex-1 border-2 border-primary text-primary py-2 rounded-xl font-label-heroic text-label-heroic hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
        >
          <Key className="h-4 w-4" />
          Alterar Senha
        </Button>
      </div>

      {/* CSS personalizado para o clip-path */}
      <style jsx>{`
        .clip-path-polygon {
          clip-path: polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%);
        }
        .border-3 {
          border-width: 3px;
        }
      `}</style>
    </section>
  );
}
