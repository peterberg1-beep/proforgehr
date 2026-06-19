import * as React from "react";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`flex items-center gap-2 text-sm font-medium leading-none select-none ${className || ""}`}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };
