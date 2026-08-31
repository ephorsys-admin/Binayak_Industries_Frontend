import React, { useState, useMemo } from 'react';
import {
  ChefHat,
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  ShieldCheck,
  Flame,
  Filter,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';

import ratlamiSevImg from '../../assets/ratlami_sev.jpg';
import khattaMeethaImg from '../../assets/khatta_meetha.jpg';
import roastedCashewsImg from '../../assets/roasted_cashews.jpg';
import desiSweetsImg from '../../assets/desi_sweets.jpg';
import murukkuImg from '../../assets/murukku_crisps.jpg';
import mathriImg from '../../assets/mathri_namkeen.jpg';
import heroBannerImg from '../../assets/hero_banner.jpg';

const initialSnacks = [
  {
    id: 1,
    title: 'Artisanal Ratlami Sev (Extra Clove)',
    category: 'sev-bhujia',
    categoryName: 'Sev & Bhujia',
    weight: '500g Pack',
    price: 240,
    originalPrice: 300,
    rating: 4.9,
    isBestseller: true,
    oilType: '100% Groundnut Oil',
    stock: 140,
    image: ratlamiSevImg,
  },
  {
    id: 2,
    title: 'Royal Khatta Meetha Chivda Mix',
    category: 'chivda-mix',
    categoryName: 'Chivda & Mix',
    weight: '400g Pack',
    price: 190,
    originalPrice: 240,
    rating: 4.8,
    isBestseller: false,
    oilType: '100% Groundnut Oil',
    stock: 95,
    image: khattaMeethaImg,
  },
  {
    id: 3,
    title: 'Authentic Bikaneri Hing Bhujia',
    category: 'sev-bhujia',
    categoryName: 'Sev & Bhujia',
    weight: '400g Pack',
    price: 180,
    originalPrice: 225,
    rating: 4.9,
    isBestseller: true,
    oilType: '100% Groundnut Oil',
    stock: 110,
    image: ratlamiSevImg,
  },
  {
    id: 4,
    title: 'Pure Gir Cow Ghee Besan Ladoo Box',
    category: 'desi-sweets',
    categoryName: 'Desi Sweets',
    weight: '500g Box (12 Pcs)',
    price: 320,
    originalPrice: 400,
    rating: 4.9,
    isBestseller: false,
    oilType: '100% Desi Cow Ghee',
    stock: 60,
    image: desiSweetsImg,
  },
  {
    id: 5,
    title: 'Tandoori Spiced Roasted Cashews',
    category: 'roasted-cashews',
    categoryName: 'Roasted Nuts',
    weight: '250g Tin',
    price: 340,
    originalPrice: 425,
    rating: 4.9,
    isBestseller: true,
    oilType: 'Dry Roasted',
    stock: 45,
    image: roastedCashewsImg,
  },
  {
    id: 6,
    title: 'Crispy Butter Murukku Chakli',
    category: 'murukku-crisps',
    categoryName: 'Murukku Crisps',
    weight: '300g Pack',
    price: 150,
    originalPrice: 190,
    rating: 4.7,
    isBestseller: false,
    oilType: 'Cold-Pressed Groundnut Oil',
    stock: 80,
    image: murukkuImg,
  },
  {
    id: 7,
    title: 'Traditional Ajwain Flaky Mathri',
    category: 'sev-bhujia',
    categoryName: 'Mathri & Khasta',
    weight: '400g Tin',
    price: 180,
    originalPrice: 225,
    rating: 4.8,
    isBestseller: false,
    oilType: '100% Groundnut Oil',
    stock: 120,
    image: mathriImg,
  },
  {
    id: 8,
    title: 'Royal Celebration Velvet Hamper Box',
    category: 'desi-sweets',
    categoryName: 'Festive Hampers',
    weight: '1kg Gift Tin',
    price: 699,
    originalPrice: 899,
    rating: 5.0,
    isBestseller: true,
    oilType: 'Pure Desi Ghee',
    stock: 30,
    image: heroBannerImg,
  },
];

const categoryOptions = [
  { id: 'all', label: 'All Delicacies' },
  { id: 'sev-bhujia', label: 'Sev & Bhujia' },
  { id: 'chivda-mix', label: 'Chivda & Mix' },
  { id: 'desi-sweets', label: 'Desi Sweets' },
  { id: 'roasted-cashews', label: 'Roasted Nuts' },
  { id: 'murukku-crisps', label: 'Murukku Crisps' },
];

const AdminProducts = () => {
  const [products, setProducts] = useState(initialSnacks);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'sev-bhujia',
    categoryName: 'Sev & Bhujia',
    weight: '500g Pack',
    price: 200,
    originalPrice: 250,
    oilType: '100% Groundnut Oil',
    stock: 100,
    isBestseller: false,
  });

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          p.oilType.toLowerCase().includes(q)
      );
    }

    return list;
  }, [products, activeCategory, searchQuery]);

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      category: 'sev-bhujia',
      categoryName: 'Sev & Bhujia',
      weight: '500g Pack',
      price: 200,
      originalPrice: 250,
      oilType: '100% Groundnut Oil',
      stock: 100,
      isBestseller: false,
    });
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setFormData({
      title: p.title,
      category: p.category,
      categoryName: p.categoryName,
      weight: p.weight,
      price: p.price,
      originalPrice: p.originalPrice || Math.round(p.price * 1.25),
      oilType: p.oilType,
      stock: p.stock || 50,
      isBestseller: p.isBestseller,
    });
    setEditingProduct(p);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success('Product deleted from inventory');
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Product title is required');
      return;
    }

    const catObj = categoryOptions.find((c) => c.id === formData.category);
    const categoryName = catObj ? catObj.label : 'Namkeen';

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                title: formData.title.trim(),
                category: formData.category,
                categoryName,
                weight: formData.weight,
                price: Number(formData.price),
                originalPrice: Number(formData.originalPrice),
                oilType: formData.oilType,
                stock: Number(formData.stock),
                isBestseller: formData.isBestseller,
              }
            : p
        )
      );
      toast.success(`Product "${formData.title}" updated!`);
    } else {
      const newProd = {
        id: Date.now(),
        title: formData.title.trim(),
        category: formData.category,
        categoryName,
        weight: formData.weight,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        rating: 4.9,
        isBestseller: formData.isBestseller,
        oilType: formData.oilType,
        stock: Number(formData.stock),
        image: ratlamiSevImg,
      };
      setProducts((prev) => [newProd, ...prev]);
      toast.success(`New Snack "${formData.title}" added!`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#df9c4d]/15 text-[#8f5619] text-xs font-black uppercase tracking-wider mb-1">
            <ChefHat className="w-3.5 h-3.5" />
            <span>Kitchen Inventory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif-heading tracking-tight">
            Products & Snacks Catalog
          </h1>
          <p className="text-xs text-stone-500">
            Manage your freshly fried namkeens, sweets boxes, prices, and stock levels.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-full bg-[#df9c4d] hover:bg-[#cca062] text-[#1c130d] font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Snack</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categoryOptions.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#1c130d] text-white shadow-xs font-black'
                    : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200 shadow-2xs'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-white rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-2xs"
          />
        </div>
      </div>

      {/* Products Table Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase text-[10px]">
                <th className="pb-3">Product Description</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Pack & Price</th>
                <th className="pb-3">Oil / Quality</th>
                <th className="pb-3">Stock Units</th>
                <th className="pb-3">Rating</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50/70 transition-colors">
                  {/* Photo & Title */}
                  <td className="py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-12 h-12 rounded-2xl object-cover border border-stone-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-stone-900 text-xs sm:text-sm font-brand">{p.title}</h4>
                          {p.isBestseller && (
                            <span className="px-1.5 py-0.5 bg-rose-50 text-rose-700 text-[9px] font-black uppercase rounded-md border border-rose-100">
                              HOT
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-500">SKU: BIN-{p.id}09</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 font-semibold text-stone-700">
                    {p.categoryName}
                  </td>

                  {/* Pack & Price */}
                  <td className="py-3.5">
                    <span className="font-black text-stone-900 font-brand text-sm">₹{p.price}</span>
                    <span className="text-[11px] text-stone-400 block">{p.weight}</span>
                  </td>

                  {/* Oil Type */}
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>{p.oilType}</span>
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      p.stock < 50 ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-800'
                    }`}>
                      {p.stock} in stock
                    </span>
                  </td>

                  {/* Rating */}
                  <td className="py-3.5">
                    <span className="inline-flex items-center gap-1 bg-emerald-700 text-white text-[10px] font-black px-2 py-0.5 rounded-md">
                      <span>{p.rating}</span>
                      <Star className="w-2.5 h-2.5 fill-white" />
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 rounded-lg text-stone-600 hover:text-stone-950 hover:bg-stone-100 cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-base font-brand text-stone-900">
                {editingProduct ? 'Edit Snack Product' : 'Add New Snack to Menu'}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-stone-700">Product Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Artisanal Ratlami Sev (Extra Clove)"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-stone-700">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                  >
                    {categoryOptions.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-stone-700">Pack / Weight</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="e.g. 500g Pack"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-stone-700">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="240"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-stone-700">Original Price (₹)</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    placeholder="300"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-stone-700">Stock Units</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="100"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-bold text-stone-700">Frying Oil Type</label>
                  <input
                    type="text"
                    value={formData.oilType}
                    onChange={(e) => setFormData({ ...formData, oilType: e.target.value })}
                    placeholder="100% Groundnut Oil"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-stone-700">Bestseller Tag</label>
                  <select
                    value={formData.isBestseller ? 'true' : 'false'}
                    onChange={(e) => setFormData({ ...formData, isBestseller: e.target.value === 'true' })}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                  >
                    <option value="false">Standard Item</option>
                    <option value="true">🔥 Bestseller</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#df9c4d] hover:bg-[#cca062] text-[#1c130d] font-black shadow-sm cursor-pointer"
                >
                  {editingProduct ? 'Save Changes' : 'Add to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminProducts;
