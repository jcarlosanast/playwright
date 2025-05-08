const { test } = require('../support')

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

test('deve poder cadastar um novo filme', async ({ page, }) => {

    const movie = data.create
    // await executeSQL(`delete from movies where title = '${movie.title}';`)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.toast.containText('Cadastro realizado com sucesso!')
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos', async ({ page }) => {
    
    //funcão "do" que resumo as funções visit, submit e isloggerIn não funciona neste fluxo! :(
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggerIn('Admin')

    await page.movies.goForm()
    await page.movies.submit()

    await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])

})
