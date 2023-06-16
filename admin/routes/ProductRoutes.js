const express = require('express');
const router = express.Router();

const{GetProductId,
     createProduct , 
     GetAllProducts ,
     UpdateProduct,
     deleteProduct,
     searchNameProduct,
     searchBrandProduct,
     searchCategoryProduct,
     searchTypeProduct,
     addProductToOffer,
     getImagesProducts,
     getColorsProduct,
     getProductByCategory,
     getColorsProductMobile,
     getProductsBySouSCategory,
     getTailleProduct,
     getQuantityCouleur,
     getQuantityTaille,
     getbyPriceHigh,
     getTailleProductWeb,getColorsProduct2,
     getBracelet,
     getrecentProduct,
     GetProductOffer,
     GetproductAcc,
     GetproductRecomanded,
     GetproductVet} = require('../controllers/ProductController');

router.get("/GetProductId/:id", GetProductId);
router.get("/GetProductImageListById/:id", getImagesProducts);
router.get("/GetAllProducts", GetAllProducts);
router.get("/searchNameProduct/:nom",searchNameProduct);
router.get("/searchTypeProduct/:type", searchTypeProduct);
router.get("/searchBrandProduct/:brand",searchBrandProduct);
router.get("/searchCategoryProduct/:category",searchCategoryProduct);
router.get("/getColorsProduct/:id",getColorsProduct);
router.get("/getColorsProductMobile/:id",getColorsProductMobile);
router.get("/getProductByCategory/:id",getProductByCategory);
router.get("/getProductBySousCategory/:id",getProductsBySouSCategory);
router.get("/getTailleProduct/:id",getTailleProduct);
router.get("/getQuantityCouleur/:id",getQuantityCouleur);
router.get("/getQuantityTaille/:id",getQuantityTaille);
router.put("/UpdateProduct/:id", UpdateProduct);
router.delete("/deleteProduct/:id",deleteProduct)
router.post("/createProduct", createProduct);
router.put("/addProductToOffer/:idP/:idO",addProductToOffer);
router.get("/getbyPriceHigh/:Cat/:type",getbyPriceHigh)
router.get("/getTailleProductWeb/:id",getTailleProductWeb);
router.get("/getBracelet",getBracelet)
router.get("/getrecentProduct",getrecentProduct)
router.get("/getColorsProduct2/:id",getColorsProduct2)
router.get("/GetAllProductsVetements",GetproductVet);
router.get("/GetAllProductsAccessoires",GetproductAcc);
router.get("/GetAllProductsOffre", GetProductOffer);
router.get("/GetAllProductsRecomanded",GetproductRecomanded);
module.exports =router