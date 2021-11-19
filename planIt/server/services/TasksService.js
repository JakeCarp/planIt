import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class TasksService {
  async getAll(query = {}) {
    const tasks = await dbContext.Tasks.find(query)
      .populate('creator')
      .populate('project')
      .populate('sprint')
    return tasks
  }

  async getByProjectId(projectId) {
    const tasks = await dbContext.Tasks.find({ projectId: projectId })
      .populate('creator')
      .populate('project')
      .populate('sprint')
    return tasks
  }

  async getById(id) {
    const task = await dbContext.Tasks.findById(id)
      .populate('creator')
      .populate('project')
      .populate('sprint')
    if (!task) {
      throw new BadRequest('Invalid Id')
    }
    return task
  }

  async create(taskData) {
    const task = await dbContext.Tasks.create(taskData)
    await task
      .populate('creator')
    await task
      .populate('project')
    await task
      .populate('sprint')
    return task
  }

  async update(taskData) {
    // const task = await this.getById(taskData.id)
    // if (task.creatorId.toString() !== taskData.creatorId) {
    //   throw new Forbidden('This is not your Task')
    // }
    const update = await dbContext.Tasks.findOneAndUpdate({ _id: taskData.id, creatorId: taskData.creatorId }, taskData, { new: true })
    return update
  }

  async remove(taskId, userId) {
    const task = await this.getById(taskId)
    if (task.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your task')
    }
    await dbContext.Tasks.findByIdAndDelete(taskId)
  }
}

export const tasksService = new TasksService()
