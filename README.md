## Running instructions

## UI tests
These tests expect the original app to be running:
- frontend at `http://localhost:5173`
- backend at `http://localhost:8000`

```bash
cd ui-tests
npm install
npx playwright install
npx playwright test
```