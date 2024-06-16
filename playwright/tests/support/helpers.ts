import { expect, APIRequestContext, Page } from '@playwright/test'
import { TaskModel } from '../fixtures/task.model'
import dotenv from 'dotenv'
dotenv.config()

const BASE_API = process.env.BASE_API

export async function deleteTaskByApiByHelper(request: APIRequestContext, taskName: string) {
    await request.delete(`${BASE_API}/helper/tasks/${taskName}`)
}

export async function addTaskByApi(request: APIRequestContext, task: TaskModel) {
    const postRequest = await request.post(`${BASE_API}/tasks`, { data: task })
    expect(postRequest.ok()).toBeTruthy()
}