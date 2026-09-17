import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  MapPin,
  User,
  Phone,
  Mail,
  Home,
  Briefcase,
  Building,
  Banknote,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LocateFixed,
  Clock,
  Truck,
  Check,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartDeliveryFee,
  selectCartAppliedCoupon,
  selectCartDiscountAmount,
  selectCartTotalAmount,
  clearCart,
} from '../../Redux/features/cart/cartSlice';
import {
  selectCurrentLocation,
  setLocation,
  setGpsLocation,
} from '../../Redux/features/location/locationSlice';
import { placeOrderApi } from '../../Redux/services/orderService';
import { OrderSuccessAnimation, OrderBillModal } from '../../components/Cart';

const addressTypes = [
  { id: 'Home', label: 'Home', icon: Home },
  { id: 'Work / Office', label: 'Work / Office', icon: Briefcase },
  { id: 'Other', label: 'Other', icon: Building },
];

export default function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const deliveryFee = useSelector(selectCartDeliveryFee);
  const appliedCoupon = useSelector(selectCartAppliedCoupon);
  const discountAmount = useSelector(selectCartDiscountAmount);
  const totalAmount = useSelector(selectCartTotalAmount);
  const currentLocation = useSelector(selectCurrentLocation);

  // Load saved contact info if available
  const getSavedContact = () => {
    try {
      const saved = localStorage.getItem('binayak_user_contact');
      if (saved) return JSON.parse(saved);
    } catch (e) { }
    return { name: '', phone: '', email: '' };
  };

  const savedContact = getSavedContact();

  const [formData, setFormData] = useState({
    name: savedContact.name || '',
    phone: savedContact.phone || '',
    email: savedContact.email || '',
    addressLine: currentLocation?.addressLine || '',
    city: currentLocation?.city || '',
    state: currentLocation?.state || '',
    pincode: currentLocation?.pincode || '',
    landmark: currentLocation?.landmark || '',
    addressType: currentLocation?.addressType || 'Home',
    deliveryNotes: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Post-order modals
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);

  // Automatically pre-fill location if changed or loaded in Redux/localStorage
  useEffect(() => {
    if (currentLocation) {
      setFormData((prev) => ({
        ...prev,
        addressLine: prev.addressLine || currentLocation.addressLine || '',
        city: prev.city || currentLocation.city || '',
        state: prev.state || currentLocation.state || '',
        pincode: prev.pincode || currentLocation.pincode || '',
        landmark: prev.landmark || currentLocation.landmark || '',
        addressType: currentLocation.addressType || prev.addressType,
      }));
    }
  }, [currentLocation]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (['city', 'state', 'pincode', 'addressLine', 'landmark', 'addressType'].includes(name)) {
      dispatch(
        setLocation({
          [name]: value,
          ...(name === 'city' || name === 'state'
            ? { label: `${name === 'city' ? value : formData.city}, ${name === 'state' ? value : formData.state}` }
            : {}),
        })
      );
    }
  };

  // GPS Auto-Detection with reverse geocoding
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);
    const loadingToast = toast.loading('Detecting your live GPS location...');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1`
          );
          const data = await res.json();
          const addr = data.address || {};

          const street = [
            addr.building || addr.house_number,
            addr.road || addr.street,
            addr.suburb || addr.neighbourhood || addr.residential,
          ]
            .filter(Boolean)
            .join(', ');

          const detectedCity =
            addr.city || addr.town || addr.village || addr.county || addr.state_district || 'Bhubaneswar';
          const detectedState = addr.state || 'Odisha';
          const detectedPincode = (addr.postcode || '').replace(/\D/g, '').slice(0, 6) || '751001';
          const detectedLandmark = addr.amenity || addr.landmark || addr.suburb || '';

          const resolvedAddressLine = street || data.display_name?.split(',').slice(0, 2).join(',') || formData.addressLine;

          setFormData((prev) => ({
            ...prev,
            addressLine: resolvedAddressLine,
            city: detectedCity,
            state: detectedState,
            pincode: detectedPincode || prev.pincode,
            landmark: detectedLandmark || prev.landmark,
          }));

          dispatch(
            setGpsLocation({
              label: `${detectedCity}, ${detectedState}`,
              city: detectedCity,
              state: detectedState,
              pincode: detectedPincode,
              addressLine: resolvedAddressLine,
              landmark: detectedLandmark,
              address: `${resolvedAddressLine}, ${detectedCity} - ${detectedPincode}`,
            })
          );

          setErrors((prev) => ({
            ...prev,
            addressLine: '',
            city: '',
            state: '',
            pincode: '',
          }));

          toast.dismiss(loadingToast);
          toast.success(`📍 Live GPS detected: ${detectedCity} (${detectedPincode})`);
        } catch (err) {
          console.error('Reverse geocoding error:', err);
          toast.dismiss(loadingToast);
          toast.error('Failed to fetch address details from GPS.');
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        setIsDetectingLocation(false);
        toast.dismiss(loadingToast);
        if (error.code === error.PERMISSION_DENIED) {
          toast.error('Location permission denied. Please allow GPS access in browser.');
        } else {
          toast.error('Unable to retrieve location. Please type manually.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full Name is required';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Enter a valid email address';
    }

    if (!formData.addressLine.trim()) errs.addressLine = 'Street address / House No. is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.state.trim()) errs.state = 'State is required';
    if (!formData.pincode.trim()) {
      errs.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode.trim())) {
      errs.pincode = 'Enter a valid 6-digit Pincode';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error('Your cart is empty.');
      navigate('/cart');
      return;
    }

    if (!validate()) {
      toast.error('Please complete all required delivery details.');
      return;
    }

    setIsSubmitting(true);

    // Persist contact details for user convenience
    try {
      localStorage.setItem(
        'binayak_user_contact',
        JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
        })
      );
    } catch (e) { }

    const payload = {
      customer: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.addressLine.trim(),
        city: formData.city.trim(),
        state: formData.state.trim() || 'Odisha',
        pincode: formData.pincode.trim(),
        landmark: formData.landmark.trim(),
        addressType: formData.addressType || 'Home',
        deliveryNotes: formData.deliveryNotes.trim(),
      },
      items: cartItems.map((item) => ({
        productId: item.id || item._id,
        name: item.title || item.name,
        quantity: item.quantity || 1,
        price: item.price,
        packSize: item.packSize || item.weight || 'Piece',
        image: item.image,
      })),
      paymentMethod: 'Cash on Delivery',
      couponCode: appliedCoupon || '',
      guestToken: localStorage.getItem('guestToken') || '',
    };

    try {
      const response = await placeOrderApi(payload);
      const createdOrder = response.data;
      const orderId = createdOrder.orderId || `BIN-${Date.now().toString().slice(-4)}`;

      const today = new Date();
      const placedDateStr =
        today.toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        }) + ` • ${today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

      const deliveryDate = new Date();
      deliveryDate.setDate(today.getDate() + 2);
      const estDeliveryStr = deliveryDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });

      const confirmedOrderObject = {
        id: orderId.replace(/^#/, ''),
        orderId: orderId,
        placedDate: placedDateStr,
        estimatedDelivery: estDeliveryStr,
        customer: {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          address: formData.addressLine.trim(),
          city: formData.city.trim(),
          state: formData.state.trim(),
          pincode: formData.pincode.trim(),
          landmark: formData.landmark.trim(),
          addressType: formData.addressType,
        },
        items: cartItems,
        pricing: {
          itemsTotal: subtotal,
          subtotal: subtotal,
          deliveryFee: deliveryFee,
          shippingFee: deliveryFee,
          discountAmount: discountAmount,
          discount: discountAmount,
          grandTotal: totalAmount,
          totalAmount: totalAmount,
          couponCode: appliedCoupon || '',
        },
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'Pending',
        status: 'Order Placed',
      };

      dispatch(clearCart());
      setConfirmedOrder(confirmedOrderObject);
      setShowSuccessAnimation(true);
    } catch (error) {
      console.error('Order checkout submission error:', error);
      toast.error(
        error?.response?.data?.message || 'Failed to place order. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenBillFromAnimation = () => {
    setShowSuccessAnimation(false);
    setShowBillModal(true);
  };

  if (cartItems.length === 0 && !confirmedOrder) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold  text-stone-900">Your Cart is Empty</h2>
        <p className="text-sm text-stone-500 max-w-md">
          Please add delicious artisanal snacks to your cart before proceeding to order.
        </p>
        <Link
          to="/explore"
          className="px-6 py-2.5 rounded-full bg-[#003060] text-white text-sm font-bold shadow-md hover:bg-[#004060] transition-all"
        >
          Explore Snacks
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 bg-stone-50/50">
      {/* Top Breadcrumb / Navigation Bar */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-600 hover:text-[#003060] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pay After Delivery • Cash on Delivery</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">

        {/* Page Header */}
        <div className="mb-6 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#003060]/10 text-[#003060] text-[11px] font-extrabold uppercase tracking-wider">
            <ShoppingBag className="w-3 h-3 text-[#003060]" />
            <span>Simple 1-Step Checkout</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black  text-stone-900 tracking-tight">
            Delivery Details & Place Order
          </h1>
          <p className="text-xs text-stone-500">
            Enter where we should deliver your fresh batch snacks. Payment is collected in cash or UPI upon delivery.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* Left Column: Delivery Form (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">

            {/* 1. Contact & Customer Information */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
                <div className="w-7 h-7 rounded-full bg-[#003060]/10 text-[#003060] flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900">
                    Contact & Customer Information
                  </h3>
                  <p className="text-[11px] text-stone-500">
                    Order confirmation & delivery SMS updates will be sent here.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Binayak Patel"
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003060]/20 transition-all ${errors.name ? 'border-rose-500' : 'border-stone-200 focus:border-[#003060]'
                        }`}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-rose-500 mt-1">{errors.name}</p>}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      maxLength={10}
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      className={`w-full pl-11 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003060]/20 transition-all ${errors.phone ? 'border-rose-500' : 'border-stone-200 focus:border-[#003060]'
                        }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={`w-full pl-10 pr-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003060]/20 transition-all ${errors.email ? 'border-rose-500' : 'border-stone-200 focus:border-[#003060]'
                        }`}
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-rose-500 mt-1">{errors.email}</p>}
                </div>
              </div>
            </div>

            {/* 2. Delivery Location & Shipping Address */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/80 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#003060]/10 text-[#003060] flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900">
                      Delivery Location & Address
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Auto-filled from detected location. You can modify anytime.
                    </p>
                  </div>
                </div>

                {/* GPS Auto-Detect Button */}
                <button
                  type="button"
                  onClick={handleDetectLocation}
                  disabled={isDetectingLocation}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all shadow-2xs cursor-pointer self-start sm:self-auto"
                >
                  {isDetectingLocation ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                      <span>Detecting...</span>
                    </>
                  ) : (
                    <>
                      <LocateFixed className="w-3.5 h-3.5 text-emerald-600" />
                      <span>📍 Use Live GPS Location</span>
                    </>
                  )}
                </button>
              </div>

              {/* Address Type Tabs (Home / Work / Other) */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-500">Save as:</span>
                <div className="flex items-center gap-1.5">
                  {addressTypes.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = formData.addressType === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, addressType: tab.id }))}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${isActive
                            ? 'bg-[#003060] text-white shadow-2xs'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                          }`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  House / Flat No., Apartment, Street & Area <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleChange}
                  placeholder="e.g. Flat 402, Royal Residency, Khandagiri"
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003060]/20 transition-all ${errors.addressLine ? 'border-rose-500' : 'border-stone-200 focus:border-[#003060]'
                    }`}
                />
                {errors.addressLine && <p className="text-[10px] text-rose-500 mt-1">{errors.addressLine}</p>}
              </div>

              {/* City, State, Pincode & Landmark */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* City */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Bhubaneswar"
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003060]/20 transition-all ${errors.city ? 'border-rose-500' : 'border-stone-200 focus:border-[#003060]'
                      }`}
                  />
                  {errors.city && <p className="text-[10px] text-rose-500 mt-1">{errors.city}</p>}
                </div>

                {/* State */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    State <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Odisha"
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003060]/20 transition-all ${errors.state ? 'border-rose-500' : 'border-stone-200 focus:border-[#003060]'
                      }`}
                  />
                  {errors.state && <p className="text-[10px] text-rose-500 mt-1">{errors.state}</p>}
                </div>

                {/* Pincode */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Pincode <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="751001"
                    className={`w-full px-3 py-2 rounded-xl border text-xs sm:text-sm font-medium bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003060]/20 transition-all ${errors.pincode ? 'border-rose-500' : 'border-stone-200 focus:border-[#003060]'
                      }`}
                  />
                  {errors.pincode && <p className="text-[10px] text-rose-500 mt-1">{errors.pincode}</p>}
                </div>

                {/* Landmark */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Landmark (Opt)
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="Near City Centre"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm font-medium bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003060]/20 transition-all focus:border-[#003060]"
                  />
                </div>
              </div>

              {/* Delivery Notes */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Delivery Instructions / Notes (Optional)
                </label>
                <input
                  type="text"
                  name="deliveryNotes"
                  value={formData.deliveryNotes}
                  onChange={handleChange}
                  placeholder="e.g. Ring doorbell, leave with guard if unavailable"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 text-xs sm:text-sm font-medium bg-stone-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#003060]/20 transition-all focus:border-[#003060]"
                />
              </div>
            </div>

            {/* 3. Simple Payment: Cash on Delivery Only */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-emerald-200/90 bg-gradient-to-br from-emerald-50/30 to-white shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    3
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-stone-900">
                      Payment Mode
                    </h3>
                    <p className="text-[11px] text-stone-500">
                      Pay after receiving your order safely.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                  Guaranteed
                </span>
              </div>

              {/* Single Clear COD Selection Card */}
              <div className="p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Banknote className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black text-stone-900">
                      Cash on Delivery (Pay after Delivery)
                    </h4>
                    <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3 stroke-[3]" /> Active
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    Pay conveniently via <strong>Cash, UPI QR code, or Google Pay</strong> directly to the delivery partner upon inspecting your fresh snack box. No upfront online payment needed!
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order Summary & Instant Checkout CTA (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-stone-200/80 shadow-xs space-y-5 sticky top-24">

              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <h3 className="text-base font-bold  text-stone-900">
                  Order Summary ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                </h3>
                <Link to="/cart" className="text-xs font-bold text-[#003060] hover:underline">
                  Edit Cart
                </Link>
              </div>

              {/* Cart Items Preview List */}
              <div className="space-y-3 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-2 rounded-2xl bg-stone-50/70 border border-stone-100">
                    <img
                      src={item.image}
                      alt={item.title || item.name}
                      className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-stone-900 line-clamp-1">
                        {item.title || item.name}
                      </h4>
                      <p className="text-[10px] text-stone-500">
                        Qty: {item.quantity} • {item.packSize || item.weight || '500g'}
                      </p>
                    </div>
                    <span className="text-xs font-black text-stone-900 font-brand shrink-0">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 pt-2 border-t border-stone-100 text-xs">
                <div className="flex justify-between text-stone-600 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-stone-600 font-medium">
                  <span>Delivery Charge</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-extrabold">FREE</span>
                    ) : (
                      <span className="font-bold text-stone-900">₹{deliveryFee}</span>
                    )}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount ({appliedCoupon})</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-3 border-t border-stone-200 text-stone-900">
                  <div>
                    <span className="text-sm font-black uppercase tracking-tight block">
                      Total Payable
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium">
                      (Pay on Delivery)
                    </span>
                  </div>
                  <span className="text-2xl font-black text-[#003060] font-brand">
                    ₹{totalAmount}
                  </span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#003865] to-[#005187] hover:from-[#00284d] hover:to-[#003e68] text-white text-sm font-black shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Placing Your Order...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Place Order (₹{totalAmount})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100 text-[10px] font-semibold text-stone-600">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% Fresh & Authentic</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Doorstep Fast Delivery</span>
                </div>
              </div>

            </div>
          </div>

        </form>

      </div>

      {/* Post-Order Success Animation */}
      {showSuccessAnimation && confirmedOrder && (
        <OrderSuccessAnimation
          order={confirmedOrder}
          onViewBill={handleOpenBillFromAnimation}
        />
      )}

      {/* Official Printable Receipt & Bill Modal */}
      {showBillModal && confirmedOrder && (
        <OrderBillModal
          isOpen={showBillModal}
          order={confirmedOrder}
          onClose={() => {
            setShowBillModal(false);
            navigate('/');
          }}
        />
      )}

    </div>
  );
}
