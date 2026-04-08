import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly pageTitle: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByTestId('username-input');
        this.passwordInput = page.getByTestId('password-input');
        this.loginButton = page.getByTestId('login-button');
        this.pageTitle = page.getByTestId('login-title');
        this.errorMessage = page.getByTestId('login-error');
    }

    async open(): Promise<void> {
        await this.page.goto('/');
        await expect(this.pageTitle).toBeVisible();
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async loginAsOncologist(): Promise<void> {
        await this.login('oncologist', 'password');
    }

    async loginAsRadiologist(): Promise<void> {
        await this.login('radiologist', 'password');
    }

    async expectLoginError(message?: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();

        if (message) {
            await expect(this.errorMessage).toContainText(message);
        }
    }
}