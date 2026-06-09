"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { MaplyoLogo } from "@/components/ui/MaplyoLogo";
import { Check, ShoppingCart, Info, ScanLine, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/Button";

const FORMATS = [
  { id: "a6", name: "A6 (Chevet)", size: "10x15 cm", price: 15, desc: "Idéal pour une table de nuit ou un comptoir d'accueil." },
  { id: "a5", name: "A5 (Porte)", size: "15x21 cm", price: 25, desc: "Parfait pour afficher derrière la porte d'entrée." },
  { id: "a4", name: "A4 (Mur)", size: "21x29.7 cm", price: 35, desc: "Format cadre classique pour un mur bien visible." }
];

const MATERIALS = [
  { id: "sticker", name: "Sticker Vinyle", extra: 0, desc: "Autocollant mat, résistant à l'eau." },
  { id: "plexi", name: "Plexiglas Premium", extra: 15, desc: "Aspect verre brillant, très haut de gamme." },
  { id: "canvas", name: "Toile Imprimée", extra: 20, desc: "Impression sur toile texturée, style tableau." }
];

export function CanvasShop({ guideUrl = "https://maplyo.com/g/demo" }: { guideUrl?: string }) {
  const [selectedFormat, setSelectedFormat] = useState(FORMATS[1]);
  const [selectedMaterial, setSelectedMaterial] = useState(MATERIALS[1]);
  const [customTitle, setCustomTitle] = useState("Bienvenue");
  const [isOrdering, setIsOrdering] = useState(false);

  const totalPrice = selectedFormat.price + selectedMaterial.extra;

  const handleOrder = () => {
    setIsOrdering(true);
    // Simulate API call for pre-order
    setTimeout(() => {
      alert("Votre demande de pré-commande a été envoyée ! Notre équipe vous contactera pour finaliser le paiement et la livraison.");
      setIsOrdering(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col lg:flex-row">
      
      {/* LEFT: Configuration */}
      <div className="p-8 lg:w-1/2 flex flex-col gap-8 border-b lg:border-b-0 lg:border-r border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Imprimez votre Guide</h2>
          <p className="text-gray-500">
            Recevez un support physique premium avec votre QR Code. Idéal pour que vos voyageurs scannent le guide dès leur arrivée.
          </p>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-700">1. Choisissez le format</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {FORMATS.map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFormat(f)}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${selectedFormat.id === f.id ? "border-blue-600 bg-blue-50" : "border-gray-100 hover:border-gray-200"}`}
              >
                <div className="font-bold text-gray-900 mb-1">{f.name}</div>
                <div className="text-xs text-gray-500 mb-2">{f.size}</div>
                <div className="text-sm font-bold text-blue-600">{f.price}€</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-700">2. Choisissez la matière</label>
          <div className="flex flex-col gap-3">
            {MATERIALS.map(m => (
              <button
                key={m.id}
                onClick={() => setSelectedMaterial(m)}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${selectedMaterial.id === m.id ? "border-blue-600 bg-blue-50" : "border-gray-100 hover:border-gray-200"}`}
              >
                <div className="text-left">
                  <div className="font-bold text-gray-900">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.desc}</div>
                </div>
                <div className="font-bold text-blue-600">
                  {m.extra > 0 ? `+${m.extra}€` : "Inclus"}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-bold text-gray-700">3. Titre personnalisé</label>
          <input 
            type="text" 
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
            className="w-full p-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 outline-none transition-all"
            placeholder="Ex: Bienvenue chez Nous"
            maxLength={30}
          />
        </div>
      </div>

      {/* RIGHT: Visual Render & Order */}
      <div className="p-8 lg:w-1/2 bg-gray-50 flex flex-col justify-between">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-6 uppercase tracking-widest">
            <ScanLine className="w-4 h-4" />
            Aperçu du rendu ({selectedMaterial.name})
          </div>

          {/* The Visual Mockup */}
          <div className="flex items-center justify-center p-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-[2rem] shadow-inner relative overflow-hidden">
            {/* Material Effects */}
            {selectedMaterial.id === "plexi" && (
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 transform -rotate-45 translate-x-10 pointer-events-none" />
            )}
            {selectedMaterial.id === "canvas" && (
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
            )}

            {/* The Plaque */}
            <div className={`
              relative bg-white flex flex-col items-center justify-center p-8
              ${selectedFormat.id === "a6" ? "w-48 aspect-[2/3]" : selectedFormat.id === "a5" ? "w-64 aspect-[1/1.4]" : "w-72 aspect-[1/1.4]"}
              ${selectedMaterial.id === "plexi" ? "rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/50" : selectedMaterial.id === "canvas" ? "shadow-[0_10px_30px_rgba(0,0,0,0.15)]" : "shadow-sm rounded-md"}
              transition-all duration-500
            `}>
              <MaplyoLogo className="w-10 h-10 mb-4" classNamePath="fill-blue-600" showText={false} />
              
              <h3 className="text-lg font-bold text-gray-900 text-center mb-6 px-4 leading-tight">
                {customTitle || "Bienvenue"}
              </h3>

              <div className="p-3 border border-gray-100 rounded-2xl mb-6 bg-white shadow-sm">
                <QRCodeSVG
                    value={guideUrl}
                    size={120}
                    level="H"
                    className="w-full h-auto"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                <Smartphone className="w-4 h-4" />
                Scannez pour ouvrir
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="text-sm font-bold text-gray-500 mb-1">Total TTC</div>
              <div className="text-3xl font-black text-gray-900">{totalPrice}€</div>
            </div>
            <div className="text-right text-sm text-gray-500">
              Livraison incluse<br/>
              Expédié sous 48h
            </div>
          </div>
          
          <Button 
            className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/20"
            onClick={handleOrder}
            disabled={isOrdering}
          >
            {isOrdering ? "Envoi en cours..." : "Pré-commander ma plaque"}
          </Button>
          <p className="text-center text-xs text-gray-400 mt-4">
            Vous ne payez rien aujourd'hui. Nous vous contacterons pour valider le design.
          </p>
        </div>
      </div>
    </div>
  );
}
