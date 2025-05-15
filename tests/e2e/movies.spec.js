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
    await page.popup.haveText(`O filme '${movie.title}' foi adicionado ao catálogo.`)
})

test('deve poder remover um filme', async ({ page, request }) => {

    const movie = data.guerra_mundial_z
    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.remove(movie.title)

    //Validação de uma msg em um poupup a partir de uma função poupup criada
    await page.popup.haveText('Filme removido com sucesso.')
})

test('não deve cadastrar quando o titulo já existe', async ({ page, request }) => {
    const movie = data.madrugada_dos_mortos

    // await request.api.setToken()
    await request.api.postMovie(movie)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.popup.haveText(`O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)

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
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório'
    ])

})

test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {
    const movies = data.search

    movies.data.forEach(async (m) => {
        await request.api.postMovie(m)
    })

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.search(movies.input)

    const rows = page.getByRole('row')
    await expect(rows).toContainText(movies.outputs)

})