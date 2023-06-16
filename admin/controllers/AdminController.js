
const Admins = require("../modals/Users");
const { Op, where } = require('sequelize');
const bcrypt = require('bcrypt');

// create account
async function createAccount(req, res) {
  const { email, role_id, image, createdAt, updatedAt,mdp } = req.body;
  console.log(req.body);
  let admin;
  try {
    const find = await Admins.findAll({
      where: {
        email: email
      }
    });
    if (find.length === 0) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const hashPassword = await bcrypt.hash(mdp, salt);
      admin = await Admins.create({
        email,
        role_id,
        image,
        createdAt,
        updatedAt,
        Mdp :hashPassword
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
  return res.status(201).json({ admin });
}


// consulter par id
async function GetAccountId(req, res) {
  const id = req.params.id;
  let account;
  try {
    account = await Admins.findByPk(id);
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ account });
}
// consulter
async function GetAccountsAdmins(req, res) {
  let accounts;
  try {
    accounts = await Admins.findAll({
      where :{
        role_id : 2
      }
    });
  } catch (err) {
    console.log(err);
  }
  if (accounts) {
    res.json({ accounts });
  } else {
    res.status(404).send("accounts not found");
  }
}
async function GetAccountsUsers(req, res) {
  let accounts;
  try {
    accounts = await Admins.findAll({
      where :{
        role_id : 3
      }
    });
  } catch (err) {
    console.log(err);
  }
  if (accounts) {
    res.json({ accounts });
  } else {
    res.status(404).send("accounts not found");
  }
}
// mise à jour
async function updateAccount(req, res) {
  const id = req.params.id;
  const {email,image,mdp,  updatedAt } = req.body;
  let account;
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const Mdp = await bcrypt.hash(mdp, salt);
    account = await Admins.findByPk(id);
    account.set({email, image,Mdp,  updatedAt });
    await account.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ account });
}
// supprimer

async function deleteAccount(req, res) {
  const id = req.params.id;
  let account;
  try {
    account = await Admins.findByPk(id);
    await account.destroy();
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ message: "Account deleted successfully" });
}
async function searchEmail(req, res) {
  const admin = req.params.email;
  let admin1;
  try {
     admin1 = await Admins.findAll({
      where: {
        email: admin,
      },
    });
  } catch (err) {
    console.log(err);
  }
  if (admin1) return res.status(200).json({ admin1 });
}
async function VerifyAdmin(req,res){
   const {email} =req.body
   let admin , correct =false;
   try{
   
    admin = await Admins.findOne({
      where:{
        email :email,
        [Op.or]: [
          { role_id: 1 },
          { role_id: 2 }
        ]
      }
    })

   }catch(err)
   {
    console.log(err)
  }
  if (admin) { correct=true}
  else{
    correct=false;
  }
  return res.send(correct);
}
async function GetAccountEmail(req, res) {
  const emailUser = req.params.email;
  let account, id;
  try {
    account = await Admins.findOne(
      {
       where:{
          email : emailUser
        }
      }
    );
    id=account.get("id");
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ account });
}
module.exports = {
  createAccount,
  GetAccountsAdmins,
  GetAccountId,
  updateAccount,
  deleteAccount,
  searchEmail,
  GetAccountsUsers,
  VerifyAdmin,
  GetAccountEmail
};
