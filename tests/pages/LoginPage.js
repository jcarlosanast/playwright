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

        //exemplo de uma forma passando todo o xpath do caminho
        //await this.page.locator('//button[text()]="Entrar"]').click()
        //forma simplificada pegando o xPath
        await this.page.getByText('Entrar').click()
    }

    async isLoggerIn() {
        //quando todo o trafico de rede finaliza (a requisição acaba, todo trafico de rede ocorrer)
        await this.page.waitForLoadState('networkidle')
        //Verifica se na URL tem a palavra mencionada
        await expect(this.page).toHaveURL(/.*admin/)
    }

}