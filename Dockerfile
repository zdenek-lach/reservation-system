# Use an official Node.js runtime as the base image
FROM node:20.11.1-bookworm

# Set the working directory in the container
WORKDIR /frontend

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the project code into the container
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the React app will run on
EXPOSE 8001

# Define the command to run when the container starts
CMD [ "npm", "start" ]