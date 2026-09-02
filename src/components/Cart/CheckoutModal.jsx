import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentLocation,
  setLocation,
  setGpsLocation,
} from '../../Redux/features/location/locationSlice';
import {
  X,
  ShieldCheck,
  MapPin,
  User,
  Phone,
  Mail,
  Home,
  Briefcase,
  Building,
  CreditCard,
  Banknote,
  Smartphone,
  ArrowRight,
  Sparkles,
  ShoppingBag,
  CheckCircle2,
  AlertCircle,
  Loader2,
  LocateFixed,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { placeOrderApi } from '../../Redux/services/orderService';

const addressTypes = [
  { id: 'Home', label: 'Home', icon: Home },
  { id: 'Work / Office', label: 'Work / Office', icon: Briefcase },
  { id: 'Other', label: 'Other', icon: Building },
];

const paymentMethods = [
  {
    id: 'COD',
    title: 'Cash on Delivery / Pay on Delivery',
    subtitle: 'Pay via Cash, QR, or UPI upon receiving the fresh box',
    icon: Banknote,
    badge: 'Popular',
  },
  {
    id: 'UPI',
    title: 'Instant UPI / Google Pay / PhonePe',
    subtitle: 'Instant secure payment verification with 0% extra fee',
    icon: Smartphone,
    badge: 'Fast',
  },
  {
    id: 'Card',
    title: 'Credit / Debit Card & NetBanking',
    subtitle: 'All major Indian banks & RuPay, Visa, Mastercard',
    icon: CreditCard,
    badge: 'Secure',
  },
];

const CheckoutModal = ({
  isOpen,
  onClose,
  cartItems = [],
  subtotal = 0,
  deliveryFee = 0,
  discountAmount = 0,
  appliedCoupon = null,
  totalAmount = 0,
  onConfirmOrder,
}) => {
  const dispatch = useDispatch();
  const currentLocation = useSelector(selectCurrentLocation);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    addressLine: currentLocation?.addressLine || '',
    city: currentLocation?.city || '',
    state: currentLocation?.state || '',
    pincode: currentLocation?.pincode || '751001',
    landmark: currentLocation?.landmark || 'Near City Centre',
    addressType: currentLocation?.addressType || 'Home',
    deliveryNotes: 'Please ring bell and leave with security if unavailable',
    paymentMethod: 'COD',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  useEffect(() => {
    if (isOpen && currentLocation) {
      setFormData((prev) => ({
        ...prev,
        city: currentLocation.city || prev.city,
        state: currentLocation.state || prev.state,
        pincode: currentLocation.pincode || prev.pincode,
        addressLine: currentLocation.addressLine || prev.addressLine,
        landmark: currentLocation.landmark || prev.landmark,
        addressType: currentLocation.addressType || prev.addressType,
      }));
    }
  }, [isOpen, currentLocation]);

  if (!isOpen) return null;

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

  const handleFillDemo = () => {
    const demoData = {
      name: 'Binayak Patel',
      phone: '9876543210',
      email: 'binayak@gmail.com',
      addressLine: 'Flat 402, Royal Residency, Sector 5',
      city: 'Bhubaneswar',
      state: 'Odisha',
      pincode: '751001',
      landmark: 'Near City Centre',
      addressType: 'Home',
      deliveryNotes: 'Fresh morning delivery preferred.',
      paymentMethod: 'COD',
    };
    setFormData(demoData);
    dispatch(
      setLocation({
        label: `${demoData.city}, ${demoData.state}`,
        city: demoData.city,
        state: demoData.state,
        pincode: demoData.pincode,
        addressLine: demoData.addressLine,
        landmark: demoData.landmark,
        addressType: demoData.addressType,
        isGpsLive: false,
      })
    );
    setErrors({});
    toast.success('Auto-filled with verified delivery details!');
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingLocation(true);
    const loadingToast = toast.loading('Detecting GPS location...');

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
          toast.success(`📍 Current GPS location detected: ${detectedCity} (${detectedPincode})`);
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
          toast.error('Location access denied. Please allow location permissions in browser.');
        } else {
          toast.error('Unable to retrieve location. Please fill manually.');
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

    if (!formData.addressLine.trim()) errs.addressLine = 'Street address is required';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error('Please fill all required delivery details properly.');
      return;
    }

    setIsSubmitting(true);

    const paymentMethodNames = {
      COD: 'Cash on Delivery',
      UPI: 'Instant UPI / Google Pay / PhonePe',
      Card: 'Credit / Debit Card & NetBanking',
    };

    const payload = {
      customer: {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.addressLine.trim(),
        city: formData.city.trim(),
        state: formData.state.trim() || 'Rajasthan',
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
      paymentMethod: paymentMethodNames[formData.paymentMethod] || 'Cash on Delivery',
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
        status: createdOrder.status || 'Kitchen Preparing',
        statusLabel: createdOrder.status || 'Kitchen Preparing',
        items: (createdOrder.items || cartItems).map((it) => ({
          id: it.product || it.id,
          title: it.name || it.title,
          packSize: it.unit || it.packSize || '500g Pack',
          quantity: it.quantity,
          price: it.sellingPrice || it.price,
          image: it.image,
        })),
        pricing: {
          subtotal: createdOrder.pricing?.itemsTotal || subtotal,
          deliveryFee: createdOrder.pricing?.shippingFee || deliveryFee,
          discount: createdOrder.pricing?.discountAmount || discountAmount,
          couponCode: createdOrder.pricing?.couponCode || appliedCoupon || '',
          totalAmount: createdOrder.pricing?.grandTotal || totalAmount,
        },
        shippingAddress: {
          name: createdOrder.customer?.name || formData.name.trim(),
          email: createdOrder.customer?.email || formData.email.trim(),
          phone: createdOrder.customer?.phone || formData.phone.trim(),
          addressLine: createdOrder.customer?.address || formData.addressLine.trim(),
          city: createdOrder.customer?.city || formData.city.trim(),
          state: createdOrder.customer?.state || formData.state.trim(),
          pincode: createdOrder.customer?.pincode || formData.pincode.trim(),
          landmark: createdOrder.customer?.landmark || formData.landmark.trim(),
          addressType: createdOrder.customer?.addressType || formData.addressType,
        },
      };

      toast.success(response.message || 'Order placed successfully! A confirmation email has been sent.');
      setIsSubmitting(false);
      onConfirmOrder(confirmedOrderObject);
    } catch (err) {
      setIsSubmitting(false);
      toast.error(err.message || 'Failed to submit order. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#0a2540] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-[#ffd25d]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold font-serif-heading">
                  Delivery Details & Checkout
                </h3>
                <span className="hidden xs:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" />
                  <span>256-Bit SSL</span>
                </span>
              </div>
              <p className="text-[11px] text-stone-300">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in order • Total ₹{totalAmount}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
           

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 space-y-5 text-xs text-stone-700">
          
          {/* Mobile Fill Demo Button */}
          <div className="sm:hidden flex justify-end">
            <button
              type="button"
              onClick={handleFillDemo}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-[10px] font-bold border border-amber-200"
            >
              <Sparkles className="w-3 h-3 text-[#981b2e]" />
              <span>Auto-Fill Demo Info</span>
            </button>
          </div>

          {/* Section 1: Customer Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-stone-900 font-bold text-xs uppercase tracking-wider pb-1 border-b border-stone-100">
              <User className="w-3.5 h-3.5 text-[#981b2e]" />
              <span>1. Contact & Customer Information</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Name */}
              <div className="sm:col-span-1 space-y-1">
                <label className="block text-[11px] font-bold text-stone-700">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Binayak Patel"
                    className={`w-full px-3 py-2 rounded-xl border bg-stone-50 text-stone-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                      errors.name ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-[10px] text-rose-600 font-semibold">{errors.name}</p>}
              </div>

              {/* Phone */}
              <div className="sm:col-span-1 space-y-1">
                <label className="block text-[11px] font-bold text-stone-700">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-stone-400 font-bold text-xs">+91</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="9876543210"
                    maxLength={10}
                    className={`w-full pl-10 pr-3 py-2 rounded-xl border bg-stone-50 text-stone-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 font-mono ${
                      errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[10px] text-rose-600 font-semibold">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div className="sm:col-span-1 space-y-1">
                <label className="block text-[11px] font-bold text-stone-700">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full px-3 py-2 rounded-xl border bg-stone-50 text-stone-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                    errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200'
                  }`}
                />
                {errors.email && <p className="text-[10px] text-rose-600 font-semibold">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Location & Address */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-stone-100">
              <div className="flex items-center gap-1.5 text-stone-900 font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-[#981b2e]" />
                <span>2. Delivery Location & Shipping Address</span>
              </div>
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold transition-all cursor-pointer active:scale-95 disabled:opacity-60 shadow-xs"
                title="Auto-detect current location using GPS"
              >
                {isDetectingLocation ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-700" />
                ) : (
                  <LocateFixed className="w-3.5 h-3.5 text-emerald-600" />
                )}
                <span>{isDetectingLocation ? 'Detecting Location...' : '📍 Use Current Location'}</span>
              </button>
            </div>

            {/* Address Type Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-stone-500">Save as:</span>
              <div className="flex gap-2">
                {addressTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = formData.addressType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, addressType: type.id }))}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#0a2540] text-white shadow-2xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Full Street Address */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-stone-700">
                House / Flat No., Apartment, Street & Area <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={2}
                name="addressLine"
                value={formData.addressLine}
                onChange={handleChange}
                placeholder="e.g. Flat 402, Royal Residency, Sector 5, Malviya Nagar"
                className={`w-full px-3 py-2 rounded-xl border bg-stone-50 text-stone-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none ${
                  errors.addressLine ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200'
                }`}
              />
              {errors.addressLine && (
                <p className="text-[10px] text-rose-600 font-semibold">{errors.addressLine}</p>
              )}
            </div>

            {/* City, State, Pincode, Landmark */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* City */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-stone-700">
                  City <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Jaipur"
                  className={`w-full px-3 py-2 rounded-xl border bg-stone-50 text-stone-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                    errors.city ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200'
                  }`}
                />
                {errors.city && <p className="text-[10px] text-rose-600 font-semibold">{errors.city}</p>}
              </div>

              {/* State */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-stone-700">
                  State <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Rajasthan"
                  className={`w-full px-3 py-2 rounded-xl border bg-stone-50 text-stone-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                    errors.state ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200'
                  }`}
                />
                {errors.state && <p className="text-[10px] text-rose-600 font-semibold">{errors.state}</p>}
              </div>

              {/* Pincode */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-stone-700">
                  Pincode (6 Digits) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="302017"
                  maxLength={6}
                  className={`w-full px-3 py-2 rounded-xl border bg-stone-50 text-stone-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 font-mono ${
                    errors.pincode ? 'border-rose-400 bg-rose-50/30' : 'border-stone-200'
                  }`}
                />
                {errors.pincode && <p className="text-[10px] text-rose-600 font-semibold">{errors.pincode}</p>}
              </div>

              {/* Landmark */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold text-stone-700">Landmark (Optional)</label>
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="Near Central Park"
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50 text-stone-900 text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-stone-900 font-bold text-xs uppercase tracking-wider pb-1 border-b border-stone-100">
              <CreditCard className="w-3.5 h-3.5 text-[#981b2e]" />
              <span>3. Select Payment Option You will pay on</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {paymentMethods.map((pm) => {
                const Icon = pm.icon;
                const isSelected = formData.paymentMethod === pm.id;
                return (
                  <div
                    key={pm.id}
                    onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: pm.id }))}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'border-[#981b2e] bg-rose-50/40 ring-2 ring-rose-200 shadow-2xs'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100/80'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-8 h-8 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-stone-800">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">
                        {pm.badge}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-bold text-stone-900 text-xs">{pm.title}</h4>
                      <p className="text-[10px] text-stone-500 leading-tight mt-0.5">{pm.subtitle}</p>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-bold text-stone-800">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#981b2e] bg-[#981b2e] text-white' : 'border-stone-300'}`}>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span>{isSelected ? 'Selected' : 'Select'}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mini Items Ordered Preview */}
          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-stone-800">
              <span className="flex items-center gap-1">
                <ShoppingBag className="w-3.5 h-3.5 text-[#981b2e]" />
                <span>Order Summary ({cartItems.length} Products)</span>
              </span>
              <span className="text-[#981b2e] font-black text-sm">₹{totalAmount}</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-xl border border-stone-200 shrink-0 shadow-2xs"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-8 h-8 rounded-lg object-cover border border-stone-100"
                  />
                  <div className="text-[11px] leading-tight">
                    <p className="font-bold text-stone-900 truncate max-w-[120px]">{item.title}</p>
                    <p className="text-stone-500">{item.quantity} × ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-98 text-white font-black text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <span>Confirm Order & Pay ₹{totalAmount}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-stone-400 mt-2 font-medium">
              By confirming, you agree to receive dispatch & courier tracking updates via SMS / WhatsApp.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};

export default CheckoutModal;
