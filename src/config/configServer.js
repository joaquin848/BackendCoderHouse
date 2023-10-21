import mongoose from "mongoose";
const URI = "mongodb+srv://joaquin:lajori848@codercluster.hkzyxhs.mongodb.net/ecommerce?retryWrites=true&w=majority"

const connectToDB = () => {
    try {
        mongoose.connect(URI)
        console.log("conected to DB ecommerce")
    } catch (error) {
        console.log(error);
    }
}

export default connectToDB