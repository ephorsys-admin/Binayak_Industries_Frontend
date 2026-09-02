import React from 'react';
import { ChefHat, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

import ratlamiSevImg from '../../../assets/ratlami_sev.jpg';
import khattaMeethaImg from '../../../assets/khatta_meetha.jpg';
import roastedCashewsImg from '../../../assets/roasted_cashews.jpg';
import desiSweetsImg from '../../../assets/desi_sweets.jpg';

const topSnacks = [
  {
    name: 'Artisanal Ratlami Sev (Extra Clove)',
    category: 'Sev & Bhujia',
    sales: '320 packs sold',
    price: '₹240',
    rating: 4.9,
    image: ratlamiSevImg,
  },
  {
    name: 'Royal Khatta Meetha Chivda',
    category: 'Chivda & Mix',
    sales: '245 packs sold',
    price: '₹190',
    rating: 4.8,
    image: khattaMeethaImg,
  },
  {
    name: 'Gir Cow Ghee Besan Ladoo',
    category: 'Desi Sweets',
    sales: '180 boxes sold',
    price: '₹320',
    rating: 4.9,
    image: desiSweetsImg,
  },
  {
    name: 'Spiced Roasted Cashews',
    category: 'Roasted Nuts',
    sales: '140 tins sold',
    price: '₹340',
    rating: 4.9,
    image: roastedCashewsImg,
  },
];

const TopProductsList = () => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-2xs">
      <div className="flex items-center justify-between pb-4 mb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#b45309] flex items-center justify-center">
            <ChefHat className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black font-brand text-stone-900">Bestselling Snacks</h3>
            <p className="text-[11px] text-stone-400">Highest rated delicacies this month</p>
          </div>
        </div>
        <Link
          to="/admin/products"
          className="text-xs font-bold text-[#981b2e] hover:underline"
        >
          Catalog →
        </Link>
      </div>

      <div className="space-y-3">
        {topSnacks.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-3 p-2.5 rounded-2xl hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-xl object-cover border border-stone-200 shrink-0"
              />
              <div>
                <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{item.name}</h4>
                <p className="text-[10px] text-stone-400">
                  {item.category} • <span className="text-emerald-700 font-semibold">{item.sales}</span>
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs font-black font-brand text-stone-900 block">{item.price}</span>
              <span className="inline-flex items-center gap-0.5 text-[10px] text-amber-600 font-bold">
                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                {item.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProductsList;
