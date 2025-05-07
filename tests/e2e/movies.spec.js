const { test } = require('../support')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

test('deve poder cadastar um novo filme', async ({ page }) => {

    //é importante estar logado

    const movie = data.create

    //Corrigir teste no futuro passand os parametros de acesso ao BD no arquivo database.js
    // await executeSQL(`delete from movies where title = '${movie.title}';`)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggerIn()

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)

    await page.toast.containText('Cadastro realizado com sucesso!')

})
