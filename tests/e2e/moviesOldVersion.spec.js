const { test } = require('@playwright/test')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

const { LoginPage } = require('../pages/LoginPageOldVersion')
const { MoviesPage } = require('../pages/MoviesPageOldVersion')
const { Toast } = require('../pages/ComponentsOldVersion')

let loginPage 
let moviesPage 
let toast

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)  
  moviesPage = new MoviesPage(page)
  toast = new Toast(page)
})

test('deve poder cadastar um novo filme', async ({ page }) => {

    //é importante estar logado

    const movie = data.create

    //Corrigir teste no futuro passand os parametros de acesso ao BD no arquivo database.js
    // await executeSQL(`delete from movies where title = '${movie.title}';`)

    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggerIn()

    await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)

    await toast.containText('Cadastro realizado com sucesso!')

})
