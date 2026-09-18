import React from 'react';
import {
  MessageSquare,
  User,
  Phone,
  Mail,
  Calendar,
  X,
} from 'lucide-react';

const InquiryDetailsModal = ({
  inquiry,
  onClose,
  onUpdateStatus,
}) => {
  if (!inquiry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl p-5 sm:p-6 shadow-2xl border border-stone-200 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-[#b45309] flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black font-brand text-stone-900">
                Customer Inquiry
              </h3>
              <span className="text-[10px] text-stone-400 font-mono">
                ID: #{inquiry._id || inquiry.id}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Customer Details Box */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 text-xs">
          <p className="font-bold text-stone-900 flex items-center gap-2">
            <User className="w-4 h-4 text-[#981b2e]" />
            <span>{inquiry.name}</span>
          </p>
          <p className="text-stone-700 flex items-center gap-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            <a href={`tel:${inquiry.phone}`} className="hover:underline font-bold text-stone-900">
              {inquiry.phone}
            </a>
          </p>
          {inquiry.email && (
            <p className="text-stone-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <a href={`mailto:${inquiry.email}`} className="hover:underline">
                {inquiry.email}
              </a>
            </p>
          )}
          <p className="text-stone-500 flex items-center gap-2 text-[11px] pt-1 border-t border-stone-200/60">
            <Calendar className="w-3.5 h-3.5 text-stone-400" />
            <span>
              Received on {new Date(inquiry.createdAt).toLocaleString('en-IN')}
            </span>
          </p>
        </div>

        {/* Inquiry Reason / Message */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            Inquiry Message / Reason:
          </span>
          <div className="p-3.5 rounded-2xl bg-stone-100 text-stone-800 text-xs leading-relaxed border border-stone-200/70 font-medium max-h-40 overflow-y-auto">
            {inquiry.reason}
          </div>
        </div>

        {/* Quick Status Updater */}
        <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs font-bold text-stone-700">Change Status:</span>
          <div className="flex items-center gap-1.5">
            {['Pending', 'Contacted', 'Resolved'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => onUpdateStatus(inquiry._id || inquiry.id, st)}
                className={`px-3 py-1 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                  inquiry.status === st
                    ? 'bg-[#1c130d] text-white shadow-2xs font-black'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default InquiryDetailsModal;
