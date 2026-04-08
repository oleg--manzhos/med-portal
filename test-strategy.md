# MedTrack Portal - Testing Strategy

## Testing definitions

Highest-risk areas of the system:

1. Authentication and RBAC correctness.
2. Persona-specific business workflows.
3. UI smoke layer to validate key end-to-end scenarios.

Since business logic and access control are enforced on the backend, the majority of testing should be performed at the API level. 
UI testing should be limited to validating critical user journeys.

Thus, the Cohn's pyramid approach for test balancing will be used.

## Risk-based observations

RBAC represents a core business and security requirement. It must be thoroughly validated.

## Test scope and priorities

### P1 - must have

#### API

* Successful login for both personas.
* Login failure with invalid credentials.
* 401 response for protected endpoints without a token.
* 403 response when an oncologist accesses radiologist-only endpoints.
* 403 response when a radiologist accesses oncologist-only endpoints.
* Oncologist can add a clinical note.
* Oncologist can create an order.
* Radiologist can upload a scan.
* Radiologist can update scan volume and date.
* Radiologist can add a comment to a scan.
* 404 response for invalid patient or scan IDs.
* Validation errors for empty fields and invalid data.

#### UI

Since both the oncologist and the radiologist have access to patinet data, the testing of their different behavior with the patient should be tested:

* Login as oncologist and create a note.
* Login as radiologist and update a scan to trigger chart display.

### P2 - nice to have - out of scope

* Search and pagination.
* Logout functionality.
* Verification that UI does not expose unauthorized actions.
* Network contract validation from UI tests.

### P3 - out of scope 

* Visual testing.
* Accessibility audit.
* Cross-browser testing.

## 4. Proposed test pyramid

* ~80% API/service tests.
* ~20% UI end-to-end smoke tests.

This distribution reflects the fact that core logic and access control are implemented on the backend.

## 5. Suggested automation approach

Playwright with TypeScript should be used.

### API layer

Rationale:

* Fast execution and feedback.
* Well-suited for validating authentication, RBAC, and business logic.

### UI layer

Rationale:

* The frontend is implemented in TypeScript.
* A minimal smoke test layer is sufficient for the thin UI layer.

## 6. Data strategy

Due to the use of a global mutable store:

* The state (`store.patients`, `store.users`, `session_manager.sessions`) must be reset before each test.
* Creating new entities should be preferred over asserting absolute counts.
* UI tests should rely on known seed data and validate observable changes rather than fixed totals.

## 7. Representative test matrix

### Authentication

* Valid oncologist login: 200 + token.
* Valid radiologist login: 200 + token.
* Invalid password: 401.
* Malformed Bearer header: 401.
* Invalid session token: 401.

### Authorization / RBAC

* Oncologist → allowed: note creation, order creation.
* Oncologist → forbidden: scan upload, metadata update, comments.
* Radiologist → forbidden: note creation, order creation.
* Unauthenticated access to protected endpoints → 401.

### Validation / negative

* Empty note → 400.
* Empty comment → 400.
* Invalid scan date → 400.
* Negative volume → 422.
* Missing file/base64 in scan upload → 400.
* Unknown patient → 404.
* Unknown scan → 404.

## 8. Defects identified during execution

1. Radiologist can't login on the first run of the app. The oncologist should be logges first.
2. Comments are annonymouse, not traceble by the persole, only by doctor's role

## 9. Deliverables

* `TEST_STRATEGY.md` test strategy description
* tests 
* `README.md` with execution instructions