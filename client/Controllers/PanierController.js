const { where } = require("sequelize");
const Produit = require("../../admin/modals/Produit");
const Taille = require("../../admin/modals/Taille");
const TailleProduit = require("../../admin/modals/TailleProduit");
const PanierProduits = require("../Modals/Panier");
const Offre = require("../../admin/modals/Offre");
const Couleur = require("../../admin/modals/Couleur");
const CouleursProduit = require("../../admin/modals/CouleurProduit");


async function CreatePanier (req,res)
{
    const { userId, produitId, taille,quantite, couleur,createdAt, updatedAt } = req.body;
    let panier , findProduit,idCategorie,produit
    console.log(couleur)
    try{
        produit = await Produit.findByPk(produitId);
        idCategorie = produit.get("souscategorie_id")
        if(idCategorie==19)
        {
            findProduit = await PanierProduits.findOne({
                where:{
                   userId : userId,
                   produitId :produitId,
                   taille :taille,
                   couleur : couleur
                }
               })
               if(findProduit)
               {
                console.log("le produit existe déja dans la panier avec cette taille")
               }else
               {
                panier = await PanierProduits.create({
                    userId,
                    produitId,
                    taille,
                    quantite,
                    createdAt,
                    updatedAt,
                    couleur,
                })
               }
        }else
        {
            findProduit = await PanierProduits.findOne({
                where:{
                   userId : userId,
                   produitId :produitId,
                   
                }
               })
               if(findProduit)
               {
                console.log("le produit existe déja dans la panier avec cette taille")
               }else
               {
                panier = await PanierProduits.create({
                    userId,
                    produitId,
                    quantite,
                    createdAt,
                    updatedAt
                })
               }
        }
      
      
    }catch(err)
    {
        console.log(err);
    }
    if (!panier) {
        return res.status(500).json({ message: "Unable to add this product" });
      }
      return res.status(201).json({ panier});
}
async function updatePanier (req,res)
{   const id = req.params.id;
    const {quantite ,updatedAt} = req.body
    let product
    try{
     product = await PanierProduits.findByPk(id);
     product.set({
       quantite,
       updatedAt
     })
     product.save();
    }catch(err)
    {
        console.log(err)
    }
    return res.status(201).json({product});
}
async function getProductsPanierByUSer(req,res)
{   const id = req.params.id;
    let Panierproducts,products=[],quantiteProduct,taille,productTaille,offreId,off;
    try{
      Panierproducts = await PanierProduits.findAll({
        where:{
            userId : id
        }
      })
    await Promise.all(
        Panierproducts.map(async(item,index)=>{
        let product = await Produit.findByPk(item.produitId);
        let promo =0;
            offreId = product.get("offreId");
            if(offreId!=null)
            {
              off = await Offre.findByPk(offreId);
              promo = off.get("pourcentage");
            }
        if(product.get("souscategorie_id")==19)
        {
            taille = await Taille.findOne({
                where :
                {
                    taille : item.taille
                }
            }
            )
            productTaille = await TailleProduit.findOne({
            where:
            {
                produitId : item.produitId,
                tailleId : taille.get("id")
            }
           });
        
           quantiteProduct = productTaille.get("quantite");
           products.push(
            {id : item.id,
             nom :product.get("nom"),
             image : product.get("imageList"),
             prix : product.get("prix"),
             quantite : item.quantite,
             taille : item.taille,
             couleur :item.couleur,
             quantiteProduit :productTaille.get("quantite"),
             promotion :promo   
            }
        )
        }else{
            products.push(
                {id : item.id,
                 nom :product.get("nom"),
                 image : product.get("imageList"),
                 prix : product.get("prix"),
                 quantite : item.quantite,
                 taille : item.taille,
                 quantiteProduit : product.get("quantite"),
                 promotion :promo    
                }
            )
        }

        }
       
    ) 
    )
    }catch(err)
    {
        console.log(err)
    }
    if (!products) {
        return res.status(500).json({ message: "Unable to get products of this user" });
      }
      return res.status(201).json({products});
}
async function deleteProduct (req,res)
{   const id = req.params.id;
    let product;
    try{
    product = await PanierProduits.findByPk(id);
    product.destroy();
    }catch(err)
    {
        console.log(err);
    }
    return res.status(200).json({ message: "product deleted successfully" });
}
async function tailleCouleur (req,res)
{   const produit = req.params.id0;
    const taille = req.params.id1;
    const couleur = encodeURIComponent(req.params.id2);
    console.log(couleur)
    const extractedValue = couleur.slice(3); 
    const decodedValue = '#' + extractedValue; 
    console.log(decodedValue); 

console.log(decodedValue);
    let product,tailleProduct,couleurProduct;
    try{
       tailleProduct = await Taille.findOne({
        where:
        {
            taille : taille
        }
       });
       couleurProduct = await Couleur.findOne(
        {
            where:{
                couleur:decodedValue
            }
        }
       )
       product = await TailleProduit.findOne(
        {
            where:
            {   produitId: produit,
                tailleId : tailleProduct.get("id"),
                couleurId : couleurProduct.get("id")
            }
        }
       );
       if(product)
       {
        return res.status(201).json(true);
       }
       else 
       {
        return res.json(false);
       }
    }catch(err)
    {
     console.log(err)
    }

}
module.exports={
    CreatePanier,
    updatePanier,
    getProductsPanierByUSer,
    deleteProduct,
    tailleCouleur
}