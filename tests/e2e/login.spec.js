const { test, expect } = require('../support')

test('deve logar como administrador', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.login.isLoggerIn('Admin')
})

test('não deve logar como  senha incorreta', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'abcd123')

    const mensage = "Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
    await page.toast.containText(mensage)
})

test('não deve logar quando o e-mail é invalido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('emai..com', 'abcd123')
    await page.login.alertHaveText('Email incorreto')
})

test('não deve logar quando o e-mail não é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', 'abcd123')
    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando a senha não é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('teste@gmail.com', '')
    await page.login.alertHaveText('Campo obrigatório')
})

test('não deve logar quando nenhum campo é preenchido', async ({ page }) => {
    await page.login.visit()
    await page.login.submit('', '')
    await page.login.alertHaveText(['Campo obrigatório','Campo obrigatório'])
})



