/// <reference types="Cypress" />
const { faker } = require('@faker-js/faker')
let { task } = require('../fixtures/tasks.json')
require('cypress-xpath')

describe('Mark L', () => {
  context('Cadastro de tarefas', () => {
    beforeEach(() => {
      task['name'] = `Tarefa: ${faker.string.uuid()}`
    })

    afterEach(() => {
      cy.deleteTaskByApiByHelper(task['name'])
      cy.reload()
    })

    it('Cadastrar uma tarefa', () => {
      cy.visit('/')
      cy.get('#newTask').should('be.visible').type(task['name'])
      cy.get('div[class*=CreatedTaskCounter] > span').should('be.visible').should('have.text', '0')
      cy.get('button[class*=ButtonNewTask]').should('be.visible').click()
      cy.get('div[class*=CreatedTaskCounter] > span').should('be.visible').should('have.text', '1')
      cy.get('div[class*=listItem] > p').contains(task['name']).should('be.visible')
    })

    it('Cadastrar uma tarefa duplicada', () => {
      cy.addTaskByApi(task).then(({ status }) => {
        expect(status).eq(201)
      })
      cy.visit('/')
      cy.get('div[class*=listItem] > p').contains(task['name']).should('be.visible')
      cy.get('#newTask').should('be.visible').type(task['name'])
      cy.get('button[class*=ButtonNewTask]').should('be.visible').click()
      cy.get('div[class*=popup] > h2').contains('Oops').should('be.visible')
      cy.get('div[class*=popup] > div').contains('Task already exists!').should('be.visible')
      cy.get('button[class*=confirm]').should('be.visible').click()
      cy.get('div[class*=listItem] > p').contains(task['name']).should('be.visible')
    })

    it('Cadastrar uma tarefa sem informar um título', () => {
      cy.visit('/')
      cy.get('#newTask').should('be.visible').should('be.empty')
      cy.get('div[class*=CreatedTaskCounter] > span').should('be.visible').should('have.text', '0')
      cy.get('button[class*=ButtonNewTask]').should('be.visible').click()
      cy.get('#newTask').then(($input) => {
        expect($input[0].validationMessage).eq('This is a required field')
      })
      cy.get('div[class*=CreatedTaskCounter] > span').should('be.visible').should('have.text', '0')
      cy.get('div[class*=emptyList] > strong').contains("You don't have any tasks registered yet.").should('be.visible')
      cy.get('div[class*=emptyList] > p').contains("Create tasks and organize your to-do items").should('be.visible')
    })
  })

  context('Edição de tarefas', () => {
    beforeEach(() => {
      task['name'] = `Tarefa: ${faker.string.uuid()}`

      cy.addTaskByApi(task).then(({ status }) => {
        expect(status).eq(201)

        cy.visit('/')
        cy.get('div[class*=listItem] > p').contains(task['name']).should('be.visible')
      })
    })

    afterEach(() => {
      cy.deleteTaskByApiByHelper(task['name'])
      cy.reload()
    })

    it('Marcar tarefa como concluída', () => {
      cy.get('div[class*=DoneTaskCounter] > span').should('be.visible').should('have.text', '0 of 1')
      cy.get('div[class*=listItem] > p').contains(task['name']).should('be.visible').should('not.have.css', 'text-decoration-line', 'line-through')
      cy.xpath(`//p[text()="${task["name"]}"]/..//button[contains(@class, "ItemToggle")]`).should('be.visible').click()
      cy.get('div[class*=listItem] > p').contains(task['name']).should('be.visible').should('have.css', 'text-decoration-line', 'line-through')
      cy.get('div[class*=DoneTaskCounter] > span').should('be.visible').should('have.text', '1 of 1')
    })

    it('Excluir tarefa', () => {
      cy.get('div[class*=CreatedTaskCounter] > span').should('be.visible').should('have.text', '1')
      cy.get('div[class*=DoneTaskCounter] > span').should('be.visible').should('have.text', '0 of 1')
      cy.xpath(`//p[text()="${task["name"]}"]/..//button[contains(@class, "DeleteButton")]`).should('be.visible').click()
      cy.get('div[class*=DoneTaskCounter] > span').should('be.visible').should('have.text', '0 of 0')
      cy.get('div[class*=CreatedTaskCounter] > span').should('be.visible').should('have.text', '0')
      cy.get('div[class*=emptyList] > strong').should('have.text', "You don't have any tasks registered yet.")
      cy.get('div[class*=emptyList] > p').should('have.text', "Create tasks and organize your to-do items")
    })
  })
})

