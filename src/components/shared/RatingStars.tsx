import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface RatingStarsProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function RatingStars({
  value,
  max = 5,
  onChange,
  readonly = false,
  size = 'md',
  className,
}: RatingStarsProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const handleClick = (index: number) => {
    if (readonly || !onChange) return;
    onChange(index + 1);
  };

  const handleMouseEnter = (index: number) => {
    if (readonly) return;
    setHoverValue(index + 1);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverValue(null);
  };

  const displayValue = hoverValue !== null ? hoverValue : value;

  return (
    <div 
      className={cn('flex items-center gap-0.5', className)}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: max }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          disabled={readonly}
          className={cn(
            'transition-colors',
            !readonly && 'cursor-pointer hover:scale-110',
            readonly && 'cursor-default'
          )}
        >
          <Star
            className={cn(
              sizeClasses[size],
              index < displayValue 
                ? 'fill-on-tertiary-fixed-variant text-on-tertiary-fixed-variant' 
                : 'text-outline',
              'transition-colors'
            )}
          />
        </button>
      ))}
    </div>
  );
}
