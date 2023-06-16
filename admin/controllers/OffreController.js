const Produit = require("../modals/Produit");
const Offre = require("../modals/Offre");
const moment = require("moment");
const { Op } = require("sequelize");
//create Offre
async function createOffre(req, res) {
  const { nom, pourcentage, dateEnd, createdAt, updatedAt } = req.body;
  console.log(req.body);
  let offre;
  try {
    offre = await Offre.create({
      nom,
      pourcentage,
      dateEnd,
      createdAt,
      updatedAt,
    });
  } catch (err) {
    console.log(err);
  }
  if (!offre) {
    return res.status(500).json({ message: "Unable to add offre" });
  }
  return res.status(201).json({ offre });
}
// get all offers
async function getAllOffres(req, res) {
  let offres;
  try {
    offres = await Offre.findAll();
  } catch (err) {
    console.log(err);
  }
  if (offres) {
    res.json({ offres });
  } else {
    res.status(404).send("offres not found");
  }
}
// get offer by id
async function getOffreId(req, res) {
  const id = req.params.id;
  let offre;
  try {
    offre = await Offre.findByPk(id);
  } catch (err) {
    console.log(err);
  }
  if (offre) {
    res.json({ offre });
  } else {
    res.status(404).send("No offer has this id");
  }
}
// update offer
async function updateOffer(req, res) {
  const id = req.params.id;
  const { nom, pourcentage, dateEnd, createdAt, updatedAt } = req.body;
  console.log(req.body);
  let offre;
  try {
    offre = await Offre.findByPk(id);
    offre.set({
      nom,
      pourcentage,
      dateEnd,
      createdAt,
      updatedAt,
    });
    await offre.save();
  } catch (err) {
    console.log(err);
  }
  if (!offre) {
    return res.status(500).json({ message: "Unable to update offre" });
  }
  return res.status(201).json({ offre });
}
// Set null to products that belongs to that offer
async function deleteProductsOfOffre(req, res) {
  const id = req.params.id;
  let disabled = false;
  const currentDate = moment().format("YYYY-MM-DD");
  console.log(currentDate);
  try {
    const products = await Produit.findAll();
    products.map(async (product) => {
      if (product.offreId != null) {
        let offre = await Offre.findByPk(product.offreId);
        let date = offre.get("dateEnd");
        if (currentDate >= date) {
          product.set({
            offreId: null,
          });
          await product.save();
        } else {
          console.log("there is time");
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
  return res.status(200).send("update successfully");
}
async function deleteAnOffer(req, res) {
  const id = req.params.id;
  let offre;
  let products;
  try {
      products = await Produit.findAll(
        {
          where:{
            offreId:id
          }
        }
      );
      console.log(products.length)
      if (products.length>0)
      {
        await Promise.all(
          products.map(async(item,index)=>
          {  
            console.log(item)
           
            item.set({
              offreId: null,
            });
            await item.save();
          })
        )
        offre = await Offre.findByPk(id);
        await offre.destroy();
        return res.status(200).json({ message: "offre deleted successfully" });
      }else
      {
        offre = await Offre.findByPk(id);
        await offre.destroy();
        return res.status(200).json({ message: "offre deleted successfully" });
      }
    
 
  } catch (err) {
    console.log(err);
  }
 
}
async function searchOffre(req, res) {
  const nom1 = req.params.nom;
  let offre;
  try {
    offre = await Offre.findAll({
      where: {
        nom: nom1,
      },
    });
  } catch (err) {
    console.log(err);
  }
  if (offre) return res.status(200).json({ offre });
}
async function getoffreProducts(req, res) {
  let products,
    offres = [];
  try {
    products = await Produit.findAll({
      where: {
        offreId: {
          [Op.not]: null,
        },
      },
    });

    await Promise.all(
      products.map(async (item, index) => {
        let offreId = item.get("offreId");
        let offre = await Offre.findByPk(offreId);
        if (!offres.find((existingOffre) => existingOffre.id === offre.id)) {
          offres.push(offre);
        }
      })
    );
  } catch (err) {
    console.log(err);
  }

  if (offres.length > 0) {
    return res.status(200).json({ offres });
  } else {
    return res.status(200).json({ offres: [] });
  }
}

module.exports = {
  createOffre,
  getAllOffres,
  getOffreId,
  updateOffer,
  deleteProductsOfOffre,
  deleteAnOffer,
  searchOffre,
  getoffreProducts,
};
