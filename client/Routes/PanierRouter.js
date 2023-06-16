const express = require('express');
const router = express.Router();

const {CreatePanier,updatePanier,getProductsPanierByUSer,deleteProduct,
    tailleCouleur} = require('../Controllers/PanierController');

router.post("/createPanier",CreatePanier);
router.put("/updateQuantity/:id",updatePanier);
router.get("/getUserProducts/:id",getProductsPanierByUSer);
router.delete("/deleteProductPanier/:id",deleteProduct);
router.get("/verifyTailleCouleur/:id0/:id1/:id2",tailleCouleur);

module.exports= router;