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
module.exports = { 
    buscarTodo
}
