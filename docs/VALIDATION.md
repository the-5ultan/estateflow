# Phase 1 verification

Verified locally on 26 October 2026 (Asia/Karachi).

## Results

| Check | Result |
| --- | --- |
| Frontend dependency installation | Passed; no peer conflicts; npm reported 0 known vulnerabilities at installation |
| TypeScript + Vite production build | Passed; secondary pages are separate chunks |
| Frontend tests | 5 passed across 3 files |
| Backend build with database tests enabled | 14 passed, 0 skipped; executable Spring Boot JAR produced |
| Maven Wrapper | Pinned Maven 3.9.11 downloaded and ran; offline `verify` passed with database tests correctly skipped when not enabled |
| Flyway on real MySQL | V1 applied to an empty isolated database; subsequent startup validated the checksum and found it current |
| Hibernate schema validation | All five entity mappings validated against real MySQL 8.0.46 |
| Database constraints | Independent PRIVATE/SOLD/PARTIAL values accepted; duplicate covers and unbalanced installments rejected |
| Live API | Status endpoint returned phase 1 and false authentication/property capabilities |
| Live session/CSRF | Token endpoint returned 200 and `no-store`; session cookie was HTTP-only; mutation without token returned 403 |
| Live protected request | Anonymous agent-property request returned 401 |
| Vite API proxy | Passed against local backend on port 8081 |
| Browser search interaction | City/type selected and preserved in URL and destination controls |
| Desktop login | Visually reviewed at supplied 1672 × 941 size |
| Mobile portrait | Reviewed at 390 × 844; image visible, login below hero, vertical scrolling, no mounted video or horizontal overflow |
| Mobile landscape | Reviewed at 844 × 390; compact columns, vertical scrolling, no horizontal overflow |
| Homepage | Desktop/mobile structure reviewed; all four replacement city image URLs returned HTTP 200 |

## Environment details and limits

The machine supplies Node 24.22.1, npm 12.2.1, and a JetBrains Java 25.0.4 runtime with compilation tools. Maven compiled with `release=21`; generated class-file major version **65** confirms the Java 21 target. Builds and runtime smoke tests ran on Java 25, **not on an actual Java 21 runtime**. Java 21 remains the project's configured/recommended JDK; repeat CI verification on Java 21 before deployment.

The existing MySQL80 Windows service on port 3306 was left unchanged. Database verification used a separate MySQL 8.0.46 process, workspace-local data directory, port 3307, and the disposable `estateflow_phase1_test` database. Test fixture rows roll back; no production data was seeded. The isolated database process is stopped after verification. Its ignored files remain under `.tools/` for local diagnostic purposes.

Port 8080 was occupied by another application, so the packaged EstateFlow backend was tested on loopback port 8081. `frontend/.env.local` contains an ignored local proxy override for 8081; the committed example defaults to 8080. The temporary frontend/backend verification servers are shut down after the checks. Use the README commands to start your own persistent development environment.

Docker Compose could not be executed because Docker was not available on PATH/running for this session. The real installed MySQL server binary was used instead. The official MySQL 8.0.46 image tag was checked in Docker Hub; Compose container startup and its health check are **not runtime-verified**.

The supplied hero poster loaded in browser review. Video mounting is conditional on viewport and connection preferences; desktop autoplay playback was not verified in this browser session. Its configured behavior is implemented in `HeroMedia.tsx`; browsers can deny autoplay or trigger the poster-only path. No claim is made that video will autoplay on every device.

Google OAuth, authenticated session identity, onboarding, visibility query filters, ownership checks, media uploads, and business API tests are intentionally absent until their implementation phases. The database connection **was tested**; Google sign-in **was not implemented or verified**. This foundation has not been deployed or audited as a production marketplace. Reference-media production rights remain unverified.

## Repeating the checks

See [README.md](../README.md) for standard commands, the integration-test opt-in, required database variables, and the port-conflict alternative. Backend security/unit tests run without a database. The database suite needs an explicitly selected empty test database; Flyway will migrate it on startup.

The `.tools/` directory and all build outputs are ignored. It includes temporary package tooling, Maven cache, build logs, isolated database data, and screenshots created during this session. None is required to build the project using the documented Java/Node/MySQL prerequisites.
