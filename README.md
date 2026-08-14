# TEG#B — Playwright Final Project

Certification project for **Playwright Academy**: automated tests of the TEG#B banking demo app, written in **TypeScript with Playwright**.

## Test types

| Folder | Type | Description |
|---|---|---|
| `tests/atomic` | Atomic UI | Element-level checks of the dashboard (header, sidebar, profile, accounts) |
| `tests/e2e` | End-to-end | Full registration flow through the UI |
| `tests/api` | API | Login endpoint tests via `APIRequestContext` |
| `tests/ddt` | Data-driven | Account creation via API for multiple data sets + UI verification |
| `tests/visual` | Visual | Screenshot comparison of the profile detail section |

## Project structure

```
src/
├── api/            # API client (register, login, create account)
├── assets/         # DDT data, text dictionary
├── config.ts       # Backend base URL
└── pages/tegb/     # Page Object Model (login, registration, dashboard + sections)
tests/              # Test specs by type
```

## Setup

```bash
npm install
npx playwright install
```

Create a `.env` file (see `.env.example`):

```
TEGB_USERNAME=your_username
TEGB_PASSWORD=your_password
```

The user must already exist in TEG#B — register via the UI or the API first.

## Running tests

```bash
npm test                     # all tests, chromium
npx playwright test --ui     # interactive UI mode
npx playwright test tests/e2e
```

## Tech stack

- Playwright + TypeScript
- Page Object Model
- Faker (test data)
- dotenv (credentials)
- ESLint + Prettier
