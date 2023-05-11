FROM node:18-alpine AS deps

ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:18-alpine AS builder

ENV NODE_ENV=production

WORKDIR /app

COPY next.config.js ./
COPY tsconfig.json ./
COPY package.json yarn.lock ./
COPY --from=deps /app/node_modules ./node_modules

COPY public ./public
COPY src ./src

RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]



# FROM node:18-alpine
# WORKDIR /app

# ENV NODE_ENV production
# ENV NEXT_TELEMETRY_DISABLED 1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs

# COPY .next ./.next
# COPY package.json package-lock.json ./
# COPY .pnpm-store ./.pnpm-store

# RUN npm install -g pnpm  && \
#     pnpm install --save

# USER nextjs

# EXPOSE 3000

# ENV PORT 3000

# CMD ["npm", "start"]
