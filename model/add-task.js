const mongoose = require('mongoose');
const TaskChecklist = require('./task-checklist');
const AddTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type : String , 
    required : true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium',
  },
  assignDate: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },

},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

AddTaskSchema.virtual('taskCheckLists', {
  ref: 'taskchecklist',
  localField: '_id',
  foreignField: 'addTaskId'
});


AddTaskSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await TaskChecklist.deleteMany({ addTaskId: doc._id });
  }
});



const AddTask = new mongoose.model('AddTask', AddTaskSchema);

module.exports = AddTask;

