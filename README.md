# EstateFlow

A real estate platform for Pakistan, built as a readable Spring Boot modular monolith and a separate React application. **Phase 1 only is implemented.**

The root of this checkout (`EstateX`) is the project root; no extra `estateflow/` wrapper directory is needed.

## What works today

- Responsive, Cutora-inspired login UI with architectural poster/video, sequenced entrance animation, accessible controls, and reduced motion/data handling.
- Public homepage shell: hero, search controls, editorial city cards, property type links, agency call to action, and footer.
- Real frontend routes for home, login, property discovery preview, agent onboarding preview, privacy/terms notices, and a missing-page screen.
- Search navigation preserves city, purpose, and property type in the URL. It does **not** query properties yet.
- Axios with credentials and a session-bound CSRF header, TanStack Query backend availability checks, toasts, and lazy-loaded secondary pages.
- Spring Boot setup, five JPA entities, enums, Bean Validation, MySQL constraints/indexes, and a Flyway initial migration.
- Secure default HTTP-only session configuration, exact-origin CORS, CSRF protection, centralized problem responses, and deny-by-default endpoint access.

**Google OAuth, registration, authenticated users, property APIs, uploads, dashboards, and admin operations are not implemented.** The Google button explains this instead of pretending to sign in. There are no seeded users, properties, statistics, or production credentials. Featured listings show a clear foundation state.

## Structure and files

```text
EstateX/
├── frontend/
│   ├── public/favicon.svg
│   ├── src/
│   │   ├── api/client.ts
│   │   ├── assets/cities.ts
│   │   ├── components/{auth,common,layout,property}/
│   │   ├── hooks/useSystemStatus.ts
│   │   ├── pages/{auth,public}/
│   │   ├── styles/index.css
│   │   ├── test/setup.ts
│   │   ├── config.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── .env.example
│   ├── package.json / package-lock.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── backend/
│   ├── .mvn/wrapper/ / mvnw / mvnw.cmd
│   ├── pom.xml
│   ├── application-example.properties
│   └── src/
│       ├── main/java/com/estateflow/
│       │   ├── EstateFlowApplication.java
│       │   ├── common/BaseEntity.java
│       │   ├── config/{SecurityConfig,SystemController}.java
│       │   ├── auth/CsrfController.java
│       │   ├── user/model/
│       │   ├── agent/model/
│       │   ├── property/model/
│       │   ├── media/model/
│       │   ├── installment/model/
│       │   └── exception/GlobalExceptionHandler.java
│       ├── main/resources/application.properties
│       ├── main/resources/db/migration/V1__initial_schema.sql
│       └── test/java/com/estateflow/
├── docs/{ARCHITECTURE,MEDIA,VALIDATION}.md
├── .env.example
├── .gitignore
└── docker-compose.yml
```

Business controllers, services, repositories, and dashboard folders will be added with their features. Empty layers are deliberately not generated. All files are new because the repository was empty.

See [the full file inventory](docs/FILES.md) for every created project file. Git is initialized locally; no files are staged or committed.

## Requirements

- **Java 21 LTS JDK**, with `JAVA_HOME` pointing to it.
- Node.js **22.12+** (Node 24 LTS recommended) and npm.
- MySQL **8.0.16 or newer in the 8.0 series**, because the migration uses enforced CHECK constraints. The Compose image is pinned to 8.0.46, matching the installed version used for verification.
- Docker Compose, if using the optional local database container. Maven is supplied by the Maven Wrapper.

Spring Boot **3.5.16** was selected from the maintained 3.x line to match the requested conventions; [its documented Java compatibility includes Java 21](https://docs.spring.io/spring-boot/3.5/system-requirements.html). Frontend packages were resolved from stable npm tags, installed without peer conflicts, and locked. See [Vite's Node requirements](https://vite.dev/guide/).

| Area | Dependencies |
| --- | --- |
| UI and routing | React, Vite, TypeScript, Tailwind CSS, React Router, Motion for React, Lucide React, Sonner |
| API state | Axios, TanStack Query |
| Installed for later forms/carousels | React Hook Form, Zod, Hook Form resolvers, Embla Carousel |
| Backend | Spring Web MVC, Security, OAuth2 Client (not configured yet), Data JPA/Hibernate, Bean Validation |
| Persistence | MySQL Connector/J, Flyway Core and MySQL support |
| Tests | Vitest, React Testing Library, jest-dom, jsdom; JUnit 5, Mockito, Spring Boot Test, Spring Security Test |

Exact frontend versions are in `frontend/package.json` and the lockfile. Spring Boot manages compatible backend dependency versions through its parent POM. Cloudinary's SDK will be added when real uploads are implemented.

## Start locally (PowerShell)

From the repository root:

```powershell
Copy-Item .env.example .env
# Edit .env with your own local passwords before starting MySQL.
docker compose up -d mysql
docker compose ps
```

If you already run MySQL on port 3306, use it instead of Compose. Have its administrator create an empty `estateflow` database with `utf8mb4` and a dedicated `estateflow` user authorized only for that database. Do not point the app at an unrelated existing database. The existing local MySQL service was not changed during development.

Backend, in a new terminal:

```powershell
Set-Location backend
# Enter the SAME dedicated user/password configured for MySQL.
$env:DB_URL='jdbc:mysql://localhost:3306/estateflow?connectionTimeZone=UTC'
$env:DB_USERNAME='estateflow'
$env:DB_PASSWORD='<your-local-database-password>'
.\mvnw.cmd spring-boot:run
```

Flyway migrates automatically before Hibernate validates the mappings. **Starting Spring Boot is also the local migration command.** No separate Flyway CLI is required. It fails startup on a database/migration mismatch. Never edit an applied migration; add `V2__...sql` instead.

Frontend, in another terminal:

```powershell
Set-Location frontend
Copy-Item .env.example .env.local
npm ci
npm run dev
```

Open [the homepage](http://localhost:5173/) or [login preview](http://localhost:5173/login). The backend normally listens on port 8080 and MySQL on port 3306. Use `localhost` consistently in your browser during session development. On macOS/Linux use `./mvnw` and `export NAME=value` instead of PowerShell syntax.

If 8080 is already occupied, do not stop an unrelated application. Set `$env:SERVER_PORT='8081'` for the backend and set `BACKEND_PROXY_TARGET=http://localhost:8081` in `frontend/.env.local`, then restart Vite. This alternative was used for live verification on this machine.

The backend requires a configured database to start. The frontend remains usable as a clearly labeled UI preview when the backend is unavailable.

## Tests and production builds

```powershell
# frontend/
npm test
npm run build
npm run preview

# backend/
.\mvnw.cmd test
.\mvnw.cmd verify
```

Normal backend tests do not need MySQL; database integration tests are explicitly skipped. To run **all** tests, create an empty disposable database whose name ends in `_test`, grant a dedicated test user access, then run:

```powershell
$env:RUN_MYSQL_TESTS='true'
$env:DB_URL='jdbc:mysql://localhost:3306/estateflow_test?connectionTimeZone=UTC'
$env:DB_USERNAME='estateflow_test'
$env:DB_PASSWORD='<your-test-database-password>'
.\mvnw.cmd verify
```

Flyway changes the selected database. Never enable integration tests against production or a database with business records. Test fixtures roll back automatically, while the schema and migration history remain. Clear `RUN_MYSQL_TESTS` from your shell afterward if returning to a non-test database.

Outputs are `frontend/dist/` and `backend/target/estateflow-0.1.0-SNAPSHOT.jar`. To start the packaged backend with the same environment variables:

```powershell
java -jar backend/target/estateflow-0.1.0-SNAPSHOT.jar
```

Production hosting must serve `index.html` for client routes such as `/login`, and proxy `/api`, `/oauth2`, and `/login/oauth2` to Spring Boot. Configure HTTPS, `SESSION_COOKIE_SECURE=true`, and the real `FRONTEND_ORIGIN`. Deployment itself is a later phase.

## Configuration

Spring reads environment variables; it does **not** automatically read the root `.env`. Compose reads the root `.env`. Vite reads `frontend/.env.local`; restart it after changing environment values. Alternatively copy `backend/application-example.properties` to `backend/src/main/resources/application-local.properties` and activate the `local` Spring profile.

| Variable | Required now | Default / use |
| --- | --- | --- |
| `DB_PASSWORD` | Yes | No fallback; database user's password |
| `DB_URL` | For custom database | `jdbc:mysql://localhost:3306/estateflow?connectionTimeZone=UTC` |
| `DB_USERNAME` | For custom user | `estateflow` |
| `SERVER_PORT` | No | `8080` |
| `FRONTEND_ORIGIN` | No locally | `http://localhost:5173`; one exact permitted origin |
| `SESSION_COOKIE_SECURE` | Yes in production | `false` locally, `true` with HTTPS |
| `MYSQL_DATABASE`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_ROOT_PASSWORD` | With Compose | Set in root `.env` |
| `VITE_BRAND_NAME` | No | `EstateFlow` |
| `VITE_API_BASE_URL` | No | `/api/v1` |
| `BACKEND_PROXY_TARGET` | No | `http://localhost:8080`; Vite development proxy only |
| `VITE_HERO_POSTER_URL`, `VITE_HERO_VIDEO_URL` | With replacement media | Licensed remote/self-hosted URLs |
| `VITE_USE_REFERENCE_MEDIA` | Review before production | `true` in local preview; set `false` to stop reference fallbacks |
| `RUN_MYSQL_TESTS` | For database tests only | Tests run only when exactly `true` |

Every `VITE_` value is public browser configuration. Never put secrets there. Future `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` are documented placeholders, **not wired integrations**.

## Implemented endpoints

| Method | Endpoint | Behavior |
| --- | --- | --- |
| GET | `/api/v1/system/status` | Reports Phase 1 and disabled auth/property capabilities |
| GET | `/api/v1/auth/csrf` | Creates/uses an anonymous HTTP session; returns token/header name; `Cache-Control: no-store` |

Unknown/protected requests return a security error, including all property paths. All security errors and MVC failures use Spring Problem Detail JSON; field validation responses include an `errors` mapping. CSRF stays enabled. There is no Basic authentication, generated local user, password form, or enabled OAuth provider. Session authentication and logout will be implemented in Phase 2.

## Phase 2

Implement Google OAuth client configuration and success/failure handling, validated Google identity persistence, authenticated sessions, `/auth/me`, CSRF-aware logout, agent onboarding DTO/service/repository flows, role guards, suspension enforcement, and tests. Neither request bodies nor Google claims may grant `SUPER_ADMIN`. Refresh the frontend's capability handling when OAuth actually works; enabling a flag alone is not an implementation.

Property CRUD, Cloudinary, ownership checks, installment editing, and dashboard records belong to Phase 3. Public property Specifications, pagination, filters, DTOs, details, and contact links belong to Phase 4. Admin and deployment follow later.

Read [the architecture guide](docs/ARCHITECTURE.md), [media provenance](docs/MEDIA.md), and [verification report](docs/VALIDATION.md) before extending this foundation.
