import React from 'react';
import { Phone, MessageSquare, Mail, MapPin, ExternalLink, Clock } from 'lucide-react';

const contactCards = [
  {
    icon: Phone,
    title: 'Phone Support',
    subtitle: 'Direct talk with our kitchen support',
    detail: '+91 98765 43210',
    subdetail: 'Toll-Free: 1800-123-4567',
    linkText: 'Call Now',
    linkHref: 'tel:+919876543210',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    badge: 'Mon-Sat 9AM-8PM',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp Express',
    subtitle: 'Instant chat for orders & tracking',
    detail: '+91 98765 43210',
    subdetail: 'Replies in < 15 mins',
    linkText: 'Chat on WhatsApp',
    linkHref: 'https://wa.me/919876543210?text=Hi%20Binayak%20Industries%2C%20I%20have%20an%20inquiry%20regarding%20artisanal%20snacks',
    color: 'text-emerald-700',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    badge: 'Instant Chat',
  },
  {
    icon: Mail,
    title: 'Email Inquiries',
    subtitle: 'For bulk gifting & general queries',
    detail: 'support@binayakfoods.com',
    subdetail: 'orders@binayakfoods.com',
    linkText: 'Send Email',
    linkHref: 'mailto:support@binayakfoods.com?subject=Inquiry%20from%20Binayak%20Website',
    color: 'text-[#981b2e]',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    badge: '24h Turnaround',
  },
  {
    icon: MapPin,
    title: 'Head Kitchen & Office',
    subtitle: 'Visit our flagship workshop & boutique',
    detail: 'Binayak Artisanal Foods, Plot 42',
    subdetail: 'Food Park, Viman Nagar, Pune, MH 411014',
    linkText: 'Get Directions',
    linkHref: 'https://maps.google.com/?q=Pune',
    color: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    badge: 'Open for Visits',
  },
];

const ContactInfoCards = () => {
  return (
    <section className="space-y-3.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {contactCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-2xs hover:shadow-md hover:border-[#981b2e]/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header with Icon & Badge */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className={`w-12 h-12 rounded-2xl ${card.bg} ${card.border} border flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <Icon className={`w-6 h-6 ${card.color}`} />
                  </div>
                  <span className="text-[10px] font-extrabold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                    {card.badge}
                  </span>
                </div>

                {/* Title & Info */}
                <h3 className="text-base font-bold text-stone-900 group-hover:text-[#981b2e] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-stone-500 font-medium mt-0.5 mb-2.5">
                  {card.subtitle}
                </p>

                <div className="space-y-0.5 text-xs font-semibold text-stone-800">
                  <p className="truncate">{card.detail}</p>
                  <p className="text-stone-500 font-normal text-[11px] truncate">{card.subdetail}</p>
                </div>
              </div>

              {/* Action Button Link */}
              <div className="pt-3 border-t border-stone-100 mt-4">
                <a
                  href={card.linkHref}
                  target={card.linkHref.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#083358] hover:text-[#981b2e] transition-colors group/link"
                >
                  <span>{card.linkText}</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ContactInfoCards;
