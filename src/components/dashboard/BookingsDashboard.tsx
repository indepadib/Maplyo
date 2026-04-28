"use client";

import React, { useState, useEffect } from 'react';
import { Calendar, RefreshCw, User, ExternalLink } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useTranslation } from '@/components/providers/LanguageProvider';

interface Booking {
    id: string;
    guest_name: string;
    valid_from: string;
    valid_until: string;
    source: string;
    status: string;
}

export function BookingsDashboard({ guideId }: { guideId?: string }) {
    const { t } = useTranslation();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);

    const fetchBookings = async () => {
        setLoading(true);
        let query = supabase
            .from('access_codes')
            .select('*')
            .order('valid_from', { ascending: true });
        
        if (guideId) {
            query = query.eq('guide_id', guideId);
        }

        const { data, error } = await query;
        if (!error && data) {
            setBookings(data);
        }
        setLoading(false);
    };

    const handleSync = async () => {
        if (!guideId) return;
        setIsSyncing(true);
        try {
            const res = await fetch('/api/integrations/airbnb/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ guideId })
            });
            const data = await res.json();
            if (data.success) {
                fetchBookings();
            }
        } catch (e) {
            console.error('Sync error:', e);
        }
        setIsSyncing(false);
    };

    useEffect(() => {
        fetchBookings();
    }, [guideId]);

    if (loading && bookings.length === 0) return null;

    return (
        <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <Calendar size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Réservations synchronisées</h3>
                        <p className="text-sm text-zinc-500">Flux Airbnb (iCal)</p>
                    </div>
                </div>
                {guideId && (
                    <button
                        onClick={handleSync}
                        disabled={isSyncing}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-bold hover:bg-white/10 transition-all disabled:opacity-50"
                    >
                        <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
                        {isSyncing ? 'Synchronisation...' : 'Synchroniser'}
                    </button>
                )}
            </div>

            <div className="grid gap-4">
                {bookings.length === 0 ? (
                    <div className="p-8 rounded-3xl bg-white/[0.02] border border-dashed border-white/10 text-center">
                        <p className="text-zinc-500 text-sm">Aucune réservation trouvée. Connectez votre iCal dans les paramètres.</p>
                    </div>
                ) : (
                    bookings.map((booking) => (
                        <div key={booking.id} className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400">
                                    <User size={18} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white">{booking.guest_name}</h4>
                                    <p className="text-xs text-zinc-500">
                                        {new Date(booking.valid_from).toLocaleDateString()} — {new Date(booking.valid_until).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase">
                                    {booking.source}
                                </span>
                                <span className="text-[10px] font-bold px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                                    {booking.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
