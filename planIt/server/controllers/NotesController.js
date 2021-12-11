import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'

import BaseController from '../utils/BaseController'

export class NotesController extends BaseController {
  constructor() {
    super('api/projects/:projectId/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getByProjectId)
      .get('/:id', this.getById)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
  }

  async getByProjectId(req, res, next) {
    try {
      const notes = await notesService.getByProjectId(req.params.projectId)
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      const note = await notesService.getById(req.params.id)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      req.body.projectId = req.params.projectId
      const note = await notesService.create(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const note = await notesService.update(req.body)
      return res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const userId = req.userInfo.id
      const noteId = req.params.id
      await notesService.remove(noteId, userId)
      res.send('Deleted')
    } catch (error) {
      next(error)
    }
  }
}
