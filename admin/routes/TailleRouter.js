const express = require('express');
const router = express.Router();

const {getAllTaille} = require("../controllers/TailleController");

router.get("/getAllTailles", getAllTaille);

module.exports=router;