const Router  = require("express");
const express = require("express")
const esquemaubi = require("../Models/ubimodel")
const router = express.Router()


//crearubicacion
router.post('/ubicacion', function(req, res) {
    const ubicacion = esquemaubi(req.body);
    console.log(req.body)
    ubicacion.save()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

//obtener todas las ubicaciones
router.get('/ubicacion', (req, res) => {
    esquemaubi.find()
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

//obtener 1 ubicacion
router.get('/ubicacion/:id', (req, res) => {
    const { id } = req.params;
    esquemaubi.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

//modificar ubicacion
router.put('/ubicacion/:id', (req, res) => {
    const { title, direccion } = req.body;
    esquemaubi.updateOne({_id: id},{ $set: {title, direccion}})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

//delete ubicacion
router.delete('/ubicacion/:id', (req, res) => {
    const { id } = req.params;
    esquemaubi.remove({_id: id})
    .then((data) => res.json(data))
    .catch((error) => res.json({message: error}))
})

module.exports = router;