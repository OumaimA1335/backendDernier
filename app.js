const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const sequelize = require("./database");
const Itemsrouter = require("./admin/routes/ProductRoutes");
const CompteRouter = require('./admin/routes/AdminRouter');
const offreRouter = require("./admin/routes/OffreRouter");
const CommandeRouter = require('./admin/routes/CommandeRouter');
const ReclamationUser = require('./client/Routes/ReclamationRouter');
const AvisRouter = require('./client/Routes/AvisRouter');
const CategorieRouter = require("./admin/routes/CategorieRouter");
const MarqueRouter = require("./admin/routes/MarqueRouter");
const TypeRouter = require("./admin/routes/TypeRouter");
const FavorisRouter = require("./client/Routes/FavorisRouter");
const SousCategorieRouter = require("./admin/routes/SousCategorieRouter");
const TailleRouter = require("./admin/routes/TailleRouter");
const ColeurRouter = require("./admin/routes/CouleurRouter");
const PartenaireRouter = require("./admin//routes/PartenaireRouter");
const DashboardRouter = require("./admin/routes/DashboardRouter");
const PanierRouter = require ("./client/Routes/PanierRouter");
const ContactRouter = require("./admin/routes/ContactRouter");
const newsLettres = require("./admin/routes/NewsLettresRouter")
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(process.env.PORT, () => console.log("app is ruuning"));
app.use("/Product", Itemsrouter);
app.use("/Admin",CompteRouter);
app.use("/Offre",offreRouter);
app.use("/Commande",CommandeRouter);
app.use("/Reclamation",ReclamationUser);
app.use("/Avis",AvisRouter);
app.use("/Categorie",CategorieRouter);
app.use("/Marque",MarqueRouter);
app.use("/Type",TypeRouter);
app.use("/Favoris",FavorisRouter);
app.use("/SousCategorie",SousCategorieRouter);
app.use("/Taille",TailleRouter);
app.use("/Couleur",ColeurRouter);
app.use("/Partenaire",PartenaireRouter);
app.use("/Dashboard",DashboardRouter);
app.use("/Panier",PanierRouter);
app.use("/Contact",ContactRouter);
app.use("/newsLetteres",newsLettres)