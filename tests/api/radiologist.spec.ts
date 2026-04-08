import { expect, test } from '@playwright/test';
import { AuthApi } from './auth.api';

test.describe('MedTrack API - Radiologist flows', () => {
    async function loginAsRadiologist(request: any): Promise<string> {
        const authApi = new AuthApi(request);
        const loginResponse = await authApi.loginAsRadiologist();
        expect(loginResponse.status()).toBe(200);
        return authApi.extractToken(loginResponse);
    }

    test('radiologist can upload scan via JSON endpoint', async ({ request }) => {
    
    });

    test('radiologist can upload scan, update metadata, and add comment', async ({ request }) => {

    });

    test('invalid scan date should return 400', async ({ request }) => {

    });

    test('negative volume should fail validation', async ({ request }) => {
          });

    test('empty comment should return 400', async ({ request }) => {
     
     
    });

    test('scan operations for unknown patient should return 404', async ({ request }) => {
    
    });

    test('commenting unknown scan should return 404', async ({ request }) => {
    });
});