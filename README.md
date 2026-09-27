# Aman — Water Quality Monitoring Platform

Aman is an IoT water-quality monitoring system. Sensor-equipped devices push readings
(pH, turbidity, temperature, TDS, chlorine) to a Spring Boot API; customers follow their
own device from an Expo mobile app, and admins manage customers, devices, sensors,
payments and subscriptions through the same API.

## Demo

A walkthrough of the app: pairing a device by QR code and watching the water-quality
readings come in live.

<!-- For an inline player on GitHub, drag IMG_1108_demo.mp4 into any issue or PR comment
     (or attach it to a release), then replace the link below with the resulting
     https://github.com/user-attachments/assets/... URL on a line of its own. -->

▶ [Watch the demo](IMG_1108_demo.mp4) (41 MB, MP4)

```
aman/
├── backend/   Spring Boot 3.4 + MySQL REST API (Java 17, JWT auth, Swagger)
├── mobile/    Expo / React Native app for customers (expo-router, TypeScript)
├── iot/       placeholder — the device code lives on the Raspberry Pi itself
└── Makefile   `make run-mobile`
```

## Architecture

```
  Raspberry Pi + Arduino + TDS sensor
        │  desktop app on the Pi, paired by QR code
        └──POST /api/waterquality/send/{deviceId}──┐
                                                   ▼
  Mobile app ──JWT──► Spring Boot API ◄──JWT── Admin client
                            │
                          MySQL
```

Three tiers:

1. **The measuring station** — an Arduino carrying the TDS sensor, wired to a Raspberry Pi
   that runs a small desktop app. The app is paired with a customer's device by QR code,
   then posts each reading to the API.
2. **The API** — Spring Boot over MySQL. It owns customers, devices, the sensor catalog,
   subscriptions and payments, ingests readings, and derives a water-quality status from
   them.
3. **The clients** — the Expo mobile app for customers, and admin-only endpoints for
   managing the fleet and the dashboard.

Notes on the wiring:

- Readings are written through a single public endpoint,
  `POST /api/waterquality/send/{deviceId}`; everything else requires a JWT.
- Tokens are issued by `/api/auth/login` and carry a `role` claim (`ADMIN` / `CUSTOMER`);
  `JwtFilter` validates them on every request and `SecurityConfig` maps roles to routes.
- A `qrCode` is generated for the device at customer registration and is what binds the
  physical station to a row in the database. Scanning it is how the `deviceId` gets from
  the account to the station, so readings land against the right device and the customer
  sees them live in the app.

---

## Backend (`backend/`)

Spring Boot 3.4.4, Java 17, Spring Data JPA, Spring Security, MySQL, JJWT, SpringDoc OpenAPI.

### Domain model

| Entity | Purpose |
| --- | --- |
| `User` | customer or admin, linked to a `Role` row |
| `Role` | `ADMIN`, `CUSTOMER` (see also `enums/Role`) |
| `Device` | belongs to a user, has a `qrCode`, a `DeviceStatus`, and many `Sensor`s |
| `Sensor` | catalog entry with a name, description and price |
| `WaterQualityData` | one timestamped reading per device |
| `Subscription` / `SubscriptionPlan` | customer plan and `SubscriptionStatus` |
| `Payment` | amount + `PaymentStatus`, created on registration |
| `Alert` | alerting model |

Package layout: `controller/` (web layer, with mobile-facing controllers under
`controller/ApiController`), `service/` (+ `service/mobileSevices`), `repository/`,
`dto/`, `model/`, `enums/`, `security/`, `config/`.

### Configuration

`src/main/resources/application.properties` reads everything from the environment, so a
local run needs:

| Variable | Meaning | Default |
| --- | --- | --- |
| `PORT` | HTTP port | `8080` |
| `JDBC_DATABASE_URL` | JDBC URL | `jdbc:mysql://localhost:3306/aman_project` |
| `MYSQL_USER` / `DB_USER` | DB user | — (required) |
| `MYSQL_PASSWORD` / `DB_PASSWORD` | DB password | — (required) |

Schema auto-generation (`spring.jpa.hibernate.ddl-auto`) is commented out, so create the
`aman_project` database (and seed the `Role` table) before first run.

### Running

```bash
cd backend
export DB_USER=root DB_PASSWORD=secret
./mvnw spring-boot:run          # http://localhost:8080
./mvnw test                     # tests
./mvnw clean package            # jar in target/
```

Swagger UI is public: `http://localhost:8080/swagger-ui.html`, spec at `/api-docs`.
See `backend/SWAGGER_README.md` for annotation conventions and how to authorize with a
token in the UI.

### API overview

Public:

| Method | Path | Notes |
| --- | --- | --- |
| `POST` | `/api/auth/register` | registers a customer, creates the device + sensors + payment, returns the device QR code |
| `POST` | `/api/auth/login` | `{email, password}` → `{token}` |
| `POST` | `/api/waterquality/send/{deviceId}` | device ingestion: pH, turbidity, temperature, tds, chlorineLevel |
| `GET` | `/api/sensors/getall` | sensor catalog |

Customer (`ROLE_CUSTOMER`), consumed by the mobile app:

| Method | Path |
| --- | --- |
| `GET` | `/api/mobile/user/profile/me` |
| `PUT` | `/api/mobile/user/profile/update` |
| `GET` | `/api/mobile/payments/my` |
| `GET` | `/api/mobile/whaterquality/status/{deviceId}` |
| `GET` | `/api/mobile/whaterquality/daily/raw/{deviceId}?date=YYYY-MM-DD` |
| `GET` | `/api/mobile/whaterquality/daily/curve/{deviceId}?date=YYYY-MM-DD` |

Admin (`ROLE_ADMIN`):

| Method | Path |
| --- | --- |
| `GET/POST/PUT/DELETE` | `/api/customers`, `/api/customers/{id}` |
| `GET/POST/PUT/DELETE` | `/api/devices`, `/api/devices/create`, `/api/devices/update/{id}`, `/api/devices/delete/{id}`, `/api/devices/{id}/status` |
| `POST/PUT/DELETE` | `/api/sensors/create`, `/api/sensors/{id}` |
| `POST/PUT` | `/api/payments`, `/api/payments/{id}/status` |
| `GET` | `/api/dashboard/revenue`, `/devices/active`, `/sales`, `/subscriptions`, `/recent-sales` |

### Water quality status

`WaterQualityDataServiceMobile.evaluateWaterQuality` currently derives the status from TDS
alone — `> 500` → `danger`, `> 300` → `warning`, otherwise `normal`. A fuller multi-metric
rule (pH, turbidity, temperature, TDS, chlorine) is kept commented out in the same method.

---

## Mobile app (`mobile/`)

Expo SDK 53, React Native 0.80, React 19, TypeScript, expo-router, TanStack Query,
Zustand, Formik + Yup, react-native-chart-kit, expo-camera (QR scanning),
AsyncStorage for the token.

### Screens

- `app/onboarding.tsx`, `app/auth/` — login, forgot password, and `scanner.tsx`, which
  reads the device QR code and stores the `deviceId` in the `useDeviceId` Zustand store.
- `app/(tabs)/index/` — current water status for the scanned device.
- `app/(tabs)/statistics/` — daily averages and sensor curves as charts.
- `app/(tabs)/profile/` — profile view and edit.

`app/_layout.tsx` decides the initial route: onboarding → login → tabs, based on the
stored `authToken`.

### API client

`Services/apiClient.js` is an axios instance whose `baseURL` points at the deployed
backend (`https://aman-production-e7eb.up.railway.app/api/`); a commented LAN URL is kept
for local development. A request interceptor attaches `Authorization: Bearer <token>` from
AsyncStorage. Endpoint wrappers live in `Services/userServices.tsx` and
`Services/WaterQualityService.tsx`.

### Running

```bash
make run-mobile        # from the repo root (uses bun)

cd mobile
bun install            # or npm / yarn / pnpm — several lockfiles are committed
bun start              # expo start
bun run ios | android | web
bun run lint
```

---

## IoT (`iot/`)

Empty in this repository — the code runs on the hardware, not here. The station is a
Raspberry Pi connected to an Arduino that carries the TDS sensor. The Pi runs a desktop
app: it is opened on the station, the device QR code is scanned to pair it with the
customer's account, and from then on it streams water-quality readings that the mobile app
shows in real time.

The contract with the API is one request per reading:

```
POST /api/waterquality/send/{deviceId}
{ "pH": 7.2, "turbidity": 1.4, "temperature": 21.5, "tds": 180, "chlorineLevel": 0.4 }
```

The endpoint is public, so the station needs no token. Reproducing this tier means having
the hardware — Raspberry Pi, Arduino, TDS sensor — plus the desktop app, none of which is
part of this repository.

---

## Known rough edges

- The JWT signing key is hard-coded in `security/JwtUtil.java` and tokens expire after one
  hour; move the secret to configuration before any real deployment.
- `AuthService.login` accepts a plain-text stored password and re-hashes it on success — a
  migration helper that should be removed once all rows are BCrypt.
- CORS allows every origin.
- The mobile app has `bun.lock`, `yarn.lock` and `pnpm-lock.yaml` committed; pick one.
- `intarfaces/` and `mobileSevices/` spellings are as-is in the codebase.
