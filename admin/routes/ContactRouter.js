const express = require('express');
const router = express.Router();

const {EnvoyerMessage,ListerMessage} = require("../controllers/ContactController");

router.get("/getContact",ListerMessage);
router.post("/Envoyer",EnvoyerMessage);

module.exports=router;