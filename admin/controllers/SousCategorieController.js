const {SousCategorie} = require("../modals/SousCategorie");
const Taille = require("../modals/Taille");

async function createSousCategorie(req, res) {
  const { nom, createdAt, updateAt , nomcategorie } = req.body;
  let sousCategorie;
  try {
    sousCategorie = await SousCategorie.create({
      nom,
      createdAt,
      updateAt,
      nomcategorie, 
    });
  } catch (err) {
    console.log(err);
  }
  if (!sousCategorie) {
    return res.status(500).json({ message: "Unable to add Sous categorie" });
  }
  return res.status(201).json({ sousCategorie });
}

async function getAllSousCategorie(req, res) {
  let sousCategories;
  try {
    sousCategories = await SousCategorie.findAll();
  } catch (err) {
    console.log(err);
  }
  if (!sousCategories) {
    return res.status(500).json({ message: "Unable to get all Sous categories" });
  }
  return res.status(201).json({ sousCategories });
}

async function getByIdSousCategorie(req, res) {
  const id = req.params.id;
  let sousCategorie;
  try {
    sousCategorie = await SousCategorie.findByPk(id);
  } catch (err) {
    console.log(err);
  }
  if (!sousCategorie) {
    return res.status(500).json({ message: "Unable to get this Sous categorie" });
  }
  return res.status(201).json( sousCategorie );
}

async function upadteSousCategorie(req, res) {
  const id = req.params.id;
  let sousCategorie;
  const { nom, updateAt ,  nomcategorie, 
   } = req.body;
  try {
    sousCategorie = await SousCategorie.findByPk(id);
    sousCategorie.set({
      nom,
      updateAt,
      nomcategorie, 
    
    });
    await sousCategorie.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ sousCategorie });
}

async function deleteSousCategorie(req, res) {
  const id = req.params.id;
  let sousCategorie;
  try {
    sousCategorie= await SousCategorie.findByPk(id);
    await sousCategorie.destroy();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ message: "Categorie deleted Sous successfully" });
}
async function searchCategory(req, res) {
  const categorie1 = req.params.nom;
  let categorie;
  try {
     categorie = await SousCategorie.findAll({
      where: {
        nom: categorie1,
      },
    });
  } catch (err) {
    console.log(err);
  }
  if (categorie) return res.status(200).json({ categorie });
}
async function getSouCategorieByIdCategorie(req,res)
{
  const id = req.params.id;
  let sousCategorie
  try{

    sousCategorie = await SousCategorie.findAll({
      where:{
        nomcategorie : id
      }
    })

  }catch(err)
  {
    console.log(err)
  }
  if (sousCategorie) return res.status(200).json({ sousCategorie });
}
async function fetchTailleBasedOnSousCategory(req,res)
{  const id = req.params.id;
  let souscategorie;
  let getidSize;
  let taille;
  try{
     souscategorie =await SousCategorie.findByPk(id);
     getidSize = souscategorie.get("idSize");
     taille= await Taille.findByPk(getidSize);
  }catch(err)
  {console.log(err)
  }
  if (taille) return res.status(200).json([ taille ]);
}

module.exports = {
  createSousCategorie,
  getAllSousCategorie,
  getByIdSousCategorie,
  upadteSousCategorie,
  deleteSousCategorie,
  searchCategory,
  getSouCategorieByIdCategorie,
  fetchTailleBasedOnSousCategory
};
