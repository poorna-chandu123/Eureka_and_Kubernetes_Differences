# Banking UI

Simple Angular UI for the Eureka/Kubernetes banking microservices project.

## Run

```bash
npm install
npm start
```

Open `http://localhost:4200`.

## API response display

Each API operation has a dedicated response section below the form.

- Create Customer: every JSON response property is displayed as a separate read-only field.
- Get Customer: every JSON response property is displayed as a separate read-only field.
- Create Account: every JSON response property is displayed as a separate read-only field.
- Delete/Close Account: displays HTTP status and, for the current backend's 204 response, accountId and CLOSED status because the backend intentionally returns no response body.

The UI also shows a toast message for success and backend/API errors.

The UI does not modify backend APIs.
