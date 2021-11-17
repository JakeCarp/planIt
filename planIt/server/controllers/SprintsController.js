import { Auth0Provider } from '@bcwdev/auth0provider'
import { projectsService } from '../services/ProjectsService'
import { sprintsService } from '../services/SprintsService'
import BaseController from '../utils/BaseController'

export class SprintsController extends BaseController {
  constructor() {
    super('api/projects/:projectId/sprints')
    this.router
      .get('', this.getByProjectId)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const sprints = await sprintsService.getAll(req.query)
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async getByProjectId(req, res, next) {
    try {
      const sprints = await sprintsService.getByProjectId(req.params.projectId)
      res.send(sprints)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const sprint = await this.getById(req.params.id)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const sprint = await sprintsService.create(req.body)
      res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.id = req.params.id
      const sprint = await sprintsService.update(req.body)
      return res.send(sprint)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const sprintId = req.params.id
      await sprintsService.remove(sprintId, userId)
      res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }
}
