import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Plus,
  Loader2,
  Sparkles,
  Layers,
} from 'lucide-react';
import toast from 'react-hot-toast';

import { createCategory } from '../../Redux/features/category/categoryThunk';
import { selectCategoryActionLoading } from '../../Redux/features/category/categorySlice';

const AdminAddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isActionLoading = useSelector(selectCategoryActionLoading);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sortOrder, setSortOrder] = useState(1);
  const [status, setStatus] = useState(true);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Category Name is required');
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

    const res = await dispatch(createCategory(formData));

    if (res.success) {
      navigate('/admin/categories');
    } else {
      toast.success(`Category "${name}" created successfully!`);
      navigate('/admin/categories');
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6 max-w-4xl mx-auto">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/categories"
            className="w-10 h-10 rounded-2xl bg-white border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-700 shadow-2xs transition-transform hover:-translate-x-0.5 cursor-pointer shrink-0"
            title="Back to Categories"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-50 text-[#981b2e] text-[11px] font-black uppercase tracking-wider mb-1 border border-rose-200/60">
              <Layers className="w-3 h-3" />
              <span>Create New</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900  tracking-tight">
              Add New Category
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

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-stone-200/80 shadow-2xs">
        <form onSubmit={handleCreate} className="space-y-5 sm:space-y-6">

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
                <label className="px-4 py-3 border-2 border-dashed border-stone-300 hover:border-[#981b2e] rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-stone-50/60 hover:bg-rose-50/30 transition-all group">
                  <Upload className="w-5 h-5 text-stone-500 group-hover:text-[#981b2e] mb-1" />
                  <span className="text-xs font-bold text-stone-800">
                    Click to Upload Category Image
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
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#981b2e] text-sm font-semibold"
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
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#981b2e] text-xs resize-none"
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
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 font-mono text-xs font-bold"
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
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 text-xs font-semibold"
              >
                <option value="true">Active (Visible in Store)</option>
                <option value="false">Inactive (Hidden)</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-between border-t border-stone-100 gap-2">
            <Link
              to="/admin/categories"
              className="px-5 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer transition-colors"
            >
              Back
            </Link>

            <button
              type="submit"
              disabled={isActionLoading}
              className="px-7 py-3 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isActionLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Plus className="w-4 h-4 stroke-[3]" />
              )}
              <span>Create Category</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default AdminAddCategory;
