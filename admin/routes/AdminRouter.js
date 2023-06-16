const express = require('express');
const router = express.Router();

const {createAccount,
       GetAccountsAdmins,
       updateAccount,
       GetAccountId,
       deleteAccount,
       searchEmail,
       GetAccountsUsers,
       GetAccountEmail,
       VerifyAdmin,} = require('../controllers/AdminController')

router.post("/createAccount",createAccount);
router.put("/updateAccount/:id",updateAccount);
router.post("/verifyAdmin",VerifyAdmin);
router.get("/GetAccountsAdmins",GetAccountsAdmins);
router.get("/GetAccountsEmail/:email",searchEmail);
router.get("/GetAccountsUsers",GetAccountsUsers);
router.get("/GetAccount/:id",GetAccountId);
router.get("/GetAccountByEmail/:email",GetAccountEmail);
router.delete("/deleteAccount/:id",deleteAccount);
module.exports =router