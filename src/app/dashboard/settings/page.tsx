"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, CreditCard, Settings, ChevronLeft, Upload, Package, ShoppingBag, Sparkles, Check, ShieldCheck, Link2, Key, Calendar } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/lib/supabase";
import { FileUploader } from "@/components/ui/FileUploader";
import { getUserSubscription } from "@/lib/subscription";
import { Modal } from "@/components/ui/Modal";
import { useTranslation } from "@/components/providers/LanguageProvider";

export default function SettingsPage() {
    const { t } = useTranslation();
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<"profile" | "plan" | "shop" | "integrations">("profile");
    const [loading, setLoading] = useState(false);
    const [subscription, setSubscription] = useState<any>(null);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [fullName, setFullName] = useState("");
    
    // Integrations State
    const [tuyaConfig, setTuyaConfig] = useState({ accessId: "", accessSecret: "", region: "eu" });
    const [airbnbConfig, setAirbnbConfig] = useState({ icalUrl: "" });

    useEffect(() => {
        if (!user) {
            console.log("SettingsPage: No user from AuthProvider yet. Checking session directly...");
            supabase.auth.getSession().then(({ data: { session } }) => {
                if (session) {
                    console.log("SettingsPage: Session recovered directly from Supabase.");
                } else {
                    console.warn("SettingsPage: No session found on settings page.");
                }
            });
            return;
        }
        const load = async () => {
             try {
                // Load Sub
                const sub = await getUserSubscription(user.id, supabase);
                setSubscription(sub);

                // Load Profile
                const { data, error } = await supabase.from('profiles').select('*').eq('id', user.id).single();
                if (error) console.error("Settings: Profile load error", error);
                if (data) {
                    setAvatarUrl(data.avatar_url || "");
                    setFullName(data.full_name || "");
                }

                // Load Integrations
                const { data: intData } = await supabase.from('integrations').select('*').eq('user_id', user.id);
                if (intData) {
                    const tuya = intData.find(i => i.type === 'tuya');
                    if (tuya) setTuyaConfig(tuya.credentials);
                    const airbnb = intData.find(i => i.type === 'airbnb_ical');
                    if (airbnb) setAirbnbConfig(airbnb.credentials);
                }
            } catch (e) {
                console.error("Settings load catch", e);
            }
        };
        load();
    }, [user]);

    const saveIntegration = async (type: string, credentials: any) => {
        if (!user) return;
        setLoading(true);
        try {
            const { error } = await supabase.from('integrations').upsert({
                user_id: user.id,
                type,
                credentials,
                updated_at: new Date().toISOString(),
            }, { onConflict: 'user_id,type' });
            
            if (error) throw error;
            showModal("Succès", <div className="text-center p-4">Intégration mise à jour avec succès !</div>, "✅");
        } catch (e) {
            console.error(e);
            showModal("Erreur", <div className="text-center p-4 text-red-600">Erreur lors de la sauvegarde.</div>, "⚠️");
        } finally {
            setLoading(false);
        }
    };

    const [modal, setModal] = useState<{ isOpen: boolean; title: string; content: React.ReactNode; icon?: string }>({
        isOpen: false,
        title: "",
        content: null
    });

    const showModal = (title: string, content: React.ReactNode, icon?: string) => {
        setModal({ isOpen: true, title, content, icon });
    };

    const closeModal = () => setModal(prev => ({ ...prev, isOpen: false }));

    const updateProfile = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const { error } = await supabase.from('profiles').upsert({
                id: user.id,
                avatar_url: avatarUrl,
                full_name: fullName,
                updated_at: new Date().toISOString(),
            });
            if (error) throw error;
            showModal(t.settings.success, <div className="text-center p-4">{t.settings.profileUpdated}</div>, "✅");
        } catch (e) {
            console.error(e);
            showModal(t.settings.error, <div className="text-center p-4 text-red-600">{t.settings.updateError}</div>, "⚠️");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 font-sans text-zinc-100 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href="/dashboard" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                        <ChevronLeft className="w-6 h-6" />
                    </Link>
                    <h1 className="text-3xl font-bold">{t.settings.title}</h1>
                </div>

                <div className="grid md:grid-cols-[240px_1fr] gap-8">
                    {/* Sidebar */}
                    <div className="space-y-2">
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "profile" ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20" : "bg-white/5 hover:bg-white/10 text-zinc-400"
                                }`}
                        >
                            <User size={18} />
                            {t.settings.tabProfile}
                        </button>
                        <button
                            onClick={() => setActiveTab("plan")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === "plan" ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20" : "bg-white/5 hover:bg-white/10 text-zinc-400"
                                }`}
                        >
                            <CreditCard size={18} />
                            {t.settings.tabPlan}
                        </button>
                        <button
                            onClick={() => setActiveTab("shop")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "shop" ? "bg-rose-600 text-white shadow-lg shadow-rose-600/20" : "text-zinc-400 hover:bg-white/5"}`}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <span className="font-medium">Maplyo Shop</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("integrations")}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === "integrations" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-zinc-400 hover:bg-white/5"}`}
                        >
                            <Link2 className="w-5 h-5" />
                            <span className="font-medium">Integrations</span>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 rounded-3xl p-8 overflow-hidden">
                        {activeTab === "integrations" && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Link2 className="w-5 h-5 text-indigo-400" />
                                    External Integrations
                                </h2>
                                
                                <div className="grid gap-6">
                                    {/* Tuya Smart Lock */}
                                    <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                                <Key className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">Tuya Smart Lock</h4>
                                                <p className="text-sm text-zinc-500">Générez des codes invités automatiquement.</p>
                                            </div>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-zinc-500 uppercase">Access ID</label>
                                                <input 
                                                    type="text"
                                                    value={tuyaConfig.accessId}
                                                    onChange={e => setTuyaConfig({...tuyaConfig, accessId: e.target.value})}
                                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none"
                                                    placeholder="Votre Access ID Tuya"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-zinc-500 uppercase">Access Secret</label>
                                                <input 
                                                    type="password"
                                                    value={tuyaConfig.accessSecret}
                                                    onChange={e => setTuyaConfig({...tuyaConfig, accessSecret: e.target.value})}
                                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-indigo-500 outline-none"
                                                    placeholder="••••••••••••••••"
                                                />
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => saveIntegration('tuya', tuyaConfig)}
                                            disabled={loading}
                                            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                                        >
                                            {loading ? 'Enregistrement...' : 'Enregistrer la configuration Tuya'}
                                        </button>
                                    </div>

                                    {/* Airbnb iCal */}
                                    <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 space-y-6">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                                                <Calendar className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg">Airbnb Calendar</h4>
                                                <p className="text-sm text-zinc-500">Synchronisez vos séjours via flux iCal.</p>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-zinc-500 uppercase">URL iCal Airbnb</label>
                                            <input 
                                                type="text"
                                                value={airbnbConfig.icalUrl}
                                                onChange={e => setAirbnbConfig({...airbnbConfig, icalUrl: e.target.value})}
                                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-rose-500 outline-none"
                                                placeholder="https://www.airbnb.com/calendar/export/..."
                                            />
                                        </div>

                                        <button 
                                            onClick={() => saveIntegration('airbnb_ical', airbnbConfig)}
                                            disabled={loading}
                                            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-600/20"
                                        >
                                            {loading ? 'Enregistrement...' : 'Enregistrer et Synchroniser Airbnb'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === "profile" && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold mb-4">{t.settings.personalInfo}</h2>

                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden relative group">
                                        {avatarUrl ? (
                                            <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                        ) : (
                                            <User className="w-8 h-8 text-zinc-600" />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-sm font-bold mb-2">{t.settings.avatarLabel}</label>
                                        <FileUploader
                                            value={avatarUrl}
                                            onUpload={setAvatarUrl}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2">{t.settings.fullName}</label>
                                    <input
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-rose-500 transition-colors"
                                        placeholder={t.settings.namePlaceholder}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold mb-2">{t.settings.email}</label>
                                    <input
                                        value={user?.email}
                                        disabled
                                        className="w-full bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-zinc-500 cursor-not-allowed"
                                    />
                                </div>

                                <button
                                    onClick={updateProfile}
                                    disabled={loading}
                                    className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg shadow-rose-600/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <Check className="w-5 h-5" />
                                    {loading ? t.common.loading : t.settings.saveProfile}
                                </button>
                            </div>
                        )}

                        {activeTab === "plan" && (
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold mb-4">{t.settings.yourPlan}</h2>
                                <div className="bg-slate-950 p-6 rounded-2xl border border-white/10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <p className="text-sm text-zinc-400 mb-1">{t.settings.currentPlan}</p>
                                            <div className="text-3xl font-black text-rose-400 mb-4 uppercase tracking-wider">
                                                {subscription?.planId === "pro" ? "PRO" : subscription?.planId === "basic" ? "BASIQUE" : "DÉMO"}
                                            </div>
                                        </div>
                                        {subscription?.status === 'active' && (
                                            <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/20">
                                                {t.settings.active}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 text-sm text-zinc-300">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${subscription?.planId === "demo" ? "bg-yellow-400" : "bg-green-400"}`} />
                                            {subscription?.planId === "pro" ? t.settings.unlimitedGuides : subscription?.planId === "basic" ? t.settings.oneGuideIncluded : t.settings.oneGuideDraft}
                                        </div>

                                        {subscription?.addons?.themes && (
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                                {t.settings.themesUnlocked}
                                            </div>
                                        )}
                                        {subscription?.addons?.extra_guides > 0 && (
                                            <div className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                +{subscription.addons.extra_guides} {t.settings.extraGuides}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {subscription?.planId !== "pro" ? (
                                        <Link href="/pricing" className="bg-rose-600 text-white text-center py-3 rounded-xl font-bold hover:bg-rose-700 transition-colors">
                                            {t.settings.upgradeToPro}
                                        </Link>
                                    ) : (
                                        <button disabled className="bg-zinc-800 text-zinc-500 py-3 rounded-xl font-bold cursor-not-allowed">
                                            {t.settings.youArePro}
                                        </button>
                                    )}

                                    <a
                                        href="#"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            if (!user) return;
                                            setLoading(true);
                                            try {
                                                const res = await fetch('/api/stripe/portal', {
                                                    method: 'POST',
                                                    headers: { Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` }
                                                });
                                                const data = await res.json();
                                                if (data.url) window.location.href = data.url;
                                                else showModal(t.settings.info, <p className="text-center p-4">{t.settings.noBillingAccount}</p>, "ℹ️");
                                            } catch (e) { 
                                                console.error(e);
                                                showModal(t.settings.error, <p className="text-center text-red-500 p-4">{t.settings.serverError}</p>, "⚠️");
                                            }
                                            setLoading(false);
                                        }}
                                        className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all text-center"
                                    >
                                        {t.settings.manageSubscription}
                                    </a>
                                </div>
                            </div>
                        )}

                        {activeTab === "shop" && (
                            <div className="space-y-8">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold">{t.settings.shop}</h2>
                                    <div className="flex items-center gap-2 text-xs text-zinc-400 bg-white/5 px-3 py-1 rounded-full">
                                        <ShieldCheck className="w-4 h-4 text-green-400" />
                                        {t.settings.securePayment}
                                    </div>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-6">
                                    <div className="relative group p-1 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-rose-500/50 transition-all hover:shadow-2xl hover:shadow-rose-500/10">
                                        <div className="absolute top-4 right-4 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                                            {t.settings.bestSeller}
                                        </div>
                                        <div className="bg-slate-900 rounded-[22px] p-6 h-full flex flex-col">
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300">
                                                <Package className="w-8 h-8 text-white" />
                                            </div>

                                            <h3 className="font-bold text-xl mb-2 text-white">{t.settings.qrCanvas}</h3>
                                            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                                                {t.settings.qrCanvasDesc}
                                            </p>

                                            <ul className="space-y-2 mb-8 flex-1">
                                                <li className="flex items-center gap-2 text-sm text-zinc-300">
                                                    <Check className="w-4 h-4 text-rose-500" />
                                                    {t.settings.hdPrint}
                                                </li>
                                                <li className="flex items-center gap-2 text-sm text-zinc-300">
                                                    <Check className="w-4 h-4 text-rose-500" />
                                                    {t.settings.frameIncluded}
                                                </li>
                                                <li className="flex items-center gap-2 text-sm text-zinc-300">
                                                    <Check className="w-4 h-4 text-rose-500" />
                                                    {t.settings.trackedShipping}
                                                </li>
                                            </ul>

                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                <div className="flex flex-col">
                                                    <span className="text-2xl font-bold text-white">200 DH</span>
                                                    <span className="text-[10px] text-zinc-500">{t.settings.shippingTtc}</span>
                                                </div>
                                                <button className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg active:scale-95">
                                                    {t.settings.order}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative group p-1 rounded-3xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-white/10 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10">
                                        <div className="absolute top-4 right-4 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                                            {t.settings.requiredPro}
                                        </div>
                                        <div className="bg-slate-900 rounded-[22px] p-6 h-full flex flex-col">
                                            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                                                <Settings className="w-8 h-8 text-blue-400" />
                                            </div>

                                            <h3 className="font-bold text-xl mb-2 text-white">{t.settings.extraGuide}</h3>
                                            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                                                {t.settings.extraGuideDesc}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                                                <div className="flex flex-col">
                                                    <span className="text-2xl font-bold text-white">20 DH</span>
                                                    <span className="text-[10px] text-zinc-500">{t.settings.perMonth}</span>
                                                </div>
                                                <button
                                                    onClick={async () => {
                                                        if (subscription?.planId !== 'pro') {
                                                            showModal(t.settings.proReserved, <p className="text-center p-4">{t.settings.onlyProCanAdd}</p>, "🚫");
                                                            return;
                                                        }

                                                        showModal(
                                                            t.settings.addGuide,
                                                            <div className="text-center p-4">
                                                                <p className="mb-6">{t.settings.confirmAddGuide}</p>
                                                                <div className="flex justify-center gap-4">
                                                                    <button onClick={closeModal} className="px-4 py-2 rounded-xl bg-gray-100 font-bold hover:bg-gray-200">{t.settings.cancel}</button>
                                                                    <button onClick={async () => {
                                                                        closeModal();
                                                                        setLoading(true);
                                                                        try {
                                                                            const res = await fetch('/api/stripe/addon', {
                                                                                method: 'POST',
                                                                                headers: { Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` }
                                                                            });
                                                                            const data = await res.json();
                                                                            if (data.success) {
                                                                                showModal(t.settings.guideAdded, <p className="text-center p-4">{t.settings.limitIncreased}</p>, "✅");
                                                                                setTimeout(() => window.location.reload(), 2000);
                                                                            } else {
                                                                                showModal(t.settings.error, <p className="text-center text-red-500 p-4">{data.error}</p>, "⚠️");
                                                                            }
                                                                        } catch (e) {
                                                                            console.error(e);
                                                                            showModal(t.settings.error, <p className="text-center text-red-500 p-4">{t.settings.serverError}</p>, "⚠️");
                                                                        }
                                                                        setLoading(false);
                                                                    }} className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700">{t.settings.confirm}</button>
                                                                </div>
                                                            </div>,
                                                            "➕"
                                                        );
                                                    }}
                                                    disabled={loading || subscription?.planId !== 'pro'}
                                                    className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Themes Pack */}
                                    <div className="relative p-6 rounded-3xl bg-slate-900 border border-white/5 flex flex-col transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10">
                                        {subscription?.addons?.themes && (
                                            <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                                <Check size={10} /> {t.settings.owned}
                                            </div>
                                        )}
                                        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-400">
                                            <Sparkles className="w-8 h-8" />
                                        </div>
                                        <h3 className="font-bold text-xl mb-2 text-white">{t.settings.themePack}</h3>
                                        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                                            {t.settings.themePackDesc}
                                        </p>
                                        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-2xl font-bold text-white">15 DH <span className="text-xs text-zinc-500 font-normal">{t.settings.perMonth}</span></span>

                                            {subscription?.planId === 'pro' || subscription?.addons?.themes ? (
                                                <button disabled className="bg-green-500/20 text-green-400 px-6 py-3 rounded-xl text-sm font-bold cursor-not-allowed">
                                                    {t.settings.alreadyIncluded}
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={async () => {
                                                        showModal(
                                                            t.settings.confirmPurchase,
                                                            <div className="text-center p-4">
                                                                <p className="mb-6">{t.settings.themeConfirmDesc}</p>
                                                                <div className="flex justify-center gap-4">
                                                                    <button onClick={closeModal} className="px-4 py-2 rounded-xl bg-gray-100 font-bold hover:bg-gray-200">{t.settings.cancel}</button>
                                                                    <button onClick={async () => {
                                                                        closeModal();
                                                                        setLoading(true);
                                                                        try {
                                                                            const res = await fetch('/api/stripe/themes', {
                                                                                method: 'POST',
                                                                                headers: { Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}` }
                                                                            });
                                                                            const data = await res.json();
                                                                            if (data.success) {
                                                                                showModal(t.settings.themesUnlockedTitle, <p className="text-center p-4">{t.settings.themesUnlockedMsg}</p>, "🎉");
                                                                                setTimeout(() => window.location.reload(), 2000);
                                                                            } else {
                                                                                showModal(t.settings.error, <p className="text-center text-red-500 p-4">{data.error}</p>, "⚠️");
                                                                            }
                                                                        } catch (e) {
                                                                            console.error(e);
                                                                            showModal(t.settings.error, <p className="text-center text-red-500 p-4">{t.settings.serverError}</p>, "⚠️");
                                                                        }
                                                                        setLoading(false);
                                                                    }} className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold hover:bg-rose-700">{t.settings.confirm}</button>
                                                                </div>
                                                            </div>,
                                                            "🛍️"
                                                        );
                                                    }}
                                                    disabled={loading}
                                                    className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors shadow-lg active:scale-95"
                                                >
                                                    {loading ? "..." : t.settings.buy}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Modal Global */}
            <Modal
                isOpen={modal.isOpen}
                onClose={closeModal}
                title={modal.title}
                icon={modal.icon}
            >
                {modal.content}
            </Modal>
        </div>
    );
}
