const {Categorie} = require("../modals/SousCategorie");

async function createCategorie(req, res) {
  const { nom, createdAt, updateAt ,  } = req.body;
  let categorie;
  try {
    categorie = await Categorie.create({
      nom,
      createdAt,
      updateAt,
    
    });
  } catch (err) {
    console.log(err);
  }
  if (!categorie) {
    return res.status(500).json({ message: "Unable to add categorie" });
  }
  return res.status(201).json({ categorie });
}

async function getAllCategorie(req, res) {
  let categories;
  try {
    categories = await Categorie.findAll();
  } catch (err) {
    console.log(err);
  }
  if (!categories) {
    return res.status(500).json({ message: "Unable to get all categories" });
  }
  return res.status(201).json({ categories });
}

async function getByIdCategorie(req, res) {
  const id = req.params.id;
  let categorie;
  try {
    categorie = await Categorie.findByPk(id);
  } catch (err) {
    console.log(err);
  }
  if (!categorie) {
    return res.status(500).json({ message: "Unable to get this categorie" });
  }
  return res.status(201).json({ categorie });
}


async function upadteCategorie(req, res) {
  const id = req.params.id;
  let categorie;
  const { nom, updateAt ,  } = req.body;
  try {
    categorie = await Categorie.findByPk(id);
    categorie.set({
      nom,
      updateAt,
      
    });
    await categorie.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ categorie });
}

async function deleteCategorie(req, res) {
  const id = req.params.id;
  let categorie;
  try {
    categorie = await Categorie.findByPk(id);
    await categorie.destroy();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ message: "Categorie deleted successfully" });
}

module.exports = {
  createCategorie,
  getAllCategorie,
  getByIdCategorie,
 
  upadteCategorie,
  deleteCategorie,
};
