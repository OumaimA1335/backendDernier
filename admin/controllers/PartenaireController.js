const Partenaire = require("../modals/Partenaire");
const Produit = require("../modals/Produit");

const { Op } = require("sequelize");
const { SousCategorie } = require("../modals/SousCategorie");
async function createPartenaire(req, res) {
  const { nom, createdAt, updateAt,type,marque ,categorie_id} = req.body;
  let partenaire;
  try {
    partenaire = await Partenaire.create({
      nom,
      createdAt,
      updateAt,
      type,
      marque,
      categorie_id
    });
  } catch (err) {
    console.log(err);
  }
  if (!partenaire) {
    return res.status(500).json({ message: "Unable to add marque" });
  }
  return res.status(201).json({ partenaire });
}

async function getAllPartenaire(req, res) {
  let partenaires;
  try {
    partenaires = await Partenaire.findAll();
  } catch (err) {
    console.log(err);
  }
  if (!partenaires) {
    return res.status(500).json({ message: "Unable to get all marques" });
  }
  return res.status(201).json({ partenaires});
}

async function getByIdPartenaires(req, res) {
  const id = req.params.id;
  let partenaire;
  try {
    partenaire = await Partenaire.findByPk(id);
  } catch (err) {
    console.log(err);
  }
  if (!partenaire) {
    return res.status(500).json({ message: "Unable to get this marque" });
  }
  return res.status(201).json({ partenaire });
}

async function upadtepartenaire(req, res) {
  const id = req.params.id;
  let partenaire;
  const { nom, updateAt ,type,
    marque} = req.body;
  try {
    partenaire= await Partenaire.findByPk(id);
    partenaire.set({
      nom,
      updateAt,
      type,
      marque
    });
    await partenaire.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ partenaire });
}

async function deletePartenaire(req, res) {
  const id = req.params.id;
  let partenaire;
  try {
    partenaire = await Partenaire.findByPk(id);
    await partenaire.destroy();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ message: "Marque deleted successfully" });
}
async function searchpartenaire(req, res) {
  const partenaire = req.params.nom;
  let partenaire1;
  try {
    partenaire1 = await Partenaire.findAll({
      where: {
        nom: partenaire,
      },
    });
  } catch (err) {
    console.log(err);
  }
  if (partenaire1) return res.status(200).json({ partenaire1 });
}
async function getPartenaireByIdSousCategorie(req,res)
{
  const categorie = req.params.id;
  let partenaire1;
  try {
    partenaire1 = await Partenaire.findAll({
      where: {
        categorie_id: categorie,
      },
    });
  } catch (err) {
    console.log(err);
  }
  if (partenaire1) return res.status(200).json({ partenaire1 });

}
async function gePartnaireProduct(req, res) {
  const partenaire = req.params.nom;

  let products, nomPartenaire = [];
  try {
    if(partenaire === "Vêtements" ||partenaire === "Accessoires")
    {
      let category = await SousCategorie.findOne({
        where: {
          nomcategorie: partenaire,
        },
      });
      let idCategory = category.get("idSousCategorie");
      products = await Produit.findAll({
        where: {
          souscategorie_id:idCategory,
          PartenaireId: {
            [Op.not]: null,
          },
        },
      });
  
      await Promise.all(
        products.map(async (item, index) => {
          let partenaire = await Partenaire.findByPk(item.PartenaireId);
          if (!nomPartenaire.some((p) => p.id === partenaire.id)) {
            nomPartenaire.push(partenaire);
          }
        })
      );
    }else
    {
      products = await Produit.findAll({
        where: {
          PartenaireId: {
            [Op.not]: null,
          },
        },
      });
  
      await Promise.all(
        products.map(async (item, index) => {
          let partenaire = await Partenaire.findByPk(item.PartenaireId);
          if (!nomPartenaire.some((p) => p.id === partenaire.id)) {
            nomPartenaire.push(partenaire);
          }
        })
      );
    }
   
  } catch (err) {
    console.log(err);
  }

  if (nomPartenaire) return res.status(200).json({ nomPartenaire });
}

module.exports = {
  createPartenaire,
  getAllPartenaire,
  getByIdPartenaires,
  upadtepartenaire,
  deletePartenaire,
  searchpartenaire,
  getPartenaireByIdSousCategorie,
  gePartnaireProduct,
  gePartnaireProduct
};
