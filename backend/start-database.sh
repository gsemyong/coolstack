#!/bin/bash

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Starting Docker..."
    
    # Try to start Docker based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open -a Docker
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        sudo systemctl start docker
    else
        echo "Could not automatically start Docker. Please start Docker manually."
        exit 1
    fi

    # Wait for Docker to start
    echo "Waiting for Docker to start..."
    while ! docker info > /dev/null 2>&1; do
        sleep 1
    done
    echo "Docker is now running"
fi

# Check if container is already running
if [ "$(docker ps -q -f name=taskill-postgres)" ]; then
    echo "PostgreSQL container is already running"
    # Get the port the container is running on
    PORT=$(docker port taskill-postgres 5432/tcp | cut -d ':' -f 2)
    DATABASE_URL="postgresql://postgres:postgres@localhost:$PORT/taskill"
    echo "Using existing PostgreSQL on port $PORT"
else
    # Generate a random port between 5432 and 5532
    # Using $RANDOM instead of shuf for better compatibility
    PORT=$(( RANDOM % 101 + 5432 ))

    # Check if stopped container exists and remove it
    if [ "$(docker ps -aq -f name=taskill-postgres)" ]; then
        docker rm -f taskill-postgres
    fi

    # Start PostgreSQL container with latest version
    docker run --name taskill-postgres \
        -e POSTGRES_USER=postgres \
        -e POSTGRES_PASSWORD=postgres \
        -e POSTGRES_DB=taskill \
        -p $PORT:5432 \
        -d postgres:latest

    # Wait for PostgreSQL to start
    echo "Waiting for PostgreSQL to start..."
    sleep 3
    
    echo "PostgreSQL is running on port $PORT"
fi

# Create or update .env file
ENV_FILE=".env"
DATABASE_URL="postgresql://postgres:postgres@localhost:$PORT/taskill"

if [ -f "$ENV_FILE" ]; then
    # Update existing DATABASE_URL
    if grep -q "^DATABASE_URL=" "$ENV_FILE"; then
        sed -i.bak "s|^DATABASE_URL=.*|DATABASE_URL=\"$DATABASE_URL\"|" "$ENV_FILE"
        rm "$ENV_FILE.bak"
    else
        echo "DATABASE_URL=\"$DATABASE_URL\"" >> "$ENV_FILE"
    fi
else
    # Create new .env file
    echo "DATABASE_URL=\"$DATABASE_URL\"" > "$ENV_FILE"
fi

echo "DATABASE_URL has been set to: $DATABASE_URL"
