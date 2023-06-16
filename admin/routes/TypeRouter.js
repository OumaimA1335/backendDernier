const express = require('express');
const router = express.Router();


const { createType,
    getAllType,
    getByIdType,
    upadtetype,
    deleteType,} = require('../controllers/TypeController');

router.post("/createType",createType);
router.get("/getAllTypes", getAllType);
router.get("/getByIdType/:id",getByIdType);
router.put("/updateType/:id", upadtetype);
router.delete("/deleteType/:id", deleteType);

module.exports=router;