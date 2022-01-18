const Task = require("../model/task.model.js");

async function editTask(req, res) {
    const { description } = req.body;
    const { id } = req.query
    try {
        if (description){
            const edittask= await Task.findOneAndUpdate({_id:id}, )
        }
    } catch (error) {
        
    }
}