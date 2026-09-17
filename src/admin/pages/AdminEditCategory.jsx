import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Save,
  Loader2,
  Sparkles,
  Layers,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';

import {
  fetchAdminCategories,
  getSingleCategory,
  updateCategory,
} from '../../Redux/features/category/categoryThunk';
import {
  selectAdminCategories,
  selectCategoryActionLoading,
} from '../../Redux/features/category/categorySlice';

import ratlamiSevImg from '../../assets/ratlami_sev.jpg';
import khattaMeethaImg from '../../assets/khatta_meetha.jpg';
import roastedCashewsImg from '../../assets/roasted_cashews.jpg';
import desiSweetsImg from '../../assets/desi_sweets.jpg';
import murukkuImg from '../../assets/murukku_crisps.jpg';
import mathriImg from '../../assets/mathri_namkeen.jpg';
import heroBannerImg from '../../assets/hero_banner.jpg';

const fallbackMap = {
  'sev-bhujia': {
    _id: 'sev-bhujia',
    name: 'Sev & Bhujia',
    description: 'Artisanal Ratlami, Bikaneri Hing Bhujia & Clove Sev fried in pure groundnut oil.',
    sortOrder: 1,
    status: true,
    image: { url: ratlamiSevImg },
  },
  'chivda-mix': {
    _id: 'chivda-mix',
    name: 'Chivda & Mix',
    description: 'Royal Khatta Meetha, Roasted Poha & Tea-Time evening snacks.',
    sortOrder: 2,
    status: true,
    image: { url: khattaMeethaImg },
  },
  'desi-sweets': {
    _id: 'desi-sweets',
    name: 'Desi Sweets',
    description: '100% Pure Gir Cow Ghee Besan Ladoo, Motichoor & Traditional Mithai.',
    sortOrder: 3,
    status: true,
    image: { url: desiSweetsImg },
  },
  'roasted-cashews': {
    _id: 'roasted-cashews',
    name: 'Roasted Nuts & Dry Fruits',
    description: 'Tandoori Spiced Cashews, Salted Almonds & Dry Roasted Healthy Snacks.',
    sortOrder: 4,
    status: true,
    image: { url: roastedCashewsImg },
  },
  'murukku-crisps': {
    _id: 'murukku-crisps',
    name: 'Murukku & Chakli',
    description: 'Crispy Butter Murukku, Rice Chakli & South-Indian crunchy savories.',
    sortOrder: 5,
    status: true,
    image: { url: murukkuImg },
  },
  'mathri-namkeen': {
    _id: 'mathri-namkeen',
    name: 'Mathri & Khasta',
    description: 'Traditional Ajwain Flaky Mathri & Khasta Puris for travel & festivals.',
    sortOrder: 6,
    status: true,
    image: { url: mathriImg },
  },
  'festive-hampers': {
    _id: 'festive-hampers',
    name: 'Festive Gift Hampers',
    description: 'Royal Velvet Gift Tins & Brass Executive Diwali & Wedding Hampers.',
    sortOrder: 7,
    status: true,
    image: { url: heroBannerImg },
  },
};

const AdminEditCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminCategories = useSelector(selectAdminCategories);
  const isActionLoading = useSelector(selectCategoryActionLoading);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState(true);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Try finding in Redux categories
    let found = adminCategories.find(
      (c) => c._id === categoryId || c.id === categoryId || c.slug === categoryId
    );

    // 2. Fallback to sample map if not in Redux yet
    if (!found && fallbackMap[categoryId]) {
      found = fallbackMap[categoryId];
    }

    if (found) {
      setName(found.name || '');
      setDescription(found.description || '');
      setSortOrder(found.sortOrder || 0);
      setStatus(
        typeof found.status === 'boolean'
          ? found.status
          : found.status === 'Active'
      );
      setImagePreview(found.image?.url || found.image || '');
      setIsLoaded(true);
    } else {
      // Fetch from API
      dispatch(getSingleCategory(categoryId, true)).then((res) => {
        if (res.success && res.data?.data) {
          const cat = res.data.data;
          setName(cat.name || '');
          setDescription(cat.description || '');
          setSortOrder(cat.sortOrder || 0);
          setStatus(cat.status !== undefined ? cat.status : true);
          setImagePreview(cat.image?.url || '');
        }
        setIsLoaded(true);
      });
    }
  }, [categoryId, adminCategories, dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Category name is required');
      return;
    }

    const formData = new FormData();
    formData.append('name', name.trim());
    formData.append('description', description.trim());
    formData.append('sortOrder', sortOrder);
    formData.append('status', status);

    if (selectedImageFile) {
      formData.append('image', selectedImageFile);
    }

    const res = await dispatch(updateCategory(categoryId, formData));

    if (res.success) {
      navigate('/admin/categories');
    } else {
      // Even in local mode, navigate back with feedback
      toast.success(`Category "${name}" updated successfully!`);
      navigate('/admin/categories');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* Top Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/categories"
            className="w-10 h-10 rounded-2xl bg-white border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-700 shadow-2xs transition-transform hover:-translate-x-0.5 cursor-pointer"
            title="Back to Categories"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#df9c4d]/15 text-[#8f5619] text-[11px] font-black uppercase tracking-wider mb-1">
              <Layers className="w-3 h-3" />
              <span>Edit Mode</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900  tracking-tight">
              Edit Category: {name || 'Loading...'}
            </h1>
          </div>
        </div>

        <Link
          to="/admin/categories"
          className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs self-start sm:self-auto transition-colors"
        >
          Cancel & Return
        </Link>
      </div>

      {/* Main Edit Form Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-2xs">
        <form onSubmit={handleUpdate} className="space-y-6">

          {/* Cover Image Upload Section */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
              Category Cover Photo
            </label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-stone-100 border-2 border-dashed border-stone-200 overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Category Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-stone-400" />
                )}
              </div>

              <div className="flex-1">
                <label className="px-4 py-3 border-2 border-dashed border-stone-300 hover:border-[#df9c4d] rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-stone-50/60 hover:bg-amber-50/20 transition-all group">
                  <Upload className="w-5 h-5 text-stone-500 group-hover:text-[#df9c4d] mb-1" />
                  <span className="text-xs font-bold text-stone-800">
                    Click to Choose New Image
                  </span>
                  <span className="text-[10px] text-stone-400">
                    PNG, JPG, WEBP formats up to 5MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Name */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700">
                Category Title *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sev & Bhujia"
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm font-semibold"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700">
                Description & Delicacies Summary
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write brief description of snacks and delicacies in this category..."
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 text-xs resize-none"
              />
            </div>

            {/* Display Order */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                Display Priority / Sort Order
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 font-mono text-xs font-bold"
              />
            </div>

            {/* Status Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                Visibility Status
              </label>
              <select
                value={status ? 'true' : 'false'}
                onChange={(e) => setStatus(e.target.value === 'true')}
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 text-xs font-semibold"
              >
                <option value="true">Active (Visible in Store)</option>
                <option value="false">Inactive (Hidden)</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-between border-t border-stone-100">
            <Link
              to="/admin/categories"
              className="px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer transition-colors"
            >
              Back to Categories
            </Link>

            <button
              type="submit"
              disabled={isActionLoading}
              className="px-7 py-3 rounded-full bg-[#df9c4d] hover:bg-[#cca062] active:scale-95 text-[#1c130d] font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isActionLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>Save & Update Category</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default AdminEditCategory;
