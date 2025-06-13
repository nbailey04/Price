# Step 1: Build the Next.js app
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install
RUN npm install

# Copy all files
COPY . .

# Build the Next.js app
RUN npm run build

# Step 2: Create a lightweight production image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules


EXPOSE 3000

# Run Next.js in production mode
CMD ["npx", "next", "start"]
