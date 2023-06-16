const Produit = require("../../admin/modals/Produit");
const FavorisProduits = require("../Modals/FavorisProduits");
const _ = require("lodash");

// insertion favoris
async function createFavoris(req, res) {
  const { userId, produitId, createdAt, updatedAt } = req.body;
  let favorisproduits, find;
  try {
    console.log("if 1");
    find = await FavorisProduits.findOne({
      where: {
        userId: userId,
        produitId: produitId,
      },
    });
    if (find) {
      console.log("this product is already exist");
    } else {
      favorisproduits = await FavorisProduits.create({
        userId,
        produitId,
        createdAt,
        updatedAt,
      });
    }
  } catch (err) {
    console.log(err);
  }
  if (find) {
    res.status(500).json({ message: "this product is already exist" });
  } else {
    res.status(201).json({ favorisproduits });
  }
}

async function getProducts(req, res) {
  let favorisProducts,
    produits = [];
  try {
    favorisProducts = await FavorisProduits.findAll();
    await Promise.all(
      favorisProducts.map(async (produit) => {
        let idProduit = produit.get("produitId");
        let prod = await Produit.findAll({
          where: {
            id: idProduit,
          },
        });
        if (produits.find((p) => _.isEqual(p, prod))) {
          console.log("ce produit déja exisyte dans la liste");
        } else {
          produits.push(prod);
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
  console.log(produits);
  if (!produits) {
    return res.status(500).json({ message: "Unable to get all favorites" });
  }
  return res.status(201).json({ produits });
}

async function getFavoriteProductById(req, res) {
  const id = req.params.id;
  let favorisProduits,
    produits = [];
  try {
    favorisProduits = await FavorisProduits.findAll({
      where: {
        userId: id,
      },
    });
    await Promise.all(
      favorisProduits.map(async (produit) => {
        let id = produit.get("produitId");
        produits.push(await Produit.findByPk(id));
      })
    );
  } catch (err) {
    console.log(err);
  }
  if (!produits) {
    return res
      .status(500)
      .json({ message: "Unable to get all favorites products" });
  }
  return res.status(201).json({ produits });
}

async function deletefavoriteProduct(req, res) {
  const id = req.params.id;
  let product;
  try{
  product = await FavorisProduits.findByPk(id);
  product.destroy();
  }catch(err)
  {
      console.log(err);
  }
  return res.status(200).json({ message: "product deleted successfully" });
}
async function deleteFavorisIdProduct(req,res)
{
  const id = req.params.id;
  let product;
  try{
  product = await FavorisProduits.findOne({
    where:{
      produitId :id
    }
  });
  product.destroy();
  }catch(err)
  {
      console.log(err);
  }
  return res.status(200).json({ message: "product deleted successfully" });
}
async function getProductsFavByUSer(req,res)
{   const id = req.params.id;
    let products,produits=[];
    try{
      products = await FavorisProduits.findAll({
        where:{
            userId : id
        }
      })
      await Promise.all(
          products.map(async(item,index)=>{
            let product = await Produit.findByPk(item.produitId);
            produits.push(
              {
                id : item.id,
                idProduit : product.get("id"),
                idSousCategorie : product.get("souscategorie_id"),
                nom : product.get("nom"),
                image : product.get("imageList"),
                prix : product.get("prix")
              }
            )

          })
      )
    }catch(err)
    {
        console.log(err)
    }
    if (!produits) {
        return res.status(500).json({ message: "Unable to get Fav products of this user" });
      }
      return res.status(201).json({produits});
}
async function NumbrerLikes (req,res)
{ let number ;
  const id = req.params.id;
  try{
    number = await FavorisProduits.count({
      where :{
        produitId : id
      }
    })
  }catch(err)
  {
    console.log
  }
 
  return res.status(201).json(number);
}
async function LoveProduct (req,res)
{
  let product
  const id = req.params.id;
  const id2 = req.params.id2
  try{
   product = await FavorisProduits.findOne(
    {
      where:{
        produitId :id,
        userId : id2
      }
    }
   )
  }catch(err)
  {
    console.log(err)
  }
  if (!product) {
    return res.json(false);
  }
  return res.status(201).json(true);
}
module.exports = {
  createFavoris,
  getProducts,
  getFavoriteProductById,
  deletefavoriteProduct,
  getProductsFavByUSer,
  NumbrerLikes,
  deleteFavorisIdProduct,
  LoveProduct
};
