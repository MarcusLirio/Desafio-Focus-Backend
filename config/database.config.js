require("dotenv-safe").config();
const mongoose = require("mongoose");

const uri = `mongodb+srv://Marcus:rEfMCibhsFWEp5pd@empresa.erxhli6.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    autoIndex: false,
    dbName: "desafio",
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // 5 segundos
  })
  .then(() => console.log("DB conectado"))
  .catch((error) => console.log("Erro ao conectar: ", error));

module.exports = {
  mongoose
};
