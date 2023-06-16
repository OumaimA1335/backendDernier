const { result } = require("lodash");
const PanierProduits = require("../../client/Modals/Panier");
const { Commande } = require("../modals/Commande");
const CommandeProduit = require("../modals/CommandeProduit");
const Facture = require("../modals/Facture");
const Produit = require("../modals/Produit");
const TailleProduit = require("../modals/TailleProduit");
const Users = require("../modals/Users");
const { Sequelize, INTEGER, where } = require('sequelize');
const Taille = require("../modals/Taille");
const Couleur = require("../modals/Couleur");
const Offre = require("../modals/Offre");


async function createCommande(req, res) {
  // const id = req.params.id;
  const { Adresse, Tel, createdAt, updatedAt, idClient, Paiement, PanierId,nom} =
    req.body;
  console.log(req.body);
  let commande, commandeId, panier;
  try {
    // création de la commande
    commande = await Commande.create({
      Adresse,
      Tel,
      createdAt,
      updatedAt,
      idClient,
      Paiement,
      nom,
    });

    // affectation des produits avec leurs quantité à la commande crée
    commandeId = await commande.get("id");
    console.log(commandeId);
    PanierId.map(async (id) => {
      console.log(id);
      (panier = await PanierProduits.findByPk(id)),
        await CommandeProduit.create({
          commandeId,
          produitId: panier.get("produitId"),
          quantite: panier.get("quantite"),
          createdAt,
          updatedAt,
          taille: panier.get("taille"),
          couleur :panier.get("couleur")
        });
    });
    //Vider Panier 
    await Promise.all(
      PanierId.map(async(item,index)=>{
        panier = await PanierProduits.findByPk(item);
        await panier.destroy();
      })
    )
  } catch (err) {
    console.log(err);
  }
  if (!commande) {
    return res.status(500).json({ message: "Unable to add commande" });
  }
  return res.status(201).json({ commande });
}
// création facture
async function createFacture(req, res) {
  const commandeId= req.params.id;
  const {createdAt,updatedAt}= req.body;
  let facture,
     product,
      prixProduit = 0,
      tvaProduit = 0,
      prixHorsTaxe = 0,
      prixTTCProduit = 0;
    let TotalHT = 0,
      TotalTTC = 0,
      TVA = 0,
      TotalNet = 0;
    const Tva = 19,
      Timbre = 1,
      FraisTransport = 7;
    let ProduitsId =[];
  try {
    // création facture
    
    const ProductsCommande = await CommandeProduit.findAll({
      where :{
        commandeId : commandeId
      }
    })
    console.log(ProductsCommande);
    await Promise.all(ProductsCommande.map((item)=>{
     ProduitsId.push({
      id : item.get("produitId"),
      quantite : item.get("quantite")
     })
    })
    )
    console.log(ProduitsId);
    await Promise.all(
      ProduitsId.map(async (item) => {
        product = await Produit.findByPk(item.id);
        if(product.get("offreId")==null)
        {
        prixProduit = product.get("prix");
        //console.log("le prix de produit est "+prixProduit);
        prixHorsTaxe = prixProduit * item.quantite;
        //console.log("le prix Hors taxe de produit est "+prixHorsTaxe);
        tvaProduit = prixProduit * (Tva / 100);
        //console.log("le TVA de produit est "+tvaProduit);
        TotalHT = TotalHT + prixHorsTaxe;
        //console.log("le TotalHT des produit est "+TotalHT);
        TVA = TVA + tvaProduit;
        //console.log("le TVA des produits est "+TVA);
        prixTTCProduit = prixHorsTaxe + tvaProduit;
        //console.log("le prixTTC de produit est "+prixTTCProduit);
        TotalTTC = TotalTTC + prixTTCProduit;
        //console.log("le TotalTTC  des produits est "+prixTTCProduit);
        }
        else{
          let offre1 = await Offre.findByPk(product.get("offreId"))
          let pourcentage = offre1.get("pourcentage")
          let  prix = product.get("prix");
          let prixProduit = prix * (pourcentage / 100);
          prixHorsTaxe = prixProduit * item.quantite;
          //console.log("le prix Hors taxe de produit est "+prixHorsTaxe);
          tvaProduit = prixProduit * (Tva / 100);
          //console.log("le TVA de produit est "+tvaProduit);
          TotalHT = TotalHT + prixHorsTaxe;
          //console.log("le TotalHT des produit est "+TotalHT);
          TVA = TVA + tvaProduit;
          //console.log("le TVA des produits est "+TVA);
          prixTTCProduit = prixHorsTaxe + tvaProduit;
          //console.log("le prixTTC de produit est "+prixTTCProduit);
          TotalTTC = TotalTTC + prixTTCProduit;
          //console.log("le TotalTTC  des produits est "+prixTTCProduit);
        }
      })
    );
    TotalNet = TotalTTC + Timbre + FraisTransport;
    // Affichage des données
    //console.log(TotalHT,TotalTTC,TotalNet,TVA);
    TotalNet = Math.round(TotalNet * 100) / 100;
   facture =  await Facture.create({
      TotalHT,
      TVA,
      TotalTTC,
      TotalNet,
      createdAt,
      updatedAt,
      commandeId,
    });
  } catch (err) {
    console.log(err);
  }
  if (!facture) {
    return res.status(500).json({ message: "Unable to add facture" });
  }
  return res.status(201).json({ facture });
}
// affichage  de tous les commandes
async function getCommandes(req, res) {
  let commandes;
  try {
    commandes = await Commande.findAll();
  } catch (err) {
    console.log(err);
  }
  if (commandes) {
    res.json({ commandes });
  } else {
    res.status(404).send(" commandes not found");
  }
}

//affichage des nouveaux commandes
async function getNewCommandes(req, res) {
  let commandes;
  try {
    commandes = await Commande.findAll({
      where: {
        Etat: "Non livrée",
      },
    });
  } catch (err) {
    console.log(err);
  }
  if (commandes) {
    res.json({ commandes });
  } else {
    res.status(404).send("There is no new orders");
  }
}
// récupérer la commande d'un client
async function getCommandeClient(req, res) {
  const id = req.params.id;
  let commande;
  try {
    commande = await Commande.findAll({
      where: {
        idClient: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
  if (commande) {
    res.json({ commande });
  } else {
    res.status(404).send("You have no old order");
  }
}
//Modifier l'etat d'une commande à livreé par l'admin
async function updateEtatCommande(req, res) {
  const id = req.params.id;
  let commande;
  try {
    commande = await Commande.findByPk(id);
    commande.set({
      Etat: "Livrée",
    });
    commande.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ commande });
}
async function updateConfirmationCommande(req, res) {
  const id = req.params.id;
  let commande,commandeProduits,idProduit,tailleProduit;
  try {
    commande = await Commande.findByPk(id);
    commande.set({
      confirmation: "Confirmée",
    });
    commande.save();
    commandeProduits =  await CommandeProduit.findAll({
      where:{
        commandeId :id
      }
    });
   console.log(commandeProduits);
   await Promise.all (commandeProduits.map(async(item)=> {
       idProduit = item.get("produitId");
       let produit = await Produit.findByPk(idProduit);
       if(produit.get("souscategorie_id")==21)
       {
          produit.set({
            quantite : parseInt(produit.get("quantite"))-1
          });
          produit.save();
       }else
       {
        let couleur = await Couleur.findOne(
          {
            where:
            {
              couleur: item.couleur
            }
          }
         
        );
        let taille = await Taille.findOne(
        {
          where:
          {
            taille: item.taille 
          }
        }  
        )
        tailleProduit = await TailleProduit.findOne({
          where:{
            produitId : idProduit,
            tailleId : taille.get("id"),
            couleurId: couleur.get("id"),
          }
         });
        console.log(tailleProduit);
        const quantiteUpdated = parseInt( tailleProduit.get("quantite"))-1
        tailleProduit.set({
          quantite : quantiteUpdated
        });
        tailleProduit.save();
       }
    
   }));
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ commande });
}
// recuperer la facture d'une commande
async function getFactureCommande(req, res) {
  let facture;
  const id = req.params.id;
  try {
    facture = await Facture.findAll({
      where: {
        commandeId: id,
      },
    });
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ facture });
}
// Annulation d'une commande par un client
async function cancelCommandeByClient(req, res) {
  const id = req.params.id;
  let commande, etat;
  try {
    commande = await Commande.findByPk(id);
    etat = commande.get("confirmation");
    if (etat == "Non confirmeé") {
      await commande.destroy();
    } else {
      return res.json({
        message: "Commande has been validated , you can't cancel it now",
      });
    }
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ message: "Commande deleted successfully" });
}
//recuprer les produits et la quantité d'un produits
async function getProductsCommande(req, res) {
  const id = req.params.id;
  let commandeProduits,
    produit,
    Produits = [];
  try {
    commandeProduits = await CommandeProduit.findAll({
      where: {
        commandeId: id,
      },
    });
    await Promise.all(
      commandeProduits.map(async (item, index) => {
        produit = await Produit.findByPk(item.produitId);
        if(produit.get("offreId")!=null)
        {
          let offre = await Offre.findByPk(produit.get("offreId"));
          let pourcenatge = offre.get("pourcentage");
          Produits.push({
            nom: produit.get("nom"),
            prix: produit.get("prix"),
            taille : item.taille,
            couleur : item.couleur,
            quantite: item.quantite,
            pourcentage : pourcenatge
          });
        }else{
          Produits.push({
            nom: produit.get("nom"),
            prix: produit.get("prix"),
            taille : item.taille,
            couleur : item.couleur,
            quantite: item.quantite,
          });
        }
       
      
      })
    );
  } catch (err) {
    console.log(err);
  }
  if (commandeProduits) {
    res.json({ Produits });
  } else {
    res.status(404).send("cette commande n'a pas produits");
  }
}
//recuperer une commande
async function getCommande(req, res) {
  const id = req.params.id;
  let commande;
  try {
    commande = await Commande.findByPk(id);
  } catch (err) {
    console.log(err);
  }
  if (commande) {
    res.json([commande]);
  } else {
    res.status(404).send("Il n'a pas une commande de cette id");
  }
}
//récuperer le client à traver l'id de commande
async function getClient(req, res) {
  const id = req.params.id;
  let client, idClient, commande;
  try {
    commande = await Commande.findByPk(id);
    idClient = commande.get("idClient");
    client = await Users.findByPk(idClient);
  } catch (err) {
    console.log(err);
  }
  if (client) {
    res.json(client);
  } else {
    res.status(404).send("Il n'a pas client qui a cette commande");
  }
}
const getMostOrderedProducts = async (req, res) => {
  let result;
  const sequelize = require("../../database");
  try {
     result = await sequelize.query(`
     SELECT cp."produitId", SUM(cp.quantite) as total_quantity
     FROM "commandeProduits" cp
     JOIN "produits" p ON cp."produitId" = p.id
     GROUP BY cp."produitId"
     ORDER BY total_quantity DESC
     LIMIT 10;  
  `, { type: sequelize.QueryTypes.SELECT });
  res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }

};

async function getUserInformation (req,res)
{
  const id = req.params.id;
  let commande,user;
  try{
    commande = await Commande.findOne({
      where: {
        idClient: id
      },
      order: [['createdAt', 'DESC']],    
      limit: 1 
    });
  }catch(err)
  {
    console.log(err)
  }
  if (commande) {
    res.json(commande);
  } else {
    res.status(404).send("Il n'a pas de commande");
  }
}
async function GetNumberOforderByUser(req,res)
{
  const id = req.params.id;
  let commande,user;
  try{
  commande = await Commande.count({
    where:{
      idClient :id
    }
  })
  }catch(err)
  {
    console.log(err)
  }
  if (commande) {
    res.json(commande);
  } else {
    res.status(404).send("ce utilisateur n'a pas de commande");
  }
}
async function getCommandeLivree (req,res)
{
  const id = req.params.id;
  let commande;
  try {
    commande = await Commande.findAll({
      where: {
        idClient: id,
        Etat :"Livrée"
      },
    });
  } catch (err) {
    console.log(err);
  }
  if (commande) {
    res.json({ commande });
  } else {
    res.status(404).send("You have no old order");
}
}
async function getCommandeNonLivree (req,res)
{
  const id = req.params.id;
  let commande;
  try {
    commande = await Commande.findAll({
      where: {
        idClient: id,
        Etat :"Non livrée"
      },
    });
  } catch (err) {
    console.log(err);
  }
  if (commande) {
    res.json({ commande });
  } else {
    res.status(404).send("You have no old order");
}
}
async function NombreProduitsCommande(req, res) {
  const id = req.params.id;
  let commande, total, produits, produit, prix;
  try {
    commande = await CommandeProduit.count({
      where: {
        commandeId: id
      }
    });
    produits = await CommandeProduit.findAll({
      where: {
        commandeId: id
      }
    });
    total = 0;
    const TVA =19;
    await Promise.all(
      produits.map(async (item, index) => {
        produit = await Produit.findByPk(item.produitId);
        if(produit.get("souscategorie_id")==19)
        {
        if(produit.get("offreId")!=null)
        {
          let offre = await Offre.findByPk(produit.get("offreId"));
          let pourcenatge = await offre.get("pourcentage")
          prix = produit.get("prix");
          let prixFinal = prix * (1 - pourcenatge / 100);
          let prixHorsTaxe = prixFinal * item.quantite
          let tvaProduit = prix * (TVA / 100);
          total += prixHorsTaxe+tvaProduit;
          total = Math.trunc(total * 1000) / 1000;
        }else
        {
        prix = produit.get("prix");
        let prixHorsTaxe = prix * item.quantite
        let tvaProduit = prix * (TVA / 100);
        total += prixHorsTaxe+tvaProduit;
        total = Math.trunc(total * 1000) / 1000;
        }}
        else
        {
          if(produit.get("offreId")!=null)
          {
            let offre = await Offre.findByPk(produit.get("offreId"));
            let pourcenatge = await offre.get("pourcentage")
            prix = produit.get("prix");
            let prixFinal = prix * (1 - pourcenatge / 100);
            let prixHorsTaxe = prixFinal * item.quantite
            let tvaProduit = prix * (TVA / 100);
            total += prixHorsTaxe+tvaProduit;
            total = Math.trunc(total * 1000) / 1000;
          }else
          {
          prix = produit.get("prix");
          let prixHorsTaxe = prix * item.quantite
          let tvaProduit = prix * (TVA / 100);
          total += prixHorsTaxe+tvaProduit;
          total = Math.trunc(total * 1000) / 1000;
          }
        }
      })
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
  if (commande && total) {
    res.json({
      nbArticles: commande,
      Total: total
    });
  } else {
    res.status(404).send("You have no old order");
  }
}
async function getProductCommande (req,res)
{ const id = req.params.id;
  let produits, cat,produit,produitInnfo,taille,Tab =[];
  try{
  produits = await CommandeProduit.findAll(
    {
      where:{
        commandeId :id
      }
    }
  )
  console.log(produits.length)
  await Promise.all(
    produits.map(async(item,index)=>{
     produit = await Produit.findByPk(item.produitId) 
     cat = produit.get("souscategorie_id");
     if(cat ==19)
    {  
      if(produit.get("offreId")!=null)
      {
      let offre = await Offre.findByPk(produit.get("offreId"));
      let pour = offre.get("pourcentage");
      Tab.push(
        {
          idProduit : produit.get("id"),
          nomProduit :produit.get("nom"),
          imageProduit : produit.get("imageList"),
          prixProduit : produit.get("prix"),
          taille : item.get("taille"),
          couleur : item.get("couleur"),
          quantite : item.get("quantite"),
          pourcenatge :pour
        }
      )
      }else{
      Tab.push(
        {
          idProduit : produit.get("id"),
          nomProduit :produit.get("nom"),
          imageProduit : produit.get("imageList"),
          prixProduit : produit.get("prix"),
          taille : item.get("taille"),
          couleur : item.get("couleur"),
          quantite : item.get("quantite")
        }
      )}
     }
     else{
      if(produit.get("offreId")!=null)
      {
      let offre = await Offre.findByPk(produit.get("offreId"));
      let pourcenatge = offre.get("pourcentage");
      Tab.push(
        {
          idProduit : produit.get("id"),
          nomProduit :produit.get("nom"),
          imageProduit : produit.get("imageList"),
          prixProduit : produit.get("prix"),
          quantite : item.quantite,
          pourcenatge : pourcenatge
        }
      )}else{
        Tab.push(
          {
            idProduit : produit.get("id"),
            nomProduit :produit.get("nom"),
            imageProduit : produit.get("imageList"),
            prixProduit : produit.get("prix"),
            quantite : item.quantite,
          })
      }
     }
    })
  )
  }catch(err)
  {
    console.log(err)
  }
  if (Tab) {
    res.json({
     Tab
    });
  } else {
    res.status(404).send("You have no old order");
  }
}

module.exports = {
  createCommande,
  getCommandes,
  getNewCommandes,
  updateEtatCommande,
  getFactureCommande,
  getCommandeClient,
  cancelCommandeByClient,
  getProductsCommande,
  getCommande,
  getClient,
  createFacture,
  updateConfirmationCommande,
  getMostOrderedProducts,
  getUserInformation,
  GetNumberOforderByUser,
  getCommandeNonLivree,
  getCommandeLivree,
  NombreProduitsCommande,
  getProductCommande
};
