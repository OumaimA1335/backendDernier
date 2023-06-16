const express = require('express');
const router = express.Router();

const {createCommande ,getCommandes ,
    getNewCommandes,updateEtatCommande,
    getFactureCommande,getCommandeClient,
    cancelCommandeByClient,getProductsCommande
    ,getCommande,getClient,createFacture,updateConfirmationCommande,getMostOrderedProducts,
    getUserInformation,GetNumberOforderByUser,
    getCommandeLivree, getCommandeNonLivree, NombreProduitsCommande,getProductCommande} = require('../controllers/CommandeController')

router.post("/createCommande",createCommande);
router.get("/getAllCommandes",getCommandes);
router.get("/getNewCommandes",getNewCommandes);
router.get("/getFacture/:id",getFactureCommande);
router.get("/getClientCommande/:id",getCommandeClient);
router.put("/updateCommande/:id",updateEtatCommande);
router.delete("/cancelCommande/:id",cancelCommandeByClient);
router.get("/getProductsCommande/:id",getProductsCommande);
router.get("/getCommande/:id",getCommande);
router.get("/getClient/:id",getClient);
router.post("/createfacture/:id",createFacture);
router.put("/updateConfirmation/:id",updateConfirmationCommande);
router.get("/most-ordered-products/:limit",getMostOrderedProducts)
router.get("/userInformattion/:id",getUserInformation);
router.get("/GetNumberOforderByUser/:id",GetNumberOforderByUser);
router.get("/getCommandeNonLivree/:id",getCommandeNonLivree);
router.get("/getCommandeLivree/:id",getCommandeLivree);
router.get("/NombreProduitsCommande/:id",NombreProduitsCommande);
router.get("/getProductCommande/:id",getProductCommande);
module.exports=router;