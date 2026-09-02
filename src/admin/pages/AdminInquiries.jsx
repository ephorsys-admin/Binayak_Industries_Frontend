import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  InquiryHeader,
  InquiryFilterBar,
  InquiryTable,
  InquiryDetailsModal,
  InquiryDeleteModal,
} from '../components/inquiries';

import {
  fetchAdminContacts,
  updateContactStatus,
  deleteContact,
} from '../../Redux/features/contact/contactThunk';
import {
  selectAdminContacts,
  selectContactLoading,
  selectContactActionLoading,
  selectContactPagination,
} from '../../Redux/features/contact/contactSlice';

const AdminInquiries = () => {
  const dispatch = useDispatch();

  // Redux state
  const contacts = useSelector(selectAdminContacts);
  const loading = useSelector(selectContactLoading);
  const actionLoading = useSelector(selectContactActionLoading);
  const pagination = useSelector(selectContactPagination);

  // Local filter & search
  const [activeStatus, setActiveStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals state
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // Fetch contacts on mount & param changes
  useEffect(() => {
    const params = {
      page: currentPage,
      limit: 10,
    };
    if (activeStatus !== 'all') {
      params.status = activeStatus;
    }
    if (searchQuery.trim()) {
      params.search = searchQuery.trim();
    }

    dispatch(fetchAdminContacts(params));
  }, [dispatch, currentPage, activeStatus, searchQuery]);

  // Handle Status Update
  const handleUpdateStatus = async (contactId, newStatus) => {
    const res = await dispatch(updateContactStatus(contactId, newStatus));
    if (res.success && selectedInquiry && (selectedInquiry._id === contactId || selectedInquiry.id === contactId)) {
      setSelectedInquiry((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Handle Delete
  const handleDeleteContact = async (contactId) => {
    const res = await dispatch(deleteContact(contactId));
    if (res.success) {
      setDeleteConfirmId(null);
      if (selectedInquiry && (selectedInquiry._id === contactId || selectedInquiry.id === contactId)) {
        setSelectedInquiry(null);
      }
    }
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 1. Header Banner */}
      <InquiryHeader />

      {/* 2. Filter Bar & Search */}
      <InquiryFilterBar
        activeStatus={activeStatus}
        onSelectStatus={(st) => {
          setActiveStatus(st);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
      />

      {/* 3. Inquiries Table */}
      <InquiryTable
        contacts={contacts}
        loading={loading}
        pagination={pagination}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onUpdateStatus={handleUpdateStatus}
        onView={setSelectedInquiry}
        onDelete={setDeleteConfirmId}
        activeStatus={activeStatus}
      />

      {/* 4. Delete Confirmation Modal */}
      <InquiryDeleteModal
        isOpen={Boolean(deleteConfirmId)}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => handleDeleteContact(deleteConfirmId)}
        loading={actionLoading}
      />

      {/* 5. View Details Modal */}
      <InquiryDetailsModal
        inquiry={selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default AdminInquiries;
