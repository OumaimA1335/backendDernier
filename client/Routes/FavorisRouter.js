const express = require('express');
const router = express.Router();

const {createFavoris,getProducts,getFavoriteProductById,deletefavoriteProduct
    ,getProductsFavByUSer,NumbrerLikes,deleteFavorisIdProduct,LoveProduct
}=require("../Controllers/FavorisController");

router.post("/createFavoris",createFavoris);
router.get("/getFavoriteProducts",getProducts);
router.get("/getFavoriteProductById/:id",getFavoriteProductById);
router.delete("/deletefavoriteProduct/:id",deletefavoriteProduct);
router.delete("/deleteFavorisIdProduct/:id",deleteFavorisIdProduct);
router.get("/getProductsFavByUSer/:id",getProductsFavByUSer);
router.get("/NumberLikes/:id",NumbrerLikes);
router.get("/LoveProduct/:id/:id2",LoveProduct);
module.exports=router;