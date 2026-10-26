// FixMender API Service
// File: components/services/api.ts

const API_BASE_URL = "http://YOUR_COMPUTER_IP:5000/api";

type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
};

async function request<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body, token } = options;

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers,
      ...(body !== undefined
        ? { body: JSON.stringify(body) }
        : {}),
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Check your internet connection and API URL."
    );
  }

  const responseText = await response.text();

  let data: any = null;

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      data = responseText;
    }
  }

  if (!response.ok) {
    const message =
      typeof data === "object" && data?.message
        ? data.message
        : `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data as T;
}

// Authentication APIs
export const authAPI = {
  login: (email: string, password: string) =>
    request("/auth/login", {
      method: "POST",
      body: { email, password },
    }),

  signup: (name: string, email: string, password: string, phone: string) =>
    request("/auth/signup", {
      method: "POST",
      body: { name, email, password, phone },
    }),

  getProfile: (token: string) =>
    request("/auth/profile", { token }),
};

// Garage APIs
export const garageAPI = {
  getAll: () => request("/garages"),

  getById: (garageId: string) =>
    request(`/garages/${encodeURIComponent(garageId)}`),

  search: (query: string) =>
    request(`/garages?search=${encodeURIComponent(query)}`),
};

// Vehicle APIs
export const vehicleAPI = {
  getAll: (token: string) =>
    request("/vehicles", { token }),

  add: (vehicle: Record<string, unknown>, token: string) =>
    request("/vehicles", {
      method: "POST",
      body: vehicle,
      token,
    }),

  update: (
    vehicleId: string,
    vehicle: Record<string, unknown>,
    token: string
  ) =>
    request(`/vehicles/${encodeURIComponent(vehicleId)}`, {
      method: "PUT",
      body: vehicle,
      token,
    }),

  delete: (vehicleId: string, token: string) =>
    request(`/vehicles/${encodeURIComponent(vehicleId)}`, {
      method: "DELETE",
      token,
    }),
};

// Booking APIs
export const bookingAPI = {
  getAll: (token: string) =>
    request("/bookings", { token }),

  create: (booking: Record<string, unknown>, token: string) =>
    request("/bookings", {
      method: "POST",
      body: booking,
      token,
    }),

  cancel: (bookingId: string, token: string) =>
    request(`/bookings/${encodeURIComponent(bookingId)}/cancel`, {
      method: "PATCH",
      token,
    }),
};

// SOS API
export const sosAPI = {
  createRequest: (details: Record<string, unknown>, token: string) =>
    request("/sos", {
      method: "POST",
      body: details,
      token,
    }),

  getRequestStatus: (requestId: string, token: string) =>
    request(`/sos/${encodeURIComponent(requestId)}`, { token }),
};

// Repair cost API
export const repairCostAPI = {
  estimate: (details: Record<string, unknown>) =>
    request("/repair-cost/estimate", {
      method: "POST",
      body: details,
    }),
};

// Export default API object
const API = {
  auth: authAPI,
  garages: garageAPI,
  vehicles: vehicleAPI,
  bookings: bookingAPI,
  sos: sosAPI,
  repairCost: repairCostAPI,
};

export default API;

