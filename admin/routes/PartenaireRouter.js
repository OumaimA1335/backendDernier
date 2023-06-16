const express = require('express');
const router = express.Router();


const {createPartenaire,
    getAllPartenaire,
    getByIdPartenaires,
    upadtepartenaire,
    deletePartenaire,
    searchpartenaire,
    getPartenaireByIdSousCategorie,gePartnaireProduct} = require('../controllers/PartenaireController');

router.post("/createPartenaire",createPartenaire);
router.get("/getAllPartenaires", getAllPartenaire);
router.get("/gePartnaireProduct/:nom", gePartnaireProduct);
router.get("/getByIdPartenaire/:id",getByIdPartenaires);
router.get("/getByNomPartenaire/:nom",searchpartenaire);
router.get("/getPartenaireByIdSousCategorie/:id",getPartenaireByIdSousCategorie);
router.put("/updatePartenaire/:id", upadtepartenaire);
router.delete("/deletePartenaire/:id", deletePartenaire);

module.exports=router;