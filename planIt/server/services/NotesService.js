import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class NotesService {
  async getAll(query = {}) {
    const notes = await dbContext.Notes.find(query)
      .populate('creator')
    return notes
  }

  async getByProjectId(taskId) {
    const notes = await dbContext.Notes.find({ projectId: taskId })
      .populate('creator')
    return notes
  }

  async getById(id) {
    const note = await dbContext.Notes.findById(id)
      .populate('creator')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async create(noteData) {
    const note = await dbContext.Notes.create(noteData)
    await note
      .populate('creator')
    return note
  }

  // TODO if we plan on using collaborators, then we need to alter the forbidden conditional down below to account for the project owner as well
  async update(noteData) {
    const note = await this.getById(noteData.id)
    if (note.creatorId.toString() !== noteData.creatorId) {
      throw new Forbidden('This is not your Note')
    }
    const update = await dbContext.Notes.findOneAndUpdate({ _id: noteData.id, creatorId: noteData.creatorId }, noteData, { new: true })
    return update
  }

  async remove(noteId, userId) {
    const note = await this.getById(noteId)
    if (note.creatorId.toString() !== userId) {
      throw new Forbidden('This is not your note')
    }
    await dbContext.Notes.findByIdAndDelete(noteId)
  }
}

export const notesService = new NotesService()
