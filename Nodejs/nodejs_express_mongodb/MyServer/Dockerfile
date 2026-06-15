# Use official Node image
FROM node:18

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy source
COPY . .

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "start"]
