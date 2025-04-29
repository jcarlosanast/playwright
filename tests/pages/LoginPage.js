const { expert } = require('@playwright/test')

export class LoginPage {

    constructor(page) {
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/admin/login')

        const loginForm = this.page.locator('.login-form')
        await expert(loginForm).toBeVisible()
    }

    async submit(email, passaword) {
        await this.page.getByPlaceholder('E-mail').fill(email)
        await this.page.getByPlaceholder('Senha').fill(passaword)
        await this.page.getByText('Entrar').click()
    }

    async isLoggerId() {
        await this.page.waitForLoadState('networkidle')
        await expert(this.page).toHavenURL(/.*admin/)
    }

}