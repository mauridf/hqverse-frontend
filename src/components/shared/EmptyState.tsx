import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
  variant?: 'default' | 'compact';
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
  variant = 'default',
}: EmptyStateProps) {
  const containerClasses = {
    default: 'py-12',
    compact: 'py-8',
  };

  const iconSize = {
    default: 'h-16 w-16',
    compact: 'h-12 w-12',
  };

  return (
    <div className={cn(
      'flex flex-col items-center justify-center text-center',
      containerClasses[variant],
      className
    )}>
      {Icon && (
        <Icon className={cn(
          'text-muted-foreground mb-4',
          iconSize[variant]
        )} />
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-4 max-w-md">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <Button onClick={onAction}>{actionLabel}</Button>
      )}
    </div>
  );
}
