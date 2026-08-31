# CZK Live Exchange Rates

A small React + TypeScript single-page app that shows the Czech National Bank's
daily exchange rates and converts an amount from CZK into any listed currency.

## Tech stack

- React 18 + TypeScript, built with Vite
- TanStack Query for data fetching and caching
- styled-components for styling
- react-hook-form for the converter form
- Vitest + Testing Library for tests
- ESLint (flat config) + Prettier

## Prerequisites

- Node.js 20+
- npm 10+

## Quick start

```bash
npm install
npm run dev
```

The dev server prints a local URL (default http://localhost:5173). Rate data is
fetched from the Czech National Bank; the Vite dev server proxies those requests
so you do not hit CORS locally.

## Configuration

Copy `.env.example` to `.env` if you need to override defaults:

- `VITE_API_BASE_URL` — origin for the CNB API. Leave empty (default) to use the
  dev-server / nginx proxy. Only set it if you have a CORS-enabled endpoint.

No API keys are required; the CNB endpoint is public.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — type-check and produce a production build in `dist/`
- `npm run preview` — serve the production build locally
- `npm run typecheck` — run `tsc --noEmit`
- `npm run lint` — run ESLint
- `npm run format` / `npm run format:check` — apply / verify Prettier
- `npm test` — run the Vitest suite

## Docker

The included multi-stage `Dockerfile` builds the app and serves it with
`nginx-unprivileged` (non-root, port 8080). nginx reverse-proxies the CNB API so
the container works without CORS issues.

```bash
docker build -t czk-rates .
docker run --rm -p 8080:8080 czk-rates
# open http://localhost:8080
```

## Architecture

- `src/main.tsx` — entry point; mounts the app with `QueryClientProvider` and the
  currency-rate context provider.
- `src/api/currencyApi.ts` — axios call to the CNB daily-rates text feed.
- `src/service/currencyService.ts` — parses the pipe-delimited feed into typed
  `ICurrencyRate` records.
- `src/context/currencyRateContext.tsx` — shares the fetched rates across
  components.
- `src/component/CurrencyTable.tsx` — fetches rates via TanStack Query and renders
  them; pushes results into the context.
- `src/component/CurrencyForm.tsx` — converts a CZK amount into the selected
  currency using the shared rates.
