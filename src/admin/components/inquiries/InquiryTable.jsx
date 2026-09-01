import React from 'react';
import {
  MessageSquare,
  Phone,
  Mail,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
} from 'lucide-react';

const InquiryTable = ({
  contacts = [],
  loading = false,
  pagination,
  currentPage,
  onPageChange,
  onUpdateStatus,
  onView,
  onDelete,
  activeStatus,
}) => {
  const safeContacts = Array.isArray(contacts) ? contacts : [];

  if (loading) {
    return (
      <div className="bg-white rounded-3xl p-12 sm:p-16 border border-stone-200/80 shadow-2xs flex flex-col items-center justify-center gap-3 text-stone-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#981b2e]" />
        <p className="text-xs font-bold uppercase tracking-wider">Loading inquiries from database...</p>
      </div>
    );
  }

  if (safeContacts.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 sm:p-16 border border-stone-200/80 shadow-2xs text-center space-y-3">
        <div className="w-14 h-14 mx-auto rounded-3xl bg-amber-50 border border-amber-100 flex items-center justify-center text-[#b45309]">
          <MessageSquare className="w-7 h-7" />
        </div>
        <h3 className="text-base font-black font-brand text-stone-900">No Inquiries Found</h3>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          {activeStatus === 'all'
            ? 'No customer inquiries in the database yet.'
            : `No inquiries with "${activeStatus}" status found.`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ========================================================
          1. MOBILE VIEW (Cards for mobile screens < md)
          ======================================================== */}
      <div className="md:hidden space-y-3">
        {safeContacts.map((c) => {
          const contactId = c._id || c.id;
          const status = c.status || 'Pending';

          return (
            <div
              key={contactId}
              className="bg-white rounded-3xl p-4 border border-stone-200/80 shadow-2xs space-y-3"
            >
              {/* Header Row: User Info + Status */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-[#b45309] font-black flex items-center justify-center border border-amber-100 text-sm shrink-0">
                    {c.name ? c.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm font-brand">{c.name}</h4>
                    <p className="text-[10px] text-stone-400 font-mono">ID: #{contactId.slice(-6)}</p>
                  </div>
                </div>

                {/* Status Dropdown with Mongoose Enum */}
                <select
                  value={status}
                  onChange={(e) => onUpdateStatus(contactId, e.target.value)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer ${
                    status === 'Pending'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : status === 'Contacted'
                      ? 'bg-blue-50 text-blue-800 border-blue-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              {/* Inquiry Reason */}
              <div className="bg-stone-50/80 rounded-2xl p-3 border border-stone-100 space-y-1">
                <p className="text-xs text-stone-600 line-clamp-2">{c.reason || c.message}</p>
              </div>

              {/* Contact Info & Actions */}
              <div className="flex items-center justify-between text-[11px] pt-1 text-stone-600 gap-2">
                <div className="flex items-center gap-3">
                  {c.phone && (
                    <a
                      href={`tel:${c.phone}`}
                      className="flex items-center gap-1 text-stone-700 hover:text-[#981b2e] font-semibold"
                    >
                      <Phone className="w-3.5 h-3.5 text-stone-400" />
                      <span>{c.phone}</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onView(c)}
                    className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(contactId)}
                    className="p-1.5 rounded-xl text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================
          2. DESKTOP VIEW (Table for md and larger screens)
          ======================================================== */}
      <div className="hidden md:block bg-white rounded-3xl p-5 sm:p-6 border border-stone-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 font-bold uppercase text-[10px]">
                <th className="pb-3">Customer Info</th>
                <th className="pb-3">Contact Details</th>
                <th className="pb-3">Inquiry Reason</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {safeContacts.map((c) => {
                const contactId = c._id || c.id;
                const status = c.status || 'Pending';

                return (
                  <tr key={contactId} className="hover:bg-stone-50/80 transition-colors">
                    
                    {/* Customer Name */}
                    <td className="py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#b45309] font-black flex items-center justify-center border border-amber-100 text-xs shrink-0">
                          {c.name ? c.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="font-bold text-stone-900">{c.name}</p>
                          <p className="text-[10px] text-stone-400 font-mono">ID: #{contactId.slice(-6)}</p>
                        </div>
                      </div>
                    </td>

                    {/* Contact Phone & Email */}
                    <td className="py-3.5">
                      <div className="space-y-1">
                        {c.phone && (
                          <div className="flex items-center gap-1.5 text-stone-600">
                            <Phone className="w-3 h-3 text-stone-400 shrink-0" />
                            <a href={`tel:${c.phone}`} className="hover:underline hover:text-[#981b2e]">
                              {c.phone}
                            </a>
                          </div>
                        )}
                        {c.email && (
                          <div className="flex items-center gap-1.5 text-stone-400 text-[11px]">
                            <Mail className="w-3 h-3 text-stone-400 shrink-0" />
                            <span className="truncate max-w-[150px]">{c.email}</span>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Inquiry Reason */}
                    <td className="py-3.5">
                      <div className="max-w-[240px]">
                        <p className="text-stone-700 truncate text-xs font-medium">{c.reason || c.message}</p>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 text-stone-500 text-[11px]">
                      {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Today'}
                    </td>

                    {/* Status Dropdown with Mongoose Enum */}
                    <td className="py-3.5">
                      <select
                        value={status}
                        onChange={(e) => onUpdateStatus(contactId, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-full border cursor-pointer ${
                          status === 'Pending'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : status === 'Contacted'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onView(c)}
                          className="p-1.5 rounded-lg text-stone-600 hover:text-stone-950 hover:bg-stone-100 cursor-pointer"
                          title="View Message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDelete(contactId)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div className="bg-white rounded-3xl p-4 border border-stone-200/80 shadow-2xs flex items-center justify-between text-xs">
          <span className="text-stone-500 font-medium text-[11px] sm:text-xs">
            Page {pagination.currentPage || currentPage} of {pagination.totalPages} ({pagination.totalRecords} inquiries)
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              disabled={currentPage >= pagination.totalPages}
              onClick={() => onPageChange(Math.min(pagination.totalPages, currentPage + 1))}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryTable;
