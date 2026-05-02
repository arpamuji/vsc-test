# syntax=docker/dockerfile:1

# ============================================
# Stage 1: Dependencies (layer cache)
# ============================================
FROM oven/bun:1-slim AS deps

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ============================================
# Stage 2: Development (hot reload)
# ============================================
FROM deps AS development

WORKDIR /app

COPY prisma ./prisma
COPY prisma.config.ts ./
COPY src ./src

RUN bun run prisma:generate

EXPOSE 3001

CMD ["bun", "run", "dev"]

# ============================================
# Stage 3: Build
# ============================================
FROM deps AS build

WORKDIR /app

COPY prisma ./prisma
COPY prisma.config.ts ./
COPY src ./src

RUN bun run prisma:generate
RUN bun run build

# ============================================
# Stage 4: Production (slim runtime)
# ============================================
FROM oven/bun:1-slim AS production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./
COPY package.json ./

RUN bun run prisma:generate

EXPOSE 3001

CMD ["bun", "run", "start:prod"]
