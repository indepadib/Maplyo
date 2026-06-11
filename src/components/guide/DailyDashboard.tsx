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
    lang?: string;
}

const translations = {
    fr: {
        morning: "Bonjour",
        evening: "Bonsoir",
        subtitle: "C'est une belle journée pour découvrir",
        environs: "les environs",
        sunny: "Ensoleillé",
        cloudy: "Partiellement nuageux",
        clear: "Ciel dégagé"
    },
    en: {
        morning: "Good morning",
        evening: "Good evening",
        subtitle: "It's a beautiful day to explore",
        environs: "the surroundings",
        sunny: "Sunny",
        cloudy: "Partly cloudy",
        clear: "Clear sky"
    },
    es: {
        morning: "Buenos días",
        evening: "Buenas tardes",
        subtitle: "Es un hermoso día para descubrir",
        environs: "los alrededores",
        sunny: "Soleado",
        cloudy: "Parcialmente nublado",
        clear: "Cielo despejado"
    }
} as any;

export function DailyDashboard({ guestName, location, lang = 'fr' }: DailyDashboardProps) {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [greeting, setGreeting] = useState("");
    const [dateString, setDateString] = useState("");
    const t = translations[lang] || translations.fr;

    useEffect(() => {
        // Set date and greeting
        const now = new Date();
        const hour = now.getHours();
        
        let timeGreeting = t.morning;
        if (hour >= 18) timeGreeting = t.evening;
        
        setGreeting(`${timeGreeting}${guestName ? ` ${guestName}` : ""}`);
        
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
        // Date formatting based on language
        let locale = 'fr-FR';
        if (lang === 'en') locale = 'en-US';
        if (lang === 'es') locale = 'es-ES';
        
        setDateString(now.toLocaleDateString(locale, options).replace(/^\w/, (c) => c.toUpperCase()));

        // Simulate weather fetch based on location or default
        // In a real scenario, this would call an API like OpenMeteo based on lat/lng
        // For the demo and elegant UI, we'll randomize a bit or set a nice default
        const conditions = [
            { temp: 24, condition: t.sunny, icon: <Sun className="w-8 h-8 text-amber-400" /> },
            { temp: 22, condition: t.cloudy, icon: <Cloud className="w-8 h-8 text-slate-400" /> },
            { temp: 26, condition: t.clear, icon: <Sun className="w-8 h-8 text-amber-500" /> }
        ];
        
        setWeather(conditions[Math.floor(Math.random() * conditions.length)]);
    }, [guestName, location, lang, t]);

    if (!weather) return null;

    return (
        <div className="w-full max-w-2xl mx-auto mb-8 relative overflow-hidden rounded-3xl bg-white/20 backdrop-blur-2xl p-6 text-white shadow-xl border border-white/40 ring-1 ring-white/10">
            {/* Elegant glassmorphism background effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <p className="text-white/80 text-sm font-bold tracking-widest uppercase mb-1 drop-shadow-sm">{dateString}</p>
                    <h2 className="text-3xl font-black tracking-tight mb-2 drop-shadow-md">
                        {greeting},
                    </h2>
                    <p className="text-white/90 font-medium drop-shadow-sm">
                        {t.subtitle} {location || t.environs}.
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white/30 backdrop-blur-md px-5 py-4 rounded-2xl border border-white/40 shadow-sm">
                    {weather.icon}
                    <div>
                        <div className="text-3xl font-black tracking-tight drop-shadow-md">{weather.temp}°</div>
                        <div className="text-white/90 text-sm font-bold drop-shadow-sm">{weather.condition}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
