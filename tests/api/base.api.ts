import { APIRequestContext, APIResponse, expect } from '@playwright/test';

export class BaseApi {
    protected request: APIRequestContext;
    protected token?: string;

    constructor(request: APIRequestContext, token?: string) {
        this.request = request;
        this.token = token;
    }

    setToken(token: string): void {
        this.token = token;
    }

    protected authHeaders(): Record<string, string> {
        return this.token
            ? { Authorization: `Bearer ${this.token}` }
            : {};
    }

    protected async get(url: string): Promise<APIResponse> {
        return this.request.get(url, {
            headers: this.authHeaders(),
        });
    }

    protected async post(url: string, data?: unknown): Promise<APIResponse> {
        return this.request.post(url, {
            headers: this.authHeaders(),
            data,
        });
    }

    protected async put(url: string, data?: unknown): Promise<APIResponse> {
        return this.request.put(url, {
            headers: this.authHeaders(),
            data,
        });
    }

    protected async patch(url: string, data?: unknown): Promise<APIResponse> {
        return this.request.patch(url, {
            headers: this.authHeaders(),
            data,
        });
    }

    protected async delete(url: string): Promise<APIResponse> {
        return this.request.delete(url, {
            headers: this.authHeaders(),
        });
    }

    static async expectJsonField<T = any>(
        response: APIResponse,
        field: string,
        expected: T
    ): Promise<void> {
        const body = await response.json();
        expect(body[field]).toBe(expected);
    }
}