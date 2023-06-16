const express = require('express');
const router = express.Router();


const {createCategorie,
       getAllCategorie,
       getByIdCategorie,
       upadteCategorie,
       deleteCategorie,
      } = require('../controllers/CategorieController');

router.post("/createCategorie",createCategorie);
router.get("/getAllCategories", getAllCategorie);
router.get("/getByIdCategorie/:id",getByIdCategorie);
router.put("/updateCategorie/:id", upadteCategorie);
router.delete("/deleteCategorie/:id", deleteCategorie);

module.exports=router;