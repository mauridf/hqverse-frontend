import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface SkeletonCardProps {
  variant?: 'default' | 'issue' | 'publisher';
}

export function SkeletonCard({ variant = 'default' }: SkeletonCardProps) {
  if (variant === 'issue') {
    return (
      <Card className="w-full overflow-hidden">
        <Skeleton className="h-48 w-full" />
        <CardHeader className="p-4">
          <Skeleton className="h-4 w-3/4" />
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-2">
          <Skeleton className="h-3 w-1/2" />
          <div className="flex gap-1">
            <Skeleton className="h-3 w-4" />
            <Skeleton className="h-3 w-4" />
            <Skeleton className="h-3 w-4" />
            <Skeleton className="h-3 w-4" />
            <Skeleton className="h-3 w-4" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'publisher') {
    return (
      <Card className="w-full">
        <CardHeader className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3 mt-2" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-10 w-full" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
