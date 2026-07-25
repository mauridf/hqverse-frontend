'use client';

import * as React from 'react';
import { RadioGroup as BaseRadioGroup, Radio as BaseRadio } from '@base-ui/react';
import { cn } from '@/lib/utils';

const RadioGroup = BaseRadioGroup;

const RadioGroupItem = React.forwardRef<
  HTMLButtonElement,
  BaseRadio.Root.Props & { className?: string }
>(({ className, ...props }, ref) => (
  <BaseRadio.Root
    ref={ref}
    className={cn(
      'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    <BaseRadio.Indicator className="flex items-center justify-center">
      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
    </BaseRadio.Indicator>
  </BaseRadio.Root>
));
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
