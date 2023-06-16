const Type = require("../modals/Type");

async function createType(req, res) {
  const { nom, createdAt, updateAt } = req.body;
  let type;
  try {
    type = await Type.create({
      nom,
      createdAt,
      updateAt,
    });
  } catch (err) {
    console.log(err);
  }
  if (!type) {
    return res.status(500).json({ message: "Unable to add type" });
  }
  return res.status(201).json({ type});
}

async function getAllType(req, res) {
  let types;
  try {
    types = await Type.findAll();
  } catch (err) {
    console.log(err);
  }
  if (!types) {
    return res.status(500).json({ message: "Unable to get all types" });
  }
  return res.status(201).json({types});
}

async function getByIdType(req, res) {
  const id = req.params.id;
  let type;
  try {
    type = await Type.findByPk(id);
  } catch (err) {
    console.log(err);
  }
  if (!type) {
    return res.status(500).json({ message: "Unable to get this type" });
  }
  return res.status(201).json({ type });
}

async function upadtetype(req, res) {
  const id = req.params.id;
  let type;
  const { nom, updateAt } = req.body;
  try {
    type= await Type.findByPk(id);
    type.set({
      nom,
      updateAt,
    });
    await type.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({type });
}

async function deleteType(req, res) {
  const id = req.params.id;
  let type;
  try {
    type = await Type.findByPk(id);
    await type.destroy();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ message: "type deleted successfully" });
}

module.exports = {
  createType,
  getAllType,
  getByIdType,
  upadtetype,
  deleteType,
};
