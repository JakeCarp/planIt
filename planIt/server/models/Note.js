import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const NoteSchema = new Schema({
  body: { type: String, required: true },
  taskId: { type: ObjectId, ref: 'Task', required: true },
  projectId: { type: ObjectId, ref: 'Project', required: true },
  creatorId: { type: ObjectId, ref: 'Profile', required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

NoteSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
