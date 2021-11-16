import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class ProjectsService {
  async getAll(query = {}) {
    const projects = await dbContext.Projects.find(query)
      .populate('creator')
    return projects
  }

  async getById(id) {
    const project = await dbContext.Projects.findById(id)
      .populate('creator')
    if (!project) {
      throw new BadRequest('Invalid Id')
    }
    return project
  }

  async create(projData) {
    const project = await dbContext.Projects.create(projData)
    await project.populate('creator')
    return project
  }

  async update(projData) {
    const project = await this.getById(projData.id)
    if (project.creatorId.toString() !== projData.creatorId) {
      throw new Forbidden('This is not your project')
    }
    const update = await dbContext.Projects.findOneAndUpdate({ _id: projData.id, creatorId: projData.creatorId }, projData, { new: true })
    return update
  }

  async remove(projId, userId) {
    const project = await this.getById(projId)
    if (project.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your project')
    }
    await dbContext.Projects.findByIdAndDelete(projId)
  }
}

export const projectsService = new ProjectsService()
