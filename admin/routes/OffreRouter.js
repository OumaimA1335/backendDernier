const express = require('express');
const router = express.Router();

const {createOffre ,getAllOffres ,getOffreId ,updateOffer
    , deleteProductsOfOffre,deleteAnOffer,searchOffre,getoffreProducts} = require('../controllers/OffreController');

router.post("/createOffre",createOffre);
router.get("/getAllOffres",getAllOffres);
router.get("/getOfferId/:id",getOffreId);
router.get("/getOfferNom/:nom",searchOffre);
router.put("/updateOffre/:id",updateOffer);
router.delete("/deleteOffer/:id", deleteAnOffer);
router.put("/deleteProductsOfOffer",deleteProductsOfOffre);
router.get("/getoffreProducts",getoffreProducts);

module.exports =router