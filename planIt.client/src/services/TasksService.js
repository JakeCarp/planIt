import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TasksService{
    async getAll(projectId) {
        const res = await api.get('api/projects/' + projectId + '/tasks')
        logger.log(res.data)
        AppState.tasks = res.data
    }
    async createTask(projectId, task) {
        const res = await api.post('api/projects/' + projectId + '/tasks', task)
        logger.log(res.data)
        AppState.tasks.unshift(res.data)
    }
    async editTask(taskData, projectId, id) {
        const res = await api.put('api/projects/' + projectId + '/tasks/' + id, taskData)
        logger.log(res.data)
        let updated = res.data
        let index = AppState.tasks.findIndex(t => t.id === updated.id)
        AppState.tasks.splice(index, 1, updated)
    }

    async removeTask(projectid, id) {
        const res = await api.delete('api/projects/' + projectid + '/tasks/' + id)
        logger.log(res.data)
        AppState.tasks.filter(t => t.id !== id)
    }
    async
}
export const tasksService = new TasksService()