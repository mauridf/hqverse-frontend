'use client';

import * as React from 'react';
import { Select as BaseSelect } from '@base-ui/react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

const Select = BaseSelect.Root;

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  BaseSelect.Trigger.Props & { className?: string }
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Trigger
    ref={ref}
    className={cn(
      'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      className
    )}
    {...props}
  >
    {children}
    <BaseSelect.Icon>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </BaseSelect.Icon>
  </BaseSelect.Trigger>
));
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = React.forwardRef<
  HTMLSpanElement,
  BaseSelect.Value.Props & { className?: string; placeholder?: string }
>(({ className, placeholder, ...props }, ref) => (
  <BaseSelect.Value ref={ref} className={cn('', className)} placeholder={placeholder} {...props} />
));
SelectValue.displayName = 'SelectValue';

const SelectContent = React.forwardRef<
  HTMLDivElement,
  BaseSelect.Popup.Props & { className?: string }
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Portal>
    <BaseSelect.Positioner>
      <BaseSelect.Popup
        ref={ref}
        className={cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md',
          className
        )}
        {...props}
      >
        {children}
      </BaseSelect.Popup>
    </BaseSelect.Positioner>
  </BaseSelect.Portal>
));
SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef<
  HTMLDivElement,
  BaseSelect.Item.Props & { className?: string }
>(({ className, children, ...props }, ref) => (
  <BaseSelect.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <BaseSelect.ItemIndicator>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </BaseSelect.ItemIndicator>
    </span>
    <BaseSelect.ItemText>{children}</BaseSelect.ItemText>
  </BaseSelect.Item>
));
SelectItem.displayName = 'SelectItem';

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
};
