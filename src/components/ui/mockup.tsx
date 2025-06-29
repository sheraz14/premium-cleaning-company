"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface MockupFrameProps {
  children: ReactNode;
  className?: string;
  size?: "small" | "medium" | "large";
}

interface MockupProps {
  children: ReactNode;
  className?: string;
  type?: "responsive" | "phone" | "browser";
}

export function MockupFrame({ children, className, size = "medium" }: MockupFrameProps) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[1200px] overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-2xl",
        size === "small" && "max-w-[800px]",
        size === "medium" && "max-w-[1000px]",
        size === "large" && "max-w-[1200px]",
        className
      )}
    >
      {/* Frame top bar */}
      <div className="relative z-10 w-full bg-gray-100/80 px-6 py-4 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
      </div>

      {/* Content */}
      <div className="relative">{children}</div>

      {/* Frame reflection */}
      <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[2.5rem]">
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/10 to-transparent"
          style={{
            maskImage: "linear-gradient(to bottom, white 5%, transparent 30%)",
            WebkitMaskImage: "linear-gradient(to bottom, white 5%, transparent 30%)",
          }}
        />
      </div>
    </div>
  );
}

export function Mockup({ children, className, type = "responsive" }: MockupProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        type === "phone" && "aspect-[9/16] max-w-[300px]",
        type === "browser" && "aspect-[16/10]",
        className
      )}
    >
      {/* Content */}
      {children}

      {/* Screen reflection */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent"
          style={{
            maskImage: "linear-gradient(to bottom right, white 20%, transparent 50%)",
            WebkitMaskImage: "linear-gradient(to bottom right, white 20%, transparent 50%)",
          }}
        />
      </div>

      {/* Screen glare */}
      <div
        className="pointer-events-none absolute -inset-[100%] animate-screen-glare"
        style={{
          background: "linear-gradient(to bottom right, transparent 40%, white/10 45%, white/30 50%, transparent 60%)",
          transform: "translateY(100%) rotate(45deg)",
        }}
      />
    </div>
  );
} 