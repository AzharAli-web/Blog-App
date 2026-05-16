import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

export const Card = forwardRef(({ className, children, animated = false, ...props }, ref) => {
  const Component = animated ? motion.div : "div";
  
  const animationProps = animated ? {
    whileHover: { y: -5 },
    transition: { type: "spring", stiffness: 300 }
  } : {};

  return (
    <Component
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-surface text-foreground shadow-sm overflow-hidden",
        className
      )}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
});
Card.displayName = "Card";

export const CardHeader = ({ className, ...props }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
);

export const CardTitle = ({ className, ...props }) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
);

export const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

export const CardFooter = ({ className, ...props }) => (
  <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
);
