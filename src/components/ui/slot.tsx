import * as React from 'react';

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(
  (props, ref) => {
    const { children, ...slotProps } = props;
    if (React.isValidElement(children)) {
      return React.cloneElement(
        children,
        { ...slotProps, ref } as React.Attributes
      );
    }
    return null;
  }
);
Slot.displayName = 'Slot';

export { Slot };