# FixMender

FixMender is a mobile app for customers to request vehicle service or roadside
assistance and for mechanics to receive and manage those requests. The mobile
client uses Expo/React Native; the API uses Node.js, Express, and PostgreSQL.

## Requirements

- Node.js and npm
- PostgreSQL database
- Expo Go on a physical phone for mobile preview
- Phone and  development computer connected to the same network

## Run locally

### 1. Install dependencies

From the project root:

```powershell
npm install
npm --prefix server install
```

### 2. Configure the API and database

Create a root `.env` file from `.env.example` and set the PostgreSQL connection
details and the API URL used by the app. For a phone preview, the API URL must
use the computer's LAN IP address, not `localhost`, for example:

```text
DATABASE_URL=postgresql://neondb_owner:@ep-solitary-bonus-bdm7m2ni-pooler.c-8.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.25:5000/api
```

Use your computer's actual local IP address. Keep database credentials in
`.env`; do not commit that file.

### 3. Apply database migrations

This applies pending SQL files from `server/migrations` in filename order and
records completed migrations in the database. The initial migration creates
the SOS requests table.

From the project root:

```powershell
npm run db:migrate
```

### 4. Start the API

In the first terminal:

```powershell
npm run dev
```

### 5. Start the mobile preview

In a second terminal:

```powershell
npm run preview
```

Scan the Expo QR code with Expo Go. If the device cannot connect, check that
both devices are on the same Wi-Fi, that the API URL points to the computer's
LAN IP, and that the firewall allows the API and Expo development server.

Useful commands:

| Command | Purpose |
| --- | --- |
| `npm run typecheck` | Type-check the app |
| `npm test` | Run API tests |
| `npm run build` | Export the Android app bundle |

## Current progress

This repository contains **one project: FixMender**. The project is in active
development; a reliable overall completion percentage cannot be calculated
without an agreed scope and acceptance checklist. The latest recorded
validation passed: the API migration test, TypeScript type-checking, Expo
dependency compatibility checks, and an Android Expo export.

### Completed implementation areas

1. Customer and mechanic role selection with separate app flows.
2. Account signup, login, and API-backed profile data.
3. Customer service bookings and mechanic booking queue/actions.
4. Customer SOS requests and mechanic SOS queue/actions.
5. Mechanic profile, workshop directory, and persisted online availability.
6. Customer and mechanic activity/history backed by API data.
7. Screen refresh while open (about every 10 seconds) and Android Expo export.

### Known scope / remaining work

- Screen updates use periodic refresh; this is not push-based or instant
  WebSocket synchronization.
- Ratings and payment/earnings are not backed by a data model and should not be
  treated as implemented.
- Production deployment, monitoring, and release-store setup are not covered by
  the local preview instructions above.
- Previously cleared accounts are not restored automatically. Create an
  account or sign in with an account currently in the configured database.

Update this section as additional requirements are implemented and verified.
