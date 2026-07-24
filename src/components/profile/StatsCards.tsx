import { Library, Star, BookOpen, Heart } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface StatItem {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent?: boolean;
}

interface StatsCardsProps {
  stats: {
    collections: number;
    reviews: number;
    issuesCollected: number;
    favorites: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const items: StatItem[] = [
    {
      icon: <Library className="h-6 w-6" />,
      label: 'Coleções',
      value: stats.collections,
    },
    {
      icon: <Star className="h-6 w-6" />,
      label: 'Reviews',
      value: stats.reviews,
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      label: 'Issues Coletadas',
      value: stats.issuesCollected,
      accent: true,
    },
    {
      icon: <Heart className="h-6 w-6" />,
      label: 'Favoritos',
      value: stats.favorites,
    },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            'bg-surface-container-lowest p-6 rounded-xl shadow-card relative overflow-hidden group',
            item.accent && 'border-b-4 border-on-tertiary-fixed-variant'
          )}
        >
          {/* Icone decorativo de fundo */}
          <div className="absolute -right-4 -bottom-4 opacity-5 text-[120px] text-primary pointer-events-none">
            {item.icon}
          </div>

          <p className="text-label-sm font-label-sm text-on-surface-variant uppercase tracking-widest mb-1">
            {item.label}
          </p>
          <p className="text-display-hero text-primary font-display-hero group-hover:scale-105 transition-transform">
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
}
