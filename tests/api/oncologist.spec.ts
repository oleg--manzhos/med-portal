import { expect, test } from '@playwright/test';
import { AuthApi } from './auth.api';
import { PatientsApi } from './patient.api';


test.describe('MedTrack API - Oncologist flows', () => {
    async function loginAsOncologist(request: any): Promise<string> {
        const authApi = new AuthApi(request);
        const loginResponse = await authApi.loginAsOncologist();
        expect(loginResponse.status()).toBe(200);
        return authApi.extractToken(loginResponse);
    }

    test('oncologist can add a clinical note', async ({ request }) => {
        const id = '1';
        const sampleText = 'text';
        const token = await loginAsOncologist(request);
        const patientsApi = new PatientsApi(request, token);

        const addResponse = await patientsApi.addNote(
            id,
            sampleText
        );

        //expect(addResponse.status()).toBe(200);

        const patientResponse = await patientsApi.getPatientById(id);

        expect(patientResponse.status()).toBe(200);
        const patient = await patientResponse.json();

        expect(JSON.stringify(patient)).toContain(sampleText);
    });

    test('oncologist can create MRI order', async ({ request }) => {
    
    });

    test('oncologist can create CT order', async ({ request }) => {
    
    });

    test('creating order for unknown patient should return 404', async ({ request }) => {

    });
});