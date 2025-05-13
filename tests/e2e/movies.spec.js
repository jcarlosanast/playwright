const { test, expect } = require('../support')

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    await executeSQL(`delete from movies`)
})

test('deve poder cadastar um novo filme', async ({ page, }) => {

    const movie = data.a_noite_dos_mortos_vivos

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.toast.containText('Cadastro realizado com sucesso!')
})

test('não deve cadastrar quando o titulo já existe', async ({ page, request }) => {
    const movie = data.madrugada_dos_mortos

    // await request.api.setToken()
    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.toast.containText('Este conteúdo já encontra-se cadastrado no catálogo')

    // await page.movies.create(movie)
    // await page.toast.containText('Este conteúdo já encontra-se cadastrado no catálogo')
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
