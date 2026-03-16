"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
                                   children,
                                   className,
                                   containerClassName,
                                   colors,
                                   waveWidth,
                                   backgroundFill,
                                   blur = 10,
                                   speed = "fast",
                                   waveOpacity = 0.5,
                                   ...props
                               }: {
    children?: any;
    className?: string;
    containerClassName?: string;
    colors?: string[];
    waveWidth?: number;
    backgroundFill?: string;
    blur?: number;
    speed?: "slow" | "fast";
    waveOpacity?: number;
    [key: string]: any;
}) => {
    const noise = useMemo(() => createNoise3D(), []);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const speedIncrement = useMemo(() => {
        switch (speed) {
            case "slow":
                return 0.001;
            case "fast":
                return 0.002;
            default:
                return 0.001;
        }
    }, [speed]);

    const waveColors = useMemo(
        () =>
            colors ?? [
                "#38bdf8",
                "#818cf8",
                "#c084fc",
                "#e879f9",
                "#22d3ee",
            ],
        [colors]
    );

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (!canvas || !ctx) {
            return;
        }

        let width = 0;
        let height = 0;
        let nt = 0;
        let animationId = 0;

        const drawWave = (w: number, h: number, elapsed: number, count: number) => {
            for (let i = 0; i < count; i++) {
                ctx.beginPath();
                ctx.lineWidth = waveWidth || 50;
                ctx.strokeStyle = waveColors[i % waveColors.length];
                for (let x = 0; x < w; x += 5) {
                    const y = noise(x / 800, 0.3 * i, elapsed) * 100;
                    ctx.lineTo(x, y + h * 0.5);
                }
                ctx.stroke();
                ctx.closePath();
            }
        };

        const resize = () => {
            width = ctx.canvas.width = window.innerWidth;
            height = ctx.canvas.height = window.innerHeight;
            ctx.filter = `blur(${blur}px)`;
        };

        const render = () => {
            nt += speedIncrement;
            ctx.fillStyle = backgroundFill || "black";
            ctx.globalAlpha = waveOpacity || 0.5;
            ctx.fillRect(0, 0, width, height);
            drawWave(width, height, nt, 5);
            animationId = requestAnimationFrame(render);
        };

        resize();
        window.addEventListener("resize", resize);
        render();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationId);
        };
    }, [backgroundFill, blur, noise, speedIncrement, waveOpacity, waveWidth, waveColors]);

    const isSafari =
        typeof navigator !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome");

    return (
        <div
            className={cn(
                "h-screen flex flex-col items-center justify-center",
                containerClassName
            )}
        >
            <canvas
                className="absolute inset-0 z-0"
                ref={canvasRef}
                id="canvas"
                style={{
                    ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
                }}
            ></canvas>
            <div className={cn("relative z-10", className)} {...props}>
                {children}
            </div>
        </div>
    );
};
