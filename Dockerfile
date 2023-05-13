# Use an official Node.js runtime as a parent image
FROM node:18-alpine

#Set the working directory
WORKDIR /frontApp

#Copy packages
COPY ["package.json", "package-lock.json*", "./"]

#Install depencdencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["npm", "start"]