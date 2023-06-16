const express = require('express');
const router = express.Router();

const {createAvis,getAllAvis,getAvisByIdProd,getNumberStars} = require('../Controllers/AvisController');

router.post("/createAvis/:id",createAvis);
router.get("/getAllAvis",getAllAvis);
router.get("/getAvisByIdProd/:id",getAvisByIdProd);
router.get("/getNumberStars/:id",getNumberStars);
module.exports= router;