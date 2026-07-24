import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatRelativeTime } from '@/lib/utils/format';

interface Review {
  id: number;
  title: string;
  content: string;
  rating: number;
  createdAt: string;
  issue: {
    id: number;
    title: string;
    issueNumber: string;
    coverUrl: string | null;
    series?: {
      name: string;
      publisher?: {
        name: string;
      };
    };
  };
  tags?: string[];
}

interface RecentReviewsProps {
  reviews: Review[];
  onViewAll?: () => void;
}

export function RecentReviews({ reviews, onViewAll }: RecentReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">Nenhuma avaliação ainda</h3>
        <p className="text-sm text-muted-foreground">
          Comece a avaliar suas HQs favoritas!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-headline-md font-headline-md text-primary flex items-center gap-2">
          <Star className="h-6 w-6 text-secondary fill-secondary" />
          Avaliações Recentes
        </h2>
        {onViewAll && (
          <Button
            variant="ghost"
            className="text-label-heroic font-label-heroic text-secondary hover:underline flex items-center gap-1"
            onClick={onViewAll}
          >
            Ver tudo
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-4 rounded-xl shadow-[0_10px_20px_-5px_rgba(0,0,0,0.12)] flex flex-col sm:flex-row gap-4 items-start group hover:bg-surface transition-colors"
          >
            {/* Issue Cover */}
            <Link 
              href={`/comic-issues/${review.issue.id}`}
              className="w-full sm:w-32 h-48 bg-surface-container rounded-lg overflow-hidden flex-shrink-0 relative"
            >
              {review.issue.coverUrl ? (
                <Image
                  src={review.issue.coverUrl}
                  alt={review.issue.title || `Issue #${review.issue.issueNumber}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-surface-container flex items-center justify-center text-muted-foreground">
                  <span className="text-4xl">📚</span>
                </div>
              )}
            </Link>

            {/* Review Content */}
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <Link 
                    href={`/comic-issues/${review.issue.id}`}
                    className="text-body-lg font-bold text-primary hover:underline"
                  >
                    {review.title}
                  </Link>
                  <div className="flex items-center gap-1 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < review.rating 
                            ? 'fill-on-tertiary-fixed-variant text-on-tertiary-fixed-variant' 
                            : 'text-outline'
                        )}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-label-sm font-label-sm text-on-surface-variant">
                  {formatRelativeTime(review.createdAt)}
                </span>
              </div>

              <p className="text-body-md text-on-surface-variant line-clamp-3">
                {review.content}
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {review.issue.series?.publisher && (
                  <Badge variant="secondary" className="bg-surface-container text-on-surface-variant">
                    {review.issue.series.publisher.name}
                  </Badge>
                )}
                {review.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-surface-container text-on-surface-variant">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


