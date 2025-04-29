// @ts-check
const { test, expect } = require( '@playwright/test');

const { LandingPage } = require('../pages/LandingPage')

let landingPage 

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('JayCi', 'jayci@uol.com')

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  await landingPage.toastHaveText(message)
});

test('nao deve cadastrar com e-mail incorreto', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('JayCi', 'jayciuol.com')

  await expect(page.locator('.alert')).toHaveText('Email incorreto')
});

test('nao deve cadastrar quando o nome é não preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'jayci@uol.com')

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
});

test('nao deve cadastrar quando o email não é preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('JayCi', '')

  await expect(page.locator('.alert')).toHaveText('Campo obrigatório')
});

test('nao deve cadastrar quando nenhum campo é preenchido', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

  await landingPage.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ])

});



