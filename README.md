# Cloudflare Workers Full-Stack Chat Demo

[![[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mikeschlottig/luminaseo-advanced-technical-seo-performance-dashboard)]](https://deploy.workers.cloudflare.com/?url=${repositoryUrl})

A production-ready full-stack chat application built on Cloudflare Workers. Features a React frontend with shadcn/ui, TanStack Query, and a Hono backend powered by Durable Objects for scalable, stateful entities (Users, Chats, Messages). Supports listing, CRUD operations, pagination, and automatic seed data.

## 🚀 Features

- **Scalable Backend**: Single Durable Object class for multiple entities with automatic indexing and pagination.
- **Real-time Chat**: Per-chat message storage with timestamps and user association.
- **Modern UI**: Tailwind CSS, shadcn/ui components, dark mode, responsive design.
- **Type-Safe**: Full TypeScript end-to-end with shared types.
- **Data Seeding**: Mock users, chats, and messages auto-populate on first run.
- **API-First**: RESTful endpoints for users, chats, and messages (GET/POST/DELETE).
- **Error Handling**: Client/server error reporting and boundaries.
- **Development Ready**: Hot reload, linting, type generation.

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, React Router, Lucide Icons, Sonner (toasts).
- **Backend**: Cloudflare Workers, Hono, Durable Objects (GlobalDurableObject), Bun.
- **Data**: In-memory SQLite via Durable Objects (no external DB needed).
- **Tools**: Wrangler, ESLint, Prettier, Immer, Zod (ready for validation).

## ⚡ Quick Start

1. **Prerequisites**:
   - [Bun](https://bun.sh/) installed.
   - [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and logged in (`wrangler login`).

2. **Clone & Install**:
   ```bash
   git clone <your-repo-url>
   cd <project-name>
   bun install
   ```

3. **Generate Types** (for Workers env):
   ```bash
   bun run cf-typegen
   ```

4. **Development**:
   ```bash
   bun dev
   ```
   - Opens at `http://localhost:3000` (or `$PORT`).
   - Backend APIs at `/api/*`.
   - Edit `src/pages/HomePage.tsx` for UI, `worker/user-routes.ts` + `worker/entities.ts` for backend.

5. **Test APIs**:
   - `GET /api/health` – Health check.
   - `GET /api/users` – List users (seeded).
   - `POST /api/chats` – Create chat.

## 🧪 Usage Examples

### Frontend (React + TanStack Query)
Use `api` helper from `@/lib/api-client`:
```tsx
import { api } from '@/lib/api-client';
import { useQuery, useMutation } from '@tanstack/react-query';

const users = useQuery({
  queryKey: ['users'],
  queryFn: () => api<User[]>('/api/users'),
});

const createChat = useMutation({
  mutationFn: (title: string) => api<Chat>('/api/chats', {
    method: 'POST',
    body: JSON.stringify({ title }),
  }),
});
```

### Backend (Add New Entity)
1. Extend `IndexedEntity` in `worker/entities.ts`.
2. Add routes in `worker/user-routes.ts` using `ok`, `bad` helpers.
3. Shared types in `shared/types.ts`.

## 🔧 Development

- **Scripts**:
  ```bash
  bun dev          # Dev server (frontend + worker proxy)
  bun build        # Production build
  bun lint         # Lint code
  bun preview      # Preview production build
  bun run cf-typegen  # Update Worker types
  ```

- **File Structure**:
  ```
  src/          # React app
  worker/       # Hono + Durable Objects backend
  shared/       # Shared types + mocks
  ```

- **Customization**:
  - UI: Replace `src/pages/HomePage.tsx`, use shadcn components.
  - Backend: Extend `core-utils.ts` entities, add routes to `user-routes.ts`.
  - Styling: `tailwind.config.js`, `src/index.css`.

- **Hot Reload**: Frontend auto-reloads. Worker routes lazy-load in dev.

## ☁️ Deployment

1. **Build & Deploy**:
   ```bash
   bun run deploy
   ```
   - Deploys Worker + static assets to Cloudflare.
   - Assets served from Pages/KV, APIs via Worker.

2. **Configure**:
   - Edit `wrangler.jsonc` for custom domains, env vars.
   - Durable Objects auto-migrate via `migrations`.

3. **Deploy Button**:
   [![[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/mikeschlottig/luminaseo-advanced-technical-seo-performance-dashboard)]](https://deploy.workers.cloudflare.com/?url=${repositoryUrl})

4. **Production URLs**:
   - Frontend: `https://<worker>.<subdomain>.workers.dev`
   - APIs: `/api/*`

## 📚 API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/users` | GET | List users (paginated) |
| `/api/users` | POST | Create user `{ name: string }` |
| `/api/users/:id` | DELETE | Delete user |
| `/api/chats` | GET/POST | List/create chats |
| `/api/chats/:chatId/messages` | GET/POST | List/send messages |
| `/api/health` | GET | Health check |

Full types: `shared/types.ts`.

## 🤝 Contributing

1. Fork & clone.
2. `bun install`.
3. `bun dev` for testing.
4. Submit PRs to `main`.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.

---

Built with ❤️ for Cloudflare Workers. Questions? [Cloudflare Docs](https://developers.cloudflare.com/workers/).