const { test, expect } = require('@playwright/test')

const { LoginPage } = require('../pages/LoginPage')
const {Toast} = require('../pages/Componentes')

let loginPage
let toast

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
})

test('deve logar como administrador', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await loginPage.isLoggerIn()
})

test('não deve logar como  senha incorreta', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'abcd123')

    const mensage = "Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
    await toast.HaveText(mensage)

})

