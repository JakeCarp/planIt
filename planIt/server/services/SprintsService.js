import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class SprintsService {
  async getAll(query = {}) {
    const sprints = await dbContext.Sprints.find(query)
      .populate('creator')
      .populate('project')
    return sprints
  }

  async getByProjectId(projId) {
    const sprints = await dbContext.Sprints.find({ projectId: projId })
      .populate('creator')
      .populate('project')
    return sprints
  }

  async getById(id) {
    const sprint = await dbContext.Sprints.findById(id)
      .populate('creator')
      .populate('project')
    if (!sprint) {
      throw new BadRequest('Invalid Id')
    }
    return sprint
  }

  async create(sprintData) {
    const sprint = await dbContext.Sprints.create(sprintData)
    await sprint
      .populate('creator')
    await sprint
      .populate('project')
    return sprint
  }

  async update(sprintData) {
    const sprint = await this.getById(sprintData.id)
    if (sprint.creatorId.toString() !== sprintData.creatorId) {
      throw new Forbidden('This is not your sprint')
    }
    const update = await dbContext.Sprints.findOneAndUpdate({ _id: sprintData.id, creatorId: sprintData.creatorId }, sprintData, { new: true })
    return update
  }

  async remove(sprintId, userId) {
    const sprint = await this.getById(sprintId)
    if (sprint.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your Sprint')
    }
    await dbContext.Sprints.findByIdAndDelete(sprintId)
  }
}

export const sprintsService = new SprintsService()
