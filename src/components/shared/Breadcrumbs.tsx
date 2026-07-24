import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  homeHref?: string;
}

export function Breadcrumbs({ 
  items, 
  className,
  homeHref = '/' 
}: BreadcrumbsProps) {
  return (
    <nav className={cn('flex items-center gap-1 text-sm', className)}>
      <Link 
        href={homeHref}
        className="text-muted-foreground hover:text-primary transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-1">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn(
                isLast ? 'text-foreground font-medium' : 'text-muted-foreground'
              )}>
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
