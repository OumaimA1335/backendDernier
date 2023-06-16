const Taille = require("../modals/Taille");

async function getAllTaille(req, res) {
    let tailles;
    try {
      tailles = await Taille.findAll();
    } catch (err) {
      console.log(err);
    }
    if (!tailles) {
      return res.status(500).json({ message: "Unable to get all tailles" });
    }
    return res.status(201).json({tailles});
  }

module.exports= {getAllTaille}