const projects = require('../Models/projectModel')

// add project

exports.addProject = async (req,res)=>{
    console.log("Inside ADD project API");
    const userId = req.payload
    console.log(userId);
    const {title,languages,overview,github,website} = req.body
    const projectImage = req.file.filename
    console.log(title,languages,overview,github,website,projectImage);
    try{
        const existingProject = await projects.findOne({github})
        // console.log(existingProject);
        if(existingProject){
            res.status(406).json("Repository of this project already exists !!!")
        }
        else{
            // add project to collection
            const newProject = new projects({
                title,languages,overview,github,website,projectImage,userId
            })
            await newProject.save()
            res.status(200).json(newProject)

        }

    }
    catch(err){
        res.status(401).json(err)

    }
}

// get home project

exports.getHomeproject = async (req,res) =>{
    try{
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// get all projects
exports.getAllproject = async (req,res) =>{
    const searchKey = req.query.search
    const query = {
        languages:{
            $regex:searchKey,$options:"i"
        }
    }
    try{
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
}

// get user uploaded projects

exports.getUserProject = async(req,res) =>{
    const userId = req.payload
    try{
        const userProjects = await projects.find({userId})
        res.status(200).json(userProjects)
    }catch(err){
        res.status(401).json(err)
    }

}

// edit project details
exports.editProject = async(req,res)=>{
    console.log("Inside edit Project API");
    const {pid} = req.params
    const userId = req.payload
    const {title,languages,overview,github,website,projectImage} = req.body
    const uploadImage = req.file?req.file.filename:projectImage
    try{
        const updatedProject = await projects.findByIdAndUpdate({_id:pid},
        {title,languages,overview,github,website,projectImage:uploadImage,userId},{new:true})
        // console.log(updatedProject);
        await updatedProject.save()
        res.status(200).json(updatedProject)
    }
    catch(err){
        res.status(401).json(err)
    }

}

// remove project
exports.removeProject = async(req,res) =>{
    console.log("Inside remove project");
    const {pid} = req.params
    try{
        const projectDetails = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(projectDetails)
    }catch(err){
        res.status(401).json(err)
    }
}