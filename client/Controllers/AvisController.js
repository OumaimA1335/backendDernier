const { where } = require("sequelize");
const { Commande } = require("../../admin/modals/Commande");
const CommandeProduit = require("../../admin/modals/CommandeProduit");
const Produit = require("../../admin/modals/Produit");
const Avis = require("../Modals/Avis");
const { Op,sequelize } = require('sequelize');
const Users = require("../../admin/modals/Users");

//ajouter un avis à un produit par un client , s'il est déja l'acheteé
async function createAvis(req, res) {
  const { nbEtoile, description, idClient, idProduit, createdAt, upadtedAt } =
    req.body;
    const id = req.params.id;
  let avis, commandesClient, commandeProduit;
  try {
   /* commandesClient = await Commande.findAll({
      where: {
        idClient: idClient,
        Etat : 'Livrée'
      },
    });*/
   
        commandeProduit = await CommandeProduit.findAll({
          where: {
            commandeId: id,
            produitId: idProduit,
          },
        });
        console.log(commandeProduit.length);
    
    if (commandeProduit.length) {
      avis = await Avis.create({
        nbEtoile,
        description,
        idClient,
        idProduit,
        createdAt,
        upadtedAt,
      });
    }
  } catch (err) {
    console.log(err);
  }
  if (!avis) {
    return res.status(500).json({ message: "Unable to add avis" });
  }
  return res.status(201).json({ avis });
}

// consulter les avis

async function getAllAvis(req,res)
{   
    let avis ,tabAvis=[],produit;
    try{
        avis = await Avis.findAll();
        await Promise.all(
          avis.map(async(item)=> {
           produit = await Produit.findByPk(item.idProduit);
           tabAvis.push({
            nom : produit.get("nom"),
            description : item.description,
            nbEtoile : item.nbEtoile
           })
          })
        )
    }catch(err)
    {
        console.log(err);
    }
    if (!tabAvis) {
        return res.status(500).json({ message: "Unable to get avis" });
      }
      return res.status(201).json({ tabAvis });
}
// get avis by id product
async function getAvisByIdProd (req,res)
{   const id = req.params.id;
    let avis ,AllAvis=[];
   try{
     avis = await Avis.findAll({
        where :{
            idProduit :id
        }
     })
     await Promise.all(
      avis.map(async(item,index)=>{
        let user = await Commande.findOne(
          {
            where:{
              idClient : item.get("idClient")
              
            }
          }
        )
       AllAvis.push({
          nom : user.get("nom"),
          nbEtoile: item.get("nbEtoile"),
          description :item.get("description"),
          date : item.get("createdAt")
       })
      })
     )
   }catch(err)
   {
    console.log(err);
   }
   if (!avis) {
    return res.status(500).json({ message: "Unable to get avis by id product" });
  }
  return res.status(201).json({ AllAvis });
}
//get numbers of stars by product 
async function getNumberStars(req, res) {
  let sumStars = 0;
  let id = parseInt(req.params.id);
  const sequelize = require("../../database");
  try {
    const result = await Avis.findAll({
      attributes: [[sequelize.fn('sum', sequelize.col('nbEtoile')), 'totalStars']],
      where: {
        nbEtoile: {
          [Op.ne]: null
        },
        idProduit : id
      }
    });

    sumStars = parseInt(result[0].dataValues.totalStars);
   
    return res.json({ idProduit: id, sumStars });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'An error occurred while fetching the data' });
  }
}

module.exports = {
  createAvis,
  getAllAvis,
  getAvisByIdProd,
  getNumberStars
};
