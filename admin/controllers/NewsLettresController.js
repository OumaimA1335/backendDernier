const  NewsLettres = require('../modals/NewsLettres')

async function EnvoyerMessage(req, res) {
  const {email } = req.body;
  let newsLetter;
  try {
    newsLetter = await NewsLettres.create({
      email,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(201).json({ newsLetter });
}
async function ListerMessage(req,res)
{ 
    let newsLetter;
    try {
      newsLetter = await NewsLettres.findAll();
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(201).json({ newsLetter});
}

module.exports={
    EnvoyerMessage,
    ListerMessage
}
