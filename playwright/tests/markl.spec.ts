import { test, expect } from '@playwright/test'
import { TaskModel } from './fixtures/task.model'
import { task } from './fixtures/tasks.json'
import { deleteTaskByApiByHelper, addTaskByApi } from './support/helpers'
import { faker } from '@faker-js/faker'

test.describe('Cadastro de Tarefa', () => {

  test.beforeEach(async () => {
    task.name = `Tarefa: ${faker.string.uuid()}` as TaskModel["name"]
  })

  test.afterEach(async ({ request }) => {
    await deleteTaskByApiByHelper(request, task.name)
  })

  test('Cadastro de tarefa', async ({ page }) => {
    await page.goto('/')
    await page.locator('input[class*=InputNewTask]').fill(task.name)
    await expect(page.locator('div[class*=CreatedTaskCounter] > span')).toHaveText('0')
    await page.locator('button[class*=ButtonNewTask]').click()
    await expect(page.locator('div[class*=CreatedTaskCounter] > span')).toHaveText('1')
    await expect(page.locator('div[class*=listItem] > p')).toHaveText(task.name)
  })

  test('Cadastrar uma tarefa duplicada', async ({ page, request }) => {
    await addTaskByApi(request, task)
    await page.goto('/')
    await expect(page.locator('div[class*=listItem] > p')).toHaveText(task.name)
    await expect(page.locator('div[class*=CreatedTaskCounter] > span')).toHaveText('1')
    await page.locator('input[class*=InputNewTask]').fill(task.name)
    await page.locator('button[class*=ButtonNewTask]').click()
    await expect(page.locator('div[class*=popup] > h2')).toHaveText('Oops')
    await expect(page.locator('div[class*=popup] > div[class*=html]')).toHaveText('Task already exists!')
    await page.locator('button[class*=confirm]').click()
    await expect(page.locator('div[class*=listItem] > p')).toHaveText(task.name)
  })

  test('Cadastrar uma tarefa sem informar um título', async ({ page }) => {
    await page.goto('/')
    await page.locator('button[class*=ButtonNewTask]').click()
    const validationMessage = await page.locator('input[class*=InputNewTask]').evaluate(e => (e as HTMLInputElement).validationMessage)
    await expect(validationMessage).toEqual('This is a required field')
    await expect(page.locator('div[class*=CreatedTaskCounter] > span')).toHaveText('0')
    await expect(page.locator('div[class*=emptyList] > strong')).toHaveText("You don't have any tasks registered yet.")
    await expect(page.locator('div[class*=emptyList] > p')).toHaveText("Create tasks and organize your to-do items")
  })
})

test.describe('Edição de Terefa', () => {
  test.beforeEach(async ({ page, request }) => {
    task.name = `Tarefa: ${faker.string.uuid()}` as TaskModel["name"]
    await addTaskByApi(request, task)
    await page.goto('/')
    await expect(page.locator('div[class*=listItem] > p')).toHaveText(task.name)
  })

  test.afterEach(async ({ request }) => {
    await deleteTaskByApiByHelper(request, task.name)
  })

  test('Marcar tarefa como concluída', async ({ page }) => {
    await expect(page.locator('div[class*=DoneTaskCounter] > span')).toHaveText('0 of 1')
    await expect(page.locator('div[class*=listItem] > p')).not.toHaveCSS('text-decoration-line', 'line-through')
    await page.locator(`xpath=//p[text()="${task.name}"]/..//button[contains(@class, "Toggle")]`).click()
    await expect(page.locator('div[class*=listItem] > p')).toHaveCSS('text-decoration-line', 'line-through')
    await expect(page.locator('div[class*=DoneTaskCounter] > span')).toHaveText('1 of 1')
  })


  test('Excluir tarefa', async ({ page }) => {
    await expect(page.locator('div[class*=CreatedTaskCounter] > span')).toHaveText('1')
    await expect(page.locator('div[class*=DoneTaskCounter] > span')).toHaveText('0 of 1')
    await page.locator(`//p[text()="${task["name"]}"]/..//button[contains(@class, "DeleteButton")]`).click()
    await expect(page.locator('div[class*=CreatedTaskCounter] > span')).toHaveText('0')
    await expect(page.locator('div[class*=DoneTaskCounter] > span')).toHaveText('0 of 0')
    await expect(page.locator('div[class*=emptyList] > strong')).toHaveText("You don't have any tasks registered yet.")
    await expect(page.locator('div[class*=emptyList] > p')).toHaveText("Create tasks and organize your to-do items")
  })
})




