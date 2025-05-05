const { expert, expect } = require('@playwright/test')

export class MoviesPage {

    constructor(page) {
        this.page = page
    }

    async isLoggerIn() {
        //quando todo o trafico de rede finaliza (a requisição acaba, todo trafico de rede ocorrer)
        await this.page.waitForLoadState('networkidle')
        //Verifica se na URL tem a palavra mencionada
        await expect(this.page).toHaveURL(/.*admin/)
    }

}