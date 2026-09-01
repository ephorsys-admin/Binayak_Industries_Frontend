import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Package, ArrowLeft, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

import {
  selectCartItems,
  selectCartTotalCount,
  selectCartSubtotal,
  addToCart,
  incrementQuantity,
  decrementQuantity,
} from '../../Redux/features/cart/cartSlice';
import { fetchProducts } from '../../Redux/features/product/productThunk';
import { selectProducts, selectProductLoading } from '../../Redux/features/product/productSlice';
import { fetchCategories } from '../../Redux/features/category/categoryThunk';
import {
  initialSnacksCatalog,
  formatApiProduct,
} from '../../components/Explore/snacksData';
import { FloatingCartBar, MobileBottomNav } from '../../components/Home';

// Clean Modular Sub-Components
import {
  ProductBreadcrumbs,
  ProductGallery,
  ProductInfo,
  ProductActionBox,
  ProductSpecsTabs,
  RelatedProducts,
} from '../../components/Product';

import ratlamiSevImg from '../../assets/ratlami_sev.jpg';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalCartCount = useSelector(selectCartTotalCount);
  const totalCartPrice = useSelector(selectCartSubtotal);

  const reduxProducts = useSelector(selectProducts);
  const isProductLoading = useSelector(selectProductLoading);

  const [isLiked, setIsLiked] = useState(false);

  // Fetch live products on mount
  useEffect(() => {
    dispatch(fetchProducts({ limit: 100 }));
    dispatch(fetchCategories({ limit: 100 }));
  }, [dispatch]);

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  // Combined Live & Fallback Catalog
  const allProducts = useMemo(() => {
    if (reduxProducts && reduxProducts.length > 0) {
      const formatted = reduxProducts.map(formatApiProduct).filter(Boolean);
      const existingTitles = new Set(
        formatted.map((f) => (f.title || f.name || '').toLowerCase().trim())
      );
      const extra = initialSnacksCatalog.filter(
        (s) => !existingTitles.has((s.title || s.name || '').toLowerCase().trim())
      );
      return [...formatted, ...extra];
    }
    return initialSnacksCatalog;
  }, [reduxProducts]);

  // Find Target Product
  const product = useMemo(() => {
    if (!productId) return null;
    const cleanId = String(productId).toLowerCase().trim();

    return allProducts.find((p) => {
      const pId = String(p.id || '').toLowerCase().trim();
      const pMongoId = String(p._id || '').toLowerCase().trim();
      const pSlug = String(p.slug || '').toLowerCase().trim();
      const pTitle = (p.title || p.name || '').toLowerCase().replace(/\s+/g, '-');

      return (
        pId === cleanId ||
        pMongoId === cleanId ||
        pSlug === cleanId ||
        pTitle === cleanId
      );
    });
  }, [allProducts, productId]);

  // Cart Sync
  const productInCart = useMemo(() => {
    if (!product) return null;
    return cartItems.find((c) => c.id === product.id || c.id === product._id);
  }, [product, cartItems]);

  const currentQuantity = productInCart ? productInCart.quantity : 0;

  // Extract all photos
  const imagesList = useMemo(() => {
    if (!product) return [ratlamiSevImg];
    if (product.images && product.images.length > 0) {
      return product.images
        .map((img) => (typeof img === 'string' ? img : img.url))
        .filter(Boolean);
    }
    return [product.image || ratlamiSevImg];
  }, [product]);

  // Related Products
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    const prodCat = (product.categorySlug || product.category || '').toLowerCase();
    return allProducts
      .filter(
        (p) =>
          p.id !== product.id &&
          p._id !== product._id &&
          ((p.categorySlug || p.category || '').toLowerCase() === prodCat ||
            p.isBestseller)
      )
      .slice(0, 4);
  }, [allProducts, product]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(
      addToCart({
        id: product.id || product._id,
        title: product.title || product.name,
        category: product.categoryName || product.category,
        weight: product.weight || 'Standard Pack',
        packSize: product.weight || 'Standard Pack',
        price: product.price || product.sellingPrice,
        originalPrice: product.originalPrice || product.mrp,
        quantity: 1,
        image: imagesList[0],
        oilType: product.oilType,
      })
    );
  };

  const handleBuyNow = () => {
    if (currentQuantity === 0) {
      handleAddToCart();
    }
    navigate('/cart');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product?.title,
          text: `Check out ${product?.title} from Binayak Industries!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  if (isProductLoading && !product) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-[#981b2e]" />
        <p className="text-xs font-bold text-stone-600 uppercase tracking-wider">
          Loading snack details...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 text-center max-w-sm shadow-sm space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-[#981b2e] flex items-center justify-center mx-auto">
            <Package className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-black font-brand text-stone-900">
            Snack Not Found
          </h2>
          <p className="text-xs text-stone-500">
            The artisanal snack you are looking for may have been updated or moved.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#981b2e] text-white font-bold text-xs shadow-md hover:bg-[#801424]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore All Snacks</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50/50 pb-28 sm:pb-20">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 space-y-6">
        
        {/* 1. Breadcrumbs */}
        <ProductBreadcrumbs
          categorySlug={product.categorySlug || product.category}
          categoryName={product.categoryName || product.category}
          productTitle={product.title}
          isLiked={isLiked}
          onToggleLike={() => {
            setIsLiked(!isLiked);
            toast.success(isLiked ? 'Removed from favorites' : 'Saved to favorites!');
          }}
          onShare={handleShare}
        />

        {/* 2. Main Product Card (Compact Two-Column Grid) */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border border-stone-200/80 shadow-2xs grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left: Compact Gallery with All 4-5 Photos */}
          <div className="md:col-span-5 w-full">
            <ProductGallery
              images={imagesList}
              productTitle={product.title}
              isBestseller={product.isBestseller}
              isNew={product.isNew}
              shelfLife={product.shelfLife}
              oilType={product.oilType}
            />
          </div>

          {/* Right: Info + Quantity + Buy Box */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-5 w-full">
            <ProductInfo
              title={product.title}
              categoryName={product.categoryName || product.category}
              categorySlug={product.categorySlug || product.category}
              rating={product.rating}
              reviewsCount={product.reviewsCount}
              tagline={product.tagline || product.shortDescription}
              price={product.price || product.sellingPrice}
              originalPrice={product.originalPrice || product.mrp}
              weight={product.weight}
              unit={product.unit}
            />

            <ProductActionBox
              quantity={currentQuantity}
              onIncrement={() => {
                if (currentQuantity === 0) {
                  handleAddToCart();
                } else {
                  dispatch(incrementQuantity(product.id || product._id));
                }
              }}
              onDecrement={() => dispatch(decrementQuantity(product.id || product._id))}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />
          </div>
        </div>

        {/* 3. Detailed Tabs (Ingredients, Purity, Craft) */}
        <ProductSpecsTabs
          description={product.description}
          ingredients={product.ingredients}
          oilType={product.oilType}
          shelfLife={product.shelfLife}
          spiciness={product.spiciness}
        />

        {/* 4. Related Products Grid */}
        <RelatedProducts
          products={relatedProducts}
          onIncrement={(id) => dispatch(incrementQuantity(id))}
          onDecrement={(id) => dispatch(decrementQuantity(id))}
          onAdd={() => handleAddToCart()}
          onQuickView={(item) => navigate(`/product/${item.id || item._id}`)}
        />

      </div>

      {/* Floating Sticky Cart Bar */}
      <FloatingCartBar
        totalCount={totalCartCount}
        totalPrice={totalCartPrice}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav cartCount={totalCartCount} />
    </div>
  );
};

export default ProductDetails;
