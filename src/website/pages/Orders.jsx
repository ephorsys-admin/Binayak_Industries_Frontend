import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  OrdersHero,
  OrdersStatsBar,
  OrderFilterTabs,
  OrderCard,
  OrderTrackingModal,
  OrderInvoiceModal,
  OrderReviewModal,
  OrderCancelModal,
} from '../../components/Order';
import { MobileBottomNav } from '../../components/Home';
import { PackageX, Sparkles, MessageSquare, ArrowRight, RefreshCw, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  selectOrders,
  cancelOrder,
  addReview,
} from '../../Redux/features/orders/ordersSlice';
import { addToCart } from '../../Redux/features/cart/cartSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);

  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [timeRange, setTimeRange] = useState('all-time');

  // Modals state
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null);
  const [reviewOrder, setReviewOrder] = useState(null);
  const [cancelModalOrder, setCancelModalOrder] = useState(null);

  // Tab count stats
  const tabCounts = useMemo(() => {
    return {
      all: orders.length,
      'in-transit': orders.filter(
        (o) => o.status === 'in-transit' || o.status === 'preparing'
      ).length,
      delivered: orders.filter((o) => o.status === 'delivered').length,
      cancelled: orders.filter((o) => o.status === 'cancelled').length,
    };
  }, [orders]);

  // Filtered Orders Logic
  const filteredOrders = useMemo(() => {
    let result = [...orders];

    // 1. Status Filter
    if (activeTab === 'in-transit') {
      result = result.filter(
        (o) => o.status === 'in-transit' || o.status === 'preparing'
      );
    } else if (activeTab === 'delivered') {
      result = result.filter((o) => o.status === 'delivered');
    } else if (activeTab === 'cancelled') {
      result = result.filter((o) => o.status === 'cancelled');
    }

    // 2. Search Query Filter (Order ID, Customer Name, Item Title, or Tracking Number)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          (o.shippingAddress?.name && o.shippingAddress.name.toLowerCase().includes(q)) ||
          (o.shippingAddress?.city && o.shippingAddress.city.toLowerCase().includes(q)) ||
          (o.courier?.trackingNumber &&
            o.courier.trackingNumber.toLowerCase().includes(q)) ||
          o.items.some((item) => item.title.toLowerCase().includes(q))
      );
    }

    return result;
  }, [orders, activeTab, searchQuery]);

  // Handlers
  const handleReviewSubmit = (orderId, rating, reviewText) => {
    dispatch(addReview({ orderId, rating, reviewText }));
  };

  const handleCancelConfirm = (orderId, reason) => {
    dispatch(cancelOrder({ orderId, reason }));
  };

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      dispatch(addToCart(item));
    });
    toast.success(
      `All ${order.items.length} items from #${order.id} re-added to your cart!`
    );
  };

  return (
    <div className="min-h-screen pb-28 sm:pb-20 bg-stone-50/40">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-6 space-y-6 sm:space-y-8">
        
        {/* 1. Hero Banner with Live Search */}
        <OrdersHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 2. Quick Metrics / Stats Bar (Orders, Active, Delivered, Coins) */}
        <OrdersStatsBar orders={orders} />

        {/* 3. Filter & Status Tabs Bar */}
        <OrderFilterTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          counts={tabCounts}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* 4. Orders List Grid */}
        {filteredOrders.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/80 text-center max-w-lg mx-auto shadow-xs space-y-4">
            <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-[#981b2e]">
              <PackageX className="w-7 h-7" />
            </div>
            
            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-bold font-serif-heading text-stone-900">
                No Orders Found
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
                {searchQuery
                  ? `We couldn't find any order matching "${searchQuery}". Try searching with another ID, your name, or snack name.`
                  : `You don't have any ${activeTab !== 'all' ? activeTab : ''} orders yet.`}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Clear Search</span>
                </button>
              )}
              <Link
                to="/explore"
                className="px-5 py-2.5 rounded-full bg-[#981b2e] hover:bg-[#801424] active:scale-95 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Browse Artisanal Snacks</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-5">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onOpenTracking={(ord) => setTrackingOrder(ord)}
                onOpenInvoice={(ord) => setInvoiceOrder(ord)}
                onOpenReview={(ord) => setReviewOrder(ord)}
                onOpenCancel={(ord) => setCancelModalOrder(ord)}
                onReorder={handleReorder}
              />
            ))}
          </div>
        )}

        {/* 5. Kitchen Help & Support Card */}
        <div className="rounded-3xl p-5 sm:p-7 bg-gradient-to-r from-[#0a2540] to-[#041f37] text-white border border-stone-800 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ffd25d]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Need Assistance With Your Delivery?</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold font-serif-heading">
              Dedicated Customer & Kitchen Dispatch Support
            </h4>
            <p className="text-xs text-stone-300">
              Mon – Sat: 9:00 AM – 8:00 PM • Average WhatsApp reply time &lt; 15 minutes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <a
              href="https://wa.me/919876543210?text=Hi%20Binayak%20Industries%2C%20I%20need%20help%20tracking%20my%20order"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-black transition-all active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Support</span>
            </a>

            <a
              href="tel:+919876543210"
              className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>

      </div>

      {/* Interactive Modals */}
      {trackingOrder && (
        <OrderTrackingModal
          order={trackingOrder}
          onClose={() => setTrackingOrder(null)}
        />
      )}

      {invoiceOrder && (
        <OrderInvoiceModal
          order={invoiceOrder}
          onClose={() => setInvoiceOrder(null)}
        />
      )}

      {reviewOrder && (
        <OrderReviewModal
          order={reviewOrder}
          onClose={() => setReviewOrder(null)}
          onSubmitReview={handleReviewSubmit}
        />
      )}

      {cancelModalOrder && (
        <OrderCancelModal
          order={cancelModalOrder}
          onClose={() => setCancelModalOrder(null)}
          onConfirmCancel={handleCancelConfirm}
        />
      )}
    </div>
  );
};

export default Orders;
