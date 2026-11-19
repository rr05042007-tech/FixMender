export type MechanicSosRequest = {
  id: string;
  created_at: string;
  company: string;
  model?: string | null;
  vehicle_type: string;
  power_type: string;
  issue: string;
  description?: string;
  location_address: string;
  latitude: number | null;
  longitude: number | null;
  customer_name?: string | null;
  customer_phone?: string | null;
};

export async function getAvailableMechanicSosRequests(): Promise<MechanicSosRequest[]> {
  return [];
}

export async function getAssignedMechanicSosRequests(): Promise<MechanicSosRequest[]> {
  return [];
}

export async function acceptMechanicSosRequest(_id: string): Promise<void> {
  return;
}
