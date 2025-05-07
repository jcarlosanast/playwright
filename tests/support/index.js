const { test: base, expect } = require('@playwright/test')

const { LandingPage } = require('../pages/LandingPage')
const { LoginPage } = require('../pages/LoginPage')
const { MoviesPage } = require('../pages/MoviesPage')
const { Toast } = require('../pages/Components')

// landing: new LandingPage(page),
// login: new LoginPage(page),
// movies: new MoviesPage(page),
// toast: new Toast(page)

const test = base.extend({
    page: async ({ page }, use) => {

        //Será o novo contexto que vai ter todos os contextos nativos do Playwright
        const context = page

        context['landing'] = new LandingPage(page)
        context['login'] = new LoginPage(page)
        context['movies'] = new MoviesPage(page)
        context['toast'] = new Toast(page)

        await use(context)
    }
})

export { test, expect }