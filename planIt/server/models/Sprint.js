import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

export const SprintSchema = new Schema({
  name: { type: String, required: true },
  projectId: { type: ObjectId, ref: 'Project' },
  creatorId: { type: ObjectId, ref: 'Profile', required: true },
  isOpen: { type: Boolean }
}, { timestamps: true, toJSON: { virtuals: true } })

SprintSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})
SprintSchema.virtual('project', {
  localField: 'projectId',
  ref: 'Project',
  foreignField: '_id',
  justOne: true
})
