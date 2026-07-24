import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { useDebounce } from '@/lib/hooks/useDebounce';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  initialValue?: string;
  debounceMs?: number;
  autoFocus?: boolean;
}

export function SearchBar({
  onSearch,
  placeholder = 'Buscar...',
  className,
  initialValue = '',
  debounceMs = 300,
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue);
  const debouncedQuery = useDebounce(query, debounceMs);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-10 bg-surface-container-low border-none rounded-lg focus:ring-2 focus:ring-primary transition-all"
      />
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-transparent"
        >
          <X className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Limpar busca</span>
        </Button>
      )}
    </div>
  );
}
