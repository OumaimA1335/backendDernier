const express = require('express');
const router = express.Router();
const {NombreNVCommandes,NombreUtilisateur,NombreProduitAimee,GetRevenueByWeek} = require("../controllers/DashboardController");

router.get("/NouveauxCommandes",NombreNVCommandes);
router.get("/NouveauxUtilisateurs",NombreUtilisateur);
router.get("/nombreProduitsAimee",NombreProduitAimee);
router.get("/getRevenue",GetRevenueByWeek);

module.exports=router;