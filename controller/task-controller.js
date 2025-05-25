const AddTask = require('../model/add-task');
const TaskChecklist = require('../model/task-checklist');

const addTask = async (req, res) => {
    try {
        const { title, description, priority, assignDate } = req.body;
        const userCreated = await AddTask.create({ title, description, priority, assignDate, createdBy: req.user._id.toString() })

        res.status(201).json({ msg: 'task created successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'internal server error , please try again!' })
    }
}

const getTasks = async (req, res) => {
    try {
        let filterObj ={createdBy: req.user._id.toString()} 
        if(req.params.type!=='All') filterObj.priority = req.params.type
        const data = await AddTask.find(filterObj).populate('taskCheckLists');
        res.status(201).json({ msg: 'tasks fetched successfully', data: data });
    } catch (err) {

        console.log(err)
        res.status(500).json({ msg: 'internal server error , please try again!' })
    }
}


const updateTask = async (req, res) => {
    try {

        const { title, description, priority, assignDate } = req.body;
        const data = await AddTask.findByIdAndUpdate(
            req.body._id,
            { title, description, priority, assignDate },
            { new: true } // return updated doc
        );
        res.status(201).json({ msg: 'tasks updated successfully', data: data });
    } catch (err) {

        console.log(err)
        res.status(500).json({ msg: 'internal server error , please try again!' })
    }
}

const addTaskchecklist = async (req, res) => {
    try {
        await TaskChecklist.deleteMany({ addTaskId: req.body[0].addTaskId });
        const data = await TaskChecklist.insertMany(req.body);
        res.status(201).json({ msg: 'tasks checklist created successfully', data: data });
    } catch (err) {
        res.status(500).json({ msg: 'internal server error , please try again!' })
    }
}
const deleteTask = async (req, res) => {
    try {
        const data = await AddTask.findOneAndDelete({ _id: req.params.taskId });
        res.status(201).json({ msg: 'task deleted successfully', data: data });
    } catch (err) {

        console.log(err)
        res.status(500).json({ msg: 'internal server error , please try again!' })
    }
}





module.exports = { addTask, getTasks, updateTask, addTaskchecklist, deleteTask }