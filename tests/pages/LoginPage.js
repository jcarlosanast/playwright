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

    async alertEmailHaveText(text){
        const alert = this.page.locator('.email-alert')
        await expect(alert).toHaveText(text)
    }

    async alertPassworkHaveText(text){
        const alert = this.page.locator('.password-alert')
        await expect(alert).toHaveText(text)
    }

    //forma simplificada de utilizando expressão regular onde posso utilizar uma palavra chave e substituir os metodos de e-mail e senha e usar um genérico
    async alertHaveText(text){
        const alert = this.page.locator('span[class$=alert]')
        await expect(alert).toHaveText(text)
    }

    

}