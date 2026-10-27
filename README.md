# Wish List

A full-stack wishlist app for saving gift ideas and organizing wishes into collections.
The repository contains a Next.js client and an Express API managed as a pnpm workspace.

## Features

- Register and sign in to manage a personal wishlist.
- Create, edit, and delete wishes with product links, images, and prices.
- Organize wishes into collections.
- Browse ideas and copy wishes to your own wishlist.
- Extract product information from a URL.
- Store images in Cloudinary when configured.

## Stack

- **Client:** Next.js App Router, React, TypeScript, TanStack Query, HeroUI, and Tailwind CSS.
- **Server:** Node.js, Express, MongoDB with Mongoose, and JWT authentication.
- **Images:** Sharp and optional Cloudinary storage.
- **Tooling:** pnpm workspaces, ESLint, and Prettier.

## Requirements

- Node.js **22.13.0 or newer**.
- pnpm **8.15.9**, as specified in the root `package.json`.
- A running MongoDB instance, either local or hosted.
- A Cloudinary account if you want to upload images.

## Local setup

Run the following commands from the repository root.

1. Install dependencies:

   ```bash
   pnpm install --frozen-lockfile
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env
   ```

3. Fill in the required values in `.env`:

   - `MONGO_URI`: the connection URI for your MongoDB database.
   - `JWT_SECRET_KEY`: a strong random secret used to sign authentication tokens.

   To enable Cloudinary uploads, also set `CLOUDINARY_CLOUD_NAME`,
   `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Without these values,
   the server keeps supplied image URLs as-is.

   The server reads `.env` from the repository root. This file is ignored by Git;
   keep actual credentials out of tracked files.

4. Start the client and API together:

   ```bash
   pnpm dev
   ```

5. Open [localhost:3000](http://localhost:3000).

The API listens on port **8000** and connects to MongoDB before accepting requests.
The Next.js client forwards `/api` requests through the rewrites in
[`client/next.config.js`](client/next.config.js) to the local API.

## Commands

Run these commands from the repository root:

```bash
pnpm dev                      # Start the client and API in development mode
pnpm run client               # Start only the Next.js development server
pnpm run server               # Start only the API with automatic restarts
pnpm --filter client lint     # Run client ESLint checks
pnpm --filter client typecheck # Generate route types and check TypeScript
pnpm --filter client build    # Check types and build the client
```

To run a built client and the API, use separate terminals:

```bash
pnpm --filter client start    # Requires a successful client build
pnpm start                   # Start the API without automatic restarts
```

The root `test` script is a placeholder and exits with an error.

## Project structure

```text
client/
  app/         Next.js routes, layouts, and providers
  src/
    _pages/    Screen composition and page-specific logic
    widgets/   Larger interface blocks
    features/  User interactions
    entities/  Domain data and components
    shared/    Reusable UI, utilities, and API infrastructure
server/
  config/      Environment and application settings
  routes/      Express API routes
  controllers/ Request handlers
  services/    Business logic and integrations
  models/      Mongoose models
  validators/  Request validation
```

See the [client README](client/README.md) for TypeScript tooling details and
known dependency compatibility limitations.
