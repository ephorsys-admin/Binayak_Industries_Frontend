import toast from "react-hot-toast";
import {
  createContactApi,
  fetchAdminContactsApi,
  getSingleAdminContactApi,
  updateContactStatusApi,
  deleteContactApi,
} from "../../services/contactService";
import {
  contactStart,
  contactActionStart,
  contactFailure,
  contactActionFailure,
  fetchAdminContactsSuccess,
  getSingleContactSuccess,
  updateContactStatusSuccess,
  deleteContactSuccess,
  submitContactSuccess,
} from "./contactSlice";

/**
 * ==========================================================
 * Submit Contact Form (Public Website)
 * ==========================================================
 */
export const submitContact = (formData) => async (dispatch) => {
  try {
    dispatch(contactActionStart());
    const data = await createContactApi(formData);
    dispatch(submitContactSuccess(data));
    toast.success(data?.message || "Inquiry submitted successfully! Our team will contact you soon.");
    return { success: true, data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to submit inquiry";
    dispatch(contactActionFailure(message));
    toast.error(message);
    return { success: false, error: message };
  }
};

/**
 * ==========================================================
 * Fetch All Contacts / Inquiries (Admin Panel)
 * ==========================================================
 */
export const fetchAdminContacts =
  (params = {}) =>
  async (dispatch) => {
    try {
      dispatch(contactStart());
      const data = await fetchAdminContactsApi(params);
      dispatch(fetchAdminContactsSuccess(data));
      return { success: true, data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch contacts";
      dispatch(contactFailure(message));
      return { success: false, error: message };
    }
  };

/**
 * ==========================================================
 * Get Single Contact (Admin)
 * ==========================================================
 */
export const getSingleContact = (contactId) => async (dispatch) => {
  try {
    dispatch(contactStart());
    const data = await getSingleAdminContactApi(contactId);
    dispatch(getSingleContactSuccess(data));
    return { success: true, data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch contact details";
    dispatch(contactFailure(message));
    return { success: false, error: message };
  }
};

/**
 * ==========================================================
 * Update Contact Status (Admin)
 * ==========================================================
 */
export const updateContactStatus =
  (contactId, status) => async (dispatch) => {
    try {
      dispatch(contactActionStart());
      const data = await updateContactStatusApi(contactId, status);
      dispatch(updateContactStatusSuccess(data));
      toast.success(data?.message || `Status updated to ${status}!`);
      return { success: true, data };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to update contact status";
      dispatch(contactActionFailure(message));
      toast.error(message);
      return { success: false, error: message };
    }
  };

/**
 * ==========================================================
 * Delete Contact (Admin)
 * ==========================================================
 */
export const deleteContact = (contactId) => async (dispatch) => {
  try {
    dispatch(contactActionStart());
    const data = await deleteContactApi(contactId);
    dispatch(deleteContactSuccess(contactId));
    toast.success(data?.message || "Contact deleted successfully!");
    return { success: true, data };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to delete contact";
    dispatch(contactActionFailure(message));
    toast.error(message);
    return { success: false, error: message };
  }
};
