repox backend

Minimal Express backend packaged for serverless deployment (AWS Lambda + API Gateway) and for local development.

Quick commands (from the backend/ folder):

- Install dependencies: npm install
- Run locally: npm run start:local
- Use serverless offline during development: npm run dev:offline
- Deploy to AWS (requires AWS credentials configured): npm run deploy

Endpoints:
- GET /health
- GET /hello
