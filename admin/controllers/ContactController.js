const  Contact = require('../modals/Contact')

async function EnvoyerMessage(req, res) {
  const { nom, tel, sujet, description } = req.body;
  let message;
  try {
    message = await Contact.create({
      nom,
      tel,
      sujet,
      description,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(201).json({ message });
}
async function ListerMessage(req,res)
{
   
    let messages;
    try {
      messages = await Contact.findAll();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(201).json({ messages });
}

module.exports={
    EnvoyerMessage,
    ListerMessage
}
