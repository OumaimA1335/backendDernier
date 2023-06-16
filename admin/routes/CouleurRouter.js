const express = require('express');
const router = express.Router();
const {getAllColors} = require("../controllers/ColorsController");

router.get("/getAllColors",getAllColors);

module.exports=router;