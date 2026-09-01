import api from "./api";

/**
 * ==========================================================
 * Contact / Inquiries API Services
 * ==========================================================
 */

// 1. Submit Public Contact Form
export const createContactApi = async (data) => {
  const response = await api.post("/contact/create", data);
  return response.data;
};

// 2. Get All Contacts for Admin (with pagination, search, status filter)
export const fetchAdminContactsApi = async (params = {}) => {
  const response = await api.get("/contact/admin/all", { params });
  return response.data;
};

// 3. Get Single Contact Details (Admin)
export const getSingleAdminContactApi = async (contactId) => {
  const response = await api.get(`/contact/admin/${contactId}`);
  return response.data;
};

// 4. Update Contact Status (Admin: Pending, Contacted, Resolved)
export const updateContactStatusApi = async (contactId, status) => {
  const response = await api.patch(`/contact/admin/status/${contactId}`, { status });
  return response.data;
};

// 5. Delete Contact (Admin)
export const deleteContactApi = async (contactId) => {
  const response = await api.delete(`/contact/admin/delete/${contactId}`);
  return response.data;
};
