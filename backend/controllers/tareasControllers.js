const asyncHandler = require('express-async-handler')
const Tarea = require('../models/tareasModel')

const getTareas = asyncHandler( async (req, res) => {
    const tareas = await Tarea.find({user : req.user.id})
    res.status(200).json({tareas})
})

const setTarea = asyncHandler( async (req, res) => {


    if(!req.body.texto){
        res.status(400)
        throw new Error("Teclea una tarea")
    }
    const tarea = await Tarea.create({
        texto : req.body.texto,
        user : req.user.id
    })
    res.status(201).json({tarea})
})

const updateTarea = asyncHandler( async (req, res) => {

    const tarea = await Tarea.findById(req.params.id)

    if(!tarea){
        res.status(400)
        throw Error ('Tarea no encontrada')
    }

    // verificar que la tarea pertenece al usuario logeado
    if(tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error ('usuario  no autorizado')
    }else{
        const tareaAcutalizada = await Tarea.findByIdAndUpdate(req.params.id, req.body, {new:true})
    }

    

    res.status(200).json({tareaAcutalizada})
})

const deleteTarea = asyncHandler( async (req, res) => {
    const tarea = await Tarea.findById(req.params.id)

    if (!tarea) {
        res.status(404)
        throw new Error('La tarea no fué encontrada')
    }
    if(tarea.user.toString() !== req.user.id){
        res.status(401)
        throw new Error ('usuario  no autorizado')
    }else{
        tarea.deleteOne()
        res.status(200).json({ id: tarea._id })
    }

    //const deletedTarea = await Tarea.findByIdAndDelete(req.params.id)
    

    
})


module.exports = {
    getTareas,
    setTarea,
    updateTarea,
    deleteTarea
}