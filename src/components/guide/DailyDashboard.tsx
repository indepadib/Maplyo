"use client";

import React, { useEffect, useState } from "react";
import { Cloud, CloudRain, Sun, CloudLightning, CloudSnow, Wind, Droplets } from "lucide-react";

interface WeatherData {
    temp: number;
    condition: string;
    icon: React.ReactNode;
}

interface DailyDashboardProps {
    guestName?: string;
    location?: string;
}

export function DailyDashboard({ guestName, location }: DailyDashboardProps) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [greeting, setGreeting] = useState("");
    const [dateString, setDateString] = useState("");

    useEffect(() => {
        // Set date and greeting
        const now = new Date();
        const hour = now.getHours();
        
        let timeGreeting = "Bonjour";
        if (hour >= 18) timeGreeting = "Bonsoir";
        
        setGreeting(`${timeGreeting}${guestName ? ` ${guestName}` : ""}`);
        
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
        setDateString(now.toLocaleDateString('fr-FR', options).replace(/^\w/, (c) => c.toUpperCase()));

        // Simulate weather fetch based on location or default
        // In a real scenario, this would call an API like OpenMeteo based on lat/lng
        // For the demo and elegant UI, we'll randomize a bit or set a nice default
        const conditions = [
            { temp: 24, condition: "Ensoleillé", icon: <Sun className="w-8 h-8 text-amber-400" /> },
            { temp: 22, condition: "Partiellement nuageux", icon: <Cloud className="w-8 h-8 text-slate-400" /> },
            { temp: 26, condition: "Ciel dégagé", icon: <Sun className="w-8 h-8 text-amber-500" /> }
        ];
        
        setWeather(conditions[Math.floor(Math.random() * conditions.length)]);
    }, [guestName, location]);

    if (!weather) return null;

    return (
        <div className="w-full max-w-2xl mx-auto mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-2xl border border-white/10">
            {/* Elegant glassmorphism background effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-rose-500/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <p className="text-white/60 text-sm font-medium tracking-wider uppercase mb-1">{dateString}</p>
                    <h2 className="text-3xl font-light tracking-tight mb-2">
                        {greeting},
                    </h2>
                    <p className="text-white/80 font-medium">
                        C'est une belle journée pour découvrir {location || "les environs"}.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/10">
                    {weather.icon}
                    <div>
                        <div className="text-3xl font-light tracking-tight">{weather.temp}°</div>
                        <div className="text-white/60 text-sm font-medium">{weather.condition}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
