const mongoose = require('mongoose');

const TaskChecklistSchema = new mongoose.Schema({
  checklistName: {
    type: String,
    required: true,
  },

  subChecklists: [
    {
      subChecklist: {
        type: String,
        required: true
      },
      checkedOff: {
        type: Boolean,
        required: true,
       default: false
      },
   
    }
  ],
  addTaskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AddTask',
    required: true,
  },
});



const TaskChecklist = new mongoose.model('taskchecklist', TaskChecklistSchema);

module.exports = TaskChecklist;
