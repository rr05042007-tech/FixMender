
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profilePicture?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  message?: string;
}
