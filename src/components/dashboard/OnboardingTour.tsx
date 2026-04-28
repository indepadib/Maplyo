"use client";

import React, { useState, useEffect } from 'react';
import Joyride, { Step, CallBackProps, STATUS } from 'react-joyride';
import { useTranslation } from '@/components/providers/LanguageProvider';

export function OnboardingTour() {
    const { t } = useTranslation();
    const [run, setRun] = useState(false);

    useEffect(() => {
        // Run tour only once for new users
        const hasSeenTour = localStorage.getItem('maplyo_tour_seen');
        if (!hasSeenTour) {
            setRun(true);
        }
    }, []);

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

    const handleJoyrideCallback = (data: CallBackProps) => {
        const { status } = data;
        const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
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
            }}
            locale={{
                back: t.common.back || 'Retour',
                close: t.common.close || 'Fermer',
                last: t.common.finish || 'Terminer',
                next: t.common.next || 'Suivant',
                skip: t.common.skip || 'Passer',
            }}
        />
    );
}
