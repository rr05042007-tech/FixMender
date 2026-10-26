// FixMender Booking Services
// File: components/services/booking.services.ts

import { bookingAPI } from "./api";

// Booking status
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "in-progress"
  | "completed"
  | "cancelled";

// Booking data
export interface BookingData {
  garageId: string;
  vehicleId?: string;
  vehicleName: string;
  serviceType: string;
  issueDescription?: string;
  bookingDate: string;
  bookingTime: string;
  address: string;
  notes?: string;
}

// Booking response
export interface Booking {
  id: string;
  garageId: string;
  vehicleId?: string;
  vehicleName?: string;
  serviceType?: string;
  issueDescription?: string;
  bookingDate?: string;
  bookingTime?: string;
  address?: string;
  status: BookingStatus;
  createdAt?: string;
  totalCost?: number;
}

// Get all bookings
export const getBookings = async (
  token: string
): Promise<Booking[]> => {
  if (!token.trim()) {
    throw new Error("Authentication token is required.");
  }

  try {
    const response = await bookingAPI.getAll(token);
    return response as Booking[];
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to fetch bookings."
    );
  }
};

// Create a booking
export const createBooking = async (
  data: BookingData,
  token: string
): Promise<Booking> => {
  if (!token.trim()) {
    throw new Error("Authentication token is required.");
  }

  if (
    !data.garageId ||
    !data.vehicleName.trim() ||
    !data.serviceType.trim() ||
    !data.bookingDate.trim() ||
    !data.bookingTime.trim() ||
    !data.address.trim()
  ) {
    throw new Error("Please fill in all required booking details.");
  }

  try {
    const response = await bookingAPI.create(data, token);
    return response as Booking;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to create booking."
    );
  }
};

// Cancel a booking
export const cancelBooking = async (
  bookingId: string,
  token: string
): Promise<unknown> => {
  if (!bookingId.trim()) {
    throw new Error("Booking ID is required.");
  }

  if (!token.trim()) {
    throw new Error("Authentication token is required.");
  }

  try {
    return await bookingAPI.cancel(bookingId, token);
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to cancel booking."
    );
  }
};

// Get a booking by ID
// Uses the existing booking list endpoint and filters the result.
export const getBookingById = async (
  bookingId: string,
  token: string
): Promise<Booking> => {
  if (!bookingId.trim()) {
    throw new Error("Booking ID is required.");
  }

  const bookings = await getBookings(token);

  const booking = bookings.find(
    (item) => String(item.id) === bookingId
  );

  if (!booking) {
    throw new Error("Booking not found.");
  }

  return booking;
};