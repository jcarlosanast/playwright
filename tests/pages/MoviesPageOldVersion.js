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

    async create(title, overview, company, release_year) {

        await this.page.locator('a[href$="register"]').click()

        //a[href$="register"]
        //a[href*="register"] Utilizando * podemos utilizar pois é una referencia para "Contens"
        
        await this.page.getByLabel('Titulo do filme').fill(title)
        await this.page.getByLabel('Sinopse').fill(overview)

        await this.page.locator('#select_company_id .react-select__indicator')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: company })
            .click()

        await this.page.locator('#select_year .react-select__indicator')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: release_year })
            .click()

        await this.page.getByRole('button',{name: 'Cadastrar'}).click()

    }

    

}