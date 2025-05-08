const { test: base, expect } = require('@playwright/test')

const { Leads } = require('../actions/Leads')
const { Login } = require('../actions/Login')
const { Movies } = require('../actions/Movies')
const { Toast } = require('../actions/Components')

// landing: new LandingPage(page),
// login: new LoginPage(page),
// movies: new MoviesPage(page),
// toast: new Toast(page)

const test = base.extend({
    page: async ({ page }, use) => {

        //Será o novo contexto que vai ter todos os contextos nativos do Playwright
        const context = page

        context['leads'] = new Leads(page)
        context['login'] = new Login(page)
        context['movies'] = new Movies(page)
        context['toast'] = new Toast(page)

        await use(context)
    }
})

export { test, expect }