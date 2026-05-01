"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { Step, Props as ReactJoyrideProps } from 'react-joyride';
import { STATUS } from 'react-joyride';
import { useTranslation } from '@/components/providers/LanguageProvider';

// Dynamically import Joyride with SSR disabled and cast to any to bypass strict type checks in build env
const Joyride = dynamic<any>(() => import('react-joyride').then(mod => {
    return (mod as any).default || (mod as any).Joyride || mod;
}), { ssr: false });

export function OnboardingTour() {
    const { t } = useTranslation();
    const [run, setRun] = useState(false);

    useEffect(() => {
        const hasSeenTour = localStorage.getItem('maplyo_tour_seen');
        if (!hasSeenTour) {
            const timer = setTimeout(() => setRun(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    if (!run) return null;

    const steps: Step[] = [
        {
            target: 'body',
            content: (
                <div className="p-2">
                    <h3 className="text-xl font-bold mb-2 text-slate-900">Bienvenue sur Maplyo ! 👋</h3>
                    <p className="text-zinc-600">Laissez-nous vous guider pour créer votre premier guide digital en quelques secondes.</p>
                </div>
            ),
            placement: 'center',
        },
        {
            target: '[data-tour="ai-button"]',
            content: (
                <div className="p-1">
                    <h4 className="font-bold mb-1 text-slate-900">Génération par IA 🤖</h4>
                    <p className="text-sm text-zinc-600">Le moyen le plus rapide. Donnez une ville et un type de logement, l'IA s'occupe de tout.</p>
                </div>
            ),
            placement: 'bottom',
        },
        {
            target: '[data-tour="manual-button"]',
            content: (
                <div className="p-1">
                    <h4 className="font-bold mb-1 text-slate-900">Création manuelle ✍️</h4>
                    <p className="text-sm text-zinc-600">Si vous préférez tout contrôler dès le début.</p>
                </div>
            ),
            placement: 'bottom',
        },
        {
            target: '[data-tour="settings-button"]',
            content: (
                <div className="p-1">
                    <h4 className="font-bold mb-1 text-slate-900">Paramètres & Intégrations ⚙️</h4>
                    <p className="text-sm text-zinc-600">C'est ici que vous connectez votre Airbnb (iCal) et vos serrures connectées.</p>
                </div>
            ),
            placement: 'left',
        }
    ];

    const handleJoyrideCallback = (data: any) => {
        const { status, type } = data;
        const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status) || status === 'finished' || status === 'skipped') {
            setRun(false);
            localStorage.setItem('maplyo_tour_seen', 'true');
        }
    };

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous
            showProgress
            showSkipButton
            callback={handleJoyrideCallback}
            styles={{
                options: {
                    primaryColor: '#e11d48', // rose-600
                    zIndex: 1000,
                    backgroundColor: '#ffffff',
                    arrowColor: '#ffffff',
                    textColor: '#1e293b',
                },
                buttonNext: {
                    backgroundColor: '#e11d48',
                    borderRadius: '12px',
                    padding: '10px 20px',
                    fontWeight: 'bold',
                },
                buttonBack: {
                    color: '#64748b',
                    marginRight: '10px',
                },
                buttonSkip: {
                    color: '#94a3b8',
                }
            } as any}
            locale={{
                back: (t.common as any).back || 'Retour',
                close: (t.common as any).close || 'Fermer',
                last: (t.common as any).finish || 'Terminer',
                next: (t.common as any).next || 'Suivant',
                skip: (t.common as any).skip || 'Passer',
            }}
        />
    );
}
