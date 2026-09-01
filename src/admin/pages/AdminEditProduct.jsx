import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Save,
  Trash2,
  Loader2,
  ChefHat,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';

import {
  getSingleProduct,
  updateProduct,
  addProductImages,
  deleteProductImage,
} from '../../Redux/features/product/productThunk';
import {
  selectProductLoading,
  selectProductActionLoading,
  selectSelectedProduct,
} from '../../Redux/features/product/productSlice';
import { fetchAdminCategories, fetchCategories } from '../../Redux/features/category/categoryThunk';
import { selectAdminCategories, selectCategories } from '../../Redux/features/category/categorySlice';

const fallbackCategories = [
  { _id: 'sev-bhujia', name: 'Sev & Bhujia' },
  { _id: 'chivda-mix', name: 'Chivda & Mix' },
  { _id: 'desi-sweets', name: 'Desi Sweets' },
  { _id: 'roasted-cashews', name: 'Roasted Nuts & Dry Fruits' },
  { _id: 'murukku-crisps', name: 'Murukku & Chakli' },
  { _id: 'mathri-namkeen', name: 'Mathri & Khasta' },
];

const unitOptions = ['Pack', 'Box', 'Piece', 'Kg', 'Gram', 'Liter'];

const AdminEditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector(selectProductLoading);
  const isActionLoading = useSelector(selectProductActionLoading);
  const selectedProduct = useSelector(selectSelectedProduct);
  const adminCategories = useSelector(selectAdminCategories);
  const publicCategories = useSelector(selectCategories);

  const availableCategories =
    adminCategories && adminCategories.length > 0
      ? adminCategories
      : publicCategories && publicCategories.length > 0
      ? publicCategories
      : fallbackCategories;

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [mrp, setMrp] = useState('250');
  const [sellingPrice, setSellingPrice] = useState('200');
  const [stock, setStock] = useState('100');
  const [unit, setUnit] = useState('Pack');
  const [weight, setWeight] = useState('500g');
  const [shelfLife, setShelfLife] = useState('90 Days');

  // Flags
  const [status, setStatus] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isNewArrival, setIsNewArrival] = useState(false);

  // Images
  const [existingImages, setExistingImages] = useState([]);
  const [selectedNewImageFiles, setSelectedNewImageFiles] = useState([]);
  const [newImagePreviewUrls, setNewImagePreviewUrls] = useState([]);

  // Fetch categories and product
  useEffect(() => {
    dispatch(fetchAdminCategories({ limit: 100 }));
    dispatch(fetchCategories({ limit: 100 }));
    if (productId) {
      dispatch(getSingleProduct(productId, true));
    }
  }, [dispatch, productId]);

  // Populate data
  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name || selectedProduct.title || '');
      const catId =
        typeof selectedProduct.category === 'object'
          ? selectedProduct.category?._id
          : selectedProduct.category;
      setCategory(catId || '');
      setShortDescription(selectedProduct.shortDescription || '');
      setDescription(selectedProduct.description || '');
      setMrp(selectedProduct.mrp?.toString() || '250');
      setSellingPrice(
        selectedProduct.sellingPrice?.toString() || selectedProduct.price?.toString() || '200'
      );
      setStock(selectedProduct.stock?.toString() || '0');
      setUnit(selectedProduct.unit || 'Pack');
      setWeight(selectedProduct.weight || '500g');
      setShelfLife(selectedProduct.shelfLife || '90 Days');

      setStatus(selectedProduct.status !== false);
      setIsAvailable(selectedProduct.isAvailable !== false);
      setIsBestSeller(Boolean(selectedProduct.isBestSeller));
      setIsFeatured(Boolean(selectedProduct.isFeatured));
      setIsTrending(Boolean(selectedProduct.isTrending));
      setIsNewArrival(Boolean(selectedProduct.isNewArrival));

      setExistingImages(selectedProduct.images || []);
    }
  }, [selectedProduct]);

  // Clean URLs
  useEffect(() => {
    return () => {
      newImagePreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [newImagePreviewUrls]);

  const handleNewImageChange = (e) => {
    const files = Array.from(e.target.files);
    const totalCount = existingImages.length + selectedNewImageFiles.length + files.length;
    if (totalCount > 5) {
      toast.error('Maximum 5 total images allowed');
      return;
    }

    const newUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedNewImageFiles((prev) => [...prev, ...files]);
    setNewImagePreviewUrls((prev) => [...prev, ...newUrls]);
  };

  const handleRemoveNewImage = (index) => {
    URL.revokeObjectURL(newImagePreviewUrls[index]);
    setSelectedNewImageFiles((prev) => prev.filter((_, i) => i !== index));
    setNewImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteExistingImage = async (publicId) => {
    if (!publicId) return;
    const res = await dispatch(deleteProductImage(productId, publicId));
    if (res.success) {
      setExistingImages((prev) => prev.filter((img) => img.publicId !== publicId));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Product title is required');
      return;
    }
    if (!category) {
      toast.error('Please select a category');
      return;
    }
    if (!sellingPrice || Number(sellingPrice) <= 0) {
      toast.error('Valid selling price is required');
      return;
    }
    if (Number(sellingPrice) > Number(mrp)) {
      toast.error('Selling price cannot exceed MRP');
      return;
    }

    const updatePayload = {
      name: name.trim(),
      category,
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      mrp: Number(mrp),
      sellingPrice: Number(sellingPrice),
      stock: Number(stock) || 0,
      unit,
      weight: weight.trim(),
      shelfLife: shelfLife.trim(),
      status,
      isAvailable,
      isBestSeller,
      isFeatured,
      isTrending,
      isNewArrival,
    };

    const res = await dispatch(updateProduct(productId, updatePayload));

    if (res.success && selectedNewImageFiles.length > 0) {
      const imgFormData = new FormData();
      selectedNewImageFiles.forEach((file) => {
        imgFormData.append('images', file);
      });
      await dispatch(addProductImages(productId, imgFormData));
    }

    if (res.success) {
      navigate('/admin/products');
    }
  };

  if (loading && !selectedProduct) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3 text-stone-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#981b2e]" />
        <p className="text-xs font-bold uppercase tracking-wider">Loading snack details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 sm:space-y-6 max-w-4xl mx-auto pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="w-10 h-10 rounded-2xl bg-white border border-stone-200 hover:bg-stone-100 flex items-center justify-center text-stone-700 shadow-2xs transition-transform hover:-translate-x-0.5 cursor-pointer shrink-0"
            title="Back to Products"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-50 text-[#b45309] text-[11px] font-black uppercase tracking-wider mb-1 border border-amber-200/60">
              <ChefHat className="w-3 h-3" />
              <span>Edit Record</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 font-serif-heading tracking-tight">
              Edit {name || 'Product'}
            </h1>
          </div>
        </div>

        <Link
          to="/admin/products"
          className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs self-start sm:self-auto transition-colors"
        >
          Cancel & Return
        </Link>
      </div>

      {/* Main Form Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 border border-stone-200/80 shadow-2xs">
        <form onSubmit={handleUpdate} className="space-y-5 sm:space-y-6">
          
          {/* Photos Management Section */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
              Product Photos ({existingImages.length}/5 Current)
            </label>

            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Primary Preview Thumbnail Box */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-stone-100 border-2 border-dashed border-stone-200 overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
                {existingImages.length > 0 ? (
                  <img
                    src={existingImages[0].url}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-stone-400" />
                )}
              </div>

              {/* Upload Input Dropzone */}
              <div className="flex-1 space-y-3">
                {existingImages.length < 5 && (
                  <label className="px-4 py-3.5 border-2 border-dashed border-stone-300 hover:border-[#981b2e] rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-stone-50/60 hover:bg-rose-50/30 transition-all group">
                    <Upload className="w-5 h-5 text-stone-500 group-hover:text-[#981b2e] mb-1" />
                    <span className="text-xs font-bold text-stone-800">
                      Click to Add Additional Images
                    </span>
                    <span className="text-[10px] text-stone-400">
                      PNG, JPG, WEBP formats ({5 - existingImages.length} slots remaining)
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleNewImageChange}
                      className="hidden"
                    />
                  </label>
                )}

                {/* Thumbnails Gallery */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {existingImages.map((img, idx) => (
                    <div
                      key={img.publicId || idx}
                      className="relative w-14 h-14 rounded-xl overflow-hidden border border-stone-200 bg-stone-100 group shadow-2xs"
                    >
                      <img src={img.url} alt="Gallery" className="w-full h-full object-cover" />
                      {existingImages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteExistingImage(img.publicId)}
                          className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                  ))}

                  {newImagePreviewUrls.map((url, idx) => (
                    <div
                      key={idx}
                      className="relative w-14 h-14 rounded-xl overflow-hidden border border-amber-400 bg-amber-50 group shadow-2xs"
                    >
                      <img src={url} alt="New Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => handleRemoveNewImage(idx)}
                        className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/70 hover:bg-rose-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Product Title */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700">
                Product Title / Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Artisanal Ratlami Sev (Extra Clove)"
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-[#981b2e] text-sm font-semibold"
                required
              />
            </div>

            {/* Category Dropdown */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 text-xs font-semibold cursor-pointer"
                required
              >
                {availableCategories.map((cat) => {
                  const catId = cat._id || cat.id || cat.slug;
                  return (
                    <option key={catId} value={catId}>
                      {cat.name || cat.title}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Packaging Unit */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                Packaging Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 text-xs font-semibold cursor-pointer"
              >
                {unitOptions.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>

            {/* MRP & Selling Price */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                Original MRP (₹) *
              </label>
              <input
                type="number"
                min="0"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                placeholder="250"
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 font-mono text-xs font-bold"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                Selling Price (₹) *
              </label>
              <input
                type="number"
                min="0"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                placeholder="200"
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 font-mono text-xs font-black text-[#981b2e]"
                required
              />
            </div>

            {/* Weight & Stock */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                Weight / Pack Size
              </label>
              <input
                type="text"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="e.g. 500g Pack"
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 text-xs font-semibold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-stone-700">
                Current Stock Units
              </label>
              <input
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="100"
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 font-mono text-xs font-bold"
              />
            </div>

            {/* Short Tagline */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700">
                Short Highlight Summary
              </label>
              <input
                type="text"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="e.g. Artisanal clove spice sev fried in 100% cold-pressed groundnut oil"
                className="w-full px-4 py-2.5 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 text-xs"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-xs font-bold text-stone-700">
                Detailed Product Story & Ingredients
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write detailed recipe description, ingredients, allergy warnings..."
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 bg-stone-50/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-200 text-xs resize-none"
              />
            </div>

            {/* Feature Toggles */}
            <div className="sm:col-span-2 p-4 rounded-2xl bg-stone-50/80 border border-stone-200/70 space-y-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block">
                Showcase Flags & Settings
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-semibold text-stone-700">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBestSeller}
                    onChange={(e) => setIsBestSeller(e.target.checked)}
                    className="rounded text-[#981b2e] focus:ring-rose-200"
                  />
                  <span>Bestseller</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-[#981b2e] focus:ring-rose-200"
                  />
                  <span>Featured</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isTrending}
                    onChange={(e) => setIsTrending(e.target.checked)}
                    className="rounded text-[#981b2e] focus:ring-rose-200"
                  />
                  <span>Trending</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                    className="rounded text-[#981b2e] focus:ring-rose-200"
                  />
                  <span>In Stock</span>
                </label>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex items-center justify-between border-t border-stone-100 gap-2">
            <Link
              to="/admin/products"
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
                <Save className="w-4 h-4" />
              )}
              <span>Save Changes</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default AdminEditProduct;
