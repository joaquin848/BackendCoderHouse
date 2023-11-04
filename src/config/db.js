import mongoose from "mongoose";

const URI="mongodb+srv://joaquin:lajori848@codercluster.hkzyxhs.mongodb.net/ecommerce?retryWrites=true&w=majority"
 

const databaseConnection = () => {
    try {
        mongoose.connect(URI)
        console.log('connected to DB ecommerce')
    } catch (error) {
        console.log(error);
    }
};

export default databaseConnection;