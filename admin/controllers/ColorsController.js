const Colors = require("../modals/Couleur");
async function getAllColors(req, res) {
    let colors;
    try {
      colors = await Colors.findAll();
    } catch (err) {
      console.log(err);
    }
    if (!colors) {
      return res.status(500).json({ message: "Unable to get all colors" });
    }
    return res.status(201).json({ colors});
  }

  module.exports={
    getAllColors
  }