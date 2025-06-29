"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastProps = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "default" | "destructive";
  className?: string;
  children?: React.ReactNode;
};

const Toast: React.FC<ToastProps> = ({
  title,
  description,
  action,
  open,
  onOpenChange,
  variant = "default",
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    setIsVisible(open);
    if (open) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onOpenChange?.(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [open, onOpenChange]);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        variant === "destructive"
          ? "border-destructive bg-destructive text-destructive-foreground"
          : "border bg-background text-foreground",
        className
      )}
      {...props}
    >
      <div className="grid gap-1">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      {action}
      <button
        onClick={() => {
          setIsVisible(false);
          onOpenChange?.(false);
        }}
        className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

const ToastViewport: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
        className
      )}
      {...props}
    />
  );
};

const ToastTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={cn("text-sm font-semibold", className)} {...props} />;
};

const ToastDescription: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return <div className={cn("text-sm opacity-90", className)} {...props} />;
};

const ToastClose: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  return (
    <button
      className={cn(
        "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
        className
      )}
      {...props}
    >
      <X className="h-4 w-4" />
    </button>
  );
};

const ToastAction: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ className, ...props }) => {
  return (
    <button
      className={cn(
        "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
};

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}; 