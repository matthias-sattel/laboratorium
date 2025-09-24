#!/bin/bash

# Load environment variables from .env file if it exists
if [ -f ".env" ]; then
  echo "Loading environment variables from .env file..."
  while IFS='=' read -r key value; do
    # Skip comments and empty lines
    [[ $key =~ ^#.*$ || -z $key ]] && continue
    # Remove quotes if present
    value=$(echo $value | sed -e 's/^"//;s/"$//' -e "s/^'//;s/'$//")
    # Export the variable
    export "$key=$value"
  done < .env
  
  # Debug: Print the token (remove in production)
  echo "LHCI_PROD_TOKEN is set to: ${LHCI_PROD_TOKEN:0:5}... (first 5 chars)"
fi

# Set variables
LIGHTHOUSE_CI_URL="http://localhost:9001" # Adjust port if needed
MAX_RETRIES=30
RETRY_INTERVAL=2
COMPOSE_FILE="docker-compose.yml" # Update if your file has a different name

# Check if Docker daemon is running
echo "Checking if Docker daemon is running..."
if ! docker info > /dev/null 2>&1; then
  echo "Error: Docker daemon is not running. Please start Docker and try again."
  exit 1
fi

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

echo "Ensuring all dependencies are installed..."
npm install --registry=https://registry.npmjs.org

# Check if LHCI tokens are set
echo "Checking for required environment variables..."
missing_tokens=false

echo "Current working directory: $(pwd)"
echo "Checking if .env file exists: $([ -f ".env" ] && echo "Yes" || echo "No")"

if [ -z "$LHCI_PROD_TOKEN" ]; then
  echo "Warning: LHCI_PROD_TOKEN is not set. This may cause upload failures for production environment."
  missing_tokens=true
else
  echo "LHCI_PROD_TOKEN is set correctly."
fi

if [ "$missing_tokens" = true ]; then
  echo ""
  echo "To set these environment variables, you can:"
  echo "  1. Export them in your shell before running this script:"
  echo "     export LHCI_PROD_TOKEN=your_prod_token"
  echo "  2. Or create a .env file in the project root with these variables"
  echo "  3. Or pass them directly when running the script:"
  echo "     LHCI_PROD_TOKEN=your_prod_token ./run_lighthouse_audit_docker.sh"
  echo ""
  exit 1
fi

echo "Running Lighthouse CI audit..."
# Run the LHCI command using the locally installed CLI via npx with public registry
NPM_CONFIG_REGISTRY=https://registry.npmjs.org npx lhci autorun

# Exit with the status code from the lhci command
exit_code=$?

echo "Lighthouse CI audit completed with exit code: $exit_code"

# Uncomment to automatically tear down containers when done
# echo "Stopping Docker Compose services..."
# docker-compose -f $COMPOSE_FILE down

exit $exit_code