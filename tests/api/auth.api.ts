import { APIRequestContext, APIResponse } from '@playwright/test';
import { endpoints } from '../constants/endpoints';
import { users } from '../utils/test.data';
import { BaseApi } from './base.api';

export class AuthApi extends BaseApi {
    constructor(request: APIRequestContext, token?: string) {
        super(request, token);
    }

    async login(username: string, password: string): Promise<APIResponse> {
        return this.request.post(endpoints.login, {
            data: { username, password },
        });
    }

    async loginAsOncologist(): Promise<APIResponse> {
        return this.login(users.oncologist.username, users.oncologist.password);
    }

    async loginAsRadiologist(): Promise<APIResponse> {
        return this.login(users.radiologist.username, users.radiologist.password);
    }

    async logout(): Promise<APIResponse> {
        return this.request.post(endpoints.logout, {
            headers: this.authHeaders(),
        });
    }

    async extractToken(response: APIResponse): Promise<string> {
        const body = await response.json();
        return body.token;
    }
}