import { Auth0Provider } from '@bcwdev/auth0provider'
import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'

export class TasksController extends BaseController {
  constructor() {
    super('api/projects/:projectId/tasks/')
    this.router
      .get('', this.getByProjectId)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
  }

  async getByProjectId(req, res, next) {
    try {
      const tasks = await tasksService.getByProjectId(req.params.projectId)
      res.send(tasks)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const task = await tasksService.getById(req.params.id)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const task = await tasksService.create(req.body)
      res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const task = await tasksService.update(req.body)
      return res.send(task)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const taskId = req.params.id
      await tasksService.remove(taskId, userId)
      res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }
}
