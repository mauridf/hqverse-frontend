import { cn } from '@/lib/utils';
import { SkeletonCard } from './SkeletonCard';

interface SkeletonGridProps {
  count?: number;
  cols?: number;
  variant?: 'default' | 'issue' | 'publisher';
}

export function SkeletonGrid({ 
  count = 6, 
  cols = 3, 
  variant = 'default' 
}: SkeletonGridProps) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-4', gridCols[cols as keyof typeof gridCols] || 'grid-cols-3')}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant={variant} />
      ))}
    </div>
  );
}
