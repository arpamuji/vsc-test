# syntax=docker/dockerfile:1

# ============================================
# Stage 1: Dependencies
# ============================================
FROM oven/bun:1-slim AS deps

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ============================================
# Stage 2: Development (HMR)
# ============================================
FROM deps AS development

WORKDIR /app

COPY . .

EXPOSE 5173

CMD ["bun", "run", "dev"]

# ============================================
# Stage 3: Build
# ============================================
FROM deps AS build

WORKDIR /app

COPY . .
RUN bun run build

# ============================================
# Stage 4: Production (nginx)
# ============================================
FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
