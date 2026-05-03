# syntax=docker/dockerfile:1

# ============================================
# Stage 1: Dependencies
# ============================================
FROM docker.io/oven/bun:1-slim AS deps

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

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

WORKDIR /app

COPY . .
RUN bun run build

# ============================================
# Stage 4: Production (nginx)
# ============================================
FROM docker.io/library/nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=10s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
