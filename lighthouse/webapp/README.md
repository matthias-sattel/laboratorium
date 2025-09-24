# Lighthouse Integration Test Webapp

This webapp project is used to test lighthouse integration. It's a standard Next.js application with Lighthouse CI integration for auditing performance, SEO, best practices, and accessibility.

## Getting Started

As this is a standard Next.js application, all usual commands can be applied to it in order to build, run, and test the webapp.

## Options for Lighthouse Integration

1. Integration into development with local LHCI
2. Integration into local deployment with local LHCI (Docker)
3. Integration into GitHub pipeline

## Configuration Files

This project uses two different Lighthouse configuration files for different purposes:

1. **lighthouserc-dev.js**: Used for auditing the local development server. This configuration starts the local webapp using `npm start` and then runs audits against it. Use this during development to test changes before deployment.

2. **lighthouserc.js**: Used for auditing the deployed webapp in Docker. This configuration assumes the webapp is already running and accessible at http://localhost:3000. It's used by the Docker-based audit script.

Key differences:
- `lighthouserc-dev.js` includes a `startServerCommand` to launch the app
- `lighthouserc-dev.js` uses `LHCI_TOKEN` for uploading results
- `lighthouserc.js` uses `LHCI_PROD_TOKEN` for uploading results to the same server but as a different project

### Using the Configuration Files

**For local development testing:**
```bash
npm run lhci:audit:dev
```
This command uses the `lighthouserc-dev.js` configuration, starts your local server, and runs audits against it.

**For Docker-based testing:**
```bash
./run_lighthouse_audit_docker.sh
```
This script uses the `lighthouserc.js` configuration to audit the webapp running in Docker.

## Running Lighthouse Audits with Docker

### First-time Setup

1. Make sure Docker is installed and running on your machine
2. Run the setup wizard to create a new project and get your LHCI token:

```bash
npm run lhci:wizard
```

Follow the prompts to set up your project. When complete, you'll receive a token that looks like this: `abcd1234-abcd-1234-abcd-1234abcd1234`

3. Set the environment variables for your tokens:

```bash
export LHCI_TOKEN=your_dev_token
export LHCI_PROD_TOKEN=your_prod_token  # if you have a separate production token
```

Alternatively, you can create a `.env` file in the project root with these variables.

### Running the Audit

Use the provided script to run Lighthouse audits in a Docker environment:

```bash
./run_lighthouse_audit_docker.sh
```

This script will:
1. Check if Docker daemon is running
2. Start the necessary Docker containers
3. Install dependencies
4. Run Lighthouse CI audits against your application
5. Upload results to your Lighthouse CI server (if tokens are configured)

### Development Server

To run the development server without Lighthouse audits:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Recommended Workflow

1. **First Run**: The first time you run `./run_lighthouse_audit_docker.sh`, it will likely fail because you don't have the required tokens.

2. **Setup Project**: After the first run, use the wizard to set up your project and get your tokens:
   ```bash
   npm run lhci:wizard
   ```
   - Select "Create a new project"
   - Follow the prompts to configure your project
   - Save the token that is generated at the end

3. **Set Environment Variables**: You'll need to set up tokens for both configurations:
   ```bash
   # For local development testing (lighthouserc-dev.js)
   export LHCI_TOKEN=your_dev_token_from_wizard
   
   # For Docker-based testing (lighthouserc.js)
   export LHCI_PROD_TOKEN=your_prod_token_from_wizard
   ```
   
   You may need to run the wizard twice to create two separate projects - one for development and one for production testing.

4. **Run Again**: Now run the script again with the token set:
   ```bash
   ./run_lighthouse_audit_docker.sh
   ```

## Troubleshooting

- **Docker Not Running**: Make sure Docker daemon is running before executing the script
- **Missing Tokens**: If you see warnings about missing tokens, follow the instructions to set up your project with `npm run lhci:wizard`
- **Build Failures**: Check the Docker logs for any build errors: `docker-compose logs`
- **Network Issues**: If you're behind a corporate proxy, you may need to configure npm to use the public registry