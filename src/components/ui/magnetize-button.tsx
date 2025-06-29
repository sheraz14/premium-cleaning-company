"use client" 

import * as React from "react"

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { motion, useAnimation } from "framer-motion";
import { Magnet } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";

function mergeClasses(...inputs: any[]) {
  return twMerge(clsx(inputs))
}

interface MagnetizeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    particleCount?: number;
    attractRadius?: number;
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
}

interface Particle {
    id: number;
    x: number;
    y: number;
}

const allowedVariants = ["default", "outline", "link", "destructive", "secondary", "ghost"] as const;
const allowedSizes = ["default", "sm", "lg", "icon"] as const;

function MagnetizeButton({
    className,
    particleCount = 12,
    attractRadius = 50,
    variant,
    size,
    ...props
}: MagnetizeButtonProps) {
    const [isAttracting, setIsAttracting] = useState(false);
    const [particles, setParticles] = useState<Particle[]>([]);
    const particlesControl = useAnimation();

    useEffect(() => {
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 360 - 180,
            y: Math.random() * 360 - 180,
        }));
        setParticles(newParticles);
    }, [particleCount]);

    const handleInteractionStart = useCallback(async () => {
        setIsAttracting(true);
        await particlesControl.start({
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 50,
                damping: 10,
            },
        });
    }, [particlesControl]);

    const handleInteractionEnd = useCallback(async () => {
        setIsAttracting(false);
        await particlesControl.start((i) => ({
            x: particles[i].x,
            y: particles[i].y,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        }));
    }, [particlesControl, particles]);

    // Only pass allowed variant/size to Button
    const safeVariant = allowedVariants.includes(variant as any) ? variant : "default";
    const safeSize = allowedSizes.includes(size as any) ? size : "default";

    return (
        <Button
            className={mergeClasses(
                "relative touch-none",
                "py-7 px-4 min-w-[160px] text-xl font-bold",
                !safeVariant || safeVariant === 'default'
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none hover:from-blue-600 hover:to-purple-600"
                    : "bg-white border-2 border-blue-200 text-blue-700 hover:bg-blue-50",
                "rounded-full transition-all duration-300",
                className
            )}
            variant={safeVariant}
            size={safeSize}
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
            {...props}
        >
            {particles.map((_, index) => (
                <motion.div
                    key={index}
                    custom={index}
                    initial={{ x: particles[index].x, y: particles[index].y }}
                    animate={particlesControl}
                    className={mergeClasses(
                        "absolute w-1.5 h-1.5 rounded-full",
                        "bg-gradient-to-r from-purple-300 to-pink-300",
                        "transition-opacity duration-300",
                        isAttracting ? "opacity-100" : "opacity-60"
                    )}
                />
            ))}
            <span className="relative w-full flex items-center justify-center gap-2">
                {props.children}
            </span>
        </Button>
    );
}

export { MagnetizeButton }