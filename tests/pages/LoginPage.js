const { expert, expect } = require('@playwright/test')

export class LoginPage {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expect(loginForm).toBeVisible()
    }

    async submit(email, passaword) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(passaword)
        await this.page.getByText('Entrar').click()
    }

    async isLoggerIn() {
        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)
    }

}