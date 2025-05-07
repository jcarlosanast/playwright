const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

const { LandingPage } = require('../pages/LandingPage')
const { Toast } = require('../pages/Components');
const { ok } = require('assert');

let landingPage
let toast

// let leadName
// let leadEmail

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
})

//gerar uma unica vez a massa e pode ser aproveitada para os demais testes, como exemplo cadastrar um user e tentar cadastrar ele novamente, pois ele vai gerar o mesmo
//diferença que o beforeEach vai rodar uma vez para cada teste
// test.beforeAll(async() => {
//   leadName = faker.person.fullName()
//   leadEmail = faker.internet.email()
// })

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'

  await toast.containText(message)
});

test('não deve cadastrar quando um e-mail já existe', async ({ page, request }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  //ao especionar o navagador durante a requisição podemos pegar o request da chamada e passar como teste para fazer um doblo check
  //ao especioar em NetWork, Fetch/XHR podemos visualizar todos os dados da requisição (request/response)
  const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })

  expect(newLead.ok()).toBeTruthy()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'

  await toast.containText(message)
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



