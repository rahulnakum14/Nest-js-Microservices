# Use the appropriate Node.js base image
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if applicable)
# RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["npm", "run", "start"]

# FROM node:14

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# CMD ["npm", "run", "start"]
