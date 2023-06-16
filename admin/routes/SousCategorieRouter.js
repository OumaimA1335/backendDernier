const express = require('express');
const router = express.Router();


const {createSousCategorie,
       getAllSousCategorie,
       getByIdSousCategorie,
       upadteSousCategorie,
       deleteSousCategorie,
       searchCategory,
       getSouCategorieByIdCategorie,
       fetchTailleBasedOnSousCategory} = require('../controllers/SousCategorieController');

router.post("/createSousCategorie",createSousCategorie);
router.get("/getAllSousCategories", getAllSousCategorie);
router.get("/getByIdSousCategorie/:id",getByIdSousCategorie);
router.get("/getSouCategorieByIdCategorie/:id",getSouCategorieByIdCategorie);
router.get("/fetchTailleBasedOnSousCategory/:id", fetchTailleBasedOnSousCategory);
router.get("/getByNomSousCategorie/:nom",searchCategory);
router.put("/updateSousCategorie/:id", upadteSousCategorie);
router.delete("/deleteSousCategorie/:id", deleteSousCategorie);


module.exports=router;