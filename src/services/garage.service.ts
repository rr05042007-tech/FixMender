// FixMender Garage Services
// File: components/services/garage.service.ts

import { garageAPI } from "./api";

// Garage data type
export interface Garage {
  id: string;
  name: string;
  address: string;
  phone?: string;
  rating?: number;
  distance?: string;
  category?: string;
  services?: string[];
  price?: string;
  image?: string;
  isOpen?: boolean;
  latitude?: number;
  longitude?: number;
}

// Fetch all garages
export const getGarages = async (): Promise<Garage[]> => {
  try {
    const response = await garageAPI.getAll();

    // Supports either an array or { garages: [...] } response.
    if (Array.isArray(response)) {
      return response as Garage[];
    }

    const data = response as { garages?: Garage[] };

    return data.garages ?? [];
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to fetch garages."
    );
  }
};

// Get a garage by ID
export const getGarageById = async (
  garageId: string
): Promise<Garage> => {
  if (!garageId.trim()) {
    throw new Error("Garage ID is required.");
  }

  try {
    const response = await garageAPI.getById(garageId);

    const data = response as Garage | { garage: Garage };

    if ("garage" in data && data.garage) {
      return data.garage;
    }

    return data as Garage;
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to fetch garage details."
    );
  }
};

// Search garages by name or keyword
export const searchGarages = async (
  query: string
): Promise<Garage[]> => {
  if (!query.trim()) {
    return getGarages();
  }

  try {
    const response = await garageAPI.search(query.trim());

    if (Array.isArray(response)) {
      return response as Garage[];
    }

    const data = response as { garages?: Garage[] };

    return data.garages ?? [];
  } catch (error) {
    throw new Error(
      error instanceof Error
        ? error.message
        : "Unable to search garages."
    );
  }
};

// Filter garages by service category
export const filterGaragesByCategory = (
  garages: Garage[],
  category: string
): Garage[] => {
  if (category === "All") {
    return garages;
  }

  return garages.filter((garage) =>
    garage.category?.toLowerCase().includes(category.toLowerCase())
  );
};

// Sort garages by rating (highest first)
export const sortGaragesByRating = (
  garages: Garage[]
): Garage[] => {
  return [...garages].sort(
    (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
  );
};

// Sort garages by distance (nearest first).
// Assumes distance values are numeric strings in kilometres.
export const sortGaragesByDistance = (
  garages: Garage[]
): Garage[] => {
  return [...garages].sort((a, b) => {
    const distanceA = parseFloat(a.distance ?? "");
    const distanceB = parseFloat(b.distance ?? "");

    return (
      (Number.isFinite(distanceA) ? distanceA : Infinity) -
      (Number.isFinite(distanceB) ? distanceB : Infinity)
    );
  });
};