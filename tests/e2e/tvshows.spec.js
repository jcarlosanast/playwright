const { test, expect } = require('../support')

const data = require('../support/fixtures/tvshows.json')
const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    await executeSQL(`delete from tvshows`)
})

test('deve poder cadastar uma nova serie', async ({ page, }) => {

    const tvshow = data.the_walking_dead

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.create(tvshow)
    await page.popup.haveText(`A série '${tvshow.title}' foi adicionada ao catálogo.`)
})

test('deve poder remover uma serie', async ({ page, request }) => {

    const tvshow = data.fear_the_walking_dead
    await request.api.postTvshow(tvshow)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.tvshows.remove(tvshow.title)

    //Validação de uma msg em um poupup a partir de uma função poupup criada
    await page.popup.haveText('Série removida com sucesso.')
})

test('não deve cadastrar quando o titulo da serie existe', async ({ page, request }) => {
    const tvshow = data.z_nation

    // await request.api.setToken()
    await request.api.postTvshow(tvshow)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.create(tvshow)
    await page.popup.haveText(`O título '${tvshow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)

    // await page.movies.create(movie)
    // await page.toast.containText('Este conteúdo já encontra-se cadastrado no catálogo')
})

test('não deve cadastrar quando os campos obrigatórios não são preenchidos da serie', async ({ page }) => {

    //funcão "do" que resumo as funções visit, submit e isloggerIn não funciona neste fluxo! :(
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggerIn('Admin')

    await page.tvshows.goFormTvShow()
    await page.tvshows.registerTvShow()
    await page.tvshows.submit()

    await page.tvshows.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        "Campo obrigatório (apenas números)",
    ])

})

test('deve realizar busca pelo termo zumbi', async ({ page, request }) => {
    const tvshows = data.search

    tvshows.data.forEach(async (m) => {
        await request.api.postTvshow(m)
    })

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshows.search(tvshows.input)
    await page.tvshows.tableHave(tvshows.outputs)

})