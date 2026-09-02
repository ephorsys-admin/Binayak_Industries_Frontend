import api from "../../services/api";

import toast from "react-hot-toast";

import {
  authFailure,
  authStart,
  loginSuccess,
  logoutSuccess,
  otpSentSuccess,
  otpVerifiedSuccess,
  passwordResetSuccess,
} from "./authSlice";


// =====================================================
// LOGIN
// =====================================================
export const loginAdmin = (formData) => async (dispatch) => {
  try {
    dispatch(authStart());

    const { data } = await api.post(
      "/admin/login",
      formData
    );
    const accessToken = data?.accessToken;
    const admin = data?.admin;

    // =================================================
    // CHECK ACCESS TOKEN
    // =================================================

    if (!accessToken) {
      throw new Error(
        "Access token not received"
      );
    }

    // =================================================
    // SAVE ACCESS TOKEN
    // =================================================

    localStorage.setItem(
      "accessToken",
      accessToken
    );

    // =================================================
    // REDUX
    // =================================================

    dispatch(
      loginSuccess({
        admin,
        accessToken,
      })
    );

    toast.success(
      data.message || "Login successful"
    );

    return {
      success: true,
    };

  } catch (error) {

    const msg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    dispatch(
      authFailure(msg)
    );

    toast.error(msg);

    return {
      success: false,
    };
  }
};


// =====================================================
// LOGOUT
// =====================================================
// LOGOUT
// =====================================================
export const logOutAdmin = () => async (dispatch) => {
  try {
    dispatch(authStart());
    await api.post("/admin/logout");
  } catch (error) {
    // If backend token is already expired, continue local logout cleanly
    console.warn("Logout note:", error.response?.data?.message || error.message);
  } finally {
    // ALWAYS clear tokens and reset Redux auth state
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(logoutSuccess());
    toast.success("Logged out successfully");
    return {
      success: true,
    };
  }
};


// =====================================================
// SEND OTP
// =====================================================

export const sendForgotPasswordOtp =
  (email) => async (dispatch) => {

    try {

      dispatch(authStart());

      const { data } =
        await api.post(
          "/admin/forgot-password",
          {
            email,
          }
        );

      dispatch(
        otpSentSuccess(email)
      );

      toast.success(
        data.message ||
        "OTP sent successfully"
      );

      return {
        success: true,
      };

    } catch (error) {

      const msg =
        error.response?.data?.message ||
        "Failed to send OTP";

      dispatch(
        authFailure(msg)
      );

      toast.error(msg);

      return {
        success: false,
      };
    }
  };


// =====================================================
// VERIFY OTP
// =====================================================

export const verifyForgotOtp =
  (email, otp) => async (dispatch) => {

    try {

      dispatch(authStart());

      const { data } =
        await api.post(
          "/admin/verify-forgot-otp",
          {
            email,
            otp,
          }
        );

      dispatch(
        otpVerifiedSuccess()
      );

      toast.success(
        data.message ||
        "OTP verified successfully"
      );

      return {
        success: true,
      };

    } catch (error) {

      const msg =
        error.response?.data?.message ||
        "Invalid OTP";

      dispatch(
        authFailure(msg)
      );

      toast.error(msg);

      return {
        success: false,
      };
    }
  };


// =====================================================
// RESET PASSWORD
// =====================================================

export const resetForgotPassword =
  (
    email,
    otp,
    newPassword,
    confirmPassword
  ) => async (dispatch) => {

    try {

      dispatch(authStart());

      const { data } =
        await api.post(
          "/admin/reset-password",
          {
            email,
            otp,
            newPassword,
            confirmPassword,
          }
        );

      dispatch(
        passwordResetSuccess()
      );

      toast.success(
        data.message ||
        "Password reset successful"
      );

      return {
        success: true,
      };

    } catch (error) {

      const msg =
        error.response?.data?.message ||
        "Password reset failed";

      dispatch(
        authFailure(msg)
      );

      toast.error(msg);

      return {
        success: false,
      };
    }
  };