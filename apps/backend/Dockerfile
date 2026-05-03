# syntax=docker/dockerfile:1

# ============================================
# Stage 1: Dependencies (layer cache)
# ============================================
FROM docker.io/oven/bun:1-slim AS deps

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

RUN DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy bun run prisma:generate

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

RUN DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy bun run prisma:generate
RUN bun run build

# ============================================
# Stage 4: Production (slim runtime)
# ============================================
FROM docker.io/oven/bun:1-slim AS production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/prisma.config.ts ./
COPY package.json ./

RUN DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy bun run prisma:generate

USER bun

EXPOSE 3001

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s \
  CMD bun -e "await fetch('http://localhost:3001/api/health')"

CMD ["bun", "run", "start:prod"]
