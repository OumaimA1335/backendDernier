const { Commande } = require("../../admin/modals/Commande");
const Reclamation = require("../Modals/Reclamation");

// Création d'une réclamation par le client
async function createReclamation(req, res) {
  const { description, idClient, idCommande, createdAt, updatedAt } = req.body;
  let reclamation;
  try {
    reclamation = await Reclamation.create({
      description,
      idClient,
      idCommande,
      createdAt,
      updatedAt,
    });
  } catch (err) {
    console.log(err);
  }
  if (!reclamation) {
    return res.status(500).json({ message: "Unable to add reclamation" });
  }
  return res.status(201).json({ reclamation });
}

// la récupération de tous les réclamation par le client
async function getAllReclamations(req, res) {
  try {
    const reclamations = await Reclamation.findAll();
    const TabReclamations = await Promise.all(
      reclamations.map(async (item) => {
        const commande = await Commande.findOne({
          where:
          {
           idClient :item.idClient
          }
          });
        const numTel = commande.get("Tel");
        return {
          id :item.id,
          idClient: item.idClient,
          idCommande: item.idCommande,
          description: item.description,
          Telephone: numTel,
          etat: item.etat,
        };
      })
    );
   // console.log(TabReclamations);
    if (TabReclamations.length === 0) {
      return res.status(500).json({ message: "There are no reclamations" });
    }
    return res.status(201).json({ TabReclamations });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error retrieving reclamations" });
  }
}


//la récupération d'une réclamation par le client
async function getReclamationById(req, res) {
  const id = req.params.id;
  let reclamation;
  try {
    reclamation = await Reclamation.findByPk(id);
  } catch (err) {
    console.log(err);
  }
  if (!reclamation) {
    return res
      .status(500)
      .json({ message: "There is no reclamation have thi id" });
  }
  return res.status(201).json({ reclamation });
}

// modifier l'etat d'une réclamation par l'admin
async function updateEtatByAdmin(req, res) {
  const id = req.params.id;
  let reclamation;
  try {
    reclamation = await Reclamation.findByPk(id);
    let Etat = reclamation.get("etat");
    if (Etat == "Non vérifiée") {
      reclamation.set({
        etat: "Vérifieé",
      });
      await reclamation.save();
    }
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ reclamation });
}

async function updateReclamationByClient(req, res) {
  const id = req.params.id;
  const { description, updatedAt } = req.body;
  let reclamation, etat;
  try {
    reclamation = await Reclamation.findByPk(id);
    etat = reclamation.get("etat");
    //console.log(etat);
    if (etat == "Non vérifieé") {
      reclamation.set({
        description,
        updatedAt,
      });
      await reclamation.save();
    } else {
      return res.json({
        message:
          "The reclamation has been seen by the administration and they will calll you as soon as possible , so you can not update it now",
      });
    }
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ reclamation });
}
async function deleteReclamation(req, res) {
  const id = req.params.id;
  let type;
  try {
    type = await Reclamation.findByPk(id);
    await type.destroy();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ message: "Reclamation deleted successfully" });
}
module.exports = {
  createReclamation,
  getAllReclamations,
  getReclamationById,
  updateEtatByAdmin,
  deleteReclamation,
  updateReclamationByClient,
};
