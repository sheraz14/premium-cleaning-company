"use client";

import { cn } from "@/lib/utils";

interface GlowProps {
  variant?: "top" | "bottom" | "both";
  className?: string;
}

export function Glow({ variant = "both", className }: GlowProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 z-0",
        variant === "top" && "top-0 bottom-auto",
        variant === "bottom" && "top-auto bottom-0",
        variant === "both" && "inset-y-0",
        className
      )}
    >
      {/* Top glow */}
      {(variant === "top" || variant === "both") && (
        <div
          className="absolute inset-0 h-[500px] bg-gradient-to-b from-purple-500/20 via-purple-500/5 to-transparent"
          style={{
            maskImage: "radial-gradient(circle at center, black, transparent)",
            WebkitMaskImage: "radial-gradient(circle at center, black, transparent)",
          }}
        />
      )}

      {/* Bottom glow */}
      {(variant === "bottom" || variant === "both") && (
        <div
          className="absolute bottom-0 inset-x-0 h-[500px] bg-gradient-to-t from-blue-500/20 via-blue-500/5 to-transparent"
          style={{
            maskImage: "radial-gradient(circle at center, black, transparent)",
            WebkitMaskImage: "radial-gradient(circle at center, black, transparent)",
          }}
        />
      )}

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-transparent to-blue-500/30 opacity-30 mix-blend-overlay"
        style={{
          maskImage: "radial-gradient(circle at center, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent 70%)",
        }}
      />
    </div>
  );
} 