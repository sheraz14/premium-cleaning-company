"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";


function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "Design Collective",
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
    className = "",
    hideContent = false,
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    className?: string;
    hideContent?: boolean;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div className={cn("relative w-full flex items-center justify-center overflow-hidden", className)}>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl" />

            <div className="absolute inset-0 overflow-hidden">
                

                <ElegantShape
                    delay={0.8}
                    width={160}
                    height={40}
                    rotate={22}
                    gradient="from-orange-400/[0.15] to-amber-400/[0.1]"
                    className="left-[75%] top-[13%]"
                />

                <ElegantShape
                    delay={0.57}
                    width={120}
                    height={30}
                    rotate={-20}
                    gradient="from-fuchsia-400/[0.12]"
                    className="left-[22%] top-[18%]"
                />

                <ElegantShape
                    delay={0.63}
                    width={100}
                    height={25}
                    rotate={15}
                    gradient="from-sky-400/[0.12]"
                    className="left-[48%] top-[16%]"
                />

                <ElegantShape
                    delay={0.73}
                    width={80}
                    height={20}
                    rotate={-18}
                    gradient="from-violet-400/[0.12]"
                    className="left-[63%] top-[17%]"
                />
                
                <ElegantShape
                    delay={0.83}
                    width={90}
                    height={22}
                    rotate={23}
                    gradient="from-lime-400/[0.12]"
                    className="left-[85%] top-[19%]"
                />

                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-indigo-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-rose-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-violet-500/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-500/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-cyan-500/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />

                <ElegantShape
                    delay={0.8}
                    width={350}
                    height={90}
                    rotate={18}
                    gradient="from-blue-500/[0.15]"
                    className="left-[40%] md:left-[45%] top-[25%] md:top-[30%]"
                />

                <ElegantShape
                    delay={0.9}
                    width={280}
                    height={70}
                    rotate={-22}
                    gradient="from-emerald-500/[0.15]"
                    className="right-[30%] md:right-[35%] bottom-[20%] md:bottom-[25%]"
                />

                <ElegantShape
                    delay={1.0}
                    width={180}
                    height={50}
                    rotate={30}
                    gradient="from-purple-500/[0.15]"
                    className="left-[60%] md:left-[65%] top-[40%] md:top-[45%]"
                />

                

                <ElegantShape
                    delay={0.75}
                    width={170}
                    height={45}
                    rotate={25}
                    gradient="from-orange-500/[0.15]"
                    className="left-[70%] bottom-[15%]"
                />

                <ElegantShape
                    delay={0.85}
                    width={200}
                    height={55}
                    rotate={-28}
                    gradient="from-lime-500/[0.15]"
                    className="right-[65%] top-[65%]"
                />

                <ElegantShape
                    delay={1.2}
                    width={120}
                    height={35}
                    rotate={22}
                    gradient="from-blue-400/[0.1]"
                    className="left-[15%] top-[35%]"
                />

                <ElegantShape
                    delay={1.3}
                    width={100}
                    height={30}
                    rotate={-12}
                    gradient="from-fuchsia-400/[0.1]"
                    className="right-[10%] bottom-[45%]"
                />

                <ElegantShape
                    delay={1.15}
                    width={90}
                    height={25}
                    rotate={16}
                    gradient="from-yellow-400/[0.1]"
                    className="left-[50%] bottom-[22%]"
                />

                <ElegantShape
                    delay={0.95}
                    width={110}
                    height={32}
                    rotate={-20}
                    gradient="from-green-400/[0.1]"
                    className="right-[55%] top-[18%]"
                />

                <ElegantShape
                    delay={0.55}
                    width={280}
                    height={75}
                    rotate={14}
                    gradient="from-indigo-400/[0.12] to-pink-400/[0.08]"
                    className="left-[8%] top-[42%]"
                />

                <ElegantShape
                    delay={0.65}
                    width={260}
                    height={70}
                    rotate={-19}
                    gradient="from-rose-400/[0.12] to-orange-400/[0.08]"
                    className="right-[12%] bottom-[8%]"
                />

                <ElegantShape
                    delay={1.05}
                    width={240}
                    height={65}
                    rotate={26}
                    gradient="from-cyan-400/[0.12] to-blue-400/[0.08]"
                    className="left-[52%] top-[8%]"
                />

                <ElegantShape
                    delay={0.35}
                    width={220}
                    height={60}
                    rotate={-24}
                    gradient="from-emerald-400/[0.12] to-green-400/[0.08]"
                    className="right-[58%] bottom-[48%]"
                />

                <ElegantShape
                    delay={0.9}
                    width={70}
                    height={20}
                    rotate={18}
                    gradient="from-amber-300/[0.15]"
                    className="left-[25%] top-[28%]"
                />

                <ElegantShape
                    delay={1.25}
                    width={60}
                    height={18}
                    rotate={-15}
                    gradient="from-purple-300/[0.15]"
                    className="right-[30%] bottom-[70%]"
                />

                <ElegantShape
                    delay={0.8}
                    width={50}
                    height={15}
                    rotate={22}
                    gradient="from-blue-300/[0.15]"
                    className="left-[72%] top-[58%]"
                />

                <ElegantShape
                    delay={1.1}
                    width={65}
                    height={19}
                    rotate={-27}
                    gradient="from-teal-300/[0.15]"
                    className="right-[77%] bottom-[33%]"
                />
            </div>

            {!hideContent && (
                <div className="relative z-10 container mx-auto px-4 md:px-6">
                    <div className="max-w-3xl mx-auto text-center">
                        <motion.div
                            custom={0}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] mb-8 md:mb-12"
                        >
                            <Circle className="h-2 w-2 fill-rose-500/80" />
                            <span className="text-sm text-white/60 tracking-wide">
                                {badge}
                            </span>
                        </motion.div>

                        <motion.div
                            custom={1}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                                    {title1}
                                </span>
                                <br />
                                <span
                                    className={cn(
                                        "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300 "
                                    )}
                                >
                                    {title2}
                                </span>
                            </h1>
                        </motion.div>

                        <motion.div
                            custom={2}
                            variants={fadeUpVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <p className="text-base sm:text-lg md:text-xl text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                                Crafting exceptional digital experiences through
                                innovative design and cutting-edge technology.
                            </p>
                        </motion.div>
                    </div>
                </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent pointer-events-none" />
        </div>
    );
}

export { HeroGeometric } 