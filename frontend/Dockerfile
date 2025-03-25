# Use an official Node.js runtime as the base image
FROM node:14

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install
RUN npm install cors

# Copy the rest of the React application
COPY . .

# Expose port 3000 for React
EXPOSE 3000

# Start React development server
CMD ["npm", "start"]
