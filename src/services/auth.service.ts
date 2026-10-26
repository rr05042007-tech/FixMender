// FixMender Authentication Services
// File: components/services/auth.services.ts

import { authAPI } from "./api";

// Types
export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface AuthResponse {
  message?: string;
  token?: string;
  accessToken?: string;
  user?: {
    id?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
}

// Login service
export const loginUser = async (
  data: LoginData
): Promise<AuthResponse> => {
  if (!data.email.trim() || !data.password) {
    throw new Error("Email and password are required.");
  }

  try {
    const response = (await authAPI.login(
      data.email.trim(),
      data.password
    )) as AuthResponse;

    return response;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Login failed."
    );
  }
};

// Signup service
export const signupUser = async (
  data: SignupData
): Promise<AuthResponse> => {
  if (
    !data.name.trim() ||
    !data.email.trim() ||
    !data.password ||
    !data.phone.trim()
  ) {
    throw new Error("Please fill in all required fields.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    throw new Error("Please enter a valid email address.");
  }

  if (data.password.length < 8) {
    throw new Error("Password must contain at least 8 characters.");
  }

  try {
    const response = (await authAPI.signup(
      data.name.trim(),
      data.email.trim(),
      data.password,
      data.phone.trim()
    )) as AuthResponse;

    return response;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Signup failed."
    );
  }
};

// Get current user profile
export const getUserProfile = async (
  token: string
): Promise<AuthResponse["user"]> => {
  if (!token.trim()) {
    throw new Error("Authentication token is required.");
  }

  const response = (await authAPI.getProfile(token)) as AuthResponse;

  return response.user;
};

// Logout service
// This clears local application state only.
// It does not call a server logout endpoint.
export const logoutUser = async (
  clearSession: () => void
): Promise<void> => {
  clearSession();
};