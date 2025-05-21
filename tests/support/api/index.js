require('dotenv').config()

const { expect } = require('@playwright/test')

export class Api {

    constructor(request) {
        this.baseApi = process.env.BASE_API
        this.request = request
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post(this.baseApi+'/sessions', {
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

    async getCompanyIdByName(companyName) {
        const response = await this.request.get(this.baseApi+'/companies', {
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

        const companyId = await this.getCompanyIdByName(movie.company)

        const response = await this.request.post(this.baseApi+'/movies', {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: companyId,
                release_year: movie.release_year,
                featured: movie.featured
            }
        })

        expect(response.ok()).toBeTruthy()
    }

    async postTvshow(tvshow) {

        const companyId = await this.getCompanyIdByName(tvshow.company)

        const response = await this.request.post(this.baseApi+'/tvshows', {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                // title: tvshow.title,
                // overview: tvshow.overview,
                // release_year: tvshow.release_year,
                // company_id: companyId,
                // featured: tvshow.featured,
                // seasons: tvshow.seasons
                title: tvshow.title,
                overview: tvshow.overview,
                release_year: tvshow.release_year,
                company_id: companyId,
                featured: tvshow.featured,
                seasons: tvshow.seasons,

            }
        })

        expect(response.ok()).toBeTruthy()

    }

}