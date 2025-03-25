# Dockerizing and Running a Full-Stack React and Node.js App for Book Search Along With MongoDB

Develop Dokerized Web App Using MongoDB as BackEnd Storage 

## Prerequisites

Before proceeding, ensure you have the following installed on your machine:

- **Docker**: To build and run Docker containers.
- **Docker Compose**: For managing multi-container applications.
- **Node.js**: (for local development if needed).
- **Git**: (optional for cloning the project).

## Step 1: Clone the Project (Optional)

If you haven’t already created the project, you can clone it or create it from scratch. Here's the structure of the project:
```
DockerMongoWebApp/
  ├── backend/
  │   ├── server.js
  │   ├── package.json
  │   ├── Dockerfile
  │   └── .dockerignore
  ├── frontend/
  │   ├── src/
  │   ├── public/
  │   ├── package.json
  │   ├── Dockerfile
  │   └── .dockerignore
  ├── docker-compose.yml
  └── README.md
 ```

To create the project from scratch, follow the detailed instructions in the previous message for setting up React and Node.js and adding Docker configuration.

## Step 2: Dockerize the Backend (Node.js + Express)

### 2.1: Backend Dockerfile

In the `backend/` directory, create a `Dockerfile` that describes how to package the backend application:

```
# Use the official Node.js image as the base
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app will run on
EXPOSE 5000

# Command to run the server
CMD ["node", "server.js"]
```



## 2.2: Backend `.dockerignore`
To prevent unnecessary files from being copied into the Docker image, create a .dockerignore file in the backend/ directory.


# Step 3: Dockerize the Frontend (React)
3.1: Frontend Dockerfile
In the frontend/ directory, create a Dockerfile that describes how to package the frontend application:

```
# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose the port the React app will run on
EXPOSE 3000

# Run the React app
CMD ["npm", "start"]
```

## 3.2: Frontend `.dockerignore`
To avoid copying unnecessary files, create a .dockerignore file in the frontend/ directory:

# Step 4: Create the Docker Compose File
The docker-compose.yml file is used to configure and manage both the backend and frontend containers together.

## 4.1: docker-compose.yml
In the root directory of the project, create a docker-compose.yml file that defines both the backend and frontend services:
```
version: '3.8'

services:
  frontend:
    container_name: frontend
    build:
      context: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://backend:5000

  backend:
    container_name: backend
    build:
      context: ./backend
    ports:
      - "5000:5000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=mongodb://booksearch-db:27017/booksearch

  db:
    image: mongo:latest
    container_name: booksearch-db
    volumes:
      - D:\Microservice\WebBookJWT\data\db:/data/db
    ports:
      - "27017:27017"
    restart: no
```
- *Mongo DB at port 27017*

- *Frontend service: Built from the frontend/ directory, exposed on port 3000*.

- *Backend service: Built from the backend/ directory, exposed on port 5000.*
 
 
# Step 5:Connect Mongo DB Using Mongo Shell And Load your Test Data

Download [Mongoshell](https://www.mongodb.com/try/download/shell) and insert data as per below details

```
use booksearch

db.books.insertMany([
	{
		"volumeInfo": {
			"title": "the ultimate story",
			"authors": [
				"kkk"
			],
			"year": 1924,
			"description": "book for thrill story"
		}
	},
	{
		"volumeInfo": {
			"title": "the ultimate story part 2",
			"authors": [
				"kkk"
			],
			"year": 1944,
			"description": "book for thrill story"
		}
	},
	{
		"volumeInfo": {
			"title": "life and beyond",
			"authors": [
				"Dilipo Ghose pk",
				"kk"
			],
			"year": 1994,
			"description": "book for life"
		}
	},
	{
		"volumeInfo": {
			"title": "Beyond Success",
			"authors": [
				"Raj Kishore"
			],
			"year": 1944,
			"description": "book for real life experience"
		}
	}
])


##### If you need to drop Databse 

db.dropDatabase();
```
***The frontend service depends on the backend service, meaning it will wait for the backend to be ready before starting.***

# Step 6: Build and Run the Application Using Docker Compose

## 6.1: Build Docker Images
To build the Docker images for both the frontend and backend, run the following command from the root of the project (where the docker-compose.yml file is located):

- **docker-compose up --build**

*This command will read the docker-compose.yml file, build the images for both the frontend and backend, and start the containers. The --build flag ensures that Docker will rebuild the images if there are any changes in the Dockerfiles or project code.*

## 6.2: Access the Application
Once the containers are up and running, the application will be accessible via:

- **Frontend: http://localhost:3000**

- **Backend API: http://localhost:5000**

The frontend will be able to send requests to the backend at http://localhost:5000/search?q=query.

## 6.3: View Logs
To view logs of the running containers, you can use:

- **docker-compose logs**

 If you want to view logs for a specific service (e.g., frontend or backend):

 - **docker-compose logs frontend**
 - **docker-compose logs backend**

# Step 7: Stopping the Containers
Once you're done working with the application, you can stop the running containers by using the following command:

- **docker-compose down**

This will stop and remove the containers, networks, and volumes associated with the application.

# Step 8: Additional Docker Commands
## 8.1: Rebuild Docker Images
If you make changes to the Dockerfiles or application code and want to rebuild the images, run:

- **docker-compose up --build**

## 8.2: Running Containers in Detached Mode
If you prefer to run the containers in the background (detached mode), use the following command:

- **docker-compose up -d**

*This will allow you to continue using your terminal while the containers run in the background.*