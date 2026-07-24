import { Award } from 'lucide-react';

interface AchievementBadgeProps {
  title: string;
  tier: string;
  description: string;
}

export function AchievementBadge({ title, tier, description }: AchievementBadgeProps) {
  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-card space-y-3">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-on-tertiary-fixed-variant rounded-lg">
          <Award className="h-8 w-8 text-on-tertiary" />
        </div>
        <div>
          <h3 className="text-body-lg font-bold text-primary">{title}</h3>
          <p className="text-label-sm text-on-surface-variant">{tier}</p>
        </div>
      </div>
      <p className="text-body-md text-on-surface-variant">
        {description}
      </p>
    </div>
  );
}
