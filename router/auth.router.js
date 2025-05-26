const express = require('express');
const authController= require('../controller/auth-controller');
const taskController= require('../controller/task-controller');
const authMiddleware =  require('../middleware/authMiddleware')
const router = express.Router();


router.route('/').get((req,res)=>{
    res.status(200).send('server is working fine');
})


router.route('/register').post(authController.register)
router.route('/login').post(authController.login)


router.route('/addTask').post(authMiddleware , taskController.addTask)
router.route('/getTasks/:type').get(authMiddleware , taskController.getTasks)
router.route('/updateTask').patch(authMiddleware , taskController.updateTask)
router.route('/addTaskchecklist').post(authMiddleware , taskController.addTaskchecklist)
router.route('/deleteTask/:taskId').delete(authMiddleware , taskController.deleteTask)

module.exports = router;