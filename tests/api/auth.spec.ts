import { expect, test } from '@playwright/test';
import { users } from '../utils/test.data';
import { AuthApi } from './auth.api';


test.describe('MedTrack API - Authentication and RBAC', () => {
    test('oncologist login should succeed', async ({ request }) => {
        const authApi = new AuthApi(request);

        const response = await authApi.login(
            users.oncologist.username,
            users.oncologist.password
        );

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.token).toBeTruthy();
    });

    test('radiologist login should succeed', async ({ request }) => {
        const authApi = new AuthApi(request);

        const response = await authApi.login(
            users.radiologist.username,
            users.radiologist.password
        );

        expect(response.status()).toBe(200);

        const body = await response.json();
        expect(body.token).toBeTruthy();
    });

    test('login with invalid credentials should fail', async ({ request }) => {

    });

    test('protected endpoint without token should return 401', async ({ request }) => {
    
    });

    test('protected endpoint with invalid token should return 401', async ({ request }) => {
    
    });

    test('oncologist should be forbidden from radiologist-only endpoints', async ({ request }) => {
    });

    test('radiologist should be forbidden from oncologist-only endpoints', async ({ request }) => {
    });

    test('patient read endpoints are currently public - requirement gap', async ({ request }) => {
    });
});