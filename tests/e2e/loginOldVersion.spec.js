const { test, expect } = require('@playwright/test')

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

test('deve logar como administrador', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviesPage.isLoggerIn()
})

test('não deve logar como  senha incorreta', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('admin@zombieplus.com', 'abcd123')

    const mensage = "Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
    await toast.containText(mensage)
})

test('não deve logar quando o e-mail é invalido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('emai..com', 'abcd123')
    await loginPage.alertHaveText('Email incorreto')
})

test('não deve logar quando o e-mail não é preenchido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('', 'abcd123')
    // await loginPage.alertEmailHaveText('Campo obrigatório')
    await loginPage.alertHaveText('Campo obrigatório')
})

test('não deve logar quando a senha não é preenchido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('teste@gmail.com', '')
    // await loginPage.alertPasswordHaveText('Campo obrigatório')
    await loginPage.alertHaveText('Campo obrigatório')
})

test('não deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await loginPage.visit()
    await loginPage.submit('', '')
    // await loginPage.alertPasswordHaveText('Campo obrigatório')
    await loginPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})


