import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Layers,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  X,
  Sparkles,
  AlertTriangle,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import toast from 'react-hot-toast';

import {
  fetchAdminCategories,
  updateCategory,
} from '../../Redux/features/category/categoryThunk';
import {
  selectAdminCategories,
  selectCategoryLoading,
  deleteCategoryLocal,
} from '../../Redux/features/category/categorySlice';

import ratlamiSevImg from '../../assets/ratlami_sev.jpg';
import khattaMeethaImg from '../../assets/khatta_meetha.jpg';
import roastedCashewsImg from '../../assets/roasted_cashews.jpg';
import desiSweetsImg from '../../assets/desi_sweets.jpg';
import murukkuImg from '../../assets/murukku_crisps.jpg';
import mathriImg from '../../assets/mathri_namkeen.jpg';
import heroBannerImg from '../../assets/hero_banner.jpg';

const fallbackCategories = [
  {
    _id: 'sev-bhujia',
    name: 'Sev & Bhujia',
    slug: 'sev-bhujia',
    description: 'Artisanal Ratlami, Bikaneri Hing Bhujia & Clove Sev fried in pure groundnut oil.',
    productsCount: 8,
    status: true,
    sortOrder: 1,
    image: { url: ratlamiSevImg },
  },
  {
    _id: 'chivda-mix',
    name: 'Chivda & Mix',
    slug: 'chivda-mix',
    description: 'Royal Khatta Meetha, Roasted Poha & Tea-Time evening snacks.',
    productsCount: 6,
    status: true,
    sortOrder: 2,
    image: { url: khattaMeethaImg },
  },
  {
    _id: 'desi-sweets',
    name: 'Desi Sweets',
    slug: 'desi-sweets',
    description: '100% Pure Gir Cow Ghee Besan Ladoo, Motichoor & Traditional Mithai.',
    productsCount: 5,
    status: true,
    sortOrder: 3,
    image: { url: desiSweetsImg },
  },
  {
    _id: 'roasted-cashews',
    name: 'Roasted Nuts & Dry Fruits',
    slug: 'roasted-cashews',
    description: 'Tandoori Spiced Cashews, Salted Almonds & Dry Roasted Healthy Snacks.',
    productsCount: 4,
    status: true,
    sortOrder: 4,
    image: { url: roastedCashewsImg },
  },
  {
    _id: 'murukku-crisps',
    name: 'Murukku & Chakli',
    slug: 'murukku-crisps',
    description: 'Crispy Butter Murukku, Rice Chakli & South-Indian crunchy savories.',
    productsCount: 4,
    status: true,
    sortOrder: 5,
    image: { url: murukkuImg },
  },
  {
    _id: 'mathri-namkeen',
    name: 'Mathri & Khasta',
    slug: 'mathri-namkeen',
    description: 'Crispy Masala Mathri, Methi Puri & Ajwain Nimki for festive times.',
    productsCount: 5,
    status: true,
    sortOrder: 6,
    image: { url: mathriImg },
  },
  {
    _id: 'festive-hampers',
    name: 'Festive Gift Hampers',
    slug: 'festive-hampers',
    description: 'Royal Velvet Gift Tins & Brass Executive Diwali & Wedding Hampers.',
    productsCount: 3,
    status: true,
    sortOrder: 7,
    image: { url: heroBannerImg },
  },
];

const AdminCategories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxCategories = useSelector(selectAdminCategories);
  const isLoading = useSelector(selectCategoryLoading);

  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetCategory, setDeleteTargetCategory] = useState(null);

  // Initial Fetch on component mount
  useEffect(() => {
    dispatch(fetchAdminCategories({ limit: 100 }));
  }, [dispatch]);

  const displayCategories =
    reduxCategories && reduxCategories.length > 0
      ? reduxCategories
      : fallbackCategories;

  const filteredCategories = displayCategories.filter((c) => {
    const categoryName = c.name || '';
    const desc = c.description || '';
    return (
      categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleOpenDeleteModal = (cat) => {
    setDeleteTargetCategory(cat);
  };

  const handleConfirmDelete = () => {
    if (deleteTargetCategory) {
      const catId = deleteTargetCategory._id || deleteTargetCategory.id || deleteTargetCategory.slug;
      dispatch(deleteCategoryLocal(catId));
      toast.success(`Category "${deleteTargetCategory.name}" deleted.`);
      setDeleteTargetCategory(null);
    }
  };

  const handleToggleStatus = async (cat) => {
    const newStatus = !(typeof cat.status === 'boolean' ? cat.status : cat.status === 'Active');
    const formData = new FormData();
    formData.append('status', newStatus);
    await dispatch(updateCategory(cat._id || cat.id, formData));
  };

  return (
    <div className="space-y-5 sm:space-y-6 pb-10">

      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-[#981b2e] text-xs font-black uppercase tracking-wider mb-1 border border-rose-200/60">
            <Layers className="w-3.5 h-3.5" />
            <span>Product Taxonomy</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900  tracking-tight">
            Categories Management
          </h1>
          <p className="text-xs text-stone-500">
            Create, edit, and organize snacks, namkeens, and sweets categories.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <button
            type="button"
            onClick={() => dispatch(fetchAdminCategories({ limit: 100 }))}
            className="p-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer shrink-0"
            title="Refresh Categories"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <Link
            to="/admin/categories/add"
            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Category</span>
          </Link>
        </div>
      </div>

      {/* 2. Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories by name or description..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white rounded-2xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#981b2e] shadow-2xs"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-600 font-semibold">
          <span className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 shadow-2xs">
            Total: <strong className="text-stone-900">{displayCategories.length}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
            Active: <strong className="text-emerald-900">{displayCategories.filter((c) => c.status === true || c.status === 'Active').length}</strong>
          </span>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8 gap-2 text-xs font-bold text-stone-500 bg-white rounded-3xl border border-stone-200">
          <Loader2 className="w-5 h-5 animate-spin text-[#981b2e]" />
          <span>Fetching categories...</span>
        </div>
      )}

      {/* ========================================================
          3. MOBILE VIEW (Cards for mobile screens < md)
          ======================================================== */}
      <div className="md:hidden space-y-3">
        {filteredCategories.map((cat) => {
          const catId = cat._id || cat.id || cat.slug;
          const isActive = typeof cat.status === 'boolean' ? cat.status : cat.status === 'Active';
          const imgSource = cat.image?.url || cat.image || ratlamiSevImg;

          return (
            <div
              key={catId}
              className="bg-white rounded-3xl p-4 border border-stone-200/80 shadow-2xs space-y-3"
            >
              {/* Top Row: Image + Name + Description */}
              <div className="flex items-start gap-3">
                <img
                  src={imgSource}
                  alt={cat.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-stone-200 shrink-0 bg-stone-100"
                  onError={(e) => {
                    e.currentTarget.src = ratlamiSevImg;
                  }}
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-stone-900 text-sm font-brand line-clamp-1">{cat.name}</h4>
                  <p className="text-[11px] text-stone-500 line-clamp-2 mt-0.5">
                    {cat.description || 'Artisanal snacks category'}
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-[10px] text-stone-500">
                    <span className="font-mono bg-stone-100 px-2 py-0.5 rounded-md font-semibold text-stone-700">
                      /{cat.slug || cat.name?.toLowerCase().replace(/\s+/g, '-')}
                    </span>
                    <span>•</span>
                    <span className="font-bold text-stone-700">{cat.productsCount || 0} Products</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Status Toggle + Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(cat)}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${isActive
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-stone-100 text-stone-600'
                    }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-stone-400'}`} />
                  <span>{isActive ? 'Active' : 'Inactive'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/admin/categories/edit/${catId}`}
                    className="px-3.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleOpenDeleteModal(cat)}
                    className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Delete Category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================
          4. DESKTOP VIEW (Table for md and larger screens)
          ======================================================== */}
      <div className="hidden md:block bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[620px]">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase text-[10px]">
                <th className="pb-3">Category Name</th>
                <th className="pb-3">Slug</th>
                <th className="pb-3">Sort Order</th>
                <th className="pb-3">Products Count</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredCategories.map((cat) => {
                const catId = cat._id || cat.id || cat.slug;
                const isActive = typeof cat.status === 'boolean' ? cat.status : cat.status === 'Active';
                const imgSource = cat.image?.url || cat.image || ratlamiSevImg;

                return (
                  <tr key={catId} className="hover:bg-stone-50/70 transition-colors">
                    {/* Category with Photo */}
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={imgSource}
                          alt={cat.name}
                          className="w-12 h-12 rounded-2xl object-cover border border-stone-200 shrink-0 bg-stone-100"
                          onError={(e) => {
                            e.currentTarget.src = ratlamiSevImg;
                          }}
                        />
                        <div>
                          <h4 className="font-bold text-stone-900 text-xs sm:text-sm font-brand">{cat.name}</h4>
                          <p className="text-[11px] text-stone-500 max-w-xs line-clamp-1">{cat.description || 'Artisanal snacks category'}</p>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="py-3.5 font-mono text-stone-500 font-medium">
                      /{cat.slug || cat.name?.toLowerCase().replace(/\s+/g, '-')}
                    </td>

                    {/* Sort Order */}
                    <td className="py-3.5 font-mono font-bold text-stone-700">
                      #{cat.sortOrder || 0}
                    </td>

                    {/* Products count */}
                    <td className="py-3.5">
                      <span className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-800 font-bold text-xs">
                        {cat.productsCount || 0} Items
                      </span>
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(cat)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer ${isActive
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                          }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-stone-400'}`} />
                        <span>{isActive ? 'Active' : 'Inactive'}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          to={`/admin/categories/edit/${catId}`}
                          className="p-1.5 rounded-lg text-stone-600 hover:text-stone-950 hover:bg-stone-100 cursor-pointer inline-flex items-center justify-center"
                          title="Edit Category"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleOpenDeleteModal(cat)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTargetCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-black font-brand text-stone-900">
                Delete Category?
              </h3>
              <p className="text-xs text-stone-500">
                Are you sure you want to delete <strong className="text-stone-800">"{deleteTargetCategory.name}"</strong>? Products inside will lose this category classification.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setDeleteTargetCategory(null)}
                className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminCategories;
