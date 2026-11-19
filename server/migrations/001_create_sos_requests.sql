CREATE TABLE IF NOT EXISTS sos_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  company TEXT NOT NULL,
  model TEXT,
  vehicle_type TEXT NOT NULL,
  power_type TEXT NOT NULL,
  issue TEXT NOT NULL,
  description TEXT,
  location_address TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  customer_name TEXT,
  customer_phone TEXT,
  accepted_by_mechanic_id TEXT,
  accepted_at TIMESTAMPTZ,
  CONSTRAINT sos_requests_coordinates_pair CHECK (
    (latitude IS NULL) = (longitude IS NULL)
    AND (
      latitude IS NULL
      OR (
        latitude BETWEEN -90 AND 90
        AND longitude BETWEEN -180 AND 180
      )
    )
  )
);

CREATE INDEX IF NOT EXISTS sos_requests_available_created_at_idx
  ON sos_requests (created_at DESC)
  WHERE accepted_by_mechanic_id IS NULL;

CREATE INDEX IF NOT EXISTS sos_requests_mechanic_created_at_idx
  ON sos_requests (accepted_by_mechanic_id, created_at DESC)
  WHERE accepted_by_mechanic_id IS NOT NULL;
