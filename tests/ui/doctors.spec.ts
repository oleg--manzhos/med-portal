import { expect, test } from '@playwright/test';
import path from 'path';
import { LoginPage } from '../../pages/LoginPage';
import { PatientListPage } from '../../pages/PatientListPage';
import { PatientDetailsPage } from '../../pages/PatientDetailsPage';

test.describe('MedTrack UI checks', () => {
    test('Oncologist can create a clinical note', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const patientListPage = new PatientListPage(page);
        const patientDetailsPage = new PatientDetailsPage(page);

        const noteText = `UI note ${Date.now()}`;

        await loginPage.open();
        await loginPage.loginAsOncologist();

        await patientListPage.expectLoaded();
        await patientListPage.openPatientByIndex(0);

        await patientDetailsPage.expectLoaded();
        await patientDetailsPage.addClinicalNote(noteText);
        await patientDetailsPage.expectNoteVisible(noteText);
    });

    test('Oncologist can create an imaging order', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const patientListPage = new PatientListPage(page);
        const patientDetailsPage = new PatientDetailsPage(page);

        await loginPage.open();
        await loginPage.loginAsOncologist();

        await patientListPage.expectLoaded();
        await patientListPage.openPatientByIndex(0);

        await patientDetailsPage.expectLoaded();
        await patientDetailsPage.createOrder('MRI');
        await patientDetailsPage.expectOrderVisible('MRI');
    });

    test('Radiologist can upload a scan, update metadata, and see chart', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const patientListPage = new PatientListPage(page);
        const patientDetailsPage = new PatientDetailsPage(page);

        const filePath = path.resolve(__dirname, '../../fixtures/tiny-scan.png');

        await loginPage.open();
        await loginPage.loginAsRadiologist();

        await patientListPage.expectLoaded();
        await patientListPage.openPatientByIndex(0);

        await patientDetailsPage.expectLoaded();
        await patientDetailsPage.uploadScan(filePath);
        await patientDetailsPage.updateFirstScanMetadata('12.5', '2026-04-08');
        await patientDetailsPage.expectChartVisible();
    });

    test('Radiologist can add a comment to a scan', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const patientListPage = new PatientListPage(page);
        const patientDetailsPage = new PatientDetailsPage(page);

        const filePath = path.resolve(__dirname, '../../fixtures/tiny-scan.png');
        const commentText = `Radiology comment ${Date.now()}`;

        await loginPage.open();
        await loginPage.loginAsRadiologist();

        await patientListPage.expectLoaded();
        await patientListPage.openPatientByIndex(0);

        await patientDetailsPage.expectLoaded();
        await patientDetailsPage.uploadScan(filePath);
        await patientDetailsPage.addCommentToFirstScan(commentText);

        await expect(page.getByTestId('scan-card').first()).toContainText(commentText);
    });

});