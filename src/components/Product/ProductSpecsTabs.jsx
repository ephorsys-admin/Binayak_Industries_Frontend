import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, Feather } from 'lucide-react';

const ProductSpecsTabs = ({
  description,
  ingredients,
  oilType = '100% Cold-Pressed Groundnut Oil',
  shelfLife = '90 Days',
  spiciness = 'Medium Spice',
}) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-2xs space-y-5">
      {/* Tab Selectors */}
      <div className="flex items-center gap-1.5 border-b border-stone-200 pb-2.5 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('description')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'description'
              ? 'bg-stone-900 text-white shadow-xs font-black'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          Artisanal Craft & Story
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ingredients')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'ingredients'
              ? 'bg-stone-900 text-white shadow-xs font-black'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          Ingredients & Spices
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('nutrition')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'nutrition'
              ? 'bg-stone-900 text-white shadow-xs font-black'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          Purity & Standards
        </button>
      </div>

      {/* Tab 1: Description & Highlights */}
      {activeTab === 'description' && (
        <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed">
          <p>
            {description ||
              `Prepared with authentic traditional techniques. Our snacks are slow-fried exclusively in pure cold-pressed groundnut oil, locking in freshness, crisp texture, and aromatic flavors.`}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-0.5">
              <span className="font-bold text-stone-900 text-xs block">0% Palm Oil</span>
              <p className="text-[11px] text-stone-500">{oilType}</p>
            </div>
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-0.5">
              <span className="font-bold text-stone-900 text-xs block">Zero Preservatives</span>
              <p className="text-[11px] text-stone-500">100% natural, no synthetic colors</p>
            </div>
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-0.5">
              <span className="font-bold text-stone-900 text-xs block">Nitrogen Sealed</span>
              <p className="text-[11px] text-stone-500">Crisp for up to {shelfLife}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Ingredients */}
      {activeTab === 'ingredients' && (
        <div className="space-y-2 text-xs sm:text-sm">
          <span className="font-bold text-stone-900 block text-xs">
            Authentic Ingredients & Seasoning:
          </span>
          <p className="text-stone-600 leading-relaxed p-3.5 rounded-2xl bg-stone-50 border border-stone-200">
            {ingredients ||
              'Freshly milled Gram Flour (Besan), Cold-Pressed Groundnut Oil, Rock Salt, Clove, Black Pepper, Asafoetida (Hing), Ajwain & Handcrafted Spice Blend.'}
          </p>
        </div>
      )}

      {/* Tab 3: Purity & Standards */}
      {activeTab === 'nutrition' && (
        <div className="space-y-2 text-xs sm:text-sm">
          <span className="font-bold text-stone-900 block text-xs">
            Quality & Dietary Standards:
          </span>
          <ul className="space-y-2 text-stone-600">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Pure Vegetarian</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero Trans Fats & Zero Synthetic Flavors</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Spiciness Level: {spiciness}</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductSpecsTabs;
