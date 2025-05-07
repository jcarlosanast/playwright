const { test } = require('../support')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

test('deve poder cadastar um novo filme', async ({ page, }) => {

    const movie = data.create
    // await executeSQL(`delete from movies where title = '${movie.title}';`)

    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggerIn()

    await page.movies.create(movie)

    await page.toast.containText('Cadastro realizado com sucesso!')
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', ({ page }) => {


})
