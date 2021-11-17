import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const TaskSchema = new Schema({
  name: { type: String, required: true },
  weight: { type: Number },
  projectId: { type: ObjectId, ref: 'Project', required: true },
  sprintId: { type: ObjectId, ref: 'Sprint', required: true },
  creatorId: { type: ObjectId, ref: 'Profile', required: true },
  isComplete: { type: Boolean, default: false },
  completedOn: { type: Date },
  assignedTo: { type: ObjectId, ref: 'Profile' }
}, { timestamps: true, toJSON: { virtuals: true } })

TaskSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
TaskSchema.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})
TaskSchema.virtual('sprint', {
  localField: 'sprintId',
  ref: 'Sprint',
  foreignField: '_id',
  justOne: true
})
