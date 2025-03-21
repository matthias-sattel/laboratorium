#!/bin/bash

# Set variables
LIGHTHOUSE_CI_URL="http://localhost:9001" # Adjust port if needed
MAX_RETRIES=30
RETRY_INTERVAL=2
COMPOSE_FILE="docker-compose.yml" # Update if your file has a different name

echo "Starting Docker Compose services..."
docker-compose -f $COMPOSE_FILE up -d

echo "Waiting for Lighthouse CI server to be ready..."
retries=0
while [ $retries -lt $MAX_RETRIES ]; do
  if curl -s -o /dev/null -w "%{http_code}" $LIGHTHOUSE_CI_URL | grep -q "2[0-9][0-9]\|3[0-9][0-9]"; then
    echo "Lighthouse CI server is ready!"
    break
  else
    retries=$((retries+1))
    echo "Waiting for Lighthouse CI server... (Attempt $retries/$MAX_RETRIES)"
    sleep $RETRY_INTERVAL
    
    # Check if containers are running properly
    if [ $((retries % 5)) -eq 0 ]; then
      echo "Checking container status:"
      docker-compose -f $COMPOSE_FILE ps
    fi
  fi
done

if [ $retries -eq $MAX_RETRIES ]; then
  echo "Timed out waiting for Lighthouse CI server to become available."
  echo "Container logs:"
  docker-compose -f $COMPOSE_FILE logs
  exit 1
fi

echo "Running Lighthouse CI audit..."
# Run the LHCI command - adjust this to match your specific needs
lhci autorun

# Exit with the status code from the lhci command
exit_code=$?

echo "Lighthouse CI audit completed with exit code: $exit_code"

# Uncomment to automatically tear down containers when done
# echo "Stopping Docker Compose services..."
# docker-compose -f $COMPOSE_FILE down

exit $exit_code