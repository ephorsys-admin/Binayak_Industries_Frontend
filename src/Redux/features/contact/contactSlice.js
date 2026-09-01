import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  selectedContact: null,
  pagination: {
    totalRecords: 0,
    totalPages: 1,
    currentPage: 1,
    limit: 10,
  },
  loading: false,
  actionLoading: false,
  error: null,
  submitSuccess: false,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    contactStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    contactActionStart: (state) => {
      state.actionLoading = true;
      state.error = null;
    },
    contactFailure: (state, action) => {
      state.loading = false;
      state.actionLoading = false;
      state.error = action.payload;
    },
    contactActionFailure: (state, action) => {
      state.actionLoading = false;
      state.error = action.payload;
    },
    fetchAdminContactsSuccess: (state, action) => {
      state.loading = false;
      const payload = action.payload || {};
      state.contacts =
        payload.contacts ||
        payload.data ||
        (Array.isArray(payload) ? payload : []);
      state.pagination = payload.pagination || state.pagination;
      state.error = null;
    },
    getSingleContactSuccess: (state, action) => {
      state.loading = false;
      state.selectedContact =
        action.payload?.contact || action.payload?.data || action.payload;
      state.error = null;
    },
    updateContactStatusSuccess: (state, action) => {
      state.actionLoading = false;
      const updatedContact =
        action.payload?.contact || action.payload?.data || action.payload;
      if (Array.isArray(state.contacts)) {
        state.contacts = state.contacts.map((c) =>
          c._id === updatedContact._id ? updatedContact : c
        );
      }
      if (state.selectedContact?._id === updatedContact._id) {
        state.selectedContact = updatedContact;
      }
      state.error = null;
    },
    deleteContactSuccess: (state, action) => {
      state.actionLoading = false;
      const id = action.payload;
      if (Array.isArray(state.contacts)) {
        state.contacts = state.contacts.filter((c) => (c._id || c.id) !== id);
      }
      state.error = null;
    },
    submitContactSuccess: (state) => {
      state.actionLoading = false;
      state.submitSuccess = true;
      state.error = null;
    },
    resetSubmitContact: (state) => {
      state.submitSuccess = false;
      state.error = null;
    },
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    clearContactError: (state) => {
      state.error = null;
    },
  },
});

export const {
  contactStart,
  contactActionStart,
  contactFailure,
  contactActionFailure,
  fetchAdminContactsSuccess,
  getSingleContactSuccess,
  updateContactStatusSuccess,
  deleteContactSuccess,
  submitContactSuccess,
  resetSubmitContact,
  setSelectedContact,
  clearContactError,
} = contactSlice.actions;

// Selectors
export const selectAdminContacts = (state) =>
  Array.isArray(state.contact?.contacts) ? state.contact.contacts : [];
export const selectSelectedContact = (state) => state.contact?.selectedContact;
export const selectContactLoading = (state) => state.contact?.loading || false;
export const selectContactActionLoading = (state) =>
  state.contact?.actionLoading || false;
export const selectContactSubmitSuccess = (state) =>
  state.contact?.submitSuccess || false;
export const selectContactError = (state) => state.contact?.error;
export const selectContactPagination = (state) => state.contact?.pagination;

export default contactSlice.reducer;
