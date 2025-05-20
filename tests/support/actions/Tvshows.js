const { expert, expect } = require('@playwright/test')

export class Tvshows {

    constructor(page) {
        this.page = page
    }

    async goFormTvShow() {
        await this.page.locator('a[href$="tvshows"]').click()
    }
    
    async registerTvShow() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit() {
        await this.page.getByRole('button', { name: 'Cadastrar' }).click()
    }

    async create(tvshow) {

        await this.goFormTvShow()
        await this.registerTvShow()

        //a[href$="register"]
        //a[href*="register"] Utilizando * podemos utilizar pois é una referencia para "Contens"

        await this.page.getByLabel('Titulo da série').fill(tvshow.title)
        await this.page.getByLabel('Sinopse').fill(tvshow.overview)

        await this.page.locator('#select_company_id .react-select__indicator')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: tvshow.company })
            .click()

        await this.page.locator('#select_year .react-select__indicator')
            .click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: tvshow.release_year })
            .click()

            await this.page.getByLabel('Temporadas').fill(tvshow.seasons)

        await this.page.locator('input[name=cover]')
            .setInputFiles('tests/support/fixtures' + tvshow.cover)

        //IF interessante que verifica um valor esperado e alterado conforme necessidade

        if (tvshow.featured) {
            await this.page.locator('.featured .react-switch').click()
        }

        await this.submit()
    }

    async search(target) {

        await this.goFormTvShow()

        await this.page.getByPlaceholder('Busque pelo nome')
            .fill(target)

        await this.page.click('.actions button')

    }

    async tableHave(content) {

        //necessário colocar o this pois o This está dentro do contexto, dentro da classe movie
        await this.goFormTvShow()
        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(content)
    }

    async alertHaveText(target) {
        await expect(this.page.locator('.alert')).toHaveText(target)
    }

    async remove(title) {

        await this.goFormTvShow()

        //Exemplo de um Xpath para chamar um atributo dentro de um valor - //td[text()="Guerra Mundial Z"]/..//button
        //neste exemplo busco um botão dento de um TD

        await this.page.getByRole('row', { name: title }).getByRole('button').click()

        //esta chamada esta clicando no neste elemento e este elemento é uma classa
        // await page.click('.request-removal')

        await this.page.click('.confirm-removal')

    }

}