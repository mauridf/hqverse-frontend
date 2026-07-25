# HQVerse Frontend

HQVerse is a comic book community platform for discovering, collecting, and reading digitalized HQs (Brazilian comics). Built with Next.js 16, React 19, and Tailwind CSS v4.

## Tech Stack

- **Framework**: Next.js 16.2.11 (Turbopack, App Router)
- **UI**: React 19, Tailwind CSS v4, Lucide Icons
- **State/Data**: Zustand (auth store), TanStack React Query (server state)
- **HTTP**: Axios with automatic token refresh
- **Components**: @base-ui/react (Select, Dialog, RadioGroup)

## Requirements

- Node.js 20+
- Backend API running at `http://localhost:5001` (or set `NEXT_PUBLIC_API_URL`)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server (Turbopack)
npm run dev

# Build for production
npm run build

# Type check
npx tsc --noEmit

# Lint
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── (public)/               # Public routes (publishers, series, issues, scans, search)
│   ├── (auth)/                 # Auth routes (login, register)
│   ├── (protected)/            # Protected routes (dashboard, profile, collections, reading)
│   ├── (admin)/                # Admin routes (admin dashboard, import)
│   └── layout.tsx              # Root layout
├── components/
│   ├── auth/                   # Login/Register forms
│   ├── layout/                 # Navbar, Footer, Sidebar
│   ├── shared/                 # Pagination, Loading, EmptyState
│   └── ui/                     # UI primitives (Button, Card, Dialog, Select, etc.)
├── lib/
│   ├── api/                    # HTTP client (Axios), API endpoints config
│   ├── hooks/                  # Custom hooks (useAuth, useDebounce, useData)
│   ├── services/               # API service classes (publisher, series, issue, etc.)
│   ├── stores/                 # Zustand stores (auth)
│   └── types/                  # TypeScript types (DTOs, API contracts)
```

## Architecture

### Backend Integration

The backend (.NET Clean Architecture at `../HQVerse`) returns DTOs directly — **no `ApiResponse` wrapper**. The Axios httpClient returns the response body as-is.

**Key patterns:**
- `httpClient.get<T>(url)` → returns `T` (the response body)
- Services call `httpClient.get<T>(url)` and return `T`
- Pages use React Query hooks from `useData.ts` which call services
- `PaginatedResult<T>` from backend: `{ items: T[], totalCount, page, pageSize, totalPages, ... }`

### Auth Flow

- JWT tokens stored in localStorage
- Automatic refresh via Axios interceptor
- Auth state managed via Zustand store + React Query

### Data Flow

1. Page calls `useEntity()` hook
2. Hook calls `entityService.method()` 
3. Service calls `httpClient.get/post/etc()`
4. httpClient returns `res.data` (the parsed JSON body)

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Home with stats and latest content |
| `/publishers` | Public | Publisher directory |
| `/publishers/:id` | Public | Publisher detail page |
| `/comic-series` | Public | Comic series directory |
| `/comic-series/:id` | Public | Series detail page |
| `/comic-issues/:id` | Public | Issue detail page |
| `/scans` | Public | Scan groups and latest scans |
| `/search` | Public | Global search |
| `/login` | Public | Login page |
| `/register` | Public | Registration page |
| `/dashboard` | Auth | User dashboard |
| `/profile` | Auth | User profile settings |
| `/collections` | Auth | User collections |
| `/collections/:id` | Auth | Collection detail |
| `/reading` | Auth | Current readings |
| `/admin` | Admin | Admin dashboard |
| `/admin/import` | Admin | Comic Vine import |

## Available Scripts

- `npm run dev` - Start dev server with Turbopack
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5001` | Backend API base URL |
