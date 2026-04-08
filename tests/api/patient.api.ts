import { APIRequestContext, APIResponse } from '@playwright/test';
import { endpoints } from '../constants/endpoints';
import { BaseApi } from './base.api';

export class PatientsApi extends BaseApi {
    constructor(request: APIRequestContext, token?: string) {
        super(request, token);
    }

    async getPatients(): Promise<APIResponse> {
        return this.get(endpoints.patients);
    }

    async getPatientById(patientId: number | string): Promise<APIResponse> {
        return this.get(endpoints.patientById(patientId));
    }

    async addNote(
        patientId: number | string,
        text: string
    ): Promise<APIResponse> {
        return this.post(endpoints.patientNotes(patientId), { text });
    }
}