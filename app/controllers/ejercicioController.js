const ejercicio = require('../models/ejerciciosmodel')
const ejerciciomodel = require ('../models/ejerciciosmodel')
function buscarTodo(req, res){
    ejerciciomodel.find({})
    .then(ejercicios=> {
        if (ejercicios.length){
           return res.status(200).send({ejercicios})
        }
        return res.status(204).send({mensaje:"no hay informacion que mostrar"})
    })
    .catch(e=>{return res.status(404).send({mensaje:`error al solicitar la informacion ${e}`})})
}
function guardarEjercicio(req,res){
   console.log(req.body)
   new ejerciciomodel (req.body).save ()
   .then (info =>
   {
    return res.status(200).send({mensaje: "Informacion guardada con exito", info})
   })
   .catch(e =>{return res.status(404).send({mensaje:"error al guardar la informacion"})})
}
{
    function buscarEjercicio(req,res,next){
     let consulta ={}
     consulta[req.params.key]=req.params.value
     ejerciciomodel.find(consulta).then(info=>{
        if(!info.length)return next()
            req.body.ejercicios=info
            return next()
     })
     .catch(e =>{
        req.body.e = e
        next()
     })
    }
    
    function mostrarEjercicio(req,res){
        if(req.body.e) return res.status(404).send ({mensaje:"error al buscar la informacion", error:req.body.e})
            if(!req.body.ejercicios) return res.status (204).send({mensaje:"no hay informacion que mostrar"})
       let ejercicios= req.body.ejercicios
       return res.status(200).send({ejercicios})
    }

    function eliminarEjercicio(req,res){
        var ejer = {}
        ejer = req.body.ejercicios
        console.log(ejer)
        ejerciciomodel.deleteOne(ejer[0])
       .then(info =>{
        return res.status(200).send({mensaje:"informacion eliminada", info})
       })
       .catch(e =>{
        return res.status(404).send({mensaje:"error al eliminar al informacion",e})
       })
    }


}

      function actualizarEjercicio(req, res) {
    let consulta = {};
    consulta[req.params.key] = req.params.value;

    ejerciciomodel.findOneAndUpdate(consulta, req.body, { new: true })
    .then(info => {
        if (!info) return res.status(404).send({ mensaje: "No se encontró el ejercicio a actualizar" });
        return res.status(200).send({ mensaje: "Ejercicio actualizado con éxito", info });
    })
    .catch(e => {
        return res.status(400).send({ mensaje: "Error al actualizar el ejercicio", error: e });
    });
    
}
module.exports = { 
    buscarTodo,
    guardarEjercicio,
    buscarEjercicio,
    mostrarEjercicio,
    eliminarEjercicio,
    actualizarEjercicio
}
