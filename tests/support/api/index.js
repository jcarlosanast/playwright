const { expect } = require('@playwright/test')

export class Api {

    constructor(request) {
        this.request = request
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post('http://localhost:3333/sessions', {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        })

        //Verifica se o resultado esperado da requisição é 200 (OK)
        expect(response.ok()).toBeTruthy()

        //salvar a resposta no formato JSON
        const body = JSON.parse(await response.text())

        //Pega o corpo da responsta
        //Neste caso pegou o token que retornar no reponse
        //Passamos nessa requisção o valor que pode se setado antes da massa recebida
        this.token = 'Bearer ' + body.token

    }

    async getCompanyIdByName(company) {
        await this.setToken()

        const response = await this.request.get('http://localhost:3333/companies', {
            headers: {
                Authorization: this.token,
            },
            params: {
                name: companyName
            }
        })

        expect(response.ok()).toBeTruthy()

        const body = JSON.parse(await response.text())

        return body.data[0].id
    }

    async postMovie(movie) {

        // const companyId = this.getCompanyIdByName(movie.company)

        await this.setToken()

        const response = await this.request.post('http://localhost:3333/movies', {
            headers: {
                Authorization: this.token,
                ContentType: 'mulmultipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                // company_id: companyId,
                company_id: '61830204-ace4-42f1-858d-e522dd52fd71',
                release_year: movie.release_year,
                featured: movie.featured
            }
        })

        expect(response.ok()).toBeTruthy()
    }

}