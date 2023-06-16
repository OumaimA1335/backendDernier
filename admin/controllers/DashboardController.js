const FavorisProduits = require("../../client/Modals/FavorisProduits");
const { Commande } = require("../modals/Commande");
const User = require ("../modals/Users");
const { Op } = require("sequelize");
const moment = require("moment");
const Facture = require("../modals/Facture");

async function NombreNVCommandes(req,res)
{ 
    let nvCommande ;
    try{
     nvCommande = await Commande.count({
        where:{
            Etat:"Non livrée"
        }
     })
    }catch(err)
    {
   console.log(err)
    }
    if (!nvCommande) {
        return res.status(500).json({ message: "Unable to get all new orders" });
      }
      return res.status(201).json({nvCommande});

}
async function NombreUtilisateur (req,res)
{
    let NbUser 
    try{
    NbUser = await User.count({
        where:
        {
            role_id : 3
        }
    })
    }catch(err)
    {
        console.log(err)
    }
    if (!NbUser) {
        return res.status(500).json({ message: "Unable to get all new users" });
      }
      return res.status(201).json({NbUser});
}
async function NombreProduitAimee(req,res)
{ let NbProductsFav
    try{
     NbProductsFav = await FavorisProduits.count({
        distinct: true,
        col: 'produitId'
     })
    }catch(err)
    {
        console.log(err);
    }
    if (!NbProductsFav) {
        return res.status(500).json({ message: "Unable to get all new products" });
      }
      return res.status(201).json({NbProductsFav});
}
async function GetRevenueByWeek(req, res) {
    const today = moment();
    const orders = await Facture.findAll({
      where: {
        createdAt: {
          [Op.gte]: moment().subtract(7, "days").toDate(),
        },
      },
    });
  
    const revenueByDay = [];
  
    for (let i = 0; i < 7; i++) {
      const day = moment().subtract(i, "days");
      const revenue = orders
        .filter((order) => moment(order.createdAt).isSame(day, "day"))
        .reduce((total, order) => total + order.TotalNet, 0);
        revenueByDay.push({
            jour: day.format("dddd"),
            revenue: revenue,
          });
    }
  
    res.json({ revenueByDay });
  }
  
module.exports={
    NombreNVCommandes,
    NombreUtilisateur,
    NombreProduitAimee,
    GetRevenueByWeek
}