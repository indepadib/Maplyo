"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Map, Wifi, Lock, Star, ChevronRight, Search } from "lucide-react";

export const PhoneMockup3D = () => {
    // Mouse position state
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth rotation spring
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
        stiffness: 150,
        damping: 20,
    });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
        stiffness: 150,
        damping: 20,
    });

    // Handle mouse move
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const x = (e.clientX - rect.left) / width - 0.5;
        const y = (e.clientY - rect.top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <div
            className="relative w-full h-[600px] flex items-center justify-center perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: 1000 }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative w-[300px] h-[600px] bg-zinc-900 rounded-[3rem] border-8 border-zinc-800 shadow-2xl"
            >
                {/* --- Phone Bezel & Body Layers for Depth --- */}
                {/* Layer -1: Back Shadow */}
                <div
                    className="absolute inset-0 bg-black/50 rounded-[2.5rem] blur-xl translate-z-[-20px]"
                    style={{ transform: "translateZ(-50px) scale(0.9)" }}
                />

                {/* Layer 0: Main Chassis */}
                <div className="absolute inset-0 bg-zinc-900 rounded-[2.5rem]" />

                {/* Side Buttons (Fake Depth) */}
                <div className="absolute top-24 -left-[10px] w-[10px] h-12 bg-zinc-700 rounded-l-md" />
                <div className="absolute top-40 -left-[10px] w-[10px] h-20 bg-zinc-700 rounded-l-md" />
                <div className="absolute top-32 -right-[10px] w-[10px] h-16 bg-zinc-700 rounded-r-md" />

                {/* --- Screen Content --- */}
                <div className="absolute inset-[6px] bg-black rounded-[2.2rem] overflow-hidden flex flex-col items-center justify-start pt-8 pb-4 border-[4px] border-black">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20 flex items-center justify-center gap-2">
                        <div className="w-12 h-1 bg-zinc-800 rounded-full" />
                        <div className="w-1 h-1 bg-zinc-800 rounded-full" />
                    </div>

                    {/* Status Bar */}
                    <div className="w-full px-6 flex justify-between items-center text-white text-[10px] font-medium mb-4 relative z-10 opactiy-80">
                        <span>9:41</span>
                        <div className="flex gap-1.5">
                            <Wifi className="w-3 h-3" />
                            <div className="w-4 h-2.5 bg-white rounded-[2px]" />
                        </div>
                    </div>

                    {/* APP UI MOCKUP */}
                    <div className="w-full h-full bg-white rounded-[1.8rem] overflow-hidden relative flex flex-col">

                        {/* App Header (Image) */}
                        <div className="relative h-48 bg-gray-200 shrink-0">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=600&auto=format&fit=crop')] bg-cover bg-center" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                                <span className="text-xs uppercase tracking-wider opacity-80 bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">Guide Voyageur</span>
                                <h2 className="text-xl font-bold mt-1">Dar Al Safa</h2>
                                <div className="flex items-center gap-1 text-xs opacity-90 mt-1">
                                    <Map className="w-3 h-3" />
                                    <span>Marrakech, Maroc</span>
                                </div>
                            </div>
                        </div>

                        {/* App Content */}
                        <div className="flex-1 bg-slate-50 p-4 flex flex-col gap-3 overflow-hidden">
                            {/* Search Bar */}
                            <div className="bg-white p-2.5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2 text-slate-400 text-xs">
                                <Search className="w-3.5 h-3.5" />
                                <span>Rechercher une activité...</span>
                            </div>

                            {/* Quick Actions Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2 aspect-[4/3] hover:bg-rose-50 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                                        <Wifi className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700">WiFi</span>
                                </div>
                                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2 aspect-[4/3] hover:bg-rose-50 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                        <Lock className="w-4 h-4" />
                                    </div>
                                    <span className="text-xs font-semibold text-slate-700">Check-in</span>
                                </div>
                            </div>

                            {/* Featured Section */}
                            <div>
                                <h3 className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">Recommandé</h3>
                                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex gap-3 items-center">
                                    <div className="w-12 h-12 rounded-lg bg-orange-100 shrink-0 bg-[url('https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=200')] bg-cover bg-center" />
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold text-slate-800">Le Jardin Secret</h4>
                                        <p className="text-[10px] text-slate-500 line-clamp-1">Magnifique jardin botanique au coeur...</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300" />
                                </div>
                            </div>

                            {/* Bottom Reviews */}
                            <div className="mt-auto bg-green-50 p-3 rounded-xl border border-green-100 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xs">M</div>
                                <div>
                                    <div className="flex text-yellow-500 text-[10px]">★★★★★</div>
                                    <p className="text-[10px] text-green-900 font-medium">"Super guide, merci !"</p>
                                </div>
                            </div>
                        </div>

                        {/* Simulated Dock/Home Bar */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900/20 rounded-full" />
                    </div>

                    {/* Glare Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none rounded-[2.2rem]" />
                </div>
            </motion.div>
        </div>
    );
};
