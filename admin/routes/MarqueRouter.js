const express = require('express');
const router = express.Router();


const { createMarque,
    getAllMarque,
    getByIdMarque,
    upadteMarque,
    deleteMarque,
    searchMarque} = require('../controllers/MarqueController');

router.post("/createMarque",createMarque);
router.get("/getAllMarques", getAllMarque);
router.get("/getByIdMarque/:id",getByIdMarque);
router.get("/getByNomMarque/:nom",searchMarque);
router.put("/updateMarque/:id", upadteMarque);
router.delete("/deleteMarque/:id", deleteMarque);

module.exports=router;