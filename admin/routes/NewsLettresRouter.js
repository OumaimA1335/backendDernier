const express = require('express');
const router = express.Router();

const {EnvoyerMessage,ListerMessage} = require("../controllers/NewsLettresController");

router.get("/getEmails",ListerMessage);
router.post("/Envoyer",EnvoyerMessage);

module.exports=router;