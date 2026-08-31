import React from 'react';
import BgHero from '../ui/BgHero';
import heroBannerImg from '../../assets/hero_banner.jpg';
import { Package, Truck, ShieldCheck, Clock } from 'lucide-react';

const OrdersHero = ({ searchQuery, onSearchChange }) => {
  return (
    <BgHero
      badgeText="YOUR ARTISANAL DELIVERY & ORDER HISTORY"
      badgeIcon={Package}
      title="Track & Manage Your Orders"
      highlightText="Manage Your Orders"
      subtitle="Real-time courier tracking, small-batch kitchen dispatch updates, digital tax invoices, and 1-click re-ordering."
      image={heroBannerImg}
      imageLayout="background"
      theme="dark"
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search by Order ID (e.g. BIN-89423) or snack name..."
      trustPoints={[
        { icon: Truck, text: 'Pan-India Express Tracking' },
        { icon: Clock, text: 'Daily Fresh Dispatch' },
        { icon: ShieldCheck, text: '100% Authentic Quality' },
      ]}
    />
  );
};

export default OrdersHero;
