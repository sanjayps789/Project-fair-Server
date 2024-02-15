const express = require('express')
const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
const multerConfig = require('../Middlewares/multerMiddleware')

const router = new express.Router()

// register api
router.post('/register',userController.register)

// login api
router.post('/login',userController.login)

// add project api - Router specific middleware
router.post('/add-project',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

// get home projects
router.get('/get-home-project',projectController.getHomeproject)

// get all projects (check authorization)
router.get('/get-all-project',jwtMiddleware,projectController.getAllproject)

// get User projects - router specific middleware
router.get('/get-user-project',jwtMiddleware,projectController.getUserProject)

// update project
router.put('/project/edit/:pid',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProject)

// update userprofile
router.put('/user/edit',jwtMiddleware,multerConfig.single('profileImage'),userController.editUser)

// delete project
router.delete('/remove-project/:pid',jwtMiddleware,projectController.removeProject)

module.exports = router