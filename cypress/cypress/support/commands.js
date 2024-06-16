Cypress.Commands.add('deleteTaskByApiByHelper', (taskName) => {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.config('apiUrl')}/helper/tasks/${taskName}`,
    })
})

Cypress.Commands.add('addTaskByApi', (task) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.config('apiUrl')}/tasks`,
        body: task
    })
})