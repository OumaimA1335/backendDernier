const Marque = require("../modals/Marque");

async function createMarque(req, res) {
  const { nom, createdAt, updateAt } = req.body;
  let marque;
  try {
    marque = await Marque.create({
      nom,
      createdAt,
      updateAt,
    });
  } catch (err) {
    console.log(err);
  }
  if (!marque) {
    return res.status(500).json({ message: "Unable to add marque" });
  }
  return res.status(201).json({ marque });
}

async function getAllMarque(req, res) {
  let marques;
  try {
    marques = await Marque.findAll();
  } catch (err) {
    console.log(err);
  }
  if (!marques) {
    return res.status(500).json({ message: "Unable to get all marques" });
  }
  return res.status(201).json({ marques});
}

async function getByIdMarque(req, res) {
  const id = req.params.id;
  let marque;
  try {
    marque = await Marque.findByPk(id);
  } catch (err) {
    console.log(err);
  }
  if (!marque) {
    return res.status(500).json({ message: "Unable to get this marque" });
  }
  return res.status(201).json({ marque });
}

async function upadteMarque(req, res) {
  const id = req.params.id;
  let marque;
  const { nom, updateAt } = req.body;
  try {
    marque= await Marque.findByPk(id);
    marque.set({
      nom,
      updateAt,
    });
    await marque.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ marque });
}

async function deleteMarque(req, res) {
  const id = req.params.id;
  let marque;
  try {
    marque = await Marque.findByPk(id);
    await marque.destroy();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ message: "Marque deleted successfully" });
}
async function searchMarque(req, res) {
  const marque = req.params.nom;
  let marque1;
  try {
     marque1 = await Marque.findAll({
      where: {
        nom: marque,
      },
    });
  } catch (err) {
    console.log(err);
  }
  if (marque1) return res.status(200).json({ marque1 });
}

module.exports = {
  createMarque,
  getAllMarque,
  getByIdMarque,
  upadteMarque,
  deleteMarque,
  searchMarque
};
