import { createSlice } from "@reduxjs/toolkit";

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
    // =================================================
    // ADMIN
    // =================================================

    admin: null,

    // =================================================
    // AUTHENTICATION
    // =================================================

    accessToken: null,

    isAuthenticated: false,

    // =================================================
    // API STATE
    // =================================================

    loading: false,

    error: null,

    // =================================================
    // FORGOT PASSWORD
    // =================================================

    otpSent: false,

    otpVerified: false,

    resetEmail: null,
};


// =====================================================
// AUTH SLICE
// =====================================================

const authSlice = createSlice({
    name: "auth",

    initialState,

    reducers: {

        // =================================================
        // AUTH START
        // =================================================

        authStart: (state) => {
            state.loading = true;
            state.error = null;
        },


        // =================================================
        // LOGIN SUCCESS
        // =================================================

        loginSuccess: (state, action) => {

            state.loading = false;

            state.error = null;

            // Admin data
            state.admin = action.payload?.admin || null;

            // Access Token
            state.accessToken =
                action.payload?.accessToken || null;

            // Authentication
            state.isAuthenticated = true;
        },


        // =================================================
        // AUTH FAILURE
        // =================================================

        authFailure: (state, action) => {

            state.loading = false;

            state.error =
                action.payload ||
                "Something went wrong";
        },


        // =================================================
        // LOGOUT SUCCESS
        // =================================================

        logoutSuccess: (state) => {

            // Admin
            state.admin = null;

            // Token
            state.accessToken = null;

            // Authentication
            state.isAuthenticated = false;

            // API state
            state.loading = false;
            state.error = null;

            // Forgot password reset
            state.otpSent = false;
            state.otpVerified = false;
            state.resetEmail = null;
        },


        // =================================================
        // OTP SENT SUCCESS
        // =================================================

        otpSentSuccess: (state, action) => {

            state.loading = false;

            state.error = null;

            state.otpSent = true;

            state.otpVerified = false;

            state.resetEmail = action.payload;
        },


        // =================================================
        // OTP VERIFIED SUCCESS
        // =================================================

        otpVerifiedSuccess: (state) => {

            state.loading = false;

            state.error = null;

            state.otpVerified = true;
        },


        // =================================================
        // PASSWORD RESET SUCCESS
        // =================================================

        passwordResetSuccess: (state) => {

            state.loading = false;

            state.error = null;

            state.otpSent = false;

            state.otpVerified = false;

            state.resetEmail = null;
        },


        // =================================================
        // CLEAR ERROR
        // =================================================

        clearAuthError: (state) => {

            state.error = null;
        },


        // =================================================
        // RESET AUTH STATE
        // =================================================

        resetAuthState: (state) => {

            state.admin = null;

            state.accessToken = null;

            state.isAuthenticated = false;

            state.loading = false;

            state.error = null;

            state.otpSent = false;

            state.otpVerified = false;

            state.resetEmail = null;
        },
    },
});


// =====================================================
// EXPORT ACTIONS
// =====================================================

export const {
    authStart,

    loginSuccess,

    authFailure,

    logoutSuccess,

    otpSentSuccess,

    otpVerifiedSuccess,

    passwordResetSuccess,

    clearAuthError,

    resetAuthState,

} = authSlice.actions;


// =====================================================
// EXPORT REDUCER
// =====================================================

export default authSlice.reducer;