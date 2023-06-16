const express = require('express');
const router = express.Router();

const {createReclamation,getAllReclamations,
    getReclamationById,updateEtatByAdmin,
    updateReclamationByClient,deleteReclamation} = require('../Controllers/ReclamationController');

router.post("/createReclamation",createReclamation);
router.get("/getAllReclamations",getAllReclamations);
router.get("/getReclamationById/:id",getReclamationById);
router.put("/updateEtatByAdmin/:id",updateEtatByAdmin);
router.put("/updateReclamationByClient/:id",updateReclamationByClient);
router.delete("/deleteReclamation/:id",deleteReclamation);

module.exports=router