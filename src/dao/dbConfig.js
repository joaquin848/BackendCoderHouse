import mongoose from "mongoose";
const URI = "mongodb+srv://joaquin:lajori848@codercluster.hkzyxhs.mongodb.net/ecommerce?retryWrites=true&w=majority"


mongoose
.connect(URI)
.then(() => console.log("conectado a la base de datos"))
.catch((error) => console.error(error));